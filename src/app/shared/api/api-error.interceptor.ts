import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LanguageService } from '../language';
import { NotificationService } from '../notification/notification.service';
import { catchError, throwError } from 'rxjs';

export interface StandardError {
  timestamp: number;
  status: number;
  error: string;
  message: string;
  path: string;
  additionalInfo: string[];
}

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('/assets/i18n')) {
    return next(req);
  }

  const languageService = inject(LanguageService);
  const notificationService = inject(NotificationService);

  return next(req).pipe(catchError((response: HttpErrorResponse) => {

    const defaultAction = (error: any) => {
      if (error.message) {
        notificationService.error(error.message, error.error);
      } else {
        const keyTitle = 'api.errors.http500.title';
        const keyMessage = 'api.errors.http500.message';
        languageService.getTranslate([keyTitle, keyMessage])
          .then((translated: any) =>
            notificationService.error(translated[keyMessage], translated[keyTitle])
          )
      }
    }

    const handle403 = () => {
      if (!response.url?.endsWith('/auth/refresh-token')) {
        const keyTitle = 'api.errors.http403.title';
        const keyMessage = 'api.errors.http403.message';
        languageService.getTranslate([keyTitle, keyMessage])
          .then((translated: any) =>
            notificationService.error(translated[keyMessage], translated[keyTitle])
          )
      }
    }

    const handle422 = (error: StandardError) => {
      const infos = error.additionalInfo.join('/');
      notificationService.error(infos, error.message, false);
    }

    const error: StandardError = response.error;

    switch (response.status) {
      case 403:
        handle403();
        break;
      case 422:
        handle422(error);
        break;
      case 400:
      case 401:
      case 404:
      case 409:
      case 500:
      default:
        defaultAction(error);
    }

    return throwError(() => response.message)
  }));
};
