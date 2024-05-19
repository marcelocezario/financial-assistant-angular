import { Injectable } from '@angular/core';
import { ApiService, StorageService } from '../../shared';
import { Wallet } from '../../core/models';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private _path = `/users/#{userId}/wallets`

  constructor(private _apiService: ApiService, private _storageService: StorageService) { }

  async create(wallet: Wallet): Promise<Wallet> {
    return new Promise((resolve, reject) => {
      this._apiService.httpPost(this._getPathWithUserId(), wallet).subscribe({
        next: response => resolve(response),
        error: error => reject(error)
      })
    })
  }

  async update(wallet: Wallet): Promise<Wallet> {
    return new Promise((resolve, reject) => {
      this._apiService.httpPut(`${this._getPathWithUserId()}/${wallet.id}`, wallet).subscribe({
        next: response => resolve(response),
        error: error => reject(error)
      })
    })
  }

  async delete(walletId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._apiService.httpDelete(`${this._getPathWithUserId()}/${walletId}`).subscribe({
        next: response => resolve(response),
        error:error => reject(error)
      })
    })
  }

  async getByUser(): Promise<Wallet[]> {
    return new Promise((resolve, reject) => {
      this._apiService.httpGet(this._getPathWithUserId()).subscribe({
        next: categories => resolve(categories),
        error: error => reject(error)
      })
    });
  }

  async getByIdAndUser(id: string): Promise<Wallet> {
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
