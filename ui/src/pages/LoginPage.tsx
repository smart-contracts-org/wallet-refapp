// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from 'react'
import Credentials, { computeCredentials } from '../Credentials';
import Ledger from '@daml/ledger';
import { User } from '@daml.js/wallet-refapp';
import { DeploymentMode, deploymentMode, ledgerId, httpBaseUrl } from '../config';
import { Avatar, Box, Card, CardContent, TextField, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getCookieValue } from '../utils/getCookieValue';
import { partyFromToken } from '../utils/getPartyFromToken';
import { LoadingButton } from '@mui/lab';

type Props = {
  onLogin: (credentials: Credentials) => void;
  token?: string;
  party?: string;
}


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

const defaultCounterParty = deploymentMode === DeploymentMode.DEV ? "a" : 'ledger-party-68815041-ad16-4d9a-8177-9f9b20d8fb3f'

export const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = React.useState('');
  const [isLoggingIn, setLoggingIn] = React.useState(false);
  const [hasError, setError] = React.useState(false);
  const classes = useStyles();

  const login = useCallback(async (credentials: Credentials) => {
    try {
      const ledger = new Ledger({ token: credentials.token, httpBaseUrl });
      let userContract = await ledger.fetchByKey(User.User, credentials.party);
      if (userContract === null) {
        const user = { username: credentials.party, following: [] };
        // anyone can create this contract
        userContract = await ledger.create(User.User, user);
        if (credentials.party !== defaultCounterParty){
          console.log('start of create')
          await ledger.create(Account.AssetHoldingAccountRequest, {recipient: credentials.party, owner: defaultCounterParty})
          console.log('after create')
        }
      }
      onLogin(credentials);
    } catch (error) {
      setError(true)
    }
  }, [onLogin]);

  // LOCAL Used in local dev env
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoggingIn(true)
    const credentials = computeCredentials(username);
    await login(credentials);
  }

  // PROD used in prod
  const handleDamlHubLogin = () => {
    setLoggingIn(true)
    window.location.assign('.hub/v1/auth/login')
  }


  React.useEffect(() => {
    const token = getCookieValue('DAMLHUB_LEDGER_ACCESS_TOKEN');
    const url = new URL(window.location.toString());
    if (!token) {
      return
    }
    const party = partyFromToken(token)

    if (party === undefined) {
      return;
    }
    url.search = '';
    window.history.replaceState(window.history.state, '', url.toString());

    login({ token, party, ledgerId }).then(() => { setLoggingIn(false) });
  }, [login]);

  return (
    <div className={classes.root}>
      <div className={classes.localLogin}>
        <Avatar className={classes.avatar} />
        <Box sx={{'marginBottom': 1}}/>
        {deploymentMode !== DeploymentMode.PROD_DAML_HUB ?
          <><TextField
            fullWidth
            size='small'
            variant='outlined'
            placeholder='Username'
            error={hasError}
            value={username}
            className={classes.usernameTextField}
            onChange={e => setUsername(e.currentTarget.value)}
          />
            <LoadingButton
              size='small'
              loading={!hasError && isLoggingIn}
              variant='contained' fullWidth
              onClick={handleLogin}
              className={classes.loginButton}>
              Log in
            </LoadingButton>
          </> :
          <LoadingButton
            variant='contained'
            fullWidth
            loading={isLoggingIn}
            disabled={isLoggingIn}
            className={classes.loginButton}
            onClick={handleDamlHubLogin}>

            Login to wallet
          </LoadingButton>}
        <Card variant='outlined'>
          <CardContent>
            <Typography variant='caption'>
              Welcome to the DA Wallet Ref app.
              </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

