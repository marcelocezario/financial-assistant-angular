import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { FeatureRequestService } from '../feature-request.service';
import { FeatureRequest } from '../../../core/models/feature-request.model';
import { LanguageService } from '../../../shared';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-backlog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    TranslateModule,
  ],
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.scss'
})
export class BacklogComponent implements OnInit, OnDestroy {

  // backlog: string[] = [
  //   'loader',
  //   'inputColorIOS',
  //   'showUserRegisterPassword',
  //   'userRegisterPasswordConfirm',
  //   'transactionTypeNames',
  //   'inputDateTimeMobile',
  //   'enableSendEmail',
  //   'relativeTime'
  // ]

  backlog: FeatureRequest[] = []
  language: string = 'pt-br'
  subscriptions: Subscription[] = []

  constructor(
    private _featureRequestService: FeatureRequestService,
    private _languageService: LanguageService
  ) {
    const languageSubscription = this._languageService.observeCurrentLanguage().subscribe({
      next: language => {
        if (language) {
          this.language = language.toLowerCase()
        }
      },
      error: error => console.error(error)
    })
    this.subscriptions.push(languageSubscription);
  }

  async ngOnInit(): Promise<void> {
    this.backlog = await this._featureRequestService.getBacklog().then();
  }

  ngOnDestroy(): void {
  }

  getTranslateKey(key: string): string {
    return `web.components.${this.constructor.name}.${key}`
  }

  async rateFeatureRequest(id: number, positive: boolean) {
    await this._featureRequestService.rate(id, positive).then()
    const index = this.backlog.findIndex(b => b.id === id);
    const rate = positive ? 1 : -1;
    this.backlog[index].rating = this.backlog[index].rating + rate
  }

}
