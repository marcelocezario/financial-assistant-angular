import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter, map } from 'rxjs';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [TranslateModule, MatDividerModule],
  templateUrl: './section-title.component.html',
  styleUrl: './section-title.component.scss'
})
export class SectionTitleComponent {

  @Input() sectionTitle: string | undefined;

  constructor(private router: Router) {

    router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.router.routerState.root;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary')
      ).subscribe(route => {
        let title = route.snapshot.routeConfig?.title;
        if (title == undefined) {
          this.sectionTitle = '';
        } else {
          this.sectionTitle = title.toString();
        }
      })
  }

}
