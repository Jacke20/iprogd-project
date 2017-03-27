import {Injectable} from "@angular/core";
import { Router } from "@angular/router";
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';

@Injectable()
export class AuthService {
  user = {};
  userId = "";
  constructor(public af: AngularFire, private router: Router) {
    this.af.auth.subscribe(user => {
      if(user) {
        // user logged in
        this.user = user;
        this.userId = user.uid;
      }
      else {
        // user not logged in
        this.user = {};
      }
    });
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return (Object.keys(this.user).length !== 0);
  }

  /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  login() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
  }
  /**
   * Logs out the current user
   */
  logout() {
    return this.af.auth.logout();
  }
}
