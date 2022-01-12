import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, Observable, retryWhen } from 'rxjs';
import { appConfig } from '../config/appConfig';
import { endpoints } from '../config/endpoints';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class NapsApiService {

  constructor(
    private http: HttpClient,
    private errorHandling: ErrorHandlingService,
  ) { }

  get(endpoint: string, payload: any) {
    const request = this.http.get<any>(`${appConfig.API_URL}${endpoint}`, payload);
    return this.decorateWithErrorHandling(request, payload);
  }

  post(endpoint: string, payload: any) {
    const isLogin = endpoint === endpoints.login;
    const request = this.http.post<any>(`${appConfig.API_URL}${endpoint}`, payload);
    return this.decorateWithErrorHandling(request, payload, isLogin);
  }

  put(endpoint: string, payload: any) {
    const request = this.http.put<any>(`${appConfig.API_URL}${endpoint}`, payload);
    return this.decorateWithErrorHandling(request, payload);
  }

  delete(endpoint: string, payload: any) {
    const request = this.http.delete<any>(`${appConfig.API_URL}${endpoint}`, payload);
    return this.decorateWithErrorHandling(request, payload);
  }

  private decorateWithErrorHandling(request: Observable<any>, payload: any, redirectAnyway: boolean = false) {
    return request.pipe(
      retryWhen(err => err.pipe(
        mergeMap(error => this.errorHandling.handleError({
          payload,
          error,
        }, redirectAnyway)),
      )),
    );
  }
}
