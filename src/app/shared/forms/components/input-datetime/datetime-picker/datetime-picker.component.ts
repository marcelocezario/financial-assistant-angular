import { DateTime } from 'luxon';
import { Component, Inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

interface Time {
  hour: number | undefined;
  minute: number | undefined;
}

@Component({
  selector: 'app-datetime-picker',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogActions,
    MatDividerModule,
    NgbTimepicker,
    TranslateModule,
    MatDialogClose,
  ],
  templateUrl: './datetime-picker.component.html',
  styleUrl: './datetime-picker.component.scss'
})
export class DatetimePickerComponent {

  dateTime: DateTime | undefined;
  time: Time | undefined;

  constructor(
    private _dialogRef: MatDialogRef<DatetimePickerComponent>,
    @Inject(MAT_DIALOG_DATA) private date: Date | DateTime | undefined
  ) {
    if (!date) {
      return;
    }
    if (date instanceof Date) {
      this.dateTime = DateTime.fromJSDate(date)
    } else {
      this.dateTime = date
    }
    this.time = { hour: this.dateTime.hour, minute: this.dateTime.minute }
  }

  selectDateTime() {
    if (!this.dateTime) {
      this._dialogRef.close();
      return;
    }
    let dateTime!: DateTime;
    if (this.time?.hour && this.time?.minute) {
      dateTime = this.dateTime.set(this.time)
    } else {
      dateTime = this.dateTime;
    }
    this._dialogRef.close(dateTime.toJSDate())
  }

}
