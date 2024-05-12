import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DialogService, LanguageService, NotificationService, StorageService } from '../../../shared';
import { first, lastValueFrom } from 'rxjs';

export const adminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const dialogService = inject(DialogService);
  const storageService = inject(StorageService);
  const notification = inject(NotificationService);
  const languageService = inject(LanguageService);
  let isAuthenticated = false;
  const checkIsAuthenticated = async () => {
    lastValueFrom(authService.isAuthenticated().pipe(first())).then(res => isAuthenticated = res);
  }
  let isAdmin = false;
  const checkIsAdmin = async () => {
    lastValueFrom(authService.isAdmin().pipe(first())).then(res => isAdmin = res);
  }
  await Promise.all([checkIsAuthenticated(), checkIsAdmin()]);
  if (!isAdmin && storageService.getRefreshToken()) {
    await authService.refreshToken().then();
    await checkIsAdmin();
  }
  if (isAuthenticated && !isAdmin) {
    const keyTitle = 'auth.guards.nonAdmin.title';
    const keyMessage = 'auth.guards.nonAdmin.message';
    languageService.getTranslate([keyTitle, keyMessage]).then(translated => {
      notification.error(translated[keyMessage], translated[keyTitle]);
    })
  }
  return isAdmin;
};
