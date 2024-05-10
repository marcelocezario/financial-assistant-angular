import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, filter, map, mergeMap } from 'rxjs';
import { LanguageService } from './language.service';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TranslatePageTitleService {

  private _isTranslationSubscribed = false;
  private _originalTitle: any = undefined;
  private _language$: Observable<string>;

  constructor(
    private _titleService: Title,
    private _languageService: LanguageService,
    private _router: Router
  ) {
    this._language$ = _languageService.observeCurrentLanguage();
  }

  public translateTitle(): void {
    if (this._isTranslationSubscribed) {
      return;
    }
    this._isTranslationSubscribed = true;
    this._observeChangeLanguage();

    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this._router.routerState.root),
      map(root => {
        while (root.firstChild) {
          root = root.firstChild;
        }
        return root;
      }),
      mergeMap(route => {
        if (route.snapshot.routeConfig) {
          this._originalTitle = route.snapshot.routeConfig?.title;
          return this._languageService.getTranslate(this._buildPageTitleTranslateKey(this._originalTitle));
        }
        return [];
      })
    ).subscribe((translatedTitle: string) => {
      this._titleService.setTitle(translatedTitle);
    });
  }

  private _buildPageTitleTranslateKey(pageTitle: any) {
    return `web.pageTitle.${pageTitle}`;
  }

  private _observeChangeLanguage() {
    this._language$.subscribe(() => {
      this._languageService.getTranslate(this._buildPageTitleTranslateKey(this._originalTitle))
        .then(translated => {
          this._titleService.setTitle(translated);
        });
    })
  }
}
