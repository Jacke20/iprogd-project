import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { UserService } from './services/user.service';
import { Observable, Subject} from "rxjs/Rx";
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";


// TODO: Remove
import { SpotifyService } from "./services/spotify.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, SpotifyService] // TODO: Remove SpotifyService
})
export class AppComponent {
  user = {};
  color = 'red'; // TODO: Remove later

  constructor(public af: AngularFire, private authService: AuthService, private spotifyService: SpotifyService) {
    this.af.auth.subscribe(auth => console.log(auth));
    this.user = authService.user;

    // TODO: Remove later
    spotifyService.getAlbumsForArtist("0OdUWJ0sBjDrqHygGUXeCF");
    spotifyService.searchArtists("Bankroll fresh");
  }

  // Global authentication methods
  isAuth() {
    return this.authService.isAuthenticated();
  }

  login() {
    return this.authService.login();
  }

  logout() {
    return this.authService.logout();
  }

}
