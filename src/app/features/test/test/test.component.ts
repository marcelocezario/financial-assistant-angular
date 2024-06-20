import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { InputDatetimeComponent, InputIconComponent, LanguageSelectorComponent, LoaderComponent, NotificationService, TimelineComponent } from '../../../shared';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IconCardComponent } from '../../../shared/forms/components/input-icon/icon-card/icon-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FormsModule,
    IconCardComponent,
    InputDatetimeComponent,
    InputIconComponent,
    LanguageSelectorComponent,
    LoaderComponent,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    TimelineComponent,
    TranslateModule,
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  isTest: boolean = true;

  icons = [{ name: 'home' }, { name: 'favorite' }];
  useCustomColor: boolean = false;
  selectedIcon = 'favorite'
  currentIcon = 'home';
  iconColor = '#00695c';

  formGroup: FormGroup<any> = this._formBuilder.group({
    datetime: [null]
  });

  constructor(
    public notificationService: NotificationService,
    private _formBuilder: FormBuilder
  ) { }

  showNotification() {
    this.notificationService.success('Testando')
  }

  getTranslateKey(key: string): string {
    return `test.${key}`
  }

  selectIcon(icon: string) {
    console.log(`selected icon: ${icon}`)
  }

}
