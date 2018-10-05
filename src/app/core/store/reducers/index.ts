import { ActionReducer, ActionReducerMap, createFeatureSelector,  createSelector,  MetaReducer } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import * as fromUser from '../../../core/store/reducers/user.reducer';
import * as fromRoot from '../../../reducers'

export interface CoreState {
  user: fromUser.State
}

export interface State extends fromRoot.State {
  coreState: CoreState
}

export const reducers: ActionReducerMap<CoreState> = {
  user: fromUser.reducer
};


export const metaReducers: MetaReducer<CoreState>[] = !environment.production ? [] : [];

export const getCoreStateFeature = createFeatureSelector<State, CoreState>("coreState");
export const getUserState = createSelector(getCoreStateFeature, (feature: CoreState) => feature.user);
export const getUserProfile = createSelector(getUserState, fromUser.getUserProfile);
export const getIsLoggedIn = createSelector(getUserState, fromUser.getIsLoggedIn);
