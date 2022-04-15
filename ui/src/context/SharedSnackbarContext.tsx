import React from 'react';
import { Close } from '@mui/icons-material';
import { Alert, AlertColor, IconButton, Snackbar } from '@mui/material';
import { isMobile } from '../platform/platform';

interface SharedSnackbarContextProps {
  isOpen: boolean;
  message: string;
  severity?: AlertColor;
  closeSnackbar: () => void;
  openSnackbar: (message: string, severity?: AlertColor ) => void;
}
interface SnackbarState {
  isOpen: boolean;
  message: string;
  severity?: AlertColor;

}

export const SharedSnackbarContext = React.createContext<SharedSnackbarContextProps>({} as SharedSnackbarContextProps);

export const SharedSnackbarProvider: React.FC<unknown> = ({children}) => {
  const [state, setState] = React.useState<SnackbarState>({
    isOpen: false,
    message: '',
    severity: undefined
  })

  const openSnackbar = (message: string, severity?: AlertColor) => {
    console.log('fired')
    setState((state) => ({ ...state, isOpen: true, message, severity: severity }))
  }
  const closeSnackbar = () => {
    setState((state) => ({ ...state, isOpen: false, message: '' , severity: undefined}))
  }

  return (
    <SharedSnackbarContext.Provider value={{
      openSnackbar,
      closeSnackbar,
      isOpen: state.isOpen,
      message: state.message,
      severity: state.severity
    }}>
      <Snackbar
        anchorOrigin={{
          vertical: isMobile() ? 'top' :'top',
          horizontal: 'left',
        }}
        sx={isMobile() ? { top: { xs: 64, sm: 0 } } : undefined}

        open={state.isOpen}
        autoHideDuration={5000}
        onClose={closeSnackbar}
        action={[
          ,
        ]}
      >
        <Alert variant='filled' onClose={closeSnackbar} sx={{width:'100%'}} severity={state.severity}>
          {state.message}
          
        </Alert>
        
      </Snackbar>

      {children}
    </SharedSnackbarContext.Provider>
  )

}

export const SharedSnackbarConsumer = SharedSnackbarContext.Consumer