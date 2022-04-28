import { EditCategoryPageComponent } from './pages/categories/edit-category-page/edit-category-page.component';
import { CategoryPageComponent } from './pages/categories/category-page/category-page.component';
import { StatementPageComponent } from './pages/statement-page/statement-page.component';
import { ROUTES_KEYS } from './config/routes-keys.config';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: "",
  component: StatementPageComponent
}, {
  path: ROUTES_KEYS.categories,
  component: CategoryPageComponent
}, {
  path: ROUTES_KEYS.categories + "/:" + ROUTES_KEYS.categoryId,
  component: EditCategoryPageComponent
}, {
  path: ROUTES_KEYS.newCategory,
  component: EditCategoryPageComponent
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
