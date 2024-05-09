import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent } from '../../../shared';

@Component({
  selector: 'app-teste',
  standalone: true,
  imports: [TranslateModule, LanguageSelectorComponent],
  templateUrl: './teste.component.html',
  styleUrl: './teste.component.scss'
})
export class TesteComponent {

}
