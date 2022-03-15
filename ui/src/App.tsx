import { Box, CssBaseline, Toolbar } from '@mui/material';
import React from 'react';
import { SideMenu } from './components/SideMenu/SideMenu';
import { TopAppBar } from './components/TopAppBar/TopAppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  HashRouter } from "react-router-dom";
import { Pages } from './pages/Pages';


import { ContractsProvider } from './providers/ContractsProvider';
import { isMobile } from './platform/platform';
import { SideMenuMobile } from './components/SideMenuMobile.tsx/SideMenuMobile';
import DamlLedger from '@daml/react';
import Credentials from './Credentials';
import { httpBaseUrl } from './config';
import { LoginPage } from './pages/LoginPage';
import { partyFromToken } from './utils/getPartyFromToken';
import { deleteCookie } from './utils/deleteCookie';


const theme = createTheme({
  palette: {
    mode: 'dark'
  }
});

export const App: React.FC = () => {
  const [isOpen, setOpen] = React.useState(false);
  const [rerender, setRerender] = React.useState(false);
  const [credentials, setCredentials] = React.useState<Credentials | undefined>(undefined);
  const tokenCookiePair = document.cookie.split('; ').find(row => row.startsWith('DAMLHUB_LEDGER_ACCESS_TOKEN')) || '';
  const tokenCookieSecret = tokenCookiePair.slice(tokenCookiePair.indexOf('=') + 1);
  const token = tokenCookieSecret || localStorage.getItem('party.token');
  const partyId = partyFromToken(token || "");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const onLogout = () => {
    deleteCookie('DAMLHUB_LEDGER_ACCESS_TOKEN')
    // used because deleting the cookie will not trigger rerender
    setRerender(!rerender);
  }
  const handleDrawerClose = () => {
    setOpen(false);
  };

  
  return (
    <HashRouter>
      <ContractsProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <TopAppBar party={ partyId || credentials?.party} onLogout={ onLogout} isOpen={isOpen} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} />

          <Toolbar/>
          {
           ( token || credentials) ? 
              <DamlLedger
                token={token || credentials?.token || ""}
                party={partyId || credentials?.party || ""}
                httpBaseUrl={httpBaseUrl || ""}
              >
                <Box sx={{ display: 'flex' }}>
                  {(isMobile() ?
                    <SideMenuMobile isOpen={isOpen} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} /> :
                    <SideMenu />)
                  }
                  <Pages setCredentials={setCredentials} />
                </Box>
              </DamlLedger>
             : 
             <LoginPage onLogin={setCredentials}/>

          }
          <Box paddingBottom={10}/>
        </ThemeProvider>
      </ContractsProvider>
    </HashRouter>

  );
}

