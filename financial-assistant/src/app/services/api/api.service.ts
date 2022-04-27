import { take } from 'rxjs/operators';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = API_CONFIG.apiUrl;

  private httpHeaders: HttpHeaders = new HttpHeaders();
  private httpParams: HttpParams = new HttpParams();

  private addParamsAndHeaders(params?: Map<string, string>, headers?: Map<string, string>): void {
    this.httpHeaders = new HttpHeaders();
    this.httpParams = new HttpParams();
    if (params != null && params != undefined)
      params.forEach((value, key) => this.httpParams = this.httpParams.set(key, value));
    if (headers != null && headers != undefined)
      headers.forEach((value, key) => this.httpHeaders.set(key, value));
  }

  httpGet(path: string, params?: Map<string, string>, headers?: Map<string, string>): Observable<any> {
    this.addParamsAndHeaders(params, headers);
    return this.http.get<any>(`${this.apiUrl}${path}`, { headers: this.httpHeaders, params: this.httpParams }).pipe(take(1));
  }

  httpPost(path: string, body: any, params?: Map<string, string>, headers?: Map<string, string>): Observable<any> {
    this.addParamsAndHeaders(params, headers);
    return this.http.post(`${this.apiUrl}${path}`, body, { headers: this.httpHeaders, params: this.httpParams }).pipe(take(1));
  }

  httpPut(path: string, body: any, params?: Map<string, string>, headers?: Map<string, string>): Observable<any> {
    this.addParamsAndHeaders(params, headers);
    return this.http.put(`${this.apiUrl}${path}`, body, { headers: this.httpHeaders, params: this.httpParams }).pipe(take(1));
  }

  httpPatch(path: string, body: any, params?: Map<string, string>, headers?: Map<string, string>): Observable<any> {
    this.addParamsAndHeaders(params, headers);
    return this.http.patch(`${this.apiUrl}${path}`, body, { headers: this.httpHeaders, params: this.httpParams }).pipe(take(1));
  }

  httpDelete(path: string, params?: Map<string, string>, headers?: Map<string, string>): Observable<any> {
    this.addParamsAndHeaders(params, headers);
    return this.http.delete(`${this.apiUrl}${path}`, { headers: this.httpHeaders, params: this.httpParams }).pipe(take(1));
  }

  httpPostWithReadHeaders(path: string, body: any, params?: Map<string, string>, headers?: Map<string, string>): Observable<any> {
    this.addParamsAndHeaders(params, headers);
    return this.http.post(`${this.apiUrl}${path}`, body, {
      observe: 'response',
      responseType: 'text',
      headers: this.httpHeaders,
      params: this.httpParams
    }).pipe(take(1));
  }
}
