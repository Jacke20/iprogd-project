import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';
import { PageNotFoundComponent }   from './components/page-not-found/page-not-found.component';
import { ConcertComponent }        from './components/concert/concert.component';
import { UserComponent } 		       from './components/user/user.component';
import { HomeComponent }           from './components/home/home.component';



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