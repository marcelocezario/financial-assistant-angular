import { Routes } from '@angular/router';
import { ROUTES_KEYS } from './core/config';
import { TestComponent } from './features/test/test/test.component';
import { HomePageComponent } from './features/home';
import { CategoriesPageComponent } from './features/categories';
import { CurrenciesPageComponent } from './features/currencies';
import { ForgotPasswordPageComponent, LoginPageComponent, adminGuard, authGuard } from './features/auth';
import { MyAccountPageComponent, SignUpPageComponent, UsersPageComponent } from './features/users';
import { NotFoundPageComponent } from './features/not-found';
import { TransactionsPageComponent } from './features/transactions';
import { WalletsPageComponent } from './features/wallets';
import { CategoriesFormPageComponent } from './features/categories/categories-form-page/categories-form-page.component';
import { unsavedChangesGuard } from './shared';

export const routes: Routes = [

  { path: '', component: TestComponent },

  { path: ROUTES_KEYS.forgotPassword, component: ForgotPasswordPageComponent, title: ROUTES_KEYS.forgotPassword },
  { path: ROUTES_KEYS.home, component: HomePageComponent, title: ROUTES_KEYS.home },
  { path: ROUTES_KEYS.login, component: LoginPageComponent, title: ROUTES_KEYS.login },
  { path: ROUTES_KEYS.notFound, component: NotFoundPageComponent, title: ROUTES_KEYS.notFound },
  { path: ROUTES_KEYS.signUp, component: SignUpPageComponent, title: ROUTES_KEYS.signUp },
  {
    // AUTHENTICATED ROUTES
    path: '', canActivate: [authGuard], children: [
      { path: ROUTES_KEYS.categories, component: CategoriesPageComponent, title: ROUTES_KEYS.categories },
      { path: ROUTES_KEYS.categories_add, canDeactivate: [unsavedChangesGuard], component: CategoriesFormPageComponent, title: ROUTES_KEYS.categories_add },
      { path: `${ROUTES_KEYS.categories}/${ROUTES_KEYS.category_id}`, canDeactivate: [unsavedChangesGuard], component: CategoriesFormPageComponent, title: ROUTES_KEYS.category_id },
      { path: ROUTES_KEYS.currencies, component: CurrenciesPageComponent, title: ROUTES_KEYS.currencies },
      { path: ROUTES_KEYS.myAccount, component: MyAccountPageComponent, title: ROUTES_KEYS.myAccount },
      { path: ROUTES_KEYS.transactions, component: TransactionsPageComponent, title: ROUTES_KEYS.transactions },
      { path: ROUTES_KEYS.wallets, component: WalletsPageComponent, title: ROUTES_KEYS.wallets },
      {
        // AUTHENTICATED ADMIN ROUTES
        path: '', canActivate: [adminGuard], children: [
          { path: ROUTES_KEYS.users, component: UsersPageComponent, title: ROUTES_KEYS.users },
        ]
      }
    ]
  },

  { path: '**', redirectTo: ROUTES_KEYS.notFound, title: ROUTES_KEYS.notFound }

];
