import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LanguageSelectorComponent, ThemeSelectorComponent } from '../../../shared';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    LanguageSelectorComponent,
    MatToolbarModule,
    ThemeSelectorComponent,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  date = new Date();
  systemVersion = `0.0.0`

}
