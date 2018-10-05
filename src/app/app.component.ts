import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "./core/store/reducers/user.reducer";
import { RefreshAuthData } from "./core/store/actions/user.actions";

@Component({
  selector: "app-root",
  template: `
    <router-outlet></router-outlet>
    `
})
export class AppComponent implements OnInit {
  constructor(private userState: Store<State>) {}

  ngOnInit() {
    this.userState.dispatch(new RefreshAuthData())
  }
}
