import { Typography, Card } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1), 
    marginBottom: theme.spacing(1)
  }
}))

export const PendingFeatureSend: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant='h5' gutterBottom>
        Pending Feature
      </Typography>
      <Card variant='outlined' className={classes.root}>
        <Typography variant='h6' gutterBottom>
          Pre-approved send
      </Typography>
        <Typography color='text.secondary' gutterBottom>
          To allow for sending of assets without requiring the recipient to explicitly "accept" it.
          If you would like to develop it, make a PR here.
      </Typography>
      </Card>
    </>
  )
}