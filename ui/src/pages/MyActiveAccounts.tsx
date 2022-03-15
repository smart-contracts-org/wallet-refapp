import Box from '@mui/material/Box';
import React from 'react';
import { OwnedByMeTab } from '../tabContents/OwnedByMeTab';
import { isMobile } from '../platform/platform';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: isMobile() ? theme.spacing(0, 0, 0, 0) : theme.spacing(3)
  }
}))


export const MyActiveAccountsPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Box component="main" sx={{ flexGrow: 1, }} className={classes.root}>
       <Box sx={{ marginLeft: isMobile() ? 1 : 0, marginRight: isMobile() ? 1 : 0 }}>
          <OwnedByMeTab />
      </Box>
    </Box>
  )
}