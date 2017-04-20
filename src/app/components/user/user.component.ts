import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  favCount = 3;
  revCount = 3;
  user = this.authService.user;
  userId = this.authService.userId;
  userInfo: FirebaseListObservable<any>;
  reviews: FirebaseListObservable<any>;
  favourites: FirebaseListObservable<any>;
  artist: {};
  users: FirebaseListObservable<any>;
  constructor(private userService: UserService, private authService: AuthService, private angularFire: AngularFire, private route: ActivatedRoute) { 

  }

  moreFav(): void {
    if(this.authService.isAuthenticated()) {
      this.favCount = this.favCount + 3;
    }
  }

  moreRev(): void {
    if(this.authService.isAuthenticated()) {
      this.revCount = this.revCount + 3;
    }
  }

  getUsers(): void {
    if(this.authService.isAuthenticated()) {
      this.users = this.userService.getUsers();
    }
  }

  getUserInfo(): void {
    if(this.authService.isAuthenticated()) {
      this.userInfo = this.angularFire.database.list('users/' + this.userId, { preserveSnapshot: true });
    }
  }
 
  getUserReviews(): void {
    if(this.authService.isAuthenticated()) {
      this.reviews = this.angularFire.database.list('users/' + this.userId + '/reviews');
    }
  }

  getUserFavourites(): void {
    if(this.authService.isAuthenticated()) {
      this.favourites = this.angularFire.database.list('users/' + this.userId + '/favourites');
    }
  }

  // ngOnInit used to keep complex logic out of the constructor. There are other ng methods for things like changes etc.
  // Read about lifecycle hooks to learn more.
  // We used the ngOnInit Lifecycle Hook to get users when our AppComponent activates.
  ngOnInit(): void {
    if(this.authService.isAuthenticated()) {
      this.getUserInfo();
      this.getUserReviews();
      this.getUserFavourites();
    }
   /*
    console.log(this.reviews);
    console.log(this.favourites);
    console.log("hello");
    */
  }


}
