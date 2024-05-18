import { TranslateService, MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

export class AppMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {

    const interpolationParams: any = params.interpolateParams;

    if (interpolationParams?.default) {
      return interpolationParams?.default
    }

    const key = params.key.split('.');
    const lastKey = key[key.length - 1];

    return lastKey;
  }
}
