import { Observable } from 'rxjs';
import { ApiService } from './../../api/api.service';
import { Injectable } from '@angular/core';
import { Entry } from 'src/app/models/entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private apiService: ApiService) { }

  private path: string = "/entries"

  getEntries() : Observable<Entry[]> {
    return this.apiService.httpGet(`${this.path}`);
  }
}
