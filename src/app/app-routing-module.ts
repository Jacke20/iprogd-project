import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';
import { PageNotFoundComponent }   from './page-not-found/page-not-found.component';
import { ConcertComponent }        from './concert/concert.component';

const appRoutes: Routes = [
  { path: '', component: ConcertComponent },
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