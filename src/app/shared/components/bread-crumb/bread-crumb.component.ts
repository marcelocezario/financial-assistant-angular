import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatChipsModule } from '@angular/material/chips';
import { LanguageService } from '../../language';
import { ROUTES_KEYS } from '../../../core/config/routes-keys.config';

export interface BreadCrumbItem {
  name: string;
  translated: string;
  route: string;
}

@Component({
  selector: 'app-bread-crumb',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, MatChipsModule],
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.scss'
})
export class BreadCrumbComponent {

  breadCrumb: BreadCrumbItem[] = [];
  homeLink = `/${ROUTES_KEYS.home}`

  constructor(private _router: Router, private _languageService: LanguageService) {
  }

  ngOnInit() {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.breadCrumb = [];
        let paths: string[] = event.url.split("/");

        let url: string = "";
        paths.forEach(path => {
          if (path != '' && path != 'home') {
            url = url.concat(`/${path}`);
            this._addItem(path, url);
          }
        })
      }
    });
  }

  private _addItem(name: string, route: string) {
    const translateKey = `web.pageTitle.${name}`;
    let translated = this._languageService.getTranslateInstant(translateKey);
    if (translateKey === translated) {
      translated = name;
    }
    this.breadCrumb.push({ name: name, translated: translated, route: route });
  }

}
