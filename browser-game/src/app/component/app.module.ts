import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PlayerUpdate } from '../services/playerupdate';
import {BackgroundService} from '../services/backgroundservice';
import {MobService} from '../services/mobservice';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [PlayerUpdate, BackgroundService,MobService],
  bootstrap: [AppComponent]
})
export class AppModule { }
