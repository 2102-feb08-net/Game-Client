import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerUpdate } from '../services/playerupdate';
import {BackgroundService} from '../services/backgroundservice';
import {MobService} from '../services/mobservice';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PlayerUpdate, BackgroundService,MobService],
  bootstrap: [AppComponent]
})
export class AppModule { }
