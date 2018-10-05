import { Injectable } from "@angular/core";
import * as auth0 from "auth0-js";
import { environment } from "../../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  private auth0 = new auth0.WebAuth({
    clientID: environment.auth.clientID,
    domain: environment.auth.domain,
    responseType: "id_token token",
    redirectUri: environment.auth.redirect,
    scope: environment.auth.scope
  });

  // Store authentication data
  tokenData$ = new BehaviorSubject(null);
  userProfile$ = new BehaviorSubject(null);

  // Authentication Navigation
  onAuthSuccessURL = "/account";
  returnURL = "http://localhost:4200";
  onAuthFailureURL = "/";

  login = () => this.auth0.authorize();

  parseHash$ : Observable<auth0.Auth0DecodedHash> = Observable.create(observer => {
    this.auth0.parseHash((err, authResult) => {
      if (err) {
        observer.error(err);
      } else if (authResult && authResult.accessToken) {
        observer.next(authResult);
      }
      observer.complete();
    });
  });

  checkSession$ = Observable.create(observer => {
    this.auth0.checkSession({}, (err, authResult) => {
      if (err) {
        console.log(err);
        observer.error(err);
      } else if (authResult && authResult.accessToken) {
        observer.next(authResult);
      }
      observer.complete();
    });
  });

  logout = () => this.auth0.logout({ returnTo: this.returnURL, clientID: environment.auth.clientID });
}
