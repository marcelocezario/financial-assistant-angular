import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiService, StorageService } from '../../../shared';
import { Router } from '@angular/router';
import { UserRole } from '../../../core/models';

interface AuthenticationResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  created_at: number;
  user_pending_issues: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _jwtHelper: JwtHelperService = new JwtHelperService();
  private _successfulAuthenticated$: Subject<boolean> = new Subject<boolean>();
  private _authenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private _storageService: StorageService,
    private _apiService: ApiService,
    private _router: Router
  ) {
  }

  login(username: string, password: string, keepLoggedIn: boolean = false): Promise<void> {
    this._storageService.clearStorage();
    const credentials = {
      username: username, password: password
    }
    return new Promise((resolve, reject) => {
      this._apiService.httpPost('/login', credentials).subscribe({
        next: response => {
          this._storageService.setKeepLoggedIn(keepLoggedIn);
          this._successfulAuthenticate(response);
          resolve();
        },
        error: err => reject(err)
      })
    });
  }

  refreshToken(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this._isRefreshTokenExpired()) {
        reject('Refresh token is expired or does not exist');
        this.logout();
        return
      }
      this._apiService.httpPost('/auth/refresh-token').subscribe({
        next: response => {
          this._successfulAuthenticate(response);
          resolve();
        },
        error: err => reject(err)
      })
    })

  }

  logout(routeAfterLogout: string = this._router.url): Promise<void> {
    const actionsLogout = () => {
      this._storageService.clearStorage();
      this._successfulAuthenticated$.next(false);
      this._authenticated$.next(false);
      this._isAdmin$.next(false);
      this._router.navigate(['/']).then(() => {
        this._router.navigate([routeAfterLogout]);
      })
    };

    return new Promise((resolve, reject) => {
      if (!this._authenticated$.value) {
        actionsLogout();
        resolve();
        return;
      }

      this._apiService.httpPost('/auth/logout').subscribe({
        next: () => {
          actionsLogout();
          resolve();
        },
        error: err => {
          actionsLogout();
          reject(err)
        }
      })
    })
  }

  private _successfulAuthenticate(response: AuthenticationResponse) {
    const localUser = this._storageService.getLocalUser() || {};
    const tokenData = this._jwtHelper.decodeToken(response.access_token);

    localUser.accessToken = response.access_token;
    localUser.userId = tokenData.userId;
    localUser.nickname = tokenData.nickname;
    localUser.email = tokenData.sub;
    localUser.exp = tokenData.exp;
    localUser.roles = tokenData.roles

    this._storageService.setLocalUser(localUser);
    this._storageService.setRefreshToken(response.refresh_token);

    this._successfulAuthenticated$.next(true);
    this._authenticated$.next(true);
    this._isAdmin$.next(localUser.roles?.includes(UserRole.ADMIN) ?? false)
  }

  private _isRefreshTokenExpired(): boolean {
    const refreshToken = this._storageService.getRefreshToken();
    if (refreshToken) {
      const tokenData = this._jwtHelper.decodeToken(refreshToken);
      const tokenExp = tokenData.exp;
      const now = Math.floor((new Date).getTime() / 1000);
      const expDiff = tokenExp - now;
      return expDiff < 0;
    }
    return true;
  }

  isAuthenticated(): Observable<boolean> {
    return this._authenticated$;
  }

  isAdmin(): Observable<boolean> {
    return this._isAdmin$;
  }
}
