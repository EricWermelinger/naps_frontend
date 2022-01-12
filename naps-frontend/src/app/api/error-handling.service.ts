import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, throwError } from 'rxjs';
import { appConfig } from '../config/appConfig';
import { appRoutes } from '../config/appRoutes';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(
    private dialog: MatDialog,
  ) { }

  handleError(data: any, redirectAnyway: boolean = false): Observable<any> {
    if (data?.error?.status === 401 || redirectAnyway) {
      self.location.href = `${appConfig.FRONTEND_URL}${appRoutes.login}`;
      return throwError(data);
    } else {
      const ref = this.dialog.open(ErrorHandlingComponent, {
        data,
        disableClose: true,
      });
      return ref.afterClosed();
    }
  }
}