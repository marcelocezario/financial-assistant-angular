import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-data-not-found',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './data-not-found.component.html',
  styleUrl: './data-not-found.component.scss'
})
export class DataNotFoundComponent {

  @Input() data: string = '';

}
