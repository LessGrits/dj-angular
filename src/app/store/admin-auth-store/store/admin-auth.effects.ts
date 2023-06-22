import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Login, LoginFailed, LoginSuccess } from './admin-auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { AdminAuthService } from '../services/admin-auth.service';

@Injectable()
export class AdminAuthEffects {
  constructor(
    private _adminAuthService: AdminAuthService,
    private _actions$: Actions
  ) {}

  public login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(Login),
      switchMap((body) =>
        this._adminAuthService.login(body).pipe(
          map((loginSuccessData) => LoginSuccess(loginSuccessData)),
          catchError((error) => of(LoginFailed({ serverError: error.message })))
        )
      )
    )
  );
}
