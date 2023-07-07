import { createAction, props } from '@ngrx/store';
import { NestedTreeNode } from './admin-menu-reducer';

export const initMenu = createAction('[Admin Menu] Init');
export const initMenuSuccess = createAction(
  '[Admin Menu] Success',
  props<{ data: NestedTreeNode[] }>()
);
export const initMenuFailed = createAction(
  '[Admin Menu] Init failed',
  props<{ serverError: string }>()
);
