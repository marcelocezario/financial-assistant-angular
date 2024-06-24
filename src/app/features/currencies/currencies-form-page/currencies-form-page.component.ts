import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Currency } from '../../../core/models';
import { CurrencyService } from '../currency.service';
import { FormBaseDirective, InputComponent, LanguageService, NotificationService, StorageService } from '../../../shared';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ROUTES_KEYS } from '../../../core/config';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-currencies-form-page',
  standalone: true,
  imports: [
    InputComponent,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './currencies-form-page.component.html',
  styleUrl: './currencies-form-page.component.scss'
})
export class CurrenciesFormPageComponent extends FormBaseDirective implements OnInit {

  override formGroup: FormGroup<any> = this._formBuilder.group({
    id: [null],
    code: [null, [Validators.required]],
    name: [null, [Validators.required]],
    symbol: [null, [Validators.required]],
    brlRate: [null, [Validators.required, Validators.min(0)]],
    active: [false],
    createdAt: [null],
    updatedAt: [null]
  })

  constructor(
    private _formBuilder: FormBuilder,
    private _languageService: LanguageService,
    private _notification: NotificationService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _currencyService: CurrencyService
  ) {
    super();
  }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('currencyId');
    if (id) {
      this._currencyService.getById(id)
        .then(currency => this.formGroup.patchValue(currency))
        .catch(() => this._router.navigate([`/${ROUTES_KEYS.currencies}`]))
    }
  }

  override async submit(): Promise<void> {
    const currency: Currency = this.formGroup.value
    if (currency.id) {
      await this._update(currency).then();
    } else {
      await this._create(currency).then();
    }
  }

  override cancel(): void {
    this._router.navigate([`/${ROUTES_KEYS.currencies}`])
  }

  async _create(currency: Currency) {
    await this._currencyService.create(currency).then(() => {
      const translateKey = this.getTranslateKey('currencyCreatedSuccessfully');
      this._languageService.getTranslate(translateKey).then(message => {
        this._notification.success(message)
        this._router.navigate([`/${ROUTES_KEYS.currencies}`])
      });
    })
  }

  async _update(currency: Currency) {
    await this._currencyService.update(currency).then(() => {
      const translateKey = this.getTranslateKey('currencyUpdatedSuccessfully');
      this._languageService.getTranslate(translateKey).then(message => {
        this._notification.success(message)
        this._router.navigate([`/${ROUTES_KEYS.currencies}`])
      });
    })
  }


}
