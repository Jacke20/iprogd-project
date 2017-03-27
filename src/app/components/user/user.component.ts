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

  user = this.authService.user;
  userId = this.authService.userId;
  userInfo: FirebaseListObservable<any>;
  reviews: FirebaseListObservable<any>;
  users: FirebaseListObservable<any>;
  constructor(private userService: UserService, private authService: AuthService, private angularFire: AngularFire, private route: ActivatedRoute) { 

  }

  getUsers(): void {
    this.users = this.userService.getUsers();
  }

  getUserInfo(): void {
    this.userInfo = this.angularFire.database.list('users/' + this.userId, { preserveSnapshot: true });
    this.userInfo
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          if(snapshot.val().length > 0) {
            switch (snapshot.key) {
              case "reviews":
                this.reviews = snapshot.val();
                break;
              case "favorites":
                //code
                break;
              default:
                // code...
                break;
            }
          }
        });
    });
  }

  // ngOnInit used to keep complex logic out of the constructor. There are other ng methods for things like changes etc.
  // Read about lifecycle hooks to learn more.
  // We used the ngOnInit Lifecycle Hook to get users when our AppComponent activates.
  ngOnInit(): void {
    this.getUsers();
    console.log(this.user);
    this.getUserInfo();
    console.log(this.reviews);
  }


}
