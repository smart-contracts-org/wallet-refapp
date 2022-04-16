import React from 'react';
import Card from '@mui/material/Card';
import SendIcon from '@mui/icons-material/Send';
import { Link } from "react-router-dom";
import { SendRowContents } from '../SendRowContents/SendRowContents';
import { Avatar, CardActionArea } from '@mui/material';
import { useNarrowPendingStyles } from '../PendingStyles/PendingStyles';
import { createQueriesString } from '../../utils/createQueriesString';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
  return (
    <>
      <Card className={classes.card}>
        <CardActionArea component={Link} to={path}>
          <div className={classes.symbolTextContainer} >
            <Avatar className={classes.avatar}>
              <SendIcon />
            </Avatar>
            <SendRowContents issuer={issuer} isInbound={isInbound} receiver={receiver} amount={amount} isNarrow={isNarrow} sender={sender} symbol={symbol}/>
            
            <ChevronRightIcon sx={{marginRight: 1, marginLeft: 'auto'}}/>

          </div>
        </CardActionArea>
      </Card>
    </>
  );
}
