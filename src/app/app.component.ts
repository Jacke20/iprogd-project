import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { UserService } from './services/user.service';
import { Observable, Subject} from "rxjs/Rx";
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
  providers: [UserService, SpotifyService, ConcertService] // TODO: Remove SpotifyService
})
export class AppComponent {
  color = 'red'; // TODO: Remove later

  artists = [];
  events = [];
  songs = [];

  constructor(public af: AngularFire, private authService: AuthService, 
    private spotifyService: SpotifyService, private concertService: ConcertService, private router: Router
    ,private location: Location) {
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }

  login() {
    return this.authService.login();
  }

  logout() {
    this.router.navigate(['/home']);
    location.reload();
    return this.authService.logout();
  }

  onSubmit(value: any) {
    this.router.navigate(['/search', value.search]);
  }

}
