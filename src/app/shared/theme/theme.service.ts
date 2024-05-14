import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from '../storage';
import { DOCUMENT } from '@angular/common';
import { ThemeOptions } from './theme-options.type';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _currentTheme$: BehaviorSubject<ThemeOptions>;

  private _themeOptions = [
    'theme-personal-light',
    'theme-personal-dark',
    'theme-default-user'
  ]

  constructor(@Inject(DOCUMENT) private document: Document, private _storageService: StorageService) {
    const defaultTheme = 'theme-default-user';
    this._currentTheme$ = new BehaviorSubject<ThemeOptions>(defaultTheme);
    const userTheme = this._storageService.getUserPreferences()?.theme || defaultTheme;
    this.switchTheme(userTheme);
  }

  switchTheme(theme: ThemeOptions): void {
    this.document.body.classList.remove(...this._themeOptions);
    this.document.body.classList.add(theme);
    this._currentTheme$.next(theme);
    this._storageService.setUserPreferenceAtribute('theme', theme);
  }

  observeCurrentTheme(): Observable<ThemeOptions> {
    return this._currentTheme$.asObservable();
  }}
