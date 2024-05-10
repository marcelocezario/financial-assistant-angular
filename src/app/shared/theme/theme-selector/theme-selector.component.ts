import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ThemeOptions } from '../theme-options.type';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule],
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.scss'
})
export class ThemeSelectorComponent {

  current = this.themeService.observeCurrentTheme();

  options: { theme: ThemeOptions, icon: string }[] = [
    { theme: 'theme-personal-light', icon: 'light_mode' },
    { theme: 'theme-default-user', icon: 'brightness_auto' },
    { theme: 'theme-personal-dark', icon: 'dark_mode' }
  ]

  constructor(private themeService: ThemeService) { }

  changeTheme(theme: ThemeOptions) {
    this.themeService.switchTheme(theme);
  }

}
