import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  private show(body: string, type: 'success' | 'warning' | 'error' | 'info', delay: number | undefined = undefined, classname: string = '', header: string = '') {
    const config: MatSnackBarConfig = {
      duration: delay
    }
    this._snackBar.open(body, 'X', config)
  }

  success(message: string, header: string = '', autohide: boolean = true): void {
    this.show(message, 'success', autohide ? 8000 : undefined, 'bg-success text-light', header);
  }

  error(message: string, header: string = '', autohide: boolean = true): void {
    this.show(message, 'error', autohide ? 8000 : undefined, 'bg-danger text-light', header);
  }

  warning(message: string, header: string = '', autohide: boolean = true): void {
    this.show(message, 'warning', autohide ? 8000 : undefined, 'bg-warning', header);
  }

  info(message: string, header: string = '', autohide: boolean = true): void {
    this.show(message, 'info', autohide ? 8000 : undefined, 'bg-light', header);
  }
}
