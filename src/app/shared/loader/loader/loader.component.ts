import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

  public isLoading$: Observable<boolean> = this._loadingService.isLoading();

  constructor(private _loadingService: LoaderService) { }

}
