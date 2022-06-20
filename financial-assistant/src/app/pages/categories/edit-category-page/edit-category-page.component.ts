import { CategoryIconService } from './../../../services/controllers/category-icon/category-icon.service';
import { CategoryIcon } from './../../../models/category-icon.model';
import { ROUTES_KEYS } from './../../../config/routes-keys.config';
import { CategoryService } from './../../../services/controllers/category/category.service';
import { Category } from './../../../models/category.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-category-page',
  templateUrl: './edit-category-page.component.html',
  styleUrls: ['./edit-category-page.component.css']
})
export class EditCategoryPageComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private categoryIconService: CategoryIconService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public category: Category = new Category();
  public editCategory: boolean = false;
  public categoryIcons: CategoryIcon[] = [];
  public moreUsedCategoryIcons: CategoryIcon[] = [];
  public filteredCategoryIcons: CategoryIcon[] = [];

  public findIcon: string = "";

  private categoriesPageLink = "/" + ROUTES_KEYS.categories

  ngOnInit(): void {
    let routePath = this.route.snapshot.paramMap.get(ROUTES_KEYS.categoryId);
    let categoryId: number;
    if (routePath != null) {
      categoryId = parseInt(routePath);
      if(!isNaN(categoryId)) {
        this.categoryService.getCategoryById(categoryId).subscribe(response => {
          this.category = response;
          this.editCategory = true;
        })
      }
    }

    this.categoryIconService.getCategoryIcons().subscribe(response => {
      this.categoryIcons = response;
      this.moreUsedCategoryIcons = response.filter(icon => icon.moreUsed);
    })
  }

  selectIcon(iconName: string) {
    this.category.icon = iconName;
  }

  filterIcons() {
    if (this.findIcon == "") {
      this.filteredCategoryIcons = [];
    } else if (this.findIcon.toLowerCase() == "todos") {
      this.filteredCategoryIcons = this.categoryIcons;
    } else {
      this.filteredCategoryIcons = this.categoryIcons.filter(icon => {
        let name = this.removeAccents(icon.name).indexOf(this.removeAccents(this.findIcon)) != -1;
        let tags = this.removeAccents(icon.tags).indexOf(this.removeAccents(this.findIcon)) != -1;
        return name || tags;
      })
    }
  }

  removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }

  save() {
    if(this.category.id == undefined) {
      this.categoryService.createCategory(this.category).subscribe(response => {
        this.saveSuccess();
      })
    } else {
      this.categoryService.updateCategory(this.category, this.category.id).subscribe(response => {
        this.saveSuccess();
      })
    }
  }

  saveSuccess() {
    this.router.navigate([this.categoriesPageLink]);
  }

}
