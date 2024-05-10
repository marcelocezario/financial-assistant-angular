import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BreadCrumbComponent, SectionTitleComponent } from '../../../shared';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, BreadCrumbComponent, SectionTitleComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
