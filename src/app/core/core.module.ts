import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effects';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    StoreModule.forFeature('coreState', reducers),
    EffectsModule.forFeature([UserEffects])
  ],
  declarations: []
})
export class CoreModule { }
