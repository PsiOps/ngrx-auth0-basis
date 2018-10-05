import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./core/components/home/home.component";
import { AccountComponent } from "./core/components/account/account.component";
import { CallbackComponent } from "./core/components/callback/callback.component";

import { AuthService } from "./core/auth/auth.service";
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    CallbackComponent
  ],
  imports: [BrowserModule, AppRoutingModule, CoreModule, StoreModule.forRoot(reducers, { metaReducers }), !environment.production ? StoreDevtoolsModule.instrument() : [], EffectsModule.forRoot([AppEffects])],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
