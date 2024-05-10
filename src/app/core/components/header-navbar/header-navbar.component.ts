import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { ROUTES_KEYS } from '../../config/routes-keys.config';

@Component({
  selector: 'app-header-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterModule],
  templateUrl: './header-navbar.component.html',
  styleUrl: './header-navbar.component.scss'
})
export class HeaderNavbarComponent {

  categoriesLink = `/${ROUTES_KEYS.categories}`;
  currenciesLink = `/${ROUTES_KEYS.currencies}`;
  transactionsLink = `/${ROUTES_KEYS.transactions}`;
  usersLink = `/${ROUTES_KEYS.users}`;
  walletsLink = `/${ROUTES_KEYS.wallets}`;



}
