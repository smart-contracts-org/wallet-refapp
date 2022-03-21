import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Link } from "react-router-dom";
import { SendRowContents } from '../SendRowContents/SendRowContents';
import { Avatar, Box, CardActionArea, IconButton, Typography } from '@mui/material';
import { isMobile } from '../../platform/platform';
import { useNarrowPendingStyles } from '../PendingRowContents/PendingRowContents';
import { createQueriesString } from '../../utils/createQueriesString';

export interface PendingTransferRowProps {
  amount: string;
  sender: string;
  receiver: string;
  isNarrow: boolean;
  isInbound: boolean;
  transferCid:string;
  owner: string;
  // assetType
  symbol: string;
  issuer: string;
  isFungible: boolean;
  reference: string;

}

export const PendingTransferRow: React.FC<PendingTransferRowProps> = (props) => {
  const classes = useNarrowPendingStyles();
  const {owner, isFungible, reference, transferCid, issuer, amount, symbol, sender, receiver, isNarrow, isInbound} = props;
  console.log(props)
  const onAccept = (event: React.SyntheticEvent) => {
    event.preventDefault();
  }

  const onCancel = (event: React.SyntheticEvent) => {
    event.preventDefault();
  }
  const onReject = (event: React.SyntheticEvent) => {
    event.preventDefault();
  }
  const quriesInput = [
    ['sender', sender],
    ['receiver', receiver],
    ['amount', amount],
    ['symbol', symbol],
    ['issuer', issuer],
    ['contractId', transferCid],
    ['templateName', 'send'],
    ['isFungible', isFungible ? 'true' : 'false'],
    ['reference', reference as string],
    ['owner', owner],
    ['isInbound', `${isInbound}`]
  ]
  const queries = createQueriesString(quriesInput)
  const path = `/pending-activity?` + queries
  console.log(path)
  return (
    <>
      <Card className={classes.card}>
        <CardActionArea component={Link} to={path}>
          <div className={classes.symbolTextContainer} >
            <Avatar className={classes.avatar}>
              <SendIcon />
            </Avatar>
            <SendRowContents issuer={issuer} isInbound={isInbound} receiver={receiver} amount={amount} isNarrow={isNarrow} sender={sender} symbol={symbol}/>
            {!isMobile() && <div className={classes.actions}>
              {isInbound && <Button className={classes.button} variant='outlined' size="small" onClick={onAccept}>Accept</Button>}
              <Button onClick={isInbound ? onReject : onCancel} className={classes.button} variant='outlined' size="small">{isInbound ? 'Reject Request' : 'Cancel Request'}</Button>
              <Button className={classes.button} variant='outlined' size="small"
              >Details</Button>
            </div>}
          </div>
        </CardActionArea>
      </Card>
    </>
  );
}
