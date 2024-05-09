import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TesteComponent } from './features/teste/teste/teste.component';
import { LanguageService } from './shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TesteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'financial-assistant';

  constructor(languageService: LanguageService) {
    languageService.determineBestLanguageForUser();
  }
}
