import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap, withLatestFrom } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { Router } from '@angular/router';
import {
  initMenu,
  initMenuFailed,
  initMenuSuccess,
} from './admin-menu.actions';
import { AdminMenuService } from '../services/admin-menu.service';
import { getLoaded, getLoading } from './admin-menu.selectors';

@Injectable()
export class AdminMenuEffects {
  constructor(
    private _actions$: Actions,
    private _store$: Store,
    private _router: Router,
    private _adminMenuService: AdminMenuService
  ) {}

  public initMenu$ = createEffect(() =>
    this._actions$.pipe(
      ofType(initMenu),
      withLatestFrom(
        this._store$.pipe(select(getLoaded)),
        this._store$.pipe(select(getLoading))
      ),
      filter(([, loaded, loading]) => loading && !loaded),
      switchMap(() =>
        this._adminMenuService.getMenu().pipe(
          map((data) => initMenuSuccess({ data })),
          catchError(({ serverError }) => of(initMenuFailed({ serverError })))
        )
      )
    )
  );
}
