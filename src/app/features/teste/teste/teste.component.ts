import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent, NotificationService } from '../../../shared';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-teste',
  standalone: true,
  imports: [TranslateModule, LanguageSelectorComponent, MatButtonModule],
  templateUrl: './teste.component.html',
  styleUrl: './teste.component.scss'
})
export class TesteComponent {

  constructor(public notificationService: NotificationService) { }

  showNotification() {
    this.notificationService.success('Testando')
  }

}
