import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { DataNotFoundComponent, DialogService, LanguageService, NotificationService, AppCurrencyPipe } from '../../../shared';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ROUTES_KEYS } from '../../../core/config';
import { Currency } from '../../../core/models';
import { CurrencyService } from '../currency.service';
import { AuthService } from '../../auth';
import { first } from 'rxjs';

@Component({
  selector: 'app-currencies-page',
  standalone: true,
  imports: [AppCurrencyPipe, CommonModule, MatTableModule, MatSortModule, MatIconModule, TranslateModule, MatInputModule, MatFormFieldModule, MatButtonModule, DataNotFoundComponent, RouterModule, MatMenuModule],
  templateUrl: './currencies-page.component.html',
  styleUrl: './currencies-page.component.scss'
})
export class CurrenciesPageComponent implements OnInit {

  addCurrencyLink = `/${ROUTES_KEYS.currencies_add}`
  currencyLink = `/${ROUTES_KEYS.currencies}`
  isAdmin: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<Currency> = new MatTableDataSource();
  displayedColumns = ['currency', 'brlRate', 'active', 'updatedAt'];

  constructor(
    private _currencyService: CurrencyService,
    private _languageService: LanguageService,
    private _dialogService: DialogService,
    private _notification: NotificationService,
    private _authService: AuthService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.verifyIsAdminUser();
    const onlyActive = !this.isAdmin;
    await this._currencyService.getAll(onlyActive)
      .then(currencies => this.dataSource = new MatTableDataSource(currencies));
    this.dataSource.sort = this.sort!;
  }

  async verifyIsAdminUser() {
    await this._authService.isAdmin().pipe(first()).subscribe({
      next: isAdmin => {
        this.isAdmin = isAdmin;
        const columnAction = 'actions';
        if (isAdmin) {
          if (!this.displayedColumns.includes(columnAction)) {
            this.displayedColumns.unshift(columnAction)
          }
        } else {
          const index = this.displayedColumns.indexOf(columnAction);
          if (index !== -1) {
            this.displayedColumns.splice(index, 1);
          }
        }
      }
    })
  }

  getTranslateKey(key: string): string {
    return `web.components.${this.constructor.name}.${key}`
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async deleteCurrency(currency: Currency) {
    const titleKey = this.getTranslateKey('currencyDeleteConfirmTitle');
    const messageKey = this.getTranslateKey('currencyDeleteConfirmMessage');
    const translated = await this._languageService.getTranslate([titleKey, messageKey], { currencyCode: currency.code });
    const userConfirm = await this._dialogService.openConfirmation({ title: translated[titleKey], message: translated[messageKey] }).then() || false;
    if (userConfirm) {
      await this._currencyService.delete(currency.id!).then();
      const messageKey = this.getTranslateKey('currencyDeletedSuccessfully');
      const message = await this._languageService.getTranslate(messageKey, { currencyCode: currency.code }).then();
      this._currencyService.getAll().then(currencies => this.dataSource.data = currencies);
      this._notification.warning(message)
    }
  }

}
