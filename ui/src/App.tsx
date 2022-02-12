import { Box, CssBaseline } from '@mui/material';
import React from 'react';
import { SideMenu } from './components/SideMenu/SideMenu';
import { TopAppBar } from './components/TopAppBar/TopAppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import { Pages } from './pages/Pages';
import { ContractsProvider } from './providers/ContractsProvider';

const theme = createTheme({
  palette: {
    mode: 'light'
  }
});


export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ContractsProvider>
        <ThemeProvider theme={theme}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopAppBar />
            <SideMenu />
            <Pages />
          </Box>
        </ThemeProvider>
      </ContractsProvider>
    </BrowserRouter>

  );
}

