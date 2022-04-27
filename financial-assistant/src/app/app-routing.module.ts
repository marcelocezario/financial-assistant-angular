import { StatementPageComponent } from './pages/statement-page/statement-page.component';
import { ROUTES_KEYS } from './config/routes-keys.config';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: "",
  component: StatementPageComponent
}, {
  path: ROUTES_KEYS.home,
  component: HomePageComponent
}, {
  path: ROUTES_KEYS.statement,
  component: StatementPageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
