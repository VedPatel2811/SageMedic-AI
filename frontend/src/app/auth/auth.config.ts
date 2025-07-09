import { AuthClientConfig, AuthConfig } from '@auth0/auth0-angular';
import { environment } from '../../environments/environment';
    
export const authConfig: AuthConfig = {
  domain: environment.auth0Domain,
  clientId: environment.auth0ClientId,
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
};
