import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyAT-aho1S_5doVAxms3PuFaTzb31CGsEmA",
  authDomain: "iprogd-project.firebaseapp.com",
  databaseURL: "https://iprogd-project.firebaseio.com",
  storageBucket: "iprogd-project.appspot.com",
  messagingSenderId: "298381157046"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
