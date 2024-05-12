import { Component } from '@angular/core';
import { LanguageService } from './shared';
import { FooterComponent, HeaderNavbarComponent, MainContentComponent } from './core/components';
import { TranslatePageTitleService } from './shared/language/translate-page-title.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderNavbarComponent, MainContentComponent, FooterComponent],
  styleUrl: './app.component.scss',
  template: `
  <div class="mhc-main mat-app-background">
    <app-header-navbar />
    <app-main-content class="mhc-body" />
    <app-footer />
  </div>
  `
})
export class AppComponent {
  title = 'financial-assistant';

  constructor(languageService: LanguageService, translatePageTitle: TranslatePageTitleService) {
    languageService.determineBestLanguageForUser();
    translatePageTitle.translateTitle();
  }
}
