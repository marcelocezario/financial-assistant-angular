import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-time-picker',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.scss'
})
export class TimePickerComponent {

  hourHandStyle: string = '9'
  minuteHandStyle: string = '20'

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClockClick(event: MouseEvent) {
    const element = event.target as HTMLElement;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clickX = event.clientX - centerX;
    const clickY = event.clientY - centerY;
    const angle = this.calculateAngle(clickX, clickY);
    console.log(angle)
    console.log(this.angleToTime(angle))
  }

  calculateAngle(x: number, y: number): number {
    const radians = Math.atan2(y, x);
    let degrees = radians * (180 / Math.PI);
    degrees = (degrees + 450) % 360;
    return degrees;
  }

  angleToTime(angle: number): { hours: number, minutes: number } {
    const hours = Math.floor(angle / 30);
    const minutes = Math.floor((angle / 6));
    return { hours, minutes };
  }

}
