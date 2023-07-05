import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { AdminAuthService } from '../../../store/admin-auth-store/services/admin-auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate, CanLoad {
  constructor(
    private _router: Router,
    private _authService: AdminAuthService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._getIsAuth();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }

  private _getIsAuth() {
    return this._authService.isAuth$.pipe(
      first(),
      map((isAuth) => {
        if (!isAuth) {
          this._router.navigateByUrl('/admin/auth/login');
        }
        return isAuth;
      })
    );
  }
}
