import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild, forwardRef } from '@angular/core';
import { LanguageService } from '../../../language';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-input-color',
  standalone: true,
  imports: [CommonModule, MatFormField, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule, TranslateModule],
  templateUrl: './input-color.component.html',
  styleUrl: './input-color.component.scss'
})
export class InputColorComponent implements OnInit {

  @ViewChild('colorInput') colorInput!: ElementRef<HTMLInputElement>;
  @ViewChild('colorInputText') colorInputText!: ElementRef<HTMLInputElement>;

  @Input() id: string = ''
  @Input() label: string = ''
  @Input() placeholder: string = ''
  @Input() isReadOnly: boolean = false
  @Input() control: AbstractControl<any, any> | null = null;
  @Input() hint: string | undefined;

  constructor(private _languageService: LanguageService) { }

  ngOnInit(): void {
    if (!this.control) {
      throw `Invalid form control. Id: [${this.id}]`
    }
  }

  getFormControl(): FormControl {
    return this.control as FormControl;
  }

  async getErrorMessage(error: any): Promise<string> {
    console.log('error - getErrorMessage(): ', error)
    let message: string = '';
    // TODO
    // await this._languageService.getTranslate(FormValidations.getErrorTranslationKey(error), error).then(msg => message = msg);
    return message;
  }

  openColorPicker(input: HTMLInputElement): void {
    input.click();
  }

  onColorSelected(): void {
    this.getFormControl().setValue(this.colorInput.nativeElement.value);
    this.getFormControl().markAsDirty();
  }

  onTextColorChanged(): void {
    this.colorInput.nativeElement.value = this.colorInputText.nativeElement.value;
  }

  getTranslateKey(key: string): string {
    return `web.shared.components.${this.constructor.name}.${key}`
  }

}
