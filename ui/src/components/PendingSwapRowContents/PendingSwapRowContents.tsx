import React from 'react';
import Typography from '@mui/material/Typography';
import clx from 'clsx'
import { Divider } from '@mui/material';
import { useNarrowPendingStyles } from '../PendingRowContents/PendingRowContents';

export interface PendingSwapRowProps {
  inboundTicker: string;
  inboundQuantity: string;
  outboundTicker: string;
  outboundQuantity: string;
  sender: string;
  isInbound?: boolean;
  receiver: string;
  isSwapDetailsPage?: boolean;
  outboundAssetCid?: string;
  requestedAssetsTxPreApproval?: string;
}

export const PendingSwapRowContents: React.FC<PendingSwapRowProps> = (props) => {
  const {
    inboundQuantity,
    inboundTicker,
    outboundQuantity,
    outboundTicker,
    isSwapDetailsPage,
    receiver,
    isInbound,
    sender
  } = props
  const classes = useNarrowPendingStyles();
  const inboundMessage = (
    <>
      <div>
        <div className={classes.divider} />
        {!isSwapDetailsPage && <Typography variant='body2' className={clx(classes.text, classes.sender)} color="text.secondary" >
          {sender}
        </Typography>}
        <Divider className={classes.divider} />
        <Typography variant='body2' color='text.secondary' className={classes.text} >
          {!isSwapDetailsPage ? 'wants to swap' : 'swapping'}
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
          {isSwapDetailsPage ? 'swapping' : 'you want to swap with'}
        </Typography>
        <Divider className={classes.divider} />
        {!isSwapDetailsPage && <><Typography variant='body2' className={clx(classes.text, classes.sender)} color="text.secondary" >
          {receiver}
        </Typography>
          <Divider className={classes.divider} /></>}

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
