import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DialogService, LanguageService, NotificationService, StorageService } from '../../../shared';
import { first, lastValueFrom } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const dialogService = inject(DialogService);
  const storageService = inject(StorageService);
  const notification = inject(NotificationService);
  const languageService = inject(LanguageService);
  let isAuthenticated = false;
  const checkIsAuthenticated = async () => {
    lastValueFrom(authService.isAuthenticated().pipe(first())).then(res => isAuthenticated = res);
  }
  await checkIsAuthenticated();
  if (!isAuthenticated && storageService.getRefreshToken()) {
    await authService.refreshToken().then();
    await checkIsAuthenticated();
  }
  if (!isAuthenticated) {
    const keyTitle = 'web.features.auth.guards.nonAuthenticated.title';
    const keyMessage = 'web.features.auth.guards.nonAuthenticated.message';
    languageService.getTranslate([keyTitle, keyMessage]).then(translated => {
      notification.info(translated[keyMessage], translated[keyTitle]);
    })
    await dialogService.openComponent(LoginComponent).then();
    await checkIsAuthenticated();
  }
  return isAuthenticated;
};
