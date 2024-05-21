import { Injectable } from '@angular/core';
import { ApiService } from '../../shared';
import { User } from '../../core/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _path = `/users`

  constructor(private _apiService: ApiService) { }

  async create(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this._apiService.httpPost(this._path, user).subscribe({
        next: response => resolve(response),
        error: error => reject(error)
      })
    })
  }

  async update(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this._apiService.httpPut(`${this._path}/${user.id}`, user).subscribe({
        next: response => resolve(response),
        error: error => reject(error)
      })
    })
  }


  async delete(userId: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this._apiService.httpDelete(`${this._path}/${userId}`).subscribe({
        next: response => resolve(response),
        error: error => reject(error)
      })
    })
  }

  async getById(id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this._apiService.httpGet(`${this._path}/${id}`).subscribe({
        next: response => resolve(response),
        error: error => reject(error)
      })
    })
  }

}
