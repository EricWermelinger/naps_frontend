import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NapsApiService } from '../api/naps-api.service';
import { appRoutes } from '../config/appRoutes';
import { endpoints } from '../config/endpoints';
import { LocalStorageAccessService } from './local-storage-access.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private api: NapsApiService,
    private localStorage: LocalStorageAccessService,
    private router: Router,
  ) { }

  loginUser(email: string, password: string): void {
    this.api.post(endpoints.login, {
      email,
      password
    }).subscribe(token => {
      this.localStorage.setToken(token);
      this.router.navigate([appRoutes.app, appRoutes.initialAfterLogin]);
    });
  }

  logoutUser(): void {
    const refresh = {
      refresh: this.localStorage.getRefresh(),
    };
    if (refresh) {
      this.api.delete(endpoints.login, refresh).subscribe(_ => {
        this.localStorage.removeToken();
        location.reload();
      });
    }
  }

  isLoggedIn(): boolean {
    return !!this.localStorage.getToken();
  }
}
