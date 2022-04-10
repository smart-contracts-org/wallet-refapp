// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from 'react'
import Credentials from '../Credentials';
import Ledger from '@daml/ledger';
import { DamlHubLogin as DamlHubLoginBtn } from '@daml/hub-react';
import { authConfig, DeploymentMode, deploymentMode, Insecure } from '../config';
import { useAuth0 } from "@auth0/auth0-react";
import { User, Account } from '@daml.js/wallet-refapp';
import { LoadingButton } from '@mui/lab';
import { useAdminParty } from '@daml/hub-react';
import { Avatar, Box, Card, CardContent, TextField, Typography, Button, LinearProgress } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

type Props = {
  onLogin: (credentials: Credentials) => void;
}

/**
 * React component for the login screen of the `App`.
 */
 const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '70vh',
  },
  localLogin: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loginButton: {
    marginBottom: theme.spacing(2)
  },
  usernameTextField: {
    marginBottom: theme.spacing(1)
  },
  avatar: {
    marginBottom: theme.spacing(1)
  },
}))

export const LoginPage: React.FC<Props> = ({onLogin}) => {
  const classes = useStyles();
  const admin = useAdminParty();
  console.log('admin party', admin)
  
  const login = useCallback(async (credentials: Credentials) => {
    try {
      const ledger = new Ledger({token: credentials.token});
      let userContract = await ledger.fetchByKey(User.User, credentials.party);
      console.log('user contract', userContract, 'default', admin)
      if (userContract === null) {
        const user = {username: credentials.party, following: []};
        userContract = await ledger.create(User.User, user);
        
        // if (credentials.party){
        //   console.log('creating AssetHoldingAccountRequest')
        //   await ledger.create(Account.AssetHoldingAccountRequest, {recipient: credentials.party, owner: defaultCounterParty})
        // }
      }
      onLogin(credentials);
    } catch(error) {
      alert(`Unknown error:\n${JSON.stringify(error)}`);
    }
  }, [onLogin]);



  const wrap: (c: JSX.Element) => JSX.Element = (component) =>
  <div className={classes.root}>
  <div className={classes.localLogin}>
    <Avatar className={classes.avatar} />
    <Box sx={{'marginBottom': 1}}/>
    {component}
    <Card variant='outlined'>
      <CardContent>
        <Typography variant='caption'>
          Welcome to the DA Wallet Ref app.
          </Typography>
      </CardContent>
    </Card>
  </div>
</div>

  const InsecureLogin: React.FC<{auth: Insecure}> = ({auth}) => {
    const [username, setUsername] = React.useState('');
    const handleLogin = async (event: React.FormEvent) => {
      event.preventDefault();
      await login({party: username,
                   token: auth.makeToken(username)} as Credentials);
    }
    return wrap(<>
      {/* FORM_BEGIN */}
      <TextField fullWidth
                  placeholder='Username'
                  value={username}
                 size='small'
                  onChange={e => setUsername(e.currentTarget.value)} sx={{marginBottom: 1}} />
      <Button fullWidth variant='contained' 
              onClick={handleLogin}>
        Log in to wallet
      </Button>
      {/* FORM_END */}
    </>);
  };

  const DamlHubLogin: React.FC = () => (
    wrap(
      <DamlHubLoginBtn
        withButton
        withToken
        onLogin={creds => {
          

          console.log('creds', creds, 'admin', admin)
          if (creds) {
            login(creds);
          }
        }}
        options={{
          method: {
            button: {
              render: () => <Button variant='contained' fullWidth></Button>,
            },
          },
        }}
        />
    )
  );

  const Auth0Login: React.FC = () => {
    const { user, isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
    (async function () {
      if (isLoading === false && isAuthenticated === true) {
        if (user !== undefined) {
          const creds: Credentials = {
            party: user["https://daml.com/ledger-api"],
            token: (await getAccessTokenSilently({
                     audience: "https://daml.com/ledger-api"}))};
          login(creds );
        }
      }
    })();
    return wrap(<LoadingButton 
                       
                        disabled={isLoading || isAuthenticated}
                        loading={isLoading || isAuthenticated}
                        onClick={loginWithRedirect}>
                  Log in
                </LoadingButton>);
  };

  if (authConfig.provider === "none") {
  } else if (authConfig.provider === "daml-hub") {
  } else if (authConfig.provider === "auth0") {
  }
 
  return authConfig.provider === "none"
       ? <InsecureLogin auth={authConfig} />
       : authConfig.provider === "daml-hub"
       ? <DamlHubLogin />
       : authConfig.provider === "auth0"
       ? <Auth0Login />
       : <div>Invalid configuation.</div>;
};
