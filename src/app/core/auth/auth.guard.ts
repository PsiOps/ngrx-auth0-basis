import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import * as fromCore from "../store/reducers";
import { select, Store } from "@ngrx/store";
import { RejectUser } from "../store/actions/user.actions";
import { tap } from "rxjs/operators";


@Injectable()
export class AuthGuard implements CanActivate {
  public isLoggedIn$: Observable<boolean>;
  constructor(private coreState: Store<fromCore.State>) {
    this.isLoggedIn$ = coreState.pipe(select(fromCore.getIsLoggedIn));
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.isLoggedIn$
      .pipe(tap((isLoggedIn) => {
        if(!isLoggedIn) this.coreState.dispatch(new RejectUser());
      }))
  }
}
