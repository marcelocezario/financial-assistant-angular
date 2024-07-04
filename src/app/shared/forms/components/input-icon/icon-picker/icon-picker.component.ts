import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IconCardComponent } from './icon-card/icon-card.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { take } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

interface MaterialIcons {
  categories: string[]
  codepoint: number
  name: string
  popularity: number
  tags: string[]
  unsupported_families: string[]
  version: number
}

@Component({
  selector: 'app-icon-picker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IconCardComponent,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatSlideToggleModule,
    TranslateModule,
  ],
  templateUrl: './icon-picker.component.html',
  styleUrl: './icon-picker.component.scss'
})
export class IconPickerComponent implements OnInit {

  icons: MaterialIcons[] = []
  filteredIcons: MaterialIcons[] = []
  iconColor: string | undefined
  currentIcon: string | undefined
  selectedIcon: string | undefined
  useCustomColor: boolean = false

  defaultIcons = [
    'home',
    'restaurant',
    'pets',
    'electric_bolt',
    'checkroom',
    'water_drop',
    'school',
    'directions_bike',
    'directions_bus',
    'directions_car',
    'flight',
    'clean_hands',
    'photo_camera',
    'headphones',
    'audiotrack',
    'power',
    'sports_esports',
    'health_and_safety',
    'volunteer_activism',
    'celebration',
    'sports_bar',
    'local_bar',
    'favorite',
    'shopping_cart',
    'menu_book',
    'redeem',
    'self_improvement',
    'stroller',
    'child_care',
    'savings',
    'account_balance',
    'credit_card',
    'money',
    'sports_motorsports',
    'grade',
    'key',
    'rocket_launch',
    'recycling',
    'interests',
    'cell_tower',
    'credit_card',
    'payments',
    'handyman',
    'factory',
    'fastfood',
    'construction',
    'sports_score',
    'smartphone',
    'computer',
    'balance',
    'apartment',
    'icecream',
    'family_restroom',
    'cast',
    'ondemand_video',
  ]

  constructor(
    private _httpClient: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data?.currentIcon) {
      this.currentIcon = data.currentIcon;
      if (this.defaultIcons.indexOf(data?.currentIcon) < 0) {
        this.defaultIcons.unshift(data?.currentIcon)
      }
    }
    if (data?.iconColor) {
      this.iconColor = data.iconColor;
    }
  }

  async ngOnInit(): Promise<void> {
    await setTimeout(() => { }, 0)
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

  findIcons() {
    this._httpClient.get('assets/icons.json').pipe(take(1)).subscribe((response: any) => {
      const icons: MaterialIcons[] = response.icons;
      this.icons = icons
        .filter(i => i.unsupported_families.indexOf('Material Icons') < 0)
        .filter(i => this.defaultIcons.indexOf(i.name) < 0)
        .sort((a, b) => b.version - a.version)
        .sort((a, b) => b.popularity - a.popularity)
      this.filteredIcons = this.icons;
    });
  }
}
