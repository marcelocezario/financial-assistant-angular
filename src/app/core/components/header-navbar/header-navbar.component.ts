import { AuthService, LoginButtonComponent } from '../../../features/auth';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ROUTES_KEYS } from '../../config/routes-keys.config';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header-navbar',
  standalone: true,
  imports: [
    CommonModule,
    LoginButtonComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './header-navbar.component.html',
  styleUrl: './header-navbar.component.scss'
})
export class HeaderNavbarComponent {

  categoriesLink = `/${ROUTES_KEYS.categories}`;
  currenciesLink = `/${ROUTES_KEYS.currencies}`;
  transactionsLink = `/${ROUTES_KEYS.transactions}`;
  usersLink = `/${ROUTES_KEYS.users}`;
  walletsLink = `/${ROUTES_KEYS.wallets}`;

  isAuthenticated$: Observable<boolean>;
  isAdmin$: Observable<boolean>;

  constructor(
    _authService: AuthService
  ) {
    this.isAuthenticated$ = _authService.isAuthenticated();
    this.isAdmin$ = _authService.isAdmin();
   }

  getTranslateKey(key: string): string {
    return `web.core.components.${this.constructor.name}.${key}`
  }

}
