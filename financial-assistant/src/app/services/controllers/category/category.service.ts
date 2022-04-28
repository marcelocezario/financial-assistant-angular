import { Observable } from 'rxjs';
import { Category } from './../../../models/category.model';
import { ApiService } from './../../api/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private apiService: ApiService) { }

  private path: string = "/categories"

  getCategories(): Observable<Category[]> {
    return this.apiService.httpGet(`${this.path}`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.apiService.httpGet(`${this.path}/${id}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.apiService.httpPost(`${this.path}`, category);
  }

  updateCategory(category: Category, id: number): Observable<Category> {
    return this.apiService.httpPut(`${this.path}/${id}`, category);
  }
}
