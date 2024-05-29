import { Directive } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Directive({
  selector: '[appFormBase]',
  standalone: true
})
export abstract class FormBaseDirective {

  private _submitted: boolean = false;
  private _submissionAttempted: boolean = false;
  abstract formGroup: FormGroup;

  constructor() { }

  abstract submit(): Promise<void>;
  abstract cancel(): void;

  onSubmit(): void {
    this._submissionAttempted = true;
    if (this.formGroup.invalid) {
      return;
    }
    this.submit();
    this._submitted = true;
  }

  reset(): void {
    this._submitted = false;
    this.formGroup.reset();
  }

  getTranslateKey(key: string): string {
    return `web.components.${this.constructor.name}.${key}`
  }

  submitted(): boolean {
    return this._submitted;
  }

  submissionAttempted(): boolean {
    return this._submissionAttempted;
  }

  getFirstErrorTranslateKey(formControlName: string, formGroup: FormGroup | undefined = undefined): string {
    const group = formGroup ? formGroup : this.formGroup;
    const control = group.get(formControlName);
    if (!control || !control.errors) {
      return 'web.shared.forms.errors.noErrors';
    }
    return `web.shared.forms.errors.${Object.keys(control.errors)[0]}`;
  }

}
