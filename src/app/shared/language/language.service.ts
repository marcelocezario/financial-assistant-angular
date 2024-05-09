import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { LANGUAGES } from './languages.config';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private _currentLanguage$: BehaviorSubject<string>;

  constructor(private _translateService: TranslateService, private _storageService: StorageService) {
    this._currentLanguage$ = new BehaviorSubject<string>(this._translateService.currentLang);
  }

  setDefault(language: typeof LANGUAGES[number]): void {
    this._translateService.setDefaultLang(language);
    this._currentLanguage$.next(language);
  }

  setLanguage(language: typeof LANGUAGES[number]): void {
    this._translateService.use(language).pipe(
      take(1),
      tap(() => this._currentLanguage$.next(language)),
      tap(() => this._storageService.setUserLanguage(language))
    ).subscribe();
  }

  observeCurrentLanguage(): Observable<string> {
    return this._currentLanguage$.asObservable();
  }

  getTranslateInstant(key: string | string[], interpolateParams: any = undefined): string {
    return this._translateService.instant(key, interpolateParams);
  }

  getTranslate(key: string | string[], interpolateParams: any = undefined): Promise<string|any> {
    return new Promise((resolve, reject) => {
      this._translateService.get(key, interpolateParams).pipe(take(1)).subscribe({
        next: translated => resolve(translated),
        error: () => reject(key)
      });
    })
  }

  determineBestLanguageForUser(): void {
    const lang = this._getBestLanguageForUser();
    this.setLanguage(lang);
  }

  private _getBestLanguageForUser(): typeof LANGUAGES[number] {
    let userLanguage: undefined | null | typeof LANGUAGES[number];
    const languageStorage = this._storageService.getUserLanguage();
    if (LANGUAGES.includes(languageStorage as typeof LANGUAGES[number])) {
      userLanguage = languageStorage;
    }
    if (!userLanguage) {
      const getBrowserCultureLang = this._translateService.getBrowserCultureLang();
      const browserCutureLangIndex = LANGUAGES.map(language => language.toString()).indexOf(getBrowserCultureLang ?? '');
      userLanguage = LANGUAGES[browserCutureLangIndex];
    }
    if (!userLanguage) {
      const getBrowserLang = this._translateService.getBrowserLang();
      const browserLangIndex = LANGUAGES.map(language => language.split('-')[0]).indexOf(getBrowserLang ?? '');
      userLanguage = LANGUAGES[browserLangIndex];
    }
    if (!userLanguage) {
      userLanguage = LANGUAGES[0];
    }
    return userLanguage;
  }

  getLanguages(): string[] {
    return LANGUAGES.map(language => language.toString());
  }

}
