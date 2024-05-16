import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent, NotificationService } from '../../../shared';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [TranslateModule, LanguageSelectorComponent, MatButtonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  constructor(public notificationService: NotificationService) { }

  showNotification() {
    this.notificationService.success('Testando')
  }

}
