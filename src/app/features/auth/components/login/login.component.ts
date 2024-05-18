import { Component, Optional } from '@angular/core';
import { LanguageService, NotificationService, StorageService } from '../../../../shared';
import { AuthService } from '../../services/auth.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ROUTES_KEYS } from '../../../../core/config';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, TranslateModule, MatIconModule, MatCheckboxModule, MatButtonModule, RouterModule, MatDialogModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  signUpLink = `/${ROUTES_KEYS.signUp}`
  hidePassword = true;
  keepLoggedIn: boolean = false;
  credentials: { username: string, password: string} = {
    username: '',
    password: ''
  }

  constructor(
    private _storage: StorageService,
    private _router: Router,
    private _authService: AuthService,
    private _notification: NotificationService,
    private _languageService: LanguageService,
    @Optional() private _dialogRef?: MatDialogRef<LoginComponent>
  ) {
    this.keepLoggedIn = this._storage.getKeepLoggedIn();
  }

  login() {
    this._authService.login(this.credentials.username, this.credentials.password, this.keepLoggedIn).then(() => {
      const title: string = this.getTranslateKey('welcomeTitle');
      const message: string = this.getTranslateKey('welcomeMessage');
      this._languageService.getTranslate([title, message], { user: this._storage.getUserNickname() })
        .then(translated => this._notification.success(translated[message], translated[title]))
        .catch(() => this._notification.success('Welcome'));
      if (this._dialogRef) {
        this._dialogRef?.close({ success: true });
      } else {
        this._router.navigate([`/${ROUTES_KEYS.myAccount}`]);
      }
    }).catch(err => console.error('Attempt login failed'))
  }

  forgotPassword() {
    this._router.navigate([`/${ROUTES_KEYS.forgotPassword}`]);
    this._dialogRef?.close({ success: false });
  }

  signUp() {
    this._router.navigate([`/${ROUTES_KEYS.signUp}`]);
    this._dialogRef?.close({ success: false });
  }

  getTranslateKey(key: string): string {
    return `web.features.auth.components.${this.constructor.name}.${key}`;
  }

}
