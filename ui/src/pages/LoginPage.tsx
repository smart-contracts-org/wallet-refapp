// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from "react";
import Credentials from "../Credentials";
import Ledger from "@daml/ledger";
import { DamlHubLogin as DamlHubLoginBtn } from "@daml/hub-react";
import {
  authConfig,
  DeploymentMode,
  deploymentMode,
  Insecure,
} from "../config";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadingButton } from "@mui/lab";
import { useAdminParty } from "@daml/hub-react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  LinearProgress,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { AssetHoldingAccountRequest } from "@daml.js/account/lib/Account/module";
import { User } from "@daml.js/user/lib/User/module";

type Props = {
  onLogin: (credentials: Credentials) => void;
  setIsLoggingIn?: (isLoggingIn: boolean) => void;
  isLoggingIn?: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    height: "70vh",
  },
  localLogin: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loginButton: {
    marginBottom: theme.spacing(2),
  },
  usernameTextField: {
    marginBottom: theme.spacing(1),
  },
  avatar: {
    marginBottom: theme.spacing(1),
  },
}));

export const LoginPage: React.FC<Props> = ({
  onLogin,
  setIsLoggingIn,
  isLoggingIn,
}) => {
  const classes = useStyles();
  const prodAdminParty = useAdminParty();
  const admin = deploymentMode === DeploymentMode.DEV ? "a" : prodAdminParty;

  const login = useCallback(
    async (credentials: Credentials, admin?: string) => {
      try {
        const ledger = new Ledger({ token: credentials.token });
        let userContract = await ledger.fetchByKey(User, credentials.party);
        if (userContract === null) {
          console.log('creating', userContract)
          const user = { username: credentials.party, following: [] };
          userContract = await ledger.create(User, user);

          if (admin && admin !== credentials.party) {
            await ledger.create(AssetHoldingAccountRequest, {
              recipient: credentials.party,
              owner: admin,
            });
          }
        }
        onLogin(credentials);
      } catch (error) {
        alert(`Unknown error:\n${JSON.stringify(error)}`);
      }
    },
    [onLogin]
  );

  if (!admin) {
    return <LinearProgress sx={{ width: "100%" }} />;
  }

  const wrap: (c: JSX.Element) => JSX.Element = (component) => (
    <div className={classes.root}>
      <div className={classes.localLogin}>
        <Avatar className={classes.avatar} />
        <Box sx={{ marginBottom: 1 }} />
        {component}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="caption">
              Welcome to the DA Wallet Ref app.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const InsecureLogin: React.FC<{ auth: Insecure }> = ({ auth }) => {
    const [username, setUsername] = React.useState("");
    const handleLogin = async (event: React.FormEvent) => {
      event.preventDefault();
      await login(
        { party: username, token: auth.makeToken(username) } as Credentials,
        admin
      );
    };
    return wrap(
      <>
        {/* FORM_BEGIN */}
        <TextField
          fullWidth
          placeholder="Username"
          value={username}
          size="small"
          autoComplete="off"
          onChange={(e) => setUsername(e.currentTarget.value)}
          sx={{ marginBottom: 1 }}
        />
        <Button fullWidth variant="contained" onClick={handleLogin}>
          Log in to wallet
        </Button>
        {/* FORM_END */}
      </>
    );
  };

  const DamlHubLogin: React.FC = () =>
    wrap(
      <DamlHubLoginBtn
        withButton
        withToken
        onLogin={(creds) => {
          console.log("ON LOGIN");
          if (creds) {
            login(creds, admin);
          }
        }}
        options={{
          method: {
            button: {
              text: "Log Into Wallet",
              render: () => (
                <LoadingButton
                  onClick={() => {
                    console.log("HI");
                  }}
                  loading={false}
                  loadingPosition="end"
                  sx={{ margin: 1 }}
                  variant="contained"
                  fullWidth
                ></LoadingButton>
              ),
            },
          },
        }}
      />
    );

  const Auth0Login: React.FC = () => {
    const {
      user,
      isAuthenticated,
      isLoading,
      loginWithRedirect,
      getAccessTokenSilently,
    } = useAuth0();
    (async function () {
      if (isLoading === false && isAuthenticated === true) {
        if (user !== undefined) {
          const creds: Credentials = {
            party: user["https://daml.com/ledger-api"],
            token: await getAccessTokenSilently({
              audience: "https://daml.com/ledger-api",
            }),
          };
          login(creds);
        }
      }
    })();
    return wrap(
      <LoadingButton
        disabled={isLoading || isAuthenticated}
        loading={isLoading || isAuthenticated}
        onClick={loginWithRedirect}
      >
        Log in
      </LoadingButton>
    );
  };

  if (authConfig.provider === "none") {
  } else if (authConfig.provider === "daml-hub") {
  } else if (authConfig.provider === "auth0") {
  }

  return authConfig.provider === "none" ? (
    <InsecureLogin auth={authConfig} />
  ) : authConfig.provider === "daml-hub" ? (
    <DamlHubLogin />
  ) : authConfig.provider === "auth0" ? (
    <Auth0Login />
  ) : (
    <div>Invalid configuation.</div>
  );
};
