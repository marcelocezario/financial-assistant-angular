import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatChipsModule } from '@angular/material/chips';
import { LanguageService } from '../../language';
import { ROUTES_KEYS } from '../../../core/config';
import { AuthService } from '../../../features/auth';

export interface BreadCrumbItem {
  name: string;
  translateKey: string;
  route: string;
  authRequired: boolean;
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
  myAccountLink = `/${ROUTES_KEYS.myAccount}`
  isAuthenticated$ = this._authService.isAuthenticated()

  constructor(private _router: Router, private _languageService: LanguageService, private _authService: AuthService) {
  }

  ngOnInit() {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.breadCrumb = [];
        let paths: string[] = event.url.split("/");

        let url: string = "";

        this._addItem(ROUTES_KEYS.home, `/${ROUTES_KEYS.home}`);
        this._addItem(ROUTES_KEYS.myAccount, `/${ROUTES_KEYS.myAccount}`, true);
        paths.forEach(path => {
          if (path != '' && path != ROUTES_KEYS.home && path != ROUTES_KEYS.myAccount) {
            url = url.concat(`/${path}`);
            this._addItem(path, url);
          }
        })
      }
    });
  }

  private async _addItem(name: string, route: string, authRequired: boolean = false) {
    const item: BreadCrumbItem = {
      name: name,
      translateKey: `web.pageTitle.${name}`,
      route: route,
      authRequired: authRequired
    }
    this.breadCrumb.push(item);
  }

}
