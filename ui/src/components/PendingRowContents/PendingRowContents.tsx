import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SendIcon from '@mui/icons-material/Send';
import { Link } from "react-router-dom";

import { SendRowContents } from '../SendRowContents/SendRowContents';
import { Avatar, CardActionArea } from '@mui/material';
import { PendingRowProps } from '../PendingRow/PendingRow';
import { PendingSwapRowContents } from '../PendingSwapRowContents/PendingSwapRowContents';
import { PendingAssetInviteRowContent } from '../PendingAssetInviteRowContent/PendingAssetInviteRowContent';
import { isMobile } from '../../platform/platform';
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

export const PendingRowContents: React.FC<PendingRowProps> = ({receiver, outboundQuantity, sendAmount, sendTicker, outboundTicker, templateName, isNarrow, isInbound, sender, inboundTicker, inboundQuantity }) => {
  const classes = useNarrowPendingStyles();
  const pendingDetailsPath = `/pending-activity?isInbound=${isInbound ? 'true': 'false'}&templateName=${templateName}&sender=${sender}&inboundTicker=${inboundTicker}`

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea component={Link} to={pendingDetailsPath}>
          <div className={classes.symbolTextContainer} >
            <Avatar className={classes.avatar}>
              {templateName === 'send' && <SendIcon />}
              {templateName === 'swap' && <SwapHorizIcon />}
              {templateName !== 'swap' && templateName!== 'send' && <AccountBalanceWalletIcon />}
            </Avatar>
            {
              templateName==='send' &&  <SendRowContents isInbound={isInbound} receiver={receiver} sendAmount={sendAmount} isNarrow={isNarrow} sender={sender} sendTicker={sendTicker} outboundTicker={outboundTicker} />
            }
            {
              templateName==='swap' &&  <PendingSwapRowContents 
                receiver={receiver} outboundQuantity={outboundQuantity} outboundTicker={outboundTicker} isInbound={isInbound} sender={sender} inboundQuantity={inboundQuantity} inboundTicker={inboundTicker} />
            }
            {
              templateName !== 'send' && templateName !== 'swap' && <PendingAssetInviteRowContent isInbound={isInbound} sender={sender} inboundTicker={inboundTicker}/>
            }
            {!isMobile() && <div className={classes.actions}>
              {isInbound && <Button className={classes.button} variant='outlined' size="small">Accept</Button>}
              <Button className={classes.button} variant='outlined' size="small">{isInbound ? 'Reject' : 'Cancel'}</Button>
              <Button className={classes.button} variant='outlined' size="small"
              >Details</Button>
            </div>}
          </div>
        </CardActionArea>
      </Card>
    </>
  );
}
