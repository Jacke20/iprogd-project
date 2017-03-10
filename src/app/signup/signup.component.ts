import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

   constructor(public af: AngularFire,private router: Router) { }

  ngOnInit() {
  }

  /**
   * Sign up user
   * @param {User} user [description]
   */
  onSignup(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.createUser({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
        console.log(success);
        this.router.navigate(['/signup'])
      }).catch(
        (err) => {
        console.log(err);
        this.router.navigate(['/signup']);
      })
    }
  }

}
