import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LANGUAGES } from '../languages.config';
import { LanguageService } from '../language.service';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule, MatIconModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {

  current$: Observable<string> = this._languageService.observeCurrentLanguage();
  languageOptions: { locale: typeof LANGUAGES[number], flag: string }[];

  constructor(private _languageService: LanguageService) {
    this.languageOptions = LANGUAGES.map(language => {
      return { locale: language, flag: `assets/flags/${language}.svg` }
    })

  }

  setLanguage(language: typeof LANGUAGES[number]): void {
    this._languageService.setLanguage(language);
  }

}
