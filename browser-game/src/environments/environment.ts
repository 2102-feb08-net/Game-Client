// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { OktaConfig } from '@okta/okta-angular';

const oktaConfig: OktaConfig = {
  issuer: 'https://dev-4959786.okta.com//oauth2/default',
  clientId: '0oacus699T5de3KhK5d6',
  redirectUri: `${location.origin}/implicit/callback`,
  pkce: true,
  scopes: ['openid', 'email', 'profile' ],
};

export const environment = {
  production: false,
  gameApiBaseUrl: "https://localhost:44332",
  okta: oktaConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
