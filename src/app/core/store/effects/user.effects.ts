import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserActionTypes, SaveAuthData, NoAction, LogoutUser, RejectUser } from '../actions/user.actions';
import { tap, map, filter, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { State } from '../reducers/user.reducer';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {

  @Effect() loginUser = this.actions$
    .pipe(ofType(UserActionTypes.LoginUser))
    .pipe(tap(() => this.authService.login()))
    .pipe(map(() => new NoAction()));

  @Effect() rejectUser = this.actions$
    .pipe(ofType(UserActionTypes.RejectUser))
    .pipe(tap(() => this.router.navigate([this.authService.onAuthFailureURL])))
    .pipe(map(() => new NoAction()));

  @Effect() handleLoginCallback = this.actions$
    .pipe(ofType(UserActionTypes.HandleLoginCallback))
    .pipe(withLatestFrom(this.store$))
    .pipe(filter(([action, userState]) => window.location.hash && !userState.isLoggedIn))
    .pipe(switchMap(a => this.authService.parseHash$))
    .pipe(map(ar => new SaveAuthData(ar)))

  @Effect() refreshAuthData = this.actions$
    .pipe(ofType(UserActionTypes.RefreshAuthData))
    .pipe(filter(() => this.isLoggedIn()))
    .pipe(switchMap(a => this.authService.checkSession$))
    .pipe(catchError(e => {
        localStorage.removeItem(this.loggedInKey);
        return of(new RejectUser())
      }))
    .pipe(map(ar => new SaveAuthData(ar)))

  @Effect() saveAuthData = this.actions$
    .pipe(ofType<SaveAuthData>(UserActionTypes.SaveAuthData))
    .pipe(map(() => {
      localStorage.setItem(this.loggedInKey, JSON.stringify(true));
      window.location.hash = "";
      return this.router.navigate([this.authService.onAuthSuccessURL]);
    }))
    .pipe(map(() => new NoAction()));

  @Effect() logoutUser = this.actions$
    .pipe(ofType<LogoutUser>(UserActionTypes.LogoutUser))
    .pipe(tap(() => {
      localStorage.setItem(this.loggedInKey, JSON.stringify(false));
      this.authService.logout();
    }))
    .pipe(map(() => new NoAction()));

  private isLoggedIn = (): boolean =>
    JSON.parse(localStorage.getItem(this.loggedInKey));

  private loggedInKey = "isLoggedIn";

  constructor(private actions$: Actions, private router: Router, private authService: AuthService, private store$: Store<State>) {}
}
