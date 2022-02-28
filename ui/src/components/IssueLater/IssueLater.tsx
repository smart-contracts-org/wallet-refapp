import React from 'react'; 

import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {  Card, CardContent, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
export const useMessageCardsStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  quantity: {
    marginRight: theme.spacing(1)
  },
  success: {
    background: theme.palette.grey[800], 
    display: 'flex', 
    justifyContent: 'center'
  }, 
  icon: {
    justifySelf: 'center', 
    width: '100%'
  }
}))

export const IssueLater: React.FC = () => {
  const classes = useMessageCardsStyles();
  return (
    <Card elevation={0} variant='outlined' className={classes.success}>
      <CardContent>
        <WarningIcon className={classes.icon}/>
      <Typography>
          You can issue assets later by going to "Issued By Me", "Mint/airdrop"
        </Typography>
      </CardContent>
    </Card>
  )
}