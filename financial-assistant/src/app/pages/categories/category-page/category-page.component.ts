import { ROUTES_KEYS } from './../../../config/routes-keys.config';
import { CategoryService } from '../../../services/controllers/category/category.service';
import { Category } from '../../../models/category.model';
import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private router: Router) {
  }

  public categories: Category[] = [];
  private newCategoryLink = "/" + ROUTES_KEYS.newCategory;
  public totalBudget: number = 0;

  sortedData: Category[] = [];

  panelOpenState = false;

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe(response => {
      this.categories = response;
      this.sortedData = this.categories.slice();

      this.totalBudget = response.map(c => c.budget).reduce((total, budget) => {
        if (!isNaN(budget)){
          total += budget
        }
        return total;
      });
    })

  }

  sortData(sort: Sort) {
    const data = this.categories.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'budget':
          return compare(a.budget, b.budget, isAsc);
        case 'icon':
          return compare(a.icon, b.icon, isAsc);
        default:
          return 0;
      }
    });
  }

  editCategory(category: Category) {
    this.router.navigate([ROUTES_KEYS.categories, category.id]);
  }

  deleteCategory(category: Category) {
    if (category.id != undefined) {
      this.categoryService.deleteCategory(category.id).subscribe(response => {
        location.reload();
      });
    }
  }

  addCategory() {
    this.router.navigate([this.newCategoryLink]);
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
