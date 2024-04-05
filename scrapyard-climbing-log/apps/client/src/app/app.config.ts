import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAuth0({
      domain: 'dev-w15ewae8dmum4hfo.us.auth0.com',
      clientId: 'uRDTHXwnd0LWuiega7umqWILCGghnIjU',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    provideHttpClient(),
  ],
};
