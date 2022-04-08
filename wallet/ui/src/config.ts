// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { encode } from 'jwt-simple';
import { isRunningOnHub } from '@daml/hub-react';

export type Insecure = {
  provider: "none",
  makeToken: (party: string) => string,
};

export type DamlHub = {
  provider: "daml-hub",
};

export enum DeploymentMode {
  DEV,
  PROD_DAML_HUB,
  PROD_OTHER,
}

export type Auth0 =  {
  provider: "auth0",
  domain: string,
  clientId: string
};

export const deploymentMode: DeploymentMode =
  process.env.NODE_ENV === 'development'
  ? DeploymentMode.DEV
  // TODO: endsWith is also changed from legacy
  : window.location.hostname.endsWith('.daml.app')
  ? DeploymentMode.PROD_DAML_HUB
  : DeploymentMode.PROD_OTHER;

// Decide the ledger ID based on the deployment mode first,
// then an environment variable, falling back on the sandbox ledger ID.
export const ledgerId: string =
  deploymentMode === DeploymentMode.PROD_DAML_HUB
  ? window.location.hostname.split('.')[0]
  : process.env.REACT_APP_LEDGER_ID
  ?? 'wallet-refapp-sandbox';
export const httpBaseUrl =
deploymentMode === DeploymentMode.PROD_DAML_HUB
// TODO: Note that this is changed from legacy
  ? `https://${ledgerId}.daml.app/`
  : undefined;

export type Authentication = Insecure | DamlHub | Auth0;

export const authConfig: Authentication = (() => {
  if (isRunningOnHub()) {
    const auth: DamlHub = {
      provider: "daml-hub",
    };
    return auth;
  } else if (process.env.REACT_APP_AUTH && process.env.REACT_APP_AUTH.toLowerCase() === "auth0") {
    if (process.env.REACT_APP_AUTH0_DOMAIN && process.env.REACT_APP_AUTH0_CLIENT_ID) {
      const auth: Auth0 = {
        provider: "auth0",
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        clientId: process.env.REACT_APP_AUTH0_CLIENT_ID
      };
      return auth;
    } else {
      throw new Error("Missing env vars: AUTH0_DOMAIN & AUTH0_CLIENT_ID must be set.");
    }
  } else {
    const ledgerId: string = process.env.REACT_APP_LEDGER_ID ?? "delete-later-sandbox"
    const auth: Insecure = {
      provider: "none",
      makeToken: (party) => {
        const payload = {
          "https://daml.com/ledger-api": {
            "ledgerId": ledgerId,
            "applicationId": 'delete-later',
            "actAs": [party]
          }
        }
        return encode(payload, "secret", "HS256");
      }
    };
    return auth;
  }
})();
