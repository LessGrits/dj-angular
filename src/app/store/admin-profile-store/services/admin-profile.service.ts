import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdminProfileService {
  constructor(private _http: HttpClient) {}

  public getUsers() {
    // return of(this._firestore.collection('users').get());
  }
}
