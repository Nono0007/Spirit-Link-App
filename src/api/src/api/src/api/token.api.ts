import {
    env,
    authenticationTokenResponseI,
    refreshAuthenticationTokenOptionsI,
  } from '../interfaces';
  import { kingsChatApiPaths } from '../constants';
  
  export const refreshAuthenticationTokenRequest = ({
    refreshAuthenticationTokenOptions,
    environment = 'prod',
  }: {
    refreshAuthenticationTokenOptions: refreshAuthenticationTokenOptionsI;
    environment?: env;
  }): Promise<authenticationTokenResponseI> => {
    return fetch(`${kingsChatApiPaths[environment]}/oauth2/token`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: refreshAuthenticationTokenOptions.clientId,
        grant_type: 'refresh_token',
        refresh_token: refreshAuthenticationTokenOptions.refreshToken,
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json().then(payload => {
            return {
              accessToken: payload.access_token,
              expiresInMillis: payload.expires_in_millis,
              refreshToken: payload.refresh_token,
            } as authenticationTokenResponseI;
          });
        }
        return Promise.reject(Error('error'));
      })
      .catch(error => {
        return Promise.reject(Error(error.message));
      });
  };
  
  export default {
    refreshAuthenticationTokenRequest,
  };