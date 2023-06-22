import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  constructor(private _http: HttpClient) {}

  public login(body: {
    login: string;
    password: string;
  }): Observable<{ accessToken: string }> {
    return this._http.post<{ accessToken: string }>(
      'http://localhost:3000/auth/login',
      body
    );
  }
}
