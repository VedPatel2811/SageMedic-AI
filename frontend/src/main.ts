import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';

import { App } from './app/app';
import { environment } from './environments/environment';

bootstrapApplication(App, {
  providers: [
    provideProtractorTestingSupport(),
    provideHttpClient(),
    provideAuth0({
      domain: environment.auth0Domain,
      clientId: environment.auth0ClientId,
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  ]
}).catch(err => console.error(err));