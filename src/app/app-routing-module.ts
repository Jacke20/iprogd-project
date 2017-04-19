import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';
import { PageNotFoundComponent }   from './components/page-not-found/page-not-found.component';
import { ConcertComponent }        from './components/concert/concert.component';
import { UserComponent } 		       from './components/user/user.component';
import { HomeComponent }           from './components/home/home.component';
import { SearchComponent }         from './components/search/search.component';
import { AuthGuard }               from './guards/auth.guard';
import { AdminComponent }          from './components/admin/admin.component';
import { ArtistComponent }         from './components/artist/artist.component';
import { AboutComponent }         from './components/about/about.component';

const appRoutes: Routes = [
  { path: 'concert/:id', component: ConcertComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'search/:location', component: SearchComponent },
  { path: 'home', component: HomeComponent },
  { path: 'artist/:id', component: ArtistComponent },
  { path: 'about', component: AboutComponent },


  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

// TODO: Add routes if we want admin users
const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'user', component: UserComponent },
        ],
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
    //RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard]
})
export class AppRoutingModule {}