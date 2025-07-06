import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const envVars = {
  apiUrl: process.env['NG_APP_API_URL'] ?? '',
  auth0Domain: process.env['NG_APP_AUTH0_DOMAIN'] ?? '',
  auth0ClientId: process.env['NG_APP_AUTH0_CLIENT_ID'] ?? ''
};


const createEnvFile = (path: string, production: boolean) => {
  const config = `
export const environment = {
  production: ${production},
  apiUrl: '${envVars.apiUrl}',
  auth0Domain: '${envVars.auth0Domain}',
  auth0ClientId: '${envVars.auth0ClientId}'
};
`;
  fs.writeFileSync(path, config);
  console.log(`✅ Wrote environment file: ${path}`);
};

createEnvFile('./src/environments/environment.ts', false);
createEnvFile('./src/environments/environment.prod.ts', true);
