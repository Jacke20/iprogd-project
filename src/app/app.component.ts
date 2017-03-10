import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { UserService } from './user.service';
import { Observable, Subject} from "rxjs/Rx";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  user = {};

  constructor(public af: AngularFire, private authService: AuthService) {
    this.af.auth.subscribe(auth => console.log("Authentication: " + auth));
    this.user = authService.user;
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
