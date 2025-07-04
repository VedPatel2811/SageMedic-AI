import { bootstrapApplication } from '@angular/platform-browser';
import { provideAuth0 } from '@auth0/auth0-angular';
import { App } from './app/app';
import { environment } from './environments/environment';

bootstrapApplication(App, {
  providers: [
    provideAuth0({
      domain: environment.auth0Domain,
      clientId: environment.auth0ClientId,
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ]
});