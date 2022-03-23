import React from 'react';
import Card from '@mui/material/Card';
import { Link } from "react-router-dom";
import { Avatar, CardActionArea} from '@mui/material';
import { createQueriesString } from '../../utils/createQueriesString';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { PendingAssetInviteRowContent } from '../PendingAssetInviteRowContent/PendingAssetInviteRowContent';
import { useNarrowPendingStyles } from '../PendingStyles/PendingStyles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
            <ChevronRightIcon sx={{marginRight: 1, marginLeft: 'auto'}}/>

          </div>
        </CardActionArea>
      </Card>
    </>
  );
}
