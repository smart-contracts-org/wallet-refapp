import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { Avatar, CardActionArea} from '@mui/material';
import { isMobile } from '../../platform/platform';
import { useNarrowPendingStyles } from '../PendingRowContents/PendingRowContents';
import { createQueriesString } from '../../utils/createQueriesString';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { PendingAssetInviteRowContent } from '../PendingAssetInviteRowContent/PendingAssetInviteRowContent';

export interface PendingAccountInviteRowProps {
  sender: string;
  receiver: string;
  isNarrow: boolean;
  isInbound: boolean;
  accountInviteCid:string;
  owner: string;
  // assetType
  symbol: string;
  issuer: string;
  isFungible: boolean;
  reference: string;
  isAirdroppable: boolean;
  isShareable: boolean;

}

export const PendingAccountInviteRow: React.FC<PendingAccountInviteRowProps> = (props) => {
  const classes = useNarrowPendingStyles();
  const {
    isAirdroppable, 
    isShareable, 
    owner, 
    isFungible, 
    reference, 
    accountInviteCid, 
    issuer, 
    symbol, 
    sender, 
    receiver, 
    isInbound
  } = props;
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
  const queriesInput = [
    ['sender', sender],
    ['receiver', receiver],
    ['symbol', symbol],
    ['issuer', issuer],
    ['contractId', accountInviteCid],
    ['templateName', 'accountInvite'],
    ['isFungible', isFungible ? 'true' : 'false'],
    ['reference', reference as string],
    ['isAirdroppable', `${isAirdroppable}`],
    ['owner', owner],
    ['isInbound', `${isInbound}`],
    ['isShareable', `${isShareable}`]
  ]
  const queries = createQueriesString(queriesInput)
  const path = `/pending-activity?` + queries
  console.log(path)
  return (
    <>
      <Card className={classes.card}>
        <CardActionArea component={Link} to={path}>
          <div className={classes.symbolTextContainer} >
            <Avatar className={classes.avatar}>
              <AccountBalanceWalletIcon />
            </Avatar>
            <PendingAssetInviteRowContent issuer={issuer} receiver={receiver} isInbound={isInbound} sender={sender} inboundTicker={symbol}/>  
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
