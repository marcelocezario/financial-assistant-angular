import { ROUTES_KEYS } from './../../../core/config/routes-keys.config';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { DialogService, LanguageService, NotificationService, Page, Pageable, TimelineItemComponent } from '../../../shared';
import { Transaction } from '../../../core/models';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TransactionCardComponent } from './transaction-card/transaction-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  imports: [MatDividerModule, MatButtonModule, MatIconModule, TransactionCardComponent, TimelineItemComponent, MatFormFieldModule, MatInputModule, TranslateModule, RouterModule],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.scss'
})
export class TransactionsPageComponent implements OnInit {

  addTransactionLink = `/${ROUTES_KEYS.transactions_add}`
  transactions: Transaction[] = []
  page!: Page<Transaction>;
  pageable: Pageable<Transaction> = {
    page: 0,
    size: 24,
    sort: [['moment', 'desc'], ['amount', 'desc'], ['id', 'desc']]
  }

  constructor(
    private _transactionService: TransactionService,
    private _notification: NotificationService,
    private _languageService: LanguageService,
    private _dialogService: DialogService
  ) { }

  async ngOnInit(): Promise<void> {
    this._transactionService.getByUser(this.pageable).then(response => {
      this.page = response
      this.transactions = [...this.transactions, ...response.content]
    })
  }

  async findNextPage() {
    if (this.page.last) {
      const noMoreDataMessage = await this._languageService.getTranslate(this.getTranslateKey('noMoreData')).then()
      this._notification.info(noMoreDataMessage)
      return
    }
    this.pageable.page!++
    this._transactionService.getByUser(this.pageable).then(response => {
      this.page = response
      this.transactions = [...this.transactions, ...response.content]
    })
  }

  getIcons(transaction: Transaction) {
    const icons =  transaction.categories.sort((a, b) => b.amount - a.amount).map(c => c.category).map(c => {
      const icon = {icon: c.icon, color: c.color};
      return icon;
    })
    return icons;
  }

  getTranslateKey(key: string): string {
    return `web.components.${this.constructor.name}.${key}`
  }

  async delete(transaction: Transaction) {
    const titleKey = this.getTranslateKey('transactionDeleteConfirmTitle');
    const messageKey = this.getTranslateKey('transactionDeleteConfirmMessage');
    const translated = await this._languageService.getTranslate([titleKey, messageKey], { transactionId: transaction.id });
    const userConfirm = await this._dialogService.openConfirmation({ title: translated[titleKey], message: translated[messageKey] }).then() || false;
    if (userConfirm) {
      await this._transactionService.delete(transaction.id!).then();
      const index = this.transactions.findIndex(t => t.id === transaction.id)
      if (index >= 0) {
        this.transactions.splice(index, 1);
      }
      const messageKey = this.getTranslateKey('transactionDeletedSuccessfully');
      const message = await this._languageService.getTranslate(messageKey, { transactionId: transaction.id }).then();
      this._notification.warning(message)
    }
  }

}
