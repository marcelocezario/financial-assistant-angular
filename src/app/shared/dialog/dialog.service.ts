import { Injectable } from '@angular/core';
import { DialogConfirmComponent } from './index-dialog';
import { first, lastValueFrom } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LanguageService } from '../language';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private _dialog: MatDialog, private _languageService: LanguageService) { }

  openConfirmation(options: { title: string, message: string, confirmButton?: string, denyButton?: string  }): Promise<boolean | undefined> {
    if (!options.confirmButton) {
      options.confirmButton = this._languageService.getTranslateInstant('generic.confirm');
    }
    if (!options.denyButton) {
      options.denyButton = this._languageService.getTranslateInstant('generic.cancel');
    }
    return new Promise((resolve, reject) => {
      this._dialog.open(DialogConfirmComponent, {
        data: {
          title: options.title,
          message: options.message,
          confirmButton: options.confirmButton,
          denyButton: options.denyButton
        }
      }).afterClosed().pipe(first()).subscribe({
        next: res => resolve(res),
        error: err => reject(err)
      });
    });
  }

  openComponent<T>(component: ComponentType<T>, data: any = undefined): Promise<any> {
    const dialogRef = this._dialog.open(component, { data: data, width: data?.width, height: data?.height });
    return lastValueFrom(dialogRef.afterClosed());
  }
}
