import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';
import { PageNotFoundComponent }   from './page-not-found/page-not-found.component';
import { ConcertComponent }        from './concert/concert.component';
import { UserComponent } 		   from './user/user.component';


const appRoutes: Routes = [
  { path: 'concerts', component: ConcertComponent },
  { path: 'user', component: UserComponent },

  { path: '', redirectTo: 'concerts', pathMatch: 'full' },
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