// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from 'react'
import Credentials, { computeCredentials } from '../Credentials';
import Ledger from '@daml/ledger';
import { User } from '@daml.js/wallet-refapp';
import { DeploymentMode, deploymentMode, ledgerId, httpBaseUrl } from '../config';
import { useEffect } from 'react';
import { Button, TextField, Toolbar } from '@mui/material';
import { partyFromToken } from '../utils/getPartyFromToken';
import { Token } from '@mui/icons-material';

interface LoginScreenProps {
  onLogin: (credentials: Credentials) => void;
  token?: string;
  party?: string;
}

/**
 * React component for the login screen of the `App`.
 */

 

const getCookieValue = (name: string): string => (
  document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
)

const LoginScreen: React.FC<LoginScreenProps> = ({party,token, onLogin }) => {
  // Username is used locally, not when using Daml hub
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
    console.log('login screen useEffect')
    const url = new URL(window.location.toString());
  
    if (party === undefined || !token) {
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
