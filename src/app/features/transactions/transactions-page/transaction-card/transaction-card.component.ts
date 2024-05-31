import { ROUTES_KEYS } from './../../../../core/config/routes-keys.config';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../../../../core/models';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { AppCurrencyPipe } from '../../../../shared';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatChipsModule, MatIconModule, AppCurrencyPipe, TranslateModule, RouterModule],
  templateUrl: './transaction-card.component.html',
  styleUrl: './transaction-card.component.scss'
})
export class TransactionCardComponent {

  @Input({required: true}) transaction!: Transaction
  @Output() deleteTransaction = new EventEmitter<Transaction>;

  transactionLink = `/${ROUTES_KEYS.transactions}`

  delete(transaction: Transaction) {
    this.deleteTransaction.emit(transaction);
  }

}
