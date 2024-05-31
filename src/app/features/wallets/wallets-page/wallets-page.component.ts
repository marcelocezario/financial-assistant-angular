import { ROUTES_KEYS } from './../../../core/config/routes-keys.config';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Currency, Wallet } from '../../../core/models';
import { DataNotFoundComponent, DialogService, LanguageService, NotificationService, AppCurrencyPipe } from '../../../shared';
import { WalletService } from '../wallet.service';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wallets-page',
  standalone: true,
  imports: [AppCurrencyPipe, CommonModule, TranslateModule, RouterModule, MatFormFieldModule, MatTableModule, MatSortModule, MatButtonModule, MatInputModule, MatIconModule, MatMenuModule, DataNotFoundComponent],
  templateUrl: './wallets-page.component.html',
  styleUrl: './wallets-page.component.scss'
})
export class WalletsPageComponent implements OnInit {

  addWalletLink = `/${ROUTES_KEYS.wallets_add}`
  walletLink = `/${ROUTES_KEYS.wallets}`
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<Wallet> = new MatTableDataSource();
  displayedColumns = ['actions', 'name', 'currency', 'balance', 'type', 'active', 'updatedAt'];

  constructor(
    private _languageService: LanguageService,
    private _dialogService: DialogService,
    private _notification: NotificationService,
    private _walletService: WalletService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this._walletService.getByUser().then(wallets => this.dataSource = new MatTableDataSource(wallets));
    this.dataSource.sort = this.sort!;
  }

  getTranslateKey(key: string): string {
    return `web.components.${this.constructor.name}.${key}`
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  async deleteWallet(wallet: Wallet) {
    const titleKey = this.getTranslateKey('walletDeleteConfirmTitle');
    const messageKey = this.getTranslateKey('walletDeleteConfirmMessage');
    const translated = await this._languageService.getTranslate([titleKey, messageKey], { walletName: wallet.name });
    const userConfirm = await this._dialogService.openConfirmation({ title: translated[titleKey], message: translated[messageKey] }).then() || false;
    if (userConfirm) {
      await this._walletService.delete(wallet.id!).then();
      const messageKey = this.getTranslateKey('walletDeletedSuccessfully');
      const message = await this._languageService.getTranslate(messageKey, { walletName: wallet.name }).then();
      this._walletService.getByUser().then(wallets => this.dataSource.data = wallets);
      this._notification.warning(message)
    }
  }

  getBalanceTotalWallets(): number {
    return this.dataSource.data
      .map(w => w.balance * w.currency.brlRate)
      .reduce((x, y) => x + y, 0.0)
  }

}
