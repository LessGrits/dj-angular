import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, EMPTY, first, flatMap, Observable } from 'rxjs';
import { AdminAuthService } from '../services/admin-auth.service';
import { Store } from '@ngrx/store';
import { getAccessToken } from '../store/admin-auth.selectors';

@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {
  constructor(
    private _adminAuthService: AdminAuthService,
    private _store: Store
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this._store.select(getAccessToken).pipe(
      first(),
      flatMap((token) => {
        const authRequest = token
          ? request.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            })
          : request;

        return next.handle(authRequest).pipe(
          catchError((error: any) => {
            if (error instanceof HttpErrorResponse) {
              if (error.status === 401) {
                console.log('redirect to lo login');
                return EMPTY;
              }
            }
            throw error;
          })
        );
      })
    );
  }
}
