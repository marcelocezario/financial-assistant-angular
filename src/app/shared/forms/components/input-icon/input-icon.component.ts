import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DialogService } from '../../../dialog/dialog.service';
import { IconPickerComponent } from './icon-picker/icon-picker.component';
import { LanguageService } from '../../../language';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-input-icon',
  standalone: true,
  imports: [CommonModule, MatFormField, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule, TranslateModule],
  templateUrl: './input-icon.component.html',
  styleUrl: './input-icon.component.scss'
})
export class InputIconComponent {

  @Input() id: string = ''
  @Input() label: string = ''
  @Input() placeholder: string = ''
  @Input() isReadOnly: boolean = false
  @Input() control: AbstractControl<any, any> | null = null;
  @Input() iconColor: string | undefined | null;

  materialIconsWebSite = 'https://fonts.google.com/icons';

  constructor(private _languageService: LanguageService, private _dialogService: DialogService) { }

  ngOnInit(): void {
    if (!this.control) {
      throw `Invalid form control. Id: [${this.id}]`
    }
  }

  getFormControl(): FormControl {
    return this.control as FormControl;
  }

  async getErrorMessage(error: any): Promise<string> {
    let message: string = '';
    return message;
  }

  async searchIcon() {
    const data = {
      iconColor: this.iconColor,
      currentIcon: this.getFormControl().value
    }
    await this._dialogService.openComponent(IconPickerComponent, data)
      .then(icon => {
        if(icon) {
          this.setIcon(icon);
        }
      });
  }

  setIcon(icon: string) {
    this.getFormControl().setValue(icon);
    this.getFormControl().markAsDirty();
  }

  getTranslateKey(key: string): string {
    return `web.shared.components.${this.constructor.name}.${key}`
  }

}
