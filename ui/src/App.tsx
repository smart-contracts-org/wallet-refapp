import { Box, CssBaseline, Toolbar } from '@mui/material';
import React from 'react';
import { SideMenu } from './components/SideMenu/SideMenu';
import { TopAppBar } from './components/TopAppBar/TopAppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import { Pages } from './pages/Pages';

import { ContractsProvider } from './providers/ContractsProvider';
import { isMobile } from './platform/platform';
import { SideMenuMobile } from './components/SideMenuMobile.tsx/SideMenuMobile';
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
          <CssBaseline/>
          <TopAppBar party={credentials?.party} onLogout={() => { setCredentials(undefined) }} isOpen={isOpen} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} />
          <Toolbar/>
          {
            credentials ? 
              <DamlLedger
                token={credentials?.token || ""}
                party={credentials?.party || ""}
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
             : <LoginPage onLogin={setCredentials}/>

          }



        </ThemeProvider>
      </ContractsProvider>
    </BrowserRouter>

  );
}

