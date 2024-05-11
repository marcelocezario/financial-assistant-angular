import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../core/config/api.config';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  httpGet(path: string, params?: Map<string, string>, headers?: Map<string, string>): Observable<any> {
    return this._http.get<any>(`${API_CONFIG.apiUrl}${path}`, { headers: this._mapToHeaders(headers), params: this._mapToParams(params) }).pipe(take(1));
  }

  httpPost(path: string, body?: any, params?: Map<string, string>, headers?: Map<string, string>): Observable<any> {
    return this._http.post(`${API_CONFIG.apiUrl}${path}`, body, { headers: this._mapToHeaders(headers), params: this._mapToParams(params) }).pipe(take(1));
  }

  httpPut(path: string, body?: any, params?: Map<string, string>, headers?: Map<string, string>): Observable<any> {
    return this._http.put(`${API_CONFIG.apiUrl}${path}`, body, { headers: this._mapToHeaders(headers), params: this._mapToParams(params) }).pipe(take(1));
  }

  httpPatch(path: string, body?: any, params?: Map<string, string>, headers?: Map<string, string>): Observable<any> {
    return this._http.patch(`${API_CONFIG.apiUrl}${path}`, body, { headers: this._mapToHeaders(headers), params: this._mapToParams(params) }).pipe(take(1));
  }

  httpDelete(path: string, params?: Map<string, string>, headers?: Map<string, string>): Observable<any> {
    return this._http.delete(`${API_CONFIG.apiUrl}${path}`, { headers: this._mapToHeaders(headers), params: this._mapToParams(params) }).pipe(take(1));
  }

  httpPostWithReadHeaders(path: string, body?: any, params?: Map<string, string>, headers?: Map<string, string>): Observable<any> {
    return this._http.post(`${API_CONFIG.apiUrl}${path}`, body, {
      observe: 'response',
      responseType: 'text',
      headers: this._mapToHeaders(headers),
      params: this._mapToParams(params)
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

  private _mapToParams(paramsMap?: Map<string, string>): HttpParams {
    let httpParams = new HttpParams();
    if (paramsMap != null && paramsMap != undefined) {
      paramsMap.forEach((value, key) => {
        httpParams = httpParams.set(key, value);
      });
    }
    return httpParams;
  }
}
