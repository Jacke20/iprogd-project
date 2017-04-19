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
  color = 'red'; // TODO: Remove later

  artists = [];
  events = [];
  songs = [];

  constructor(public af: AngularFire, private authService: AuthService, 
    private spotifyService: SpotifyService, private concertService: ConcertService, private router: Router) {

    // TODO: Remove later
    //spotifyService.getAlbumsForArtist("7FBDXY8U17aasVTH3rgxbS");

    // We have to call subscribe which lets us know when the request is finished since our
    // service methods return Observables and they use promises.
    /*
    spotifyService.searchArtists("Bankroll fresh").subscribe(
      data => console.log(data)
    );
    */
  }

  // Global authentication methods
  isAuth() {
    return this.authService.isAuthenticated();
  }

  login() {
    return this.authService.login();
  }

  logout() {
    if(this.router.url == "/user") {
      this.router.navigate(['/home']);
    }
    return this.authService.logout();
  }

  onSubmit(value: any) {
    this.router.navigate(['/search', value.search]);
  }

}
