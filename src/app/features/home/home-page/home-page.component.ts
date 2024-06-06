import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    TranslateModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  backlog: string[] = [
    'loader',
    'inputColorIOS',
    'showUserRegisterPassword',
    'userRegisterPasswordConfirm',
    'transactionTypeNames',
    'inputDateTimeMobile',
    'enableSendEmail',
  ]

  getTranslateKey(key: string): string {
    return `web.components.${this.constructor.name}.${key}`
  }
}
