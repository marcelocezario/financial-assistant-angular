import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icon-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './icon-card.component.html',
  styleUrl: './icon-card.component.scss'
})
export class IconCardComponent {

  @Input() icon: string | undefined;
  @Input() customColor: string | undefined;

}
