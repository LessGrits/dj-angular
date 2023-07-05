import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { initMenu } from '../../../../store/admin-menu-store/store/admin-menu.actions';
import { getMenuData } from '../../../../store/admin-menu-store/store/admin-menu.selectors';

@Component({
  selector: 'admin-nav-block',
  templateUrl: './admin-nav-block.component.html',
  styleUrls: ['./admin-nav-block.component.scss'],
})
export class AdminNavBlockComponent implements OnInit {
  public data$ = this._store$.pipe(select(getMenuData));

  constructor(private _store$: Store) {}

  ngOnInit() {
    this._store$.dispatch(initMenu());
  }
}
