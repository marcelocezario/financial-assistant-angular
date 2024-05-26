import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { CompareObjectIdDirective, FormBaseDirective } from '../../../shared';
import { CategoryService } from '../../categories';
import { WalletService } from '../../wallets';
import { Category, Wallet } from '../../../core/models';

@Component({
  selector: 'app-transactions-form-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, TranslateModule, MatCheckboxModule, MatSelectModule, CompareObjectIdDirective],
  templateUrl: './transactions-form-page.component.html',
  styleUrl: './transactions-form-page.component.scss'
})
export class TransactionsFormPageComponent extends FormBaseDirective implements OnInit {

  categories: Category[] = []
  wallets: Wallet[] = []

  override formGroup: FormGroup<any> = this._formBuilder.group({
    id: [null],
    amount: [null],
    moment: [null],
    notes: [null],
    type: [null],
    currentInstallment: [null],
    active: [null],
    createdAt: [null],
    updatedAt: [null],
    userId: [null],
    wallet: [null],
    categories: [null]
  })

  constructor(
    private _formBuilder: FormBuilder,
    private _categoryService: CategoryService,
    private _walletService: WalletService
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    const [categories, wallets] = await Promise.all([
      this._categoryService.getByUser(),
      this._walletService.getByUser()
    ]);
    this.categories = categories;
    this.wallets = wallets;
  }

  override async submit(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  override cancel(): void {
    throw new Error('Method not implemented.');
  }

}
