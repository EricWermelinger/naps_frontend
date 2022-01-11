import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  TOKEN: string = 'naps_token';
  REFRESH_TOKEN: string = 'naps_refresh_token';

  constructor() { }

  loginUser(mail: string, password: string): Observable<string> {
    const token = 'asdfghjk';
    localStorage.setItem(this.TOKEN, token);
    return of('');
  }

  logoutUser(): void {
    localStorage.removeItem(this.TOKEN);
  }
}
