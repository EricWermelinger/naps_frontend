import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NapsApiService } from '../api/naps-api.service';
import { appRoutes } from '../config/appRoutes';
import { endpoints } from '../config/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  TOKEN: string = 'naps_token';

  constructor(
    private api: NapsApiService,
    private router: Router,
  ) { }

  buildToken(token: string, refresh: string): string {
    return `${token} ${refresh}`;
  }

  loginUser(email: string, password: string): void {
    this.api.post(endpoints.login, {
      email,
      password
    }).subscribe(token => {
      localStorage.setItem(this.TOKEN, token);
      this.router.navigate([appRoutes.app, appRoutes.initialAfterLogin]);
    });
  }

  logoutUser(): void {
    this.api.delete(endpoints.login, {}).subscribe(_ => {
      localStorage.removeItem(this.TOKEN);
    });
  }

  getToken(): string | undefined {
    const token = localStorage.getItem(this.TOKEN);
    return !!token ? token.split(' ')[0] : undefined;
  }

  getRefresh(): string | undefined {
    const token = localStorage.getItem(this.TOKEN);
    return !!token ? token.split(' ')[1] : undefined;
  }
}
