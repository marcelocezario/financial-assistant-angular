import { Component, Input } from '@angular/core';
import { Transaction } from '../../../../core/models';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { AppCurrencyPipe } from '../../../../shared/pipes/app-currency.pipe';

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatChipsModule, MatIconModule, AppCurrencyPipe],
  templateUrl: './transaction-card.component.html',
  styleUrl: './transaction-card.component.scss'
})
export class TransactionCardComponent {

  @Input({required: true}) transaction!: Transaction

}
