import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { FormValidations } from '../../form-validations';
import { LanguageService } from '../../../language';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { INPUT_CONFIG } from '../../config/input.config';

type InputTypes = 'color' | 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week'

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements OnInit {

  @Input({required: true}) id!: string;
  @Input({required: true}) control!: AbstractControl<any, any> | null;
  @Input({required: true}) label!: string;
  @Input() type: InputTypes = 'text';
  @Input() placeholder: string = '';
  @Input() isReadOnly: boolean = false;
  @Input() icon: string | undefined;
  @Input() hint: string | undefined;
  @Input() hintEnd: string | undefined;
  @Input() maxlength: number | null = null;

  appearance = INPUT_CONFIG.appearance;
  hidePassword: boolean = true;

  constructor(
    private _languageService: LanguageService
  ) { }

  ngOnInit(): void {
    if (!this.control) {
      throw `Invalid form control. Id: [${this.id}]`
    }
  }

  getFormControl(): FormControl {
    return this.control as FormControl;
  }

  async getErrorMessage(error: any): Promise<string> {
    return await this._languageService.getTranslate(FormValidations.getErrorTranslationKey(error), error).then();
  }

  getFirstErrorTranslateKey(): string {
    const formControl: FormControl = this.getFormControl();
    if (!formControl || !formControl.errors) {
      return 'web.shared.forms.errors.noErrors';
    }
    return `web.shared.forms.errors.${Object.keys(formControl.errors)[0]}`;
  }

}
