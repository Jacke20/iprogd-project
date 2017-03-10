import { Injectable } from '@angular/core';
import { AngularFire, AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { Observable, Subject} from "rxjs/Rx";

// Services provide things that we want to use on several locations in our app. For example we might want to use a list of
// users or concerts on multiple places (in multiple components).
@Injectable()
export class UserService {
  users: FirebaseListObservable<any>;
  constructor(af: AngularFire) { 
    this.users = af.database.list('users');
  }

  // Make use of promises for asynchronous calls (use for API calls later)
  getUsers(): FirebaseListObservable<any> { return this.users; }

  ngOnInit(): void {
    this.getUsers();
  }

}
