import { Injectable } from '@angular/core';
import { ApiService } from '../../shared';
import { Category } from '../../core/models';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private _path = `/users/#{userId}/categories`

  constructor(private _apiService: ApiService) { }

  async getByUser(userId: string): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      this._apiService.httpGet(this._path.replace('#{userId}', userId)).subscribe({
        next: categories => resolve(categories),
        error: error => reject(error)
      })
    });
  }
}
