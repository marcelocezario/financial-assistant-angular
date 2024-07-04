import { ActivatedRoute, Router } from '@angular/router';
import { Category, Transaction, TransactionCategory, ClassificationType, Wallet } from '../../../core/models';
import { CategoryService } from '../../categories';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogService, FormBaseDirective, InputComponent, InputDatetimeComponent, LanguageService, NotificationService, SelectComponent, StorageService, Utils } from '../../../shared';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ROUTES_KEYS } from '../../../core/config';
import { TransactionService } from '../transaction.service';
import { TranslateModule } from '@ngx-translate/core';
import { WalletService } from '../../wallets';
import Decimal from 'decimal.js';

@Component({
  selector: 'app-transactions-form-page',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    InputDatetimeComponent,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
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

  categories: Category[] = []
  wallets: Wallet[] = []
  transactionTypes = Object.keys(ClassificationType)
  categoriesOptions: Category[] = []
  categoriesAmount: number = 0

  formCategories: FormGroup<any> = this._formBuilder.group({
    category: [null, [Validators.required]],
    amount: [null, [Validators.required, Validators.min(0)]]
  })

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
    categories: this._formBuilder.array([])
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

  async ngOnInit(): Promise<void> {
    const [categories, wallets, transaction] = await Promise.all([
      this._categoryService.getByUser(),
      this._walletService.getByUser(),
      this._findTransactionById()
    ]);
    this.categories = categories;
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
          const categoriesFormArray = this.formGroup.get('categories') as FormArray;
          categories.forEach(category => {
            categoriesFormArray.push(this._formBuilder.control(category));
          });
          this.changeTransactionType(transaction.type)
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

  override cancel(): void {
    this._router.navigate([`/${ROUTES_KEYS.transactions}`])
  }

  async deleteTransactionCategory(transactionCategory: TransactionCategory) {
    const titleKey = this.getTranslateKey('transactionCategoryDeleteConfirmTitle')
    const messageKey = this.getTranslateKey('transactionCategoryDeleteConfirmMessage')
    const translated = await this._languageService.getTranslate([titleKey, messageKey], { categoryName: transactionCategory.category.name })
    const userConfirm = await this._dialogService.openConfirmation({ title: translated[titleKey], message: translated[messageKey] }).then() || false
    if (userConfirm) {
      const successfullyMessageKey = this.getTranslateKey('transactionCategoryDeletedSuccessfully')
      const successfullyMessage = await this._languageService.getTranslate(successfullyMessageKey, { categoryName: transactionCategory.category.name }).then()
      this._notification.warning(successfullyMessage)
      const categoriesArray = this.formGroup.get('categories') as FormArray
      const index = categoriesArray.controls.findIndex((control) => control.value.category.id === transactionCategory.category.id)
      if (index !== -1) {
        categoriesArray.removeAt(index)
      }
      this.updateCategoriesAmountDiff()
    }
  }

  getCategoriesAmount(): number {
    const transactionType = this.formGroup.get('type')?.value
    const transactionCategories = this.formGroup.get('categories')?.value as Array<TransactionCategory> || []
    const amount = transactionCategories.map((c: TransactionCategory) => {
      if (transactionType) {
        return transactionType === c.category.type ? c.amount : c.amount * -1
      }
      return c.category.type === ClassificationType.INCOME ? c.amount : c.amount * -1
    }).reduce((a: number, b: number) => (a * 1) + (b * 1), 0.0)
    return transactionType ? amount : Math.abs(amount)
  }

  async addCategory(formCategories: FormGroup) {
    if (!formCategories.get('type')?.value) {
      const transactionType = this.formGroup.get('type')?.value
      if (!transactionType) {
        const messageKey = this.getTranslateKey('transactionTypeError')
        const message = await this._languageService.getTranslate(messageKey).then()
        this._notification.error(message)
        return
      }
      formCategories.get('type')?.setValue(transactionType)
    }
    if (!formCategories.valid) {
      return
    }
    const formArray = this.formGroup.get('categories') as FormArray
    const transactionCategory: TransactionCategory = formCategories.value

    const existingIndex = formArray.controls.findIndex((control) => {
      const category = control.value as TransactionCategory
      return category.category.id === transactionCategory.category.id
    })

    if (existingIndex >= 0) {
      const titleKey = this.getTranslateKey('mergeCategoryTitle')
      const messageKey = this.getTranslateKey('mergeCategoryMessage')
      const translated = await this._languageService.getTranslate([titleKey, messageKey], { categoryName: transactionCategory.category.name }).then()
      const sumDuplicateCategories = await this._dialogService.openConfirmation({ title: translated[titleKey], message: translated[messageKey] }).then()
      if (!sumDuplicateCategories) {
        return
      }
      const existingAmount = new Decimal((formArray.controls[existingIndex].value as TransactionCategory).amount)
      const newAmount = new Decimal(transactionCategory.amount);
      (formArray.controls[existingIndex].value as TransactionCategory).amount = existingAmount.add(newAmount).toNumber()
    } else {
      formArray.push(this._formBuilder.control(transactionCategory))
    }
    formCategories.reset()
    this.updateCategoriesAmountDiff();
  }

  getCategoriesDiff(): number {
    const transactionAmount = new Decimal(this.formGroup.get('amount')?.value || 0)
    const categoriesAmount = new Decimal(this.getCategoriesAmount())
    const diff = transactionAmount.minus(categoriesAmount).toNumber()
    return diff
  }

  updateCategoriesAmountDiff() {
    this.categoriesAmount = this.getCategoriesAmount()
    const diff = new Decimal(this.getCategoriesDiff())
    const transactionType = this.formGroup.get('type')?.value
    if (transactionType) {
      if (diff.toNumber() < 0) {
        this.formCategories.get('type')?.setValue(transactionType === ClassificationType.INCOME ? ClassificationType.EXPENSE : ClassificationType.INCOME)
      } else {
        this.formCategories.get('type')?.setValue(transactionType === ClassificationType.INCOME ? ClassificationType.INCOME : ClassificationType.EXPENSE)
      }
    }
    this.formCategories.get('amount')?.setValue((diff && !diff.equals(0)) ? Math.abs(diff.toNumber()) : null);
    this.formGroup.markAsDirty();
  }

  changeTransactionType(transactionType: string) {
    this.categoriesOptions = this.categories.filter(c => c.type === transactionType)
  }

}
