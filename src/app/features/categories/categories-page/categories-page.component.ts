import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Category } from '../../../core/models';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { StorageService } from '../../../shared';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatIconModule, TranslateModule],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.scss'
})
export class CategoriesPageComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<Category> = new MatTableDataSource();
  displayedColumns = ['id', 'name', 'icon', 'color', 'active', 'createdAt', 'updatedAt'];

  constructor(private _categoryService: CategoriesService, private _storageService: StorageService, private _liveAnnouncer: LiveAnnouncer) { }

  async ngOnInit(): Promise<void> {
    await this._categoryService.getByUser(this._storageService.getUserId()!).then(categories => this.dataSource = new MatTableDataSource(categories));
    this.dataSource.sort = this.sort!;
  }

  getTranslateKey(key: string): string {
    return `web.components.${this.constructor.name}.${key}`
  }

}
