import { Box, CssBaseline, LinearProgress, Toolbar } from '@mui/material';
import React from 'react'
import { SideMenu } from './components/SideMenu/SideMenu';
import { TopAppBar } from './components/TopAppBar/TopAppBar';
import {  ThemeProvider } from '@mui/material/styles';
import {  HashRouter } from "react-router-dom";
import { Pages } from './pages/Pages';
import { isMobile } from './platform/platform';
import { SideMenuMobile } from './components/SideMenuMobile.tsx/SideMenuMobile';
import DamlLedger from '@daml/react';
import Credentials from './Credentials';
import { httpBaseUrl } from './config';
import { LoginPage } from './pages/LoginPage';
import { RightDrawer } from './components/RightDrawer/RightDrawer';
import { damlHubLogout } from '@daml/hub-react';
import { SharedSnackbarProvider } from './context/SharedSnackbarContext';
import { theme } from './Theme';

export const App: React.FC = () => {
  const [isOpen, setOpen] = React.useState(false);
  const [isRightOpen, setRightOpen] = React.useState(true);
  const [credentials, setCredentials] = React.useState<Credentials | undefined>();
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const toggleRightOpen = () => {
    setRightOpen(!isRightOpen);
  }
  const onLogout = () => {
    damlHubLogout()
    setCredentials(undefined)
  }
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleIsLoggingIn = (isLoggingIn: boolean) => {
    setIsLoggingIn(isLoggingIn)
  }

  return (
    <HashRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <TopAppBar party={credentials?.party} onLogout={ onLogout} isOpen={isOpen} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} />
          <SharedSnackbarProvider>
          <Toolbar/>
          {isLoggingIn && <LinearProgress sx={{width: '100%'}}/>}
          {
           credentials ? 
              <DamlLedger
                token={credentials?.token}
                party={credentials?.party}
                httpBaseUrl={httpBaseUrl}
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
             <LoginPage isLoggingIn={isLoggingIn} setIsLoggingIn={handleIsLoggingIn} onLogin={setCredentials}/>
          }
          <Box paddingBottom={10}/>
          </SharedSnackbarProvider>
        </ThemeProvider>
    </HashRouter>

  );
}

