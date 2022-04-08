import { Paper, Typography } from '@mui/material';
import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { LoadingButton } from '@mui/lab';
import clx from 'clsx'
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  userID: {
    width: '50%',
    marginRight: theme.spacing(0.5)

  },
  status: {
    width: '20%',
    marginRight: theme.spacing(0.5)
  },
  quantity: {
    width: '20%',
    marginRight: theme.spacing(0.5)

  },
  button: {
    width: '10%',
    marginLeft: 'auto'
  }, 
  pending: {
    color: theme.palette.warning.light
  }
}))

export const AssetAccountInviteRow: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography className={classes.userID} variant='caption'>
        Alex-user-name-00100
      </Typography>
            
      <Typography className={clx (classes.status, classes.pending)} variant='caption'>
        Pending
      </Typography>
      <LoadingButton
        loading={false}
        loadingPosition="end"
        variant="outlined"
        size='small'
        className={classes.button}
      >
        Cancel
      </LoadingButton>
    </Paper>
  )
}