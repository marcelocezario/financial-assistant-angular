import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryIcon } from './../../../models/category-icon.model';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryIconService {

  constructor(private http: HttpClient) { }

  private path: string = "assets/icons.json";

  getCategoryIcons() : Observable<CategoryIcon[]> {
    return this.http.get<CategoryIcon[]>(`${this.path}`).pipe(take(1));
  }

}
