import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerUpdate } from '../services/playerupdate';
import {BackgroundService} from '../services/backgroundservice';
import {MobService} from '../services/mobservice';
import {PhysicsService} from '../services/physicsservice';
import {ItemService} from '../services/itemservice';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OktaAuthModule
  ],
  providers: [PlayerUpdate, BackgroundService,MobService,PhysicsService,ItemService, 
    { provide: OKTA_CONFIG, useValue: environment.okta }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
