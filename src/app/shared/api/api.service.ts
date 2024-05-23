import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../core/config';
import { Observable, take } from 'rxjs';
import { Pageable } from '../models/pageable.model';

export interface HttpRequestOptions {
  pageable?: Pageable<any>
  params?: Map<string, string>
  headers?: Map<string, string>
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  httpGet(path: string, options?: HttpRequestOptions): Observable<any> {
    return this._http.get<any>(`${API_CONFIG.apiUrl}${path}`, {headers: this._mapToHeaders(options?.headers), params: this._optionsToParams(options) }).pipe(take(1));
  }

  httpPost(path: string, body?: any, options?: HttpRequestOptions): Observable<any> {
    return this._http.post(`${API_CONFIG.apiUrl}${path}`, body, { headers: this._mapToHeaders(options?.headers), params: this._optionsToParams(options) }).pipe(take(1));
  }

  httpPut(path: string, body?: any, options?: HttpRequestOptions): Observable<any> {
    return this._http.put(`${API_CONFIG.apiUrl}${path}`, body, { headers: this._mapToHeaders(options?.headers), params: this._optionsToParams(options) }).pipe(take(1));
  }

  httpPatch(path: string, body?: any, options?: HttpRequestOptions): Observable<any> {
    return this._http.patch(`${API_CONFIG.apiUrl}${path}`, body, { headers: this._mapToHeaders(options?.headers), params: this._optionsToParams(options) }).pipe(take(1));
  }

  httpDelete(path: string, options?: HttpRequestOptions): Observable<any> {
    return this._http.delete(`${API_CONFIG.apiUrl}${path}`, { headers: this._mapToHeaders(options?.headers), params: this._optionsToParams(options) }).pipe(take(1));
  }

  httpPostWithReadHeaders(path: string, body?: any, options?: HttpRequestOptions): Observable<any> {
    return this._http.post(`${API_CONFIG.apiUrl}${path}`, body, {
      observe: 'response',
      responseType: 'text',
      headers: this._mapToHeaders(options?.headers),
      params: this._optionsToParams(options)
    }).pipe(take(1));
  }

  private _mapToHeaders(headersMap?: Map<string, string>): HttpHeaders {
    let httpHeaders = new HttpHeaders();
    if (headersMap != null && headersMap != undefined) {
      headersMap.forEach((value, key) => {
        httpHeaders = httpHeaders.set(key, value);
      });
    }
    return httpHeaders;
  }

  private _optionsToParams(options: HttpRequestOptions | undefined): HttpParams {
    let httpParams = new HttpParams();
    if (!options) {
      return httpParams
    }
    if (options.params) {
      options.params.forEach((value, key) => {
        httpParams = httpParams.set(key, value);
      });
    }
    if (options.pageable) {
      httpParams = httpParams.set('page', options.pageable.page)
      httpParams = httpParams.set('size', options.pageable.size)
      options.pageable.sort.forEach(([field, direction]) => {
        httpParams = httpParams.append('sort', `${String(field)},${direction}`);
      });
    }
    return httpParams;
  }
}
