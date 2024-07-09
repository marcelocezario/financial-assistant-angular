import { AppRelativeTimePipe } from '../../../shared/pipes/app-relative-time.pipe';
import { Component, OnInit } from '@angular/core';
import { DialogService, LanguageService, NotificationService, Page, Pageable, TimelineDividerComponent, TimelineItemComponent } from '../../../shared';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ROUTES_KEYS } from './../../../core/config/routes-keys.config';
import { TimelineComponent } from '../../../shared/components/timeline/timeline.component';
import { ClassificationType, Transaction } from '../../../core/models';
import { TransactionCardComponent } from './transaction-card/transaction-card.component';
import { TransactionService } from '../transaction.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  imports: [
    AppRelativeTimePipe,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    RouterModule,
    TimelineComponent,
    TimelineDividerComponent,
    TimelineItemComponent,
    TransactionCardComponent,
    TranslateModule,
  ],
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
    sort: [['paymentMoment', 'desc'], ['amount', 'desc'], ['id', 'desc']]
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
      const icon = {icon: c.icon, color: c.color, borderColor: c.type === ClassificationType.INCOME ? 'green' : undefined };
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

  isSameDate(transaction1: Transaction, transaction2: Transaction): boolean {
    if (!transaction1?.paymentMoment || !transaction2?.paymentMoment) {
      return false;
    }

    const date1: Date | undefined = new Date(transaction1?.paymentMoment);
    const date2: Date | undefined = new Date(transaction2?.paymentMoment);

    if (!date1 || !date2) {
      return false;
    }

    const isSameYear = date1.getFullYear() === date2.getFullYear();
    const isSameMonth = date1.getMonth() === date2.getMonth();
    const isSameDate = date1.getDate() === date2.getDate();

    return isSameYear && isSameMonth && isSameDate;
  }

}
