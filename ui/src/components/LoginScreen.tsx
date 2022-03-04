// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from 'react'
import Credentials, { computeCredentials } from '../Credentials';
import Ledger from '@daml/ledger';
import { User } from '@daml.js/wallet-refapp';
import { DeploymentMode, deploymentMode, ledgerId, httpBaseUrl } from '../config';
import { useEffect } from 'react';
import { Button, TextField, Toolbar } from '@mui/material';
import jwt_decode from "jwt-decode";

type Props = {
  onLogin: (credentials: Credentials) => void;
}

/**
 * React component for the login screen of the `App`.
 */

 const partyFromToken = (token: string) => {
  try {
    const decoded = jwt_decode(token);
    const party = decoded["https://daml.com/ledger-api"].actAs.shift()
    return party
  } catch (e) {
    console.log(e.message || "failed to extract party from jwt token")
    return undefined;
  }
}

const getCookieValue = (name: string): string => (
  document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
)

const LoginScreen: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = React.useState('');

  

  const login = useCallback(async (credentials: Credentials) => {
    console.log('login cre', credentials)
    try {
      const ledger = new Ledger({ token: credentials.token, httpBaseUrl });
      let userContract = await ledger.fetchByKey(User.User, credentials.party);
      console.log('userContract', userContract)
      if (userContract === null) {
        console.log('no user')
        const user = { username: credentials.party, following: [] };
        // anyone can create this contract
        userContract = await ledger.create(User.User, user);
      }
      onLogin(credentials);
    } catch (error) {
      alert(`Unknown error:\n${error}`);
    }
  }, [onLogin]);

  // Used in local dev env
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const credentials = computeCredentials(username);
    await login(credentials);
  }

  // used in prod
  const handleDamlHubLogin = () => {
    window.location.assign('.hub/v1/auth/login')
  }

  
  useEffect(() => {
    const token = getCookieValue('DAMLHUB_LEDGER_ACCESS_TOKEN');
    const url = new URL(window.location.toString());
    const party = partyFromToken(token)
  
    if (party === undefined) {
      return;
    }
    url.search = '';
    window.history.replaceState(window.history.state, '', url.toString());
    
    login({ token, party, ledgerId });
  }, [login]);

  return (
    <div>
      <Toolbar />
      <div>
        <div>
          {deploymentMode !== DeploymentMode.PROD_DAML_HUB
            ? <>
              {/* div_BEGIN */}
              <TextField
                fullWidth
                placeholder='Username'
                value={username}
                onChange={e => setUsername(e.currentTarget.value)}
              />
              <Button
                onClick={handleLogin}>
                Log in
                </Button>
              {/* div_END */}
            </>
            : <Button onClick={handleDamlHubLogin}>
              Log in with Daml Hub
              </Button>
          }
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
