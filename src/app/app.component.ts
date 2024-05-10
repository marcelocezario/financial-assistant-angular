import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TesteComponent } from './features/teste/teste/teste.component';
import { LanguageService } from './shared';
import { HeaderNavbarComponent } from './core/components/header-navbar/header-navbar.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { MainContentComponent } from './core/components/main-content/main-content.component';
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
