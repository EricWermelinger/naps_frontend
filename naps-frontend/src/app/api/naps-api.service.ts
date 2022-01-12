import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, mergeMap, Observable, of, retryWhen, switchMap, tap } from 'rxjs';
import { LocalStorageAccessService } from '../auth/local-storage-access.service';
import { appConfig } from '../config/appConfig';
import { endpoints } from '../config/endpoints';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class NapsApiService {

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageAccessService,
    private errorHandling: ErrorHandlingService,
  ) { }

  get(endpoint: string, payload: any) {
    const request = this.http.get<any>(`${appConfig.API_URL}${endpoint}`, payload);
    return this.buildRequest(request, payload);
  }

  post(endpoint: string, payload: any) {
    const isLogin = endpoint === endpoints.login;
    const request = this.http.post<any>(`${appConfig.API_URL}${endpoint}`, payload);
    return this.buildRequest(request, payload, isLogin);
  }

  put(endpoint: string, payload: any) {
    const request = this.http.put<any>(`${appConfig.API_URL}${endpoint}`, payload);
    return this.buildRequest(request, payload);
  }

  delete(endpoint: string, payload: any) {
    const request = this.http.delete<any>(`${appConfig.API_URL}${endpoint}`, payload);
    return this.buildRequest(request, payload);
  }

  callNoCheck(endpoint: string, payload: any, method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
    switch (method) {
      case 'GET':
        return this.http.get<any>(`${appConfig.API_URL}${endpoint}`, payload);
      case 'POST':
        return this.http.post<any>(`${appConfig.API_URL}${endpoint}`, payload);
      case 'PUT':
        return this.http.put<any>(`${appConfig.API_URL}${endpoint}`, payload);
      case 'DELETE':
        return this.http.delete<any>(`${appConfig.API_URL}${endpoint}`, payload);
    }
  }

  private buildRequest(request: Observable<any>, payload: any, redirectAnyway: boolean = false): Observable<any> {
    return this.checkTokenRefresh().pipe(
      switchMap(_ => this.decorateWithErrorHandling(request, payload, redirectAnyway)),
      first(),
    );
  }

  private decorateWithErrorHandling(request: Observable<any>, payload: any, redirectAnyway: boolean = false): Observable<any> {
    return request.pipe(
      retryWhen(err => err.pipe(
        mergeMap(error => this.errorHandling.handleError({
          payload,
          error,
        }, redirectAnyway)),
      )),
    );
  }

  private checkTokenRefresh(): Observable<any> {
    if (this.localStorage.checkTokenExpired()) {
      const refresh = this.localStorage.getRefresh();
      return this.callNoCheck(endpoints.login, { refresh }, 'PUT').pipe(
        first(),
        tap(token => {
          token = {
            ...token,
            refresh
          };
          this.localStorage.setToken(token);
        }),
      );
    } else {
      return of(null).pipe(first());
    }
  }
}
