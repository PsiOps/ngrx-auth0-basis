import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromCore from "../../store/reducers";
import { Observable } from "rxjs";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html"
})
export class AccountComponent implements OnInit {
  public profile$: Observable<any>;

  constructor(private userState: Store<fromCore.State>) { }

  ngOnInit() {
    this.profile$ = this.userState.select(fromCore.getUserProfile);
  }
}
