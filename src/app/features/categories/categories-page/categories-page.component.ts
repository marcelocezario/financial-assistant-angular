import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Category } from '../../../core/models';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { DataNotFoundComponent, StorageService } from '../../../shared';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatIconModule, TranslateModule, MatInputModule, MatFormFieldModule, MatButtonModule, DataNotFoundComponent],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.scss'
})
export class CategoriesPageComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<Category> = new MatTableDataSource();
  // displayedColumns = ['id', 'name', 'icon', 'color', 'active', 'createdAt', 'updatedAt'];
  displayedColumns = ['name', 'color', 'updatedAt'];

  constructor(private _categoryService: CategoriesService, private _storageService: StorageService, private _liveAnnouncer: LiveAnnouncer) { }

  async ngOnInit(): Promise<void> {
    await this._categoryService.getByUser(this._storageService.getUserId()!).then(categories => this.dataSource = new MatTableDataSource(categories));
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
