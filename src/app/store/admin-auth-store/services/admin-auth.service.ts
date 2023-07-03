import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { AuthData } from '../store/admin-auth-reducer';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  constructor(
    private _http: HttpClient,
    private _jwtHelperService: JwtHelperService,
    private _store: Store
  ) {}

  public login(body: {
    login: string;
    password: string;
  }): Observable<AuthData> {
    return this._http
      .post<AuthData>('http://localhost:3000/auth/login', body)
      .pipe(
        map((res) => ({
          ...res,
          ...this._jwtHelperService.decodeToken(res.accessToken),
        }))
      );
  }

  public refresh(): Observable<AuthData> {
    return this._http
      .post<AuthData>('http://localhost:3000/auth/refresh', {})
      .pipe(
        map((res) => ({
          ...res,
          ...this._jwtHelperService.decodeToken(res.accessToken),
        }))
      );
  }
}
