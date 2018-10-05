import { UserActions, UserActionTypes } from '../actions/user.actions';

export interface State {
  isLoggedIn: boolean;
  tokenData: any;
  userProfile: any;
}

export const initialState: State = {
  isLoggedIn: false,
  tokenData: null,
  userProfile: null
};

export function reducer(state: State = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.SaveAuthData:{
      return {
        ...state,
        tokenData : {
          expiresAt: action.authResult.expiresIn * 1000 + Date.now(),
          accessToken: action.authResult.accessToken
        },
        userProfile: action.authResult.idTokenPayload,
        isLoggedIn: true
      };
    }
    case UserActionTypes.LogoutUser:{
      return {
        ...state,
        tokenData: null,
        userProfile: null,
        isLoggedIn: false
      }
    }
    default:
      return state;
  }
}

export const getUserProfile = (state: State) => state.userProfile;
export const getIsLoggedIn = (state: State) => state.isLoggedIn;