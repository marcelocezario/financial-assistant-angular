import { BreadCrumbComponent, LoaderComponent, SectionTitleComponent } from '../../../shared';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    BreadCrumbComponent,
    LoaderComponent,
    RouterOutlet,
    SectionTitleComponent,
    TranslateModule,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
