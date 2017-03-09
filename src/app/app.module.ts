import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing-module';

import { AngularFireModule } from 'angularfire2';
import { ConcertComponent } from './concert/concert.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const firebaseConfig = {
  apiKey: "AIzaSyAT-aho1S_5doVAxms3PuFaTzb31CGsEmA",
  authDomain: "iprogd-project.firebaseapp.com",
  databaseURL: "https://iprogd-project.firebaseio.com",
  storageBucket: "iprogd-project.appspot.com",
  messagingSenderId: "298381157046"
};

@NgModule({
  declarations: [
    AppComponent,
    ConcertComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
