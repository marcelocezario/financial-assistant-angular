import { Injectable } from '@angular/core';
import { ApiService, StorageService } from '../../shared';
import { Category } from '../../core/models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _path = `/users/#{userId}/categories`

  constructor(private _apiService: ApiService, private _storageService: StorageService) { }

  async create(category: Category): Promise<Category> {
    return new Promise((resolve, reject) => {
      this._apiService.httpPost(this._getPathWithUserId(), category).subscribe({
        next: response => resolve(response),
        error: error => reject(error)
      })
    })
  }

  async update(category: Category): Promise<Category> {
    return new Promise((resolve, reject) => {
      this._apiService.httpPut(`${this._getPathWithUserId()}/${category.id}`, category).subscribe({
        next: response => resolve(response),
        error: error => reject(error)
      })
    })
  }

  async delete(categoryId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._apiService.httpDelete(`${this._getPathWithUserId()}/${categoryId}`).subscribe({
        next: response => resolve(response),
        error:error => reject(error)
      })
    })
  }

  async getByUser(): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      this._apiService.httpGet(this._getPathWithUserId()).subscribe({
        next: categories => resolve(categories),
        error: error => reject(error)
      })
    });
  }

  async getByIdAndUser(id: string): Promise<Category> {
    return new Promise((resolve, reject) => {
      this._apiService.httpGet(`${this._getPathWithUserId()}/${id}`).subscribe({
        next: categories => resolve(categories),
        error: error => reject(error)
      })
    });
  }

  private _getPathWithUserId(): string {
    const userId = this._storageService.getUserId()
    return this._path.replace('#{userId}', userId!)
  }
}
