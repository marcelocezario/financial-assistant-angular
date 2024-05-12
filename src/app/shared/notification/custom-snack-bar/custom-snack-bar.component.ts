import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-snack-bar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './custom-snack-bar.component.html',
  styleUrl: './custom-snack-bar.component.scss'
})
export class CustomSnackBarComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackBarRef: MatSnackBarRef<CustomSnackBarComponent>
  ) { }

  dismiss() {
    this.snackBarRef.dismiss();
  }

}
