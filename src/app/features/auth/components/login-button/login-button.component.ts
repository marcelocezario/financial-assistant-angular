import { ROUTES_KEYS } from './../../../../core/config';
import { Component } from '@angular/core';
import { Observable, first } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { DialogService, LanguageService, NotificationService, StorageService } from '../../../../shared';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [CommonModule, RouterModule, MatMenuModule, MatIconModule, MatDividerModule, TranslateModule, MatButtonModule],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.scss'
})
export class LoginButtonComponent {

  isAuthenticated$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  userNickname: string = '';
  homeLink = `/${ROUTES_KEYS.home}`;
  myAccountLink = `/${ROUTES_KEYS.myAccount}`

  constructor(
    private _authService: AuthService,
    private _storageService: StorageService,
    private _dialogService: DialogService,
    private _languageService: LanguageService,
    private _router: Router,
    private _notification: NotificationService,
  ) {
    this.isAuthenticated$ = _authService.isAuthenticated();
    this.isAdmin$ = _authService.isAdmin();
    this.isAuthenticated$.subscribe(() => {
      this.userNickname = this._storageService.getUserNickname() ?? '';
    })
  }

  login(): void {
    this._dialogService.openComponent(LoginComponent).then(res => {
      if (res?.success) {
        this._router.navigate([this.myAccountLink]);
      }
    }
    );
  }

  logout(): void {
    const nickname = this._storageService.getUserNickname() ?? '';
    this._authService.logout(this.homeLink).then(() => {
      const messageKey = 'auth.logout.farewellMessage';
      const titleKey = 'auth.logout.farewellTitle';
      this._languageService.getTranslate([messageKey, titleKey], { user: nickname }).then(translated => {
        this._notification.info(translated[messageKey], translated[titleKey]);
      })
    })
  }

  getTranslateKey(key: string): string {
    return `auth.login-button.${key}`
  }

}
