import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WallComponent } from './wall/wall.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { RouteComponent } from './route/route.component';

export const appRoutes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'wall/:wallid', component: WallComponent },
  { path: 'wall/:wallid/:routeid', component: RouteComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
