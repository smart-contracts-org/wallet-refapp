import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import React from 'react';
import { PendingAccountInvites } from '../PendingAccountInvites/PendingAccountInvites';
import { PendingSwaps } from '../PendingSwaps/PendingSwaps';
import { PendingTransfers } from '../PendingTransfers/PendingTransfers';

export interface PendingActivitiesPageProps {
  isInbound: boolean;
}

export const PendingActivities: React.FC<PendingActivitiesPageProps> = (props) => { 
  const {isInbound} = props;

  return (
    <>
     <Card  elevation={0} variant='outlined'>
            <Typography color='text.primary' variant='body2' p={1}>
            Pending inbound / outbound requests for asset transfers, swaps, and asset holding account invitations will be shown here. User action is required. You can either <b>Accept</b>, <b>reject</b>, or <b>cancel</b> (outbound) requests
        </Typography>
          </Card>
    <PendingTransfers isInbound={isInbound}/>
    <PendingAccountInvites isInbound={isInbound}/>
    <PendingSwaps isInbound={isInbound}/>
    </>
  )
}