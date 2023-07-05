import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  extractAuthDataFromLocalStorage,
  initAdminModule,
  Login,
  LoginFailed,
  LoginSuccess,
  logout,
  logoutSuccess,
} from './admin-auth.actions';
import {
  catchError,
  distinctUntilChanged,
  filter,
  first,
  fromEvent,
  map,
  of,
  skip,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { AdminAuthService } from '../services/admin-auth.service';
import { select, Store } from '@ngrx/store';
import { isAuth } from './admin-auth.selectors';
import { AuthData } from './admin-auth-reducer';
import { Router } from '@angular/router';

@Injectable()
export class AdminAuthEffects {
  constructor(
    private _adminAuthService: AdminAuthService,
    private _actions$: Actions,
    private _store$: Store,
    private _router: Router
  ) {}

  public login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(Login),
      switchMap((body) =>
        this._adminAuthService.login(body).pipe(
          map((authData) => LoginSuccess({ authData })),
          catchError((error) => of(LoginFailed({ serverError: error.message })))
        )
      )
    )
  );

  public logout$ = createEffect(() =>
    this._actions$.pipe(
      ofType(logout),
      tap(() => localStorage.removeItem('authData')),
      map(() => logoutSuccess())
    )
  );

  public refresh$ = createEffect(() =>
    this._actions$.pipe(
      ofType(LoginSuccess),
      switchMap(({ authData }) =>
        timer(authData.exp * 1000 - 60 * 1000 - Date.now())
      ),
      switchMap(() =>
        this._store$.pipe(select(isAuth), first(), filter(Boolean))
      ),
      switchMap(() => this._adminAuthService.refresh()),
      map((authData) => LoginSuccess({ authData }))
    )
  );

  public saveAuthDataToLocalStorage$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(LoginSuccess),
        tap(({ authData }) => {
          localStorage.setItem('authData', JSON.stringify(authData));
        })
      ),
    { dispatch: false }
  );

  public extractAuthDataFromLocalStorage$ = createEffect(() =>
    this._actions$.pipe(
      ofType(initAdminModule, extractAuthDataFromLocalStorage),
      map(() => {
        const authDataString = localStorage.getItem('authData');
        if (!authDataString) {
          return logoutSuccess();
        }
        const authData: AuthData = JSON.parse(authDataString);
        if (authData.exp * 1000 - 10 * 1000 - Date.now() < 0) {
          return logoutSuccess();
        }
        return LoginSuccess({ authData });
      })
    )
  );

  public listenStorageEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(initAdminModule),
      switchMap(() => fromEvent(window, 'storage')),
      map(() => extractAuthDataFromLocalStorage())
    )
  );

  public listenAuthorizeEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(initAdminModule),
      switchMap(() =>
        this._adminAuthService.isAuth$.pipe(
          distinctUntilChanged(),
          skip(1),
          tap((isAuth) => {
            this._router.navigateByUrl(isAuth ? '/admin' : 'admin/auth/login');
          })
        )
      ),
      map(() => extractAuthDataFromLocalStorage())
    )
  );
}
