import { Category } from '../../../core/models';
import { CategoryService } from '../category.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataNotFoundComponent } from '../../../shared';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ROUTES_KEYS } from '../../../core/config';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatIconModule, TranslateModule, MatInputModule, MatFormFieldModule, MatButtonModule, DataNotFoundComponent, RouterModule],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.scss'
})
export class CategoriesPageComponent implements OnInit {

  addCategoryLink = `/${ROUTES_KEYS.categories_add}`

  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<Category> = new MatTableDataSource();
  // displayedColumns = ['id', 'name', 'icon', 'color', 'active', 'createdAt', 'updatedAt'];
  displayedColumns = ['name', 'color', 'updatedAt'];

  constructor(private _categoryService: CategoryService, private _liveAnnouncer: LiveAnnouncer) { }

  async ngOnInit(): Promise<void> {
    await this._categoryService.getByUser().then(categories => this.dataSource = new MatTableDataSource(categories));
    this.dataSource.sort = this.sort!;
  }

  getTranslateKey(key: string): string {
    return `web.components.${this.constructor.name}.${key}`
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
