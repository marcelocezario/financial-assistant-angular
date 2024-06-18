import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-backlog',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatListModule,
    TranslateModule,
  ],
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.scss'
})
export class BacklogComponent {

  backlog: string[] = [
    'loader',
    'inputColorIOS',
    'showUserRegisterPassword',
    'userRegisterPasswordConfirm',
    'transactionTypeNames',
    'inputDateTimeMobile',
    'enableSendEmail',
    'relativeTime'
  ]

  getTranslateKey(key: string): string {
    return `web.components.${this.constructor.name}.${key}`
  }

}
