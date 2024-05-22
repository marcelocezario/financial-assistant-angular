import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { NotificationService, Page, Pageable } from '../../../shared';
import { Transaction } from '../../../core/models';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TransactionCardComponent } from './transaction-card/transaction-card.component';
import { TimelineItemComponent } from './timeline-item/timeline-item.component';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  imports: [MatDividerModule, MatButtonModule, MatIconModule, TransactionCardComponent, TimelineItemComponent],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.scss'
})
export class TransactionsPageComponent implements OnInit {

  transactions: Transaction[] = []
  page!: Page<Transaction>;
  pageable: Pageable<Transaction> = {
    page: 0,
    size: 2,
    sortField: 'moment',
    sortDirection: 'desc'
  }

  constructor(
    private _transactionService: TransactionService,
    private _notification: NotificationService
  ) { }

  async ngOnInit(): Promise<void> {
    this._transactionService.getByUser(this.pageable).then(response => {
      this.page = response
      this.transactions = [...this.transactions, ...response.content]
    })
  }

  async findNextPage() {
    if (this.page.last) {
      // TODO
      this._notification.info('Não há mais dados')
      return
    }
    this.pageable.page!++
    this._transactionService.getByUser(this.pageable).then(response => {
      this.page = response
      this.transactions = [...this.transactions, ...response.content]
    })
  }

}
