import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { UserService } from './services/user.service';
import { Observable, Subject } from "rxjs/Rx";
import { Router } from "@angular/router";
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { AuthService } from "./services/auth.service";


// TODO: Remove
import { SpotifyService }    from "./services/spotify.service";
import { ConcertService }    from "./services/concert.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, SpotifyService, ConcertService]
})
export class AppComponent {
  user = null;

  artists = [];
  events = [];
  songs = [];

  constructor(public af: AngularFire, private authService: AuthService, 
    private router: Router, private location: Location) {
  }

  ngOnInit() {
    if(this.isAuth()) {
      this.user = this.authService.user;
    }
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }

  login() {
    this.authService.login().then(
      (success)=> {
        this.user = this.authService.user;
        this.router.navigate(['/home']);
      }
    );
  }

  logout() {
    this.authService.logout().then(
      (success)=> {
        this.user = null;
        this.router.navigate(['/home']);
      }
    );
  }

  onSubmit(value: any) {
    this.router.navigate(['/search', value.search]);
  }

}
