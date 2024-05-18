import { Injectable } from '@angular/core';
import { ApiService } from '../../shared';
import { Currency } from '../../core/models';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private _path = `/currencies`

  constructor(private _apiService: ApiService) { }

  async create(currency: Currency): Promise<Currency> {
    return new Promise((resolve, reject) => {
      this._apiService.httpPost(this._path, currency).subscribe({
        next: response => resolve(response),
        error: error => reject(error)
      })
    })
  }

  async update(currency: Currency): Promise<Currency> {
    return new Promise((resolve, reject) => {
      this._apiService.httpPut(`${this._path}/${currency.id}`, currency).subscribe({
        next: response => resolve(response),
        error: error => reject(error)
      })
    })
  }

  async delete(currencyId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._apiService.httpDelete(`${this._path}/${currencyId}`).subscribe({
        next: response => resolve(response),
        error:error => reject(error)
      })
    })
  }

  async getAll(onlyActive: boolean = false): Promise<Currency[]>{
    return new Promise((resolve, reject) => {
      const params = new Map;
      if (!onlyActive) {
        params.set('onlyActive', onlyActive);
      }
      this._apiService.httpGet(this._path, params).subscribe({
        next: response => resolve(response),
        error: error => reject(error)
      })
    })
  }

  async getById(id: string): Promise<Currency> {
    return new Promise((resolve, reject) => {
      this._apiService.httpGet(`${this._path}/${id}`).subscribe({
        next: response => resolve(response),
        error: error => reject(error)
      })
    })
  }

}
