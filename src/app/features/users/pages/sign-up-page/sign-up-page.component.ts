import { Component } from '@angular/core';
import { FormBaseDirective, FormValidations, LanguageService, NotificationService } from '../../../../shared';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../core/models';
import { UserService } from '../../user.service';
import { ROUTES_KEYS } from '../../../../core/config';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, TranslateModule, MatInputModule, MatButtonModule],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss'
})
export class SignUpPageComponent extends FormBaseDirective {

  override formGroup: FormGroup<any> = this._formBuilder.group({
    nickname: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
    passwordConfirmation: [null, [Validators.required, FormValidations.equalsTo('password')]]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _languageService: LanguageService,
    private _notification: NotificationService,
    private _router: Router
  ) {
    super()
  }

  override async submit(): Promise<void> {
    const user: User = this.formGroup.value
    await this._userService.create(user).then();
    const translateKey = this.getTranslateKey('userCreatedSuccessfully');
    this._languageService.getTranslate(translateKey, user).then(message => {
      this._notification.success(message)
      this._router.navigate([`/${ROUTES_KEYS.login}`])
    });

  }
  override cancel(): void {
    this._router.navigate([`/`])
  }

}
