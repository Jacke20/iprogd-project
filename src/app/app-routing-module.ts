import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';
import { PageNotFoundComponent }   from './page-not-found/page-not-found.component';
import { ConcertComponent }        from './concert/concert.component';
import { UserComponent } 		       from './user/user.component';
import { HomeComponent }           from './home/home.component';



const appRoutes: Routes = [
  { path: 'concerts', component: ConcertComponent },
  { path: 'user', component: UserComponent },
  { path: 'home', component: HomeComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}