import { Component, OnInit } from "@angular/core";
import { State } from "../../store/reducers/user.reducer";
import { HandleLoginCallback } from "../../store/actions/user.actions";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-callback",
  template: `
    <p>
      Loading...
    </p>
  `
})
export class CallbackComponent implements OnInit {
  constructor(private userState: Store<State>) {}

  ngOnInit() {
    this.userState.dispatch(new HandleLoginCallback());
  }
}
