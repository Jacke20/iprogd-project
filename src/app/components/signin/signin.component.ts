import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(public af: AngularFire, private router: Router) {}

  ngOnInit() {
  }

   /**
   * Sign in user
   * @param {User} user [description]
   */
  onSignIn(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
        console.log(success);
        this.router.navigate(['/signin']);
      }).catch(
        (err) => {
        console.log(err);
        this.router.navigate(['/signin']);
      })
    }
  }

}
