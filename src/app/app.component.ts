import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TesteComponent } from './features/teste/teste/teste.component';
import { LanguageService } from './shared';
import { HeaderNavbarComponent } from './core/components/header-navbar/header-navbar.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { MainContentComponent } from './core/components/main-content/main-content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderNavbarComponent, MainContentComponent, FooterComponent],
  template: `
    <app-header-navbar />
    <app-main-content />
    <app-footer />
  `
})
export class AppComponent {
  title = 'financial-assistant';

  constructor(languageService: LanguageService) {
    languageService.determineBestLanguageForUser();
  }
}
