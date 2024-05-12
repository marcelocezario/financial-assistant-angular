import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { StorageService } from '../../../../shared';

@Component({
  selector: 'app-my-account-page',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './my-account-page.component.html',
  styleUrl: './my-account-page.component.scss'
})
export class MyAccountPageComponent {

  nickname: string;

  constructor(private _storageService: StorageService) {
    this.nickname = this._storageService.getUserNickname() ?? '';
  }

}
