import { OktaConfig } from '@okta/okta-angular';

const oktaConfig: OktaConfig = {
  issuer: 'https://dev-4959786.okta.com//oauth2/default',
  clientId: '0oacus699T5de3KhK5d6',
  redirectUri: `${location.origin}/implicit/callback`,
  pkce: true,
  scopes: ['openid', 'email', 'profile' ],
};

export const environment = {
  production: true,
  gameApiBaseUrl: 'https://reventure-game-server.azurewebsites.net',
  okta: oktaConfig
};
