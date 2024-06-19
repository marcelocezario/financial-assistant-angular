import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { BacklogComponent } from '../../feature-request';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    BacklogComponent,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  getTranslateKey(key: string): string {
    return `web.components.${this.constructor.name}.${key}`
  }

}
