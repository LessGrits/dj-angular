import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';
import {
  getLoaded,
  getLoading,
  getServerError,
} from '../../../../store/admin-auth-store/store/admin-auth.selectors';
import { Login } from '../../../../store/admin-auth-store/store/admin-auth.actions';

@Component({
  selector: 'admin-login-block',
  templateUrl: './admin-login-block.component.html',
  styleUrls: ['./admin-login-block.component.scss'],
})
export class AdminLoginBlockComponent {
  public loading$: Observable<boolean> = this._store$.pipe(select(getLoading));
  public loaded$: Observable<boolean> = this._store$.pipe(select(getLoaded));
  public serverError$: Observable<string> = this._store$.pipe(
    select(getServerError)
  );

  constructor(private _store$: Store) {}

  onLogin(loginPayload: { login: string; password: string }) {
    console.log('onLogin', loginPayload);
    this._store$.dispatch(Login(loginPayload));
  }
}
