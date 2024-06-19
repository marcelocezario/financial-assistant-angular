import { Injectable } from '@angular/core';
import { ApiService } from '../../shared';
import { FeatureRequest } from '../../core/models/feature-request.model';

@Injectable({
  providedIn: 'root'
})
export class FeatureRequestService {

  private _path = `/feature-requests`

  constructor(private _apiService: ApiService) { }

  async create(featureRequest: FeatureRequest): Promise<FeatureRequest> {
    return new Promise((resolve, reject) => {
      this._apiService.httpPost(this._path, featureRequest).subscribe({
        next: response => resolve(response),
        error: error => reject(error)
      })
    })
  }

  async update(featureRequest: FeatureRequest): Promise<FeatureRequest> {
    return new Promise((resolve, reject) => {
      if (!featureRequest.id) {
        reject('Feature request id cannot be null')
        return
      }
      this._apiService.httpPost(`${this._path}/${featureRequest.id}`, featureRequest).subscribe({
        next: response => resolve(response),
        error: error => reject(error)
      })
    })
  }

  async getBacklog(): Promise<FeatureRequest[]> {
    return new Promise((resolve, reject) => {
      this._apiService.httpGet(`${this._path}/backlog`).subscribe({
        next: response => resolve(response),
        error: error => reject(error)
      })
    })
  }

  async rate(id: number, positive: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      const params = new Map
      params.set('positive', positive)
      this._apiService.httpPost(`${this._path}/${id}/rate`, null, {params}).subscribe({
        next: () => resolve(),
        error: error => reject(error)
      })
    })
  }
}
