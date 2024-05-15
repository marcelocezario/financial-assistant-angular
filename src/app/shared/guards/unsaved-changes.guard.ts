import { CanDeactivateFn } from '@angular/router';
import { FormBaseDirective } from '../forms/index-forms';
import { inject } from '@angular/core';
import { DialogService } from '../dialog/dialog.service';
import { LanguageService } from '../language';

export const unsavedChangesGuard: CanDeactivateFn<unknown> = async (component, currentRoute, currentState, nextState) => {
  if (component instanceof FormBaseDirective) {
    if (component.formGroup.dirty && !component.submitted()) {
      const dialog = inject(DialogService);
      const translate = inject(LanguageService);
      const titleKey = 'generic.exitConfirmationTitle';
      const messageKey = 'generic.exitConfirmationMessage';

      const translated = await translate.getTranslate([titleKey, messageKey]);
      return await dialog.openConfirmation({ title: translated[titleKey], message: translated[messageKey] }).then() || false;
    }
  }
  return true;
};
