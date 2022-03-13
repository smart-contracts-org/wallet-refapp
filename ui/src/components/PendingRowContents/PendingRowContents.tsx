import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SendIcon from '@mui/icons-material/Send';

import { SendRowContents } from '../SendRowContents/SendRowContents';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar, CardActionArea } from '@mui/material';
import { PendingRowProps } from '../PendingRow/PendingRow';
import { PendingSwapRowContents } from '../PendingSwapRowContents/PendingSwapRowContents';
import { PendingAssetInviteRowContent } from '../PendingAssetInviteRowContent/PendingAssetInviteRowContent';
export const useNarrowPendingStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(1),
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1)
  },
  button: {
    marginBottom: theme.spacing(0.5),
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
  },
  symbolTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  moreButton: {
    marginLeft: 'auto',
  },
  marginTop: {
    marginTop: theme.spacing(1)
  },
  inboundTicker: {
    color: theme.palette.primary.main
  },
  inboundQuantity: {
    color: 'green'
  },
  outboundTicker: {
    color: 'red',
  },
  outboundQuantity: {
    color: 'red'
  },
  divider: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
  },
  inboundForOutboundContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  avatar: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(2)
  }
}))

export const PendingRowContents: React.FC<PendingRowProps> = ({outboundQuantity, outboundTicker, templateName, isNarrow, isInbound, sender, inboundTicker, inboundQuantity }) => {
  const classes = useNarrowPendingStyles();
  return (
    <>
      <Card className={classes.card}>
        <CardActionArea>
          <div className={classes.symbolTextContainer} >
            <Avatar className={classes.avatar}>
              {templateName === 'send' && <SendIcon />}
              {templateName === 'swap' && <SwapHorizIcon />}
              {templateName !== 'swap' && templateName!== 'send' && <AccountBalanceWalletIcon />}
            </Avatar>
            {
              templateName==='send' &&  <SendRowContents isInbound={isInbound} isNarrow={isNarrow} sender={sender} inboundQuantity={inboundQuantity} inboundTicker={inboundTicker} />
            }
            {
              templateName==='swap' &&  <PendingSwapRowContents outboundQuantity={outboundQuantity} outboundTicker={outboundTicker} isInbound={isInbound} sender={sender} inboundQuantity={inboundQuantity} inboundTicker={inboundTicker} />
            }
            {
              templateName !== 'send' && templateName !== 'swap' && <PendingAssetInviteRowContent isInbound={isInbound} sender={sender} inboundTicker={inboundTicker}/>
            }
            <div className={classes.actions}>
              {isInbound && <Button className={classes.button} variant='outlined' size="small">Accept</Button>}
              <Button className={classes.button} variant='outlined' size="small">{isInbound ? 'Reject' : 'Cancel'}</Button>
              <Button className={classes.button} variant='outlined' size="small"
              // onClick={handleOpen} 
              >Details</Button>
            </div>
          </div>
        </CardActionArea>
      </Card>
    </>
  );
}
