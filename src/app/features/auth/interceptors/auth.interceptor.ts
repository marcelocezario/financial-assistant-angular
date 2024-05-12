import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../../../shared';
import { inject } from '@angular/core';
import { AuthService } from '..';
import { from, mergeMap } from 'rxjs';
import { API_CONFIG } from '../../../core/config';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const authService = inject(AuthService);
  const localUser = storageService.getLocalUser();

  const apiUrlLength = API_CONFIG.apiUrl.length;
  const requestToAPI = req.url.substring(0, apiUrlLength) == API_CONFIG.apiUrl;
  const requestPath = req.url.substring(apiUrlLength, req.url.length);

  const publicMatchers: Map<string, string[]> = new Map();
  publicMatchers.set('POST', ['/login']);
  publicMatchers.set('GET', ['/system-info/version']);
  publicMatchers.set('PUT', []);

  const matchers = publicMatchers.get(req.method);

  let isPublicMatcher: boolean = false;
  if (matchers != null) {
    isPublicMatcher = matchers.indexOf(requestPath) >= 0;
  }

  if (requestToAPI && !isPublicMatcher) {
    let token: string | null | undefined;
    if (requestPath == '/auth/refresh-token') {
      token = storageService.getRefreshToken();
    } else {
      const timestampNow = (new Date).getTime() / 1000;
      const expirationToken = localUser?.exp ?? 0;
      const secondsLimit = 30;
      if (expirationToken < (timestampNow + secondsLimit) && storageService.getRefreshToken()) {
        return from(authService.refreshToken()).pipe(
          mergeMap(() => {
            token = storageService.getLocalUser()?.accessToken;
            const authRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
            return next(authRequest);
          })
        );
      }
      token = localUser?.accessToken;
    }
    if (token) {
      const authRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
      return next(authRequest);
    }
  }
  return next(req);
};
