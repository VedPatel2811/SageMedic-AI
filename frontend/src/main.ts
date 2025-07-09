import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { authConfig } from './app/auth/auth.config';

bootstrapApplication(App, {
  providers: [
    provideProtractorTestingSupport(),
    provideHttpClient(),
    provideRouter(routes), 
    provideAuth0(authConfig)
  ]
}).catch(err => console.error(err));