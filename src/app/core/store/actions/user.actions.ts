import { Action } from '@ngrx/store';

export enum UserActionTypes {
  NoAction = '[User] No Action',
  LoginUser = '[User] Login User',
  RejectUser = '[User] Reject User',
  HandleLoginCallback = '[User] Handle Login Callback',
  RefreshAuthData = '[User] Refresh Authentication Data',
  SaveAuthData = '[User] Save Authentication Data',
  LogoutUser = '[User] Logout User'
}

export class NoAction implements Action {
  readonly type = UserActionTypes.NoAction;
}
export class LoginUser implements Action {
  readonly type = UserActionTypes.LoginUser;
}
export class RejectUser implements Action {
  readonly type = UserActionTypes.RejectUser;
}
export class HandleLoginCallback implements Action {
  readonly type = UserActionTypes.HandleLoginCallback;
}
export class RefreshAuthData implements Action {
  readonly type = UserActionTypes.RefreshAuthData;
}
export class SaveAuthData implements Action {
  readonly type = UserActionTypes.SaveAuthData;
  constructor(public authResult: auth0.Auth0DecodedHash){ }
}
export class LogoutUser implements Action {
  readonly type = UserActionTypes.LogoutUser;
}

export type UserActions = NoAction | LoginUser | RejectUser 
  | HandleLoginCallback | RefreshAuthData | SaveAuthData | LogoutUser;
