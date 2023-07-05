import { createAction, props } from '@ngrx/store';
import { AuthData } from './admin-auth-reducer';

export const Login = createAction(
  '[Admin Action] login',
  props<{ login: string; password: string }>()
);

export const LoginSuccess = createAction(
  '[Admin Action] login success',
  props<{ authData: AuthData }>()
);

export const LoginFailed = createAction(
  '[Admin Action] login failed',
  props<{ serverError: string }>()
);

export const initAdminModule = createAction('[Admin Action] init admin auth');
export const logout = createAction('[Admin Action] logout');
export const logoutSuccess = createAction('[Admin Action] logout success');
export const extractAuthDataFromLocalStorage = createAction(
  '[Admin Action] Extract login data'
);
