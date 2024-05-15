import { Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

}
