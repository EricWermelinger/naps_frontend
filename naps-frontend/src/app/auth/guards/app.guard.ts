import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { appRoutes } from 'src/app/config/appRoutes';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean> {
    const authenticated = this.auth.isLoggedIn();
    return of(authenticated).pipe(
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigate([appRoutes.login]);
        }
      }),
    );
  }
}
