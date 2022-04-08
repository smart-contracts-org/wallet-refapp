import { Box, CssBaseline, Toolbar } from '@mui/material';
import React, { useCallback } from 'react'
import { SideMenu } from './components/SideMenu/SideMenu';
import { TopAppBar } from './components/TopAppBar/TopAppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  HashRouter } from "react-router-dom";
import { Pages } from './pages/Pages';
import Ledger from '@daml/ledger';
import { User, Account } from '@daml.js/wallet-refapp';


import { ContractsProvider } from './providers/ContractsProvider';
import { isMobile } from './platform/platform';
import { SideMenuMobile } from './components/SideMenuMobile.tsx/SideMenuMobile';
import DamlLedger from '@daml/react';
import Credentials from './Credentials';
import { DeploymentMode, deploymentMode, httpBaseUrl } from './config';
import { LoginPage } from './pages/LoginPage';
import { partyFromToken } from './utils/getPartyFromToken';
import { deleteCookie } from './utils/deleteCookie';
import  { DamlHubLogin, useAdminParty } from '@daml/hub-react';
import { RightDrawer } from './components/RightDrawer/RightDrawer';


const theme = createTheme({
  palette: {
    mode: 'dark'
  }
});

export const App: React.FC = () => {
  const [isOpen, setOpen] = React.useState(false);
  const [isRightOpen, setRightOpen] = React.useState(true);
  const [rerender, setRerender] = React.useState(false);
  // credentials is used when logging in with JWT
  const [credentials, setCredentials] = React.useState<Credentials | undefined>(undefined);
  const tokenCookiePair = document.cookie.split('; ').find(row => row.startsWith('DAMLHUB_LEDGER_ACCESS_TOKEN')) || '';
  const tokenCookieSecret = tokenCookiePair.slice(tokenCookiePair.indexOf('=') + 1);
  const token = tokenCookieSecret || localStorage.getItem('party.token');
  console.log('token cookie pair', tokenCookiePair)
  console.log('token', token)
  const ledgerPartyId = partyFromToken(token || "");
  const admin = useAdminParty()
  console.log(admin)
  const defaultCounterParty = deploymentMode === DeploymentMode.DEV ? "a" : admin

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const toggleRightOpen = () => {
    setRightOpen(!isRightOpen);
  }

  const onLogout = () => {
    deleteCookie('DAMLHUB_LEDGER_ACCESS_TOKEN')
    setCredentials(undefined)
    // used because deleting the cookie will not trigger rerender
    setRerender(!rerender);
  }
  const handleDrawerClose = () => {
    setOpen(false);
  };

    
  const newUserContractSetup = async (token: string) => {
    console.log('login ran')
    try {
      const ledger = new Ledger({ token: token, httpBaseUrl });
      let userContract = await ledger.fetchByKey(User.User, ledgerPartyId);
      console.log('user', userContract)
      if (userContract === null) {
        const user = { username: ledgerPartyId, following: [] };
        // anyone can create this contract
        userContract = await ledger.create(User.User, user);
        console.log('defaultC', defaultCounterParty)
        if (defaultCounterParty && ledgerPartyId !== defaultCounterParty){
          await ledger.create(Account.AssetHoldingAccountRequest, {recipient: ledgerPartyId, owner: defaultCounterParty})
        }
      }
    } catch (error) {
      console.log('error')
    }
  }

  console.log('cred', credentials)
  
 
  React.useEffect(() =>{
    if(token){

      newUserContractSetup(token)
    }
  }, [token])
 
  const login = async (credentials: Credentials) => {
    setCredentials(credentials);
    try {
      const ledger = new Ledger({ token: credentials.token, httpBaseUrl });
      let userContract = await ledger.fetchByKey(User.User, credentials.party);
      console.log('user', userContract)
      if (userContract === null) {
        const user = { username: credentials.party, following: [] };
        // anyone can create this contract
        userContract = await ledger.create(User.User, user);
        if (defaultCounterParty && credentials.party !== defaultCounterParty){
          await ledger.create(Account.AssetHoldingAccountRequest, {recipient: credentials.party, owner: defaultCounterParty})
        }
      }
    } catch (error) {
    }
  }
 

  
  return (
    <HashRouter>
      <ContractsProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <TopAppBar party={ ledgerPartyId || credentials?.party} onLogout={ onLogout} isOpen={isOpen} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} />

          <Toolbar/>
          {
           ( token || credentials) ? 
              <DamlLedger
                token={token || credentials?.token || ""}
                party={ledgerPartyId || credentials?.party || ""}
                httpBaseUrl={httpBaseUrl || ""}
              >
                <Box sx={{ display: 'flex' }}>
                  {(isMobile() ?
                    <SideMenuMobile isOpen={isOpen} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} /> :
                    <SideMenu isRightOpen={isRightOpen} toggleRightOpen={toggleRightOpen} />)
                  }

                  <Pages setCredentials={setCredentials} />

                 {!isMobile() && <RightDrawer isOpen={isRightOpen}/>}
                </Box>
              </DamlLedger>
             : 
             <>
             <LoginPage onLogin={setCredentials} />
             <DamlHubLogin withToken withButton onLogin={(credential, error) => {
              console.log('logincallback', 'credential',credential, 'error', error)
              if(error){
                console.log(error)
              }
             
              if(credential){
                login({token: credential.token, ledgerId: credential.ledgerId, party: credential.party})
              }
            }}/>
            </>

          }
          <Box paddingBottom={10}/>
        </ThemeProvider>
      </ContractsProvider>
    </HashRouter>

  );
}

