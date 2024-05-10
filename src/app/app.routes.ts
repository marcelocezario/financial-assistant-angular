import { Routes } from '@angular/router';
import { ROUTES_KEYS } from './core/config/routes-keys.config';
import { CategoriesPageComponent, CurrenciesPageComponent, TransactionsPageComponent, UsersPageComponent, WalletsPageComponent } from './features';

export const routes: Routes = [

  { path: ROUTES_KEYS.categories, component: CategoriesPageComponent, title: ROUTES_KEYS.categories },
  { path: ROUTES_KEYS.currencies, component: CurrenciesPageComponent, title: ROUTES_KEYS.currencies },
  { path: ROUTES_KEYS.transactions, component: TransactionsPageComponent, title: ROUTES_KEYS.transactions },
  { path: ROUTES_KEYS.users, component: UsersPageComponent, title: ROUTES_KEYS.users },
  { path: ROUTES_KEYS.wallets, component: WalletsPageComponent, title: ROUTES_KEYS.wallets },

];
