import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { FormBaseDirective, LanguageService, NotificationService, StorageService } from '../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyService } from '../currency.service';
import { ROUTES_KEYS } from '../../../core/config';
import { Currency } from '../../../core/models';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-currencies-form-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, TranslateModule, MatButtonModule, MatCheckboxModule],
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
      await this._updateCurrency(currency).then();
    } else {
      await this._createCurrency(currency).then();
    }
  }

  override cancel(): void {
    this._router.navigate([`/${ROUTES_KEYS.currencies}`])
  }

  async _createCurrency(currency: Currency) {
    await this._currencyService.create(currency).then(() => {
      const translateKey = this.getTranslateKey('currencyCreatedSuccessfully');
      this._languageService.getTranslate(translateKey).then(message => {
        this._notification.success(message)
        this._router.navigate([`/${ROUTES_KEYS.currencies}`])
      });
    })
  }

  async _updateCurrency(currency: Currency) {
    await this._currencyService.update(currency).then(() => {
      const translateKey = this.getTranslateKey('currencyUpdatedSuccessfully');
      this._languageService.getTranslate(translateKey).then(message => {
        this._notification.success(message)
        this._router.navigate([`/${ROUTES_KEYS.currencies}`])
      });
    })
  }


}
