import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Transaction, TransactionCategory, ClassificationType, Wallet } from '../../../core/models';
import { CategoryService } from '../../categories';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogService, FormBaseDirective, InputComponent, InputDatetimeComponent, LanguageService, NotificationService, SelectComponent, StorageService, Utils } from '../../../shared';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ROUTES_KEYS } from '../../../core/config';
import { TransactionService } from '../transaction.service';
import { TranslateModule } from '@ngx-translate/core';
import { WalletService } from '../../wallets';
import { first } from 'rxjs';

@Component({
  selector: 'app-transactions-form-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputComponent,
    InputDatetimeComponent,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    SelectComponent,
    TranslateModule,
  ],
  templateUrl: './transactions-form-page.component.html',
  styleUrl: './transactions-form-page.component.scss'
})
export class TransactionsFormPageComponent extends FormBaseDirective implements OnInit {

  userCategories: Category[] = []
  wallets: Wallet[] = []
  transactionTypes = Object.keys(ClassificationType)

  override formGroup: FormGroup<any> = this._formBuilder.group({
    id: [null],
    amount: [null],
    dueDate: [null],
    paymentMoment: [new Date],
    notes: [null],
    type: [null],
    method: [null],
    currentInstallment: [null],
    active: [null],
    createdAt: [null],
    updatedAt: [null],
    userId: [null],
    wallet: [null],
    categories: this._formBuilder.array([this._buildCategory()])
  })

  constructor(
    private _formBuilder: FormBuilder,
    private _transactionService: TransactionService,
    private _categoryService: CategoryService,
    private _walletService: WalletService,
    private _storageService: StorageService,
    private _router: Router,
    private _languageService: LanguageService,
    private _notification: NotificationService,
    private _route: ActivatedRoute,
    private _dialogService: DialogService
  ) {
    super();
  }

  get categories(): FormArray {
    return this.formGroup.get('categories') as FormArray;
  }

  get transactionType(): ClassificationType | undefined {
    return this.formGroup?.get('type')?.value
  }

  get categoriesAmount(): number {
    const categories = this.categories
    const value = categories.controls
      .map(control => control.value)
      .map(transactionCategory => {
        if (!transactionCategory) {
          return 0
        }
        if (transactionCategory.category === ClassificationType.EXPENSE) {
          return transactionCategory.amount * -1
        }
        return transactionCategory.amount
      })
      .reduce((a, b) => a + b, 0.0)
    return value
  }

  getCategoriesOptions(discountCategory: boolean = false): Category[] {
    return this.userCategories.filter(c => (c.type === this.transactionType) !== discountCategory) || []
  }


  async ngOnInit(): Promise<void> {
    const [categories, wallets, transaction] = await Promise.all([
      this._categoryService.getByUser(),
      this._walletService.getByUser(),
      this._findTransactionById()
    ]);
    this.userCategories.push(...categories);
    this.wallets = wallets;
  }

  private async _findTransactionById() {
    const id = this._route.snapshot.paramMap.get('transactionId');
    if (id) {
      this._transactionService.getByIdAndUser(id)
        .then(transaction => {
          transaction.paymentMoment = Utils.formatDateTimeForInput(transaction.paymentMoment)
          this.formGroup.patchValue(transaction)
          if (this.wallets.findIndex(w => w.id === transaction.wallet.id) < 0) {
            this.wallets.unshift(transaction.wallet)
          }
          const categories = transaction.categories || []
          const categoriesFormArray = this.categories
          this.removeCategory(0)
          categories.forEach((category, index) => {
            // if (index !== 0) {
            //   categoriesFormArray.push(this._buildCategory(category));
            // }
            categoriesFormArray.push(this._buildCategory(category));
            if (category.category.active === false) {
              this.userCategories.push(category.category)
            }
          });
        })
        .catch(() => this._router.navigate([`/${ROUTES_KEYS.transactions}`]))
    }
  }

  override async submit(): Promise<void> {
    const transaction: Transaction = this.formGroup.value
    transaction.userId = this._storageService.getUserId()!
    if (transaction.id) {
      await this._update(transaction).then();
    } else {
      await this._create(transaction).then();
    }
  }

  override cancel(): void {
    this._router.navigate([`/${ROUTES_KEYS.transactions}`])
  }

  private _buildCategory(category: TransactionCategory | undefined = undefined): FormGroup {
    let isDiscount: boolean = false
    if (this.transactionType && category) {
      isDiscount = this.transactionType !== category?.category.type
    }
    return this._formBuilder.group({
      category: [category?.category, [Validators.required]],
      amount: [category?.amount, [Validators.required, Validators.min(0)]],
      isDiscount: [isDiscount]
    });
  }

  private async _create(transaction: Transaction) {
    await this._transactionService.create(transaction).then(() => {
      const translateKey = this.getTranslateKey('transactionCreatedSuccessfully');
      this._languageService.getTranslate(translateKey).then(message => {
        this._notification.success(message)
        this._router.navigate([`/${ROUTES_KEYS.transactions}`])
      });
    })
  }

  private async _update(transaction: Transaction) {
    await this._transactionService.update(transaction).then(() => {
      const translateKey = this.getTranslateKey('transactionUpdatedSuccessfully')
      this._languageService.getTranslate(translateKey).then(message => {
        this._notification.success(message)
        this._router.navigate([`/${ROUTES_KEYS.transactions}`])
      });
    })
  }

  convertAbstractControlToFormControl(control: AbstractControl<any, any> | null): FormControl {
    return control as FormControl
  }

  addCategory() {
    this.categories.push(this._buildCategory());
  }

  removeCategory(index: number) {
    this.categories.removeAt(index);
  }

}
