import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { IconCardComponent } from '../icon-card/icon-card.component';

interface MaterialIcons {
  categories: string[];
  codepoint: number;
  name: string;
  popularity: number;
  tags: string[];
  unsupported_families: string[];
}

@Component({
  selector: 'app-icon-picker',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule, TranslateModule, MatSlideToggleModule, FormsModule, MatCardModule, IconCardComponent],
  templateUrl: './icon-picker.component.html',
  styleUrl: './icon-picker.component.scss'
})
export class IconPickerComponent implements OnInit {

  icons: MaterialIcons[] = [];
  filteredIcons: MaterialIcons[] = [];
  iconColor: string | undefined;
  currentIcon: string | undefined;
  selectedIcon: string | undefined;
  useCustomColor: boolean = false;

  constructor(
    private _httpClient: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data?.currentIcon) {
      this.currentIcon = data.currentIcon;
    }
    if (data?.iconColor) {
      this.iconColor = data.iconColor;
    }
  }

  ngOnInit(): void {
    this._httpClient.get('assets/icons.json').subscribe((response: any) => {
      const icons: MaterialIcons[] = response.icons;
      this.icons = icons
        .filter(i => i.unsupported_families.indexOf('Material Icons') < 0)
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 100);
      this.filteredIcons = this.icons;
    });
  }

  filterIcon(event: any): void {
    this.filteredIcons = this.icons.filter(i => {
      if (i.name.toLowerCase().indexOf(event.toLowerCase()) >= 0) {
        return true;
      }
      if (i.tags.some(tag => tag.toLowerCase().indexOf(event.toLowerCase()) >= 0)) {
        return true;
      }
      return false;
    })
  }

  selectIcon(icon: string): void {
    this.selectedIcon = icon;
  }

  getTranslateKey(key: string): string {
    return `web.shared.components.${this.constructor.name}.${key}`
  }
}
