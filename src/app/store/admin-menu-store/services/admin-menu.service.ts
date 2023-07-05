import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NestedTreeNode } from '../store/admin-menu-reducer';

@Injectable({
  providedIn: 'root',
})
export class AdminMenuService {
  constructor(private _http: HttpClient) {}

  public getMenu(): Observable<NestedTreeNode[]> {
    return this._http.get<NestedTreeNode[]>('http://localhost:3000/menu');
  }
}
