import { TranslateService, MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

export class AppMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {

    const interpolationParams: any = params.interpolateParams;

    if (interpolationParams?.default) {
      return interpolationParams?.default
    }

    const key = params.key.split('.');
    const lastKey = key[key.length - 1];

    if (lastKey && lastKey !== 'undefined') {
      console.warn('Translation key not found: ', params.key);
    }

    return (lastKey) ? lastKey : '';
  }
}
