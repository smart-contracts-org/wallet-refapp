
import React from 'react';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import clx from 'clsx'

interface OutboundSendRowContentsProps {
  ticker?: string;
  quantity?: number;
  sender?: string;
  isInbound?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex', 
    alignItems: 'center', 
    
  },
  actions: {
    marginLeft: 'auto'
  }, 
  button: {
    marginRight: theme.spacing(1)
  }, 
  quantity: {
    backgroundColor: 'green'
  }, 
  text: {
    marginLeft: theme.spacing(0.5), 
    marginRight: theme.spacing(0.5)
  }, 
  sender: {
    color: theme.palette.text.primary, 
  }, 
  assetName: {
    color: theme.palette.primary.main
  }
}))

export const OutboundSendRowContents: React.FC<OutboundSendRowContentsProps> = ({ isInbound, sender, ticker, quantity }) => {
  const classes = useStyles();
  
  return (
      <div className={classes.card}>
          <Typography variant='body2' color='text.secondary' className={classes.text} >
            You want to send
          </Typography>
          <Typography variant='body2' className={classes.text} color="text.secondary"  >
            {quantity}
          </Typography>
          <Typography variant='body2' className={clx(classes.text, classes.assetName)} color="text.secondary" >
            {ticker}
          </Typography>
          <Typography variant='body2' color='text.secondary' className={classes.text} >
            to
          </Typography>
          <Typography variant='body2' className={clx(classes.text, classes.sender)} color="text.secondary" >
            {sender}
          </Typography>
      </div>
  );
}
