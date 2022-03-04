import { Box, CssBaseline } from '@mui/material';
import React from 'react';
import { SideMenu } from './components/SideMenu/SideMenu';
import { TopAppBar } from './components/TopAppBar/TopAppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import { Pages } from './pages/Pages';
import jwt_decode from "jwt-decode";

import { ContractsProvider } from './providers/ContractsProvider';
import { isMobile } from './platform/platform';
import { SideMenuMobile } from './components/SideMenuMobile.tsx/SideMenuMobile';
import { AppOld } from './components/AppOld';

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
});


export const App: React.FC = () => {
  const [isOpen, setOpen] = React.useState(false);
 
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
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopAppBar isOpen={isOpen} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} />
            {isMobile() ? <SideMenuMobile isOpen={isOpen} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} /> : <SideMenu />}
          <AppOld />
            <Pages />
          </Box>
        </ThemeProvider>
      </ContractsProvider>
    </BrowserRouter>

  );
}

