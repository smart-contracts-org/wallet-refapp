import React from 'react';
import Typography from '@mui/material/Typography';
import clx from 'clsx'
import {  Divider } from '@mui/material';
import { useNarrowPendingStyles } from '../PendingRowContents/PendingRowContents';

export interface PendingSwapRowProps {
  inboundTicker?: string;
  inboundQuantity?: number;
  outboundTicker?: string;
  outboundQuantity?: number;
  sender: string;
  isInbound?: boolean;
  receiver: string;
}

export const PendingSwapRowContents: React.FC<PendingSwapRowProps> = ({recipient, isInbound, outboundQuantity, outboundTicker, sender, inboundTicker, inboundQuantity }) => {
  const classes = useNarrowPendingStyles();
  const inboundMessage = (
    <>
      <div>
        <div className={classes.divider} />
        <Typography variant='body2' className={clx(classes.text, classes.sender)} color="text.secondary" >
          {sender}
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant='body2' color='text.secondary' className={classes.text} >
          wants to swap
          </Typography>
        <Divider className={classes.divider} />

        <div className={classes.inboundForOutboundContainer}>
          <Typography variant='body2' className={clx(classes.text, classes.inboundQuantity)} color="text.secondary"  >
            {inboundQuantity}
          </Typography>
          <Typography variant='body2' className={clx(classes.text, classes.inboundTicker)} color="text.secondary" >
            {inboundTicker}
          </Typography>
          <Typography variant='body2' color='text.secondary' className={classes.text} >
            for
          </Typography>
          <Typography variant='body2' className={clx(classes.text, classes.outboundQuantity)} color="text.secondary"  >
            {outboundQuantity}
          </Typography>
          <Typography variant='body2' className={clx(classes.text)} color="primary" >
            {outboundTicker}
          </Typography>

        </div>
        <div className={classes.divider} />

      </div>
    </>
  )

  const outboundMessage = (
    <>
      <div>
        <div className={classes.divider} />
        <Typography variant='body2' color='text.secondary' className={classes.text} >
          you want to swap with
          </Typography>
        <Divider className={classes.divider} />
        <Typography variant='body2' className={clx(classes.text, classes.sender)} color="text.secondary" >
          {sender}
        </Typography>
        <Divider className={classes.divider} />

        <div className={classes.inboundForOutboundContainer}>
          <Typography variant='body2' className={clx(classes.text, classes.outboundQuantity)} color="text.secondary"  >
            {outboundQuantity}
          </Typography>
          <Typography variant='body2' className={clx(classes.text)} color="primary" >
            {outboundTicker}
          </Typography>
          <Typography variant='body2' color='text.secondary' className={classes.text} >
            for
          </Typography>
          <Typography variant='body2' className={clx(classes.text, classes.inboundQuantity)} color="text.secondary"  >
            {inboundQuantity}
          </Typography>
          <Typography variant='body2' className={clx(classes.text, classes.inboundTicker)} color="text.secondary" >
            {inboundTicker}
          </Typography>
        </div>
        <div className={classes.divider} />

      </div>
    </>
  )

  return (
    <>
          
          {isInbound ? inboundMessage : outboundMessage}
         
    
    </>
  );
}
