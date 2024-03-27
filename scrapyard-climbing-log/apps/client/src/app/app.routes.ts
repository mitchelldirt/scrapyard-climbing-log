import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WallComponent } from './wall/wall.component';

export const appRoutes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'wall/:id', component: WallComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
