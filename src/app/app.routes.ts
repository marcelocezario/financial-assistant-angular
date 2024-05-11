import { Routes } from '@angular/router';
import { ROUTES_KEYS } from './core/config/routes-keys.config';
import { CategoriesPageComponent, CurrenciesPageComponent, NotFoundPageComponent, TransactionsPageComponent, UsersPageComponent, WalletsPageComponent } from './features';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { TesteComponent } from './features/teste/teste/teste.component';

export const routes: Routes = [

  { path: '', component: TesteComponent },
  { path: ROUTES_KEYS.home, component: HomePageComponent, title: ROUTES_KEYS.home },
  { path: ROUTES_KEYS.categories, component: CategoriesPageComponent, title: ROUTES_KEYS.categories },
  { path: ROUTES_KEYS.currencies, component: CurrenciesPageComponent, title: ROUTES_KEYS.currencies },
  { path: ROUTES_KEYS.notFound, component: NotFoundPageComponent, title: ROUTES_KEYS.notFound },
  { path: ROUTES_KEYS.transactions, component: TransactionsPageComponent, title: ROUTES_KEYS.transactions },
  { path: ROUTES_KEYS.users, component: UsersPageComponent, title: ROUTES_KEYS.users },
  { path: ROUTES_KEYS.wallets, component: WalletsPageComponent, title: ROUTES_KEYS.wallets },


  { path: '**', redirectTo: ROUTES_KEYS.notFound, title: ROUTES_KEYS.notFound }

];
