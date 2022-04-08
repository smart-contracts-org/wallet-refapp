import React from 'react';
import Typography from '@mui/material/Typography';
import {  Divider } from '@mui/material';

import clx from 'clsx'
import { PendingRowProps } from '../PendingRow/PendingRow';
import { useNarrowPendingStyles } from '../PendingStyles/PendingStyles';

export const PendingAssetInviteRowContent: React.FC<PendingRowProps> = (props) => {
  const { 
    isInbound, 
    sender, 
    inboundTicker, 
    receiver 
  } = props
  const classes = useNarrowPendingStyles();

  const inboundMessage = (
    <>
      <div className={classes.divider} />
      <Typography variant='body2' className={classes.text} color="text.primary" >
        {sender}
      </Typography>
      <Divider className={classes.divider} />
      <Typography variant='body2' color='text.secondary' className={classes.text} >
        Invites you to create asset holding account for
          </Typography>
      <Divider className={classes.divider} />

      <Typography variant='body2' className={clx(classes.text, classes.assetName)} color="text.secondary" >
        {inboundTicker}
      </Typography>
      <div className={classes.divider} />

    </>
  )
  const outboundMessage = (
    <>
      <div className={classes.divider} />
      <Typography variant='body2' color='text.secondary' className={classes.text} >
        You are inviting {receiver}
    </Typography>
      <Divider className={classes.divider} />
      <Typography className={classes.text} variant='body2' color='text.secondary'>
      to create asset holding account for
      </Typography>
      <Divider className={classes.divider}/>
      <Typography variant='body2' className={clx(classes.text, classes.assetName)} color="text.secondary" >
        {inboundTicker}
      </Typography>
      <div className={classes.divider} />
    </>
  )

  return (
    <>
          <div>
            {isInbound ? inboundMessage : outboundMessage}
          </div>
    </>
  );
}


