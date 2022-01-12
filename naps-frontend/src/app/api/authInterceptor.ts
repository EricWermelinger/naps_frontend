import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { LocalStorageAccessService } from "../auth/local-storage-access.service";
import { ErrorHandlingService } from "./error-handling.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private localSorage: LocalStorageAccessService,
        private errorHandling: ErrorHandlingService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!!this.localSorage.getToken()) {
            req = this.addToken(req, this.localSorage.getToken() ?? '');
        }

        return next.handle(req).pipe(catchError(e => {
            if (e.status === 401) {
                this.errorHandling.redirectLogin();
            }
            return throwError(e);
        }))
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: { 'auth': token }
        });
    }

}