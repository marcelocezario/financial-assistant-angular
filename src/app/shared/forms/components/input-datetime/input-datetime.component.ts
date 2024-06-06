import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from '../../../dialog/dialog.service';
import { DatetimePickerComponent } from './datetime-picker/datetime-picker.component';

@Component({
  selector: 'app-input-datetime',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule
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

  async openDatetimePicker() {
    const date = this.getFormControl().value ? new Date(this.getFormControl().value) : undefined;
    await this._dialogService.openComponent(DatetimePickerComponent, date)
      .then((res: Date | undefined) => {
        if (res) {
          this.getFormControl().setValue(this.formatDate(new Date(res)))
        }
      })
  }

  formatDate(date: Date): string {
    const pad = (num: number) => num < 10 ? '0' + num : num;
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

}
