import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  private _currentLocale: string = 'pt-BR';

  constructor() { }

  getLocale(): string {
    return this._currentLocale;
  }

  setLocale(locale: 'pt-BR' | 'en-US') {
    this._currentLocale = locale;
  }
}
