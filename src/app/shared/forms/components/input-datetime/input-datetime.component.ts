import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '../../../language';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../../../dialog/dialog.service';

@Component({
  selector: 'app-input-datetime',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    // MatTooltip,
    ReactiveFormsModule,
    TranslateModule,
    TimePickerComponent
  ],
  templateUrl: './input-datetime.component.html',
  styleUrl: './input-datetime.component.scss'
})
export class InputDatetimeComponent {

  @ViewChild('timeInput') timeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('timeInputText') timeInputText!: ElementRef<HTMLInputElement>;

  @Input() control: AbstractControl<any, any> | null = null;
  @Input() id: string = ''
  @Input() label: string = ''
  @Input() placeholder: string = ''
  @Input() isReadOnly: boolean = false
  @Input() hint: string | undefined;

  constructor(
    private _languageService: LanguageService,
    private _dialogService: DialogService
  ) { }

  onTimeSelected(): void {
    this.getFormControl().setValue(this.timeInput.nativeElement.value);
    this.getFormControl().markAsDirty();
  }

  getFormControl(): FormControl {
    return this.control as FormControl;
  }

  getTranslateKey(key: string): string {
    return `web.shared.components.${this.constructor.name}.${key}`
  }

  async openTimePicker() {
    const data = {
      time: '13:56'
    }
    await this._dialogService.openComponent(TimePickerComponent, data)
      .then(time => {
        console.log(time)
      })
  }


  onTimeChanged(): void {
    this.timeInput.nativeElement.value = this.timeInputText.nativeElement.value;
  }

}
