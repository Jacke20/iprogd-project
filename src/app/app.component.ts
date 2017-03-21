import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { UserService } from './services/user.service';
import { Observable, Subject} from "rxjs/Rx";
import { Router } from "@angular/router";
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
  user = {};
  color = 'red'; // TODO: Remove later

  artists = [];
  events = [];
  songs = [];

  constructor(public af: AngularFire, private authService: AuthService, 
    private spotifyService: SpotifyService, private concertService: ConcertService) {
    this.af.auth.subscribe(auth => console.log(auth));
    this.user = authService.user;

    // TODO: Remove later
    spotifyService.getAlbumsForArtist("0OdUWJ0sBjDrqHygGUXeCF");

    // We have to call subscribe which lets us know when the request is finished since our
    // service methods return Observables and they use promises.
    spotifyService.searchArtists("Bankroll fresh").subscribe(
      data => this.artists = data.artists.items
    );
    concertService.getConcerts("Stockholm", 'date').subscribe(
      data => this.events = data.events.event
    );
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
