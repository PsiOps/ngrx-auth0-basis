import { Component } from "@angular/core";
import * as fromCore from "../../store/reducers";
import { select, Store } from "@ngrx/store";
import { LoginUser, LogoutUser } from "../../store/actions/user.actions";
import { Observable } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html"
})
export class HomeComponent {
  public isLoggedIn$: Observable<boolean>;
  url: string;
  constructor(private coreState: Store<fromCore.State>) {
    this.url = window.location.href;
    this.isLoggedIn$ = coreState.pipe(select(fromCore.getIsLoggedIn));
  }

  signup() {
    window.open(
      "https://auth0.com/signup?utm_source=stackblitz&utm_medium=devsponsor&utm_campaign=stackblitz-angular",
      "_blank"
    );
  }

  login() {
    this.coreState.dispatch(new LoginUser());
  }
  logout() {
    this.coreState.dispatch(new LogoutUser());
  }
}
