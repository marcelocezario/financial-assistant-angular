import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { inject } from '@angular/core';

export const languageInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const userLanguage = storageService.getUserLanguage();
  if (userLanguage) {
    const authRequest = req.clone({ headers: req.headers.set('Accept-Language', userLanguage)});
    return next(authRequest);
  } else {
    return next(req);
  }
};
