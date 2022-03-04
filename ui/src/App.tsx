import { Box, CssBaseline } from '@mui/material';
import React from 'react';
import { SideMenu } from './components/SideMenu/SideMenu';
import { TopAppBar } from './components/TopAppBar/TopAppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import { Pages } from './pages/Pages';

import { ContractsProvider } from './providers/ContractsProvider';
import { isMobile } from './platform/platform';
import { SideMenuMobile } from './components/SideMenuMobile.tsx/SideMenuMobile';
import { AppOld } from './components/AppOld';
import DamlLedger from '@daml/react';
import Credentials from './Credentials';
import { httpBaseUrl } from './config';
import { LoginPage } from './pages/LoginPage';


const theme = createTheme({
  palette: {
    mode: 'dark'
  }
});


export const App: React.FC = () => {
  const [isOpen, setOpen] = React.useState(false);
  const [credentials, setCredentials] = React.useState<Credentials | undefined>();
  console.log(credentials)
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <BrowserRouter>
      <ContractsProvider>
        <ThemeProvider theme={theme}>
          
        <DamlLedger
        token={credentials?.token || ""}
        party={credentials?.party || ""}
        httpBaseUrl={httpBaseUrl || ""}
      >
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopAppBar isOpen={isOpen} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} />
            {(isMobile() ? 
            <SideMenuMobile isOpen={isOpen} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} /> : 
            <SideMenu />)
            }
            <Pages setCredentials={setCredentials} />
          </Box>
          </DamlLedger>
        </ThemeProvider>
      </ContractsProvider>
    </BrowserRouter>

  );
}

