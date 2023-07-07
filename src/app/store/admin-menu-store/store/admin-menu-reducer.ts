import { createReducer, on } from '@ngrx/store';
import {
  initMenu,
  initMenuFailed,
  initMenuSuccess,
} from './admin-menu.actions';
import { logoutSuccess } from '../../admin-auth-store/store/admin-auth.actions';

export const ADMIN_MENU_FEATURE_NAME = 'admin-menu';

export interface NestedTreeNode {
  name: string;
  href?: string;
  icon?: string;
  children?: NestedTreeNode[];
}
export interface AdminMenuState {
  loading: boolean;
  loaded?: boolean;
  serverError?: string | null;
  data: NestedTreeNode[];
}

const initialState: AdminMenuState = {
  loading: false,
  loaded: false,
  serverError: '',
  data: [],
};

export const adminMenuReducer = createReducer(
  initialState,
  on(initMenu, (state) =>
    state.loaded
      ? state
      : {
          ...state,
          loading: true,
        }
  ),
  on(initMenuSuccess, (state, { data }) => ({
    ...state,
    data,
    serverError: null,
    loading: false,
    loaded: true,
  })),
  on(initMenuFailed, (state, { serverError }) => ({
    ...state,
    data: [],
    serverError,
    loading: false,
    loaded: true,
  })),
  on(logoutSuccess, () => initialState)
);
