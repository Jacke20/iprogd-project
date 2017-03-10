import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  title = 'App works!';
  users: FirebaseListObservable<any>;
  constructor(private userService: UserService) { }

  getUsers(): void {
    // Pass our callback function as an argument to the Promise's then method
    this.users = this.userService.getUsers();
  }

  // ngOnInit used to keep complex logic out of the constructor. There are other ng methods for things like changes etc.
  // Read about lifecycle hooks to learn more.
  // We used the ngOnInit Lifecycle Hook to get users when our AppComponent activates.
  ngOnInit(): void {
    this.getUsers();
  }
}
