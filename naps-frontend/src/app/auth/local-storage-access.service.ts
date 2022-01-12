import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageAccessService {

  TOKEN: string = 'naps_token';
  REFRESH: string = 'naps_refresh';
  EXPIRED: string = 'naps_expired';

  constructor() { }

  setToken(token: any) {
    localStorage.setItem(this.TOKEN, token.access);
    localStorage.setItem(this.REFRESH, token.refresh);
    localStorage.setItem(this.EXPIRED, token.expires);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN);
    localStorage.removeItem(this.REFRESH);
    localStorage.removeItem(this.EXPIRED);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN);
  }

  getRefresh() {
    return localStorage.getItem(this.REFRESH);
  }

  getExpired() {
    return localStorage.getItem(this.EXPIRED);
  }

  checkTokenExpired(): boolean {
    const expired = this.getExpired();
    const now = Date.now();
    return !expired || parseInt(expired) < now;
  }
}
