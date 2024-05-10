import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LanguageSelectorComponent, ThemeSelectorComponent } from '../../../shared';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule, CommonModule, LanguageSelectorComponent, ThemeSelectorComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  date = new Date();
  systemVersion = `0.0.0`

}
