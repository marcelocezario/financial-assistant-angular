import { Component, OnInit } from '@angular/core';
import { CompareObjectIdDirective, FormBaseDirective, LanguageService, NotificationService, StorageService } from '../../../shared';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_KEYS } from '../../../core/config';
import { Currency, Wallet } from '../../../core/models';
import { WalletService } from '../wallet.service';
import { WalletType } from '../../../core/models/wallet-type.enum';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyService } from '../../currencies';

@Component({
  selector: 'app-wallets-form-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, TranslateModule, MatCheckboxModule, MatSelectModule, CompareObjectIdDirective],
  templateUrl: './wallets-form-page.component.html',
  styleUrl: './wallets-form-page.component.scss'
})
export class WalletsFormPageComponent extends FormBaseDirective implements OnInit {

  currencies: Currency[] = []
  walletTypes = Object.keys(WalletType);

  override formGroup: FormGroup<any> = this._formBuilder.group({
    id: [null],
    name: [null, [Validators.required]],
    balance: [null, [Validators.required]],
    currency: [null, [Validators.required]],
    active: [true],
    type: [null],
    createdAt: [null],
    updatedAt: [null],

  })

  constructor(
    private _formBuilder: FormBuilder,
    private _storageService: StorageService,
    private _router: Router,
    private _walletService: WalletService,
    private _languageService: LanguageService,
    private _notification: NotificationService,
    private _currencyService: CurrencyService,
    private _route: ActivatedRoute
  ) {
    super()
  }

  async ngOnInit(): Promise<void> {
    this.currencies = await this._currencyService.getAll().then();
    const id = this._route.snapshot.paramMap.get('walletId');
    if (id) {
      this._walletService.getByIdAndUser(id)
        .then(wallet => {
          this.formGroup.get('type')?.setValue(wallet.type)
          this.onTypeChange(wallet.type);
          this.formGroup.get('currency')?.disable()
          this.formGroup.patchValue(wallet)
          if (this.currencies.findIndex(c => c.id === wallet.currency.id) < 0) {
            this.currencies.unshift(wallet.currency)
          }
        })
        .catch(() => this._router.navigate([`/${ROUTES_KEYS.wallets}`]))
    }
  }

  override async submit(): Promise<void> {
    const wallet: Wallet = this.formGroup.value
    if (!wallet.currency) {
      wallet.currency = this.formGroup.get('currency')?.value
    }
    wallet.userId = this._storageService.getUserId()!
    if (wallet.id) {
      await this._update(wallet).then();
    } else {
      await this._create(wallet).then();
    }
    this._router.navigate([`/${ROUTES_KEYS.wallets}`])
  }

  private async _create(wallet: Wallet) {
    await this._walletService.create(wallet).then();
    const message = await this._languageService.getTranslate(this.getTranslateKey('walletCreatedSuccessfully')).then();
    this._notification.success(message);
  }

  private async _update(wallet: Wallet) {
    await this._walletService.update(wallet).then();
    const message = await this._languageService.getTranslate(this.getTranslateKey('walletUpdatedSuccessfully')).then();
    this._notification.success(message);
  }

  override cancel(): void {
    this._router.navigate([`/${ROUTES_KEYS.wallets}`])
  }

  onTypeChange(type: WalletType) {
    switch(type) {
      case WalletType.BANK_ACCOUNT:
        this.formGroup.addControl('creditLimit', this._formBuilder.control(null, [Validators.required, Validators.min(0)]))
        this.formGroup.addControl('interestRate', this._formBuilder.control(null, [Validators.required, Validators.min(0), Validators.max(100)]))
        break
      case WalletType.CREDIT_CARD:
        this.formGroup.addControl('creditLimit', this._formBuilder.control(null, [Validators.required, Validators.min(0)]))
        this.formGroup.addControl('billingCycleDate', this._formBuilder.control(null, [Validators.required, Validators.min(1), Validators.max(31)]))
        this.formGroup.addControl('dueDate', this._formBuilder.control(null, [Validators.required, Validators.min(1), Validators.max(31)]))
        break
    }
  }

}
