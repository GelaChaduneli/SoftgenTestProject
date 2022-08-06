import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpRequest, HttpHandler,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

export const maxRetries = 2;
export const delayMs = 2000;

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

    constructor(
        private _loading: LoadingService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                this._loading.setLoading(false, request.url);
                if (error.status === 401) {
                    return null;
                    // refresh token
                } else {
                    return throwError(error);
                }
            }),
        );
    }
}