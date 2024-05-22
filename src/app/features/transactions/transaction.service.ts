import { Injectable } from '@angular/core';
import { ApiService, Page, Pageable, StorageService } from '../../shared';
import { Transaction } from '../../core/models';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private _path = `/users/#{userId}/transactions`

  constructor(private _apiService: ApiService, private _storageService: StorageService) { }

  async create(transaction: Transaction): Promise<Transaction> {
    return new Promise((resolve, reject) => {
      this._apiService.httpPost(this._getPathWithUserId(), transaction).subscribe({
        next: response => resolve(response),
        error: error => reject(error)
      })
    })
  }

  async update(transaction: Transaction): Promise<Transaction> {
    return new Promise((resolve, reject) => {
      this._apiService.httpPut(`${this._getPathWithUserId()}/${transaction.id}`, transaction).subscribe({
        next: response => resolve(response),
        error: error => reject(error)
      })
    })
  }

  async delete(transactionId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._apiService.httpDelete(`${this._getPathWithUserId()}/${transactionId}`).subscribe({
        next: response => resolve(response),
        error: error => reject(error)
      })
    })
  }

  async getByUser(pageable: Pageable<Transaction>): Promise<Page<Transaction>> {
    return new Promise((resolve, reject) => {
      this._apiService.httpGet(this._getPathWithUserId(), { pageable: pageable }).subscribe({
        next: categories => resolve(categories),
        error: error => reject(error)
      })
    });
  }

  async getByIdAndUser(id: string): Promise<Transaction> {
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
