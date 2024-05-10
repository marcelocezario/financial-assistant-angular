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
    'theme-default-user',
    'theme-deeppurple-amber',
    'theme-indigo-pink',
    'theme-pink-bluegrey',
    'theme-purple-green'
  ]

  constructor(@Inject(DOCUMENT) private document: Document, private _storageService: StorageService) {
    this._currentTheme$ = new BehaviorSubject<ThemeOptions>('theme-personal-light');
    const userPreferences = this._storageService.getUserPreferences();
    if (userPreferences?.theme) {
      this.switchTheme(userPreferences.theme);
    }
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
