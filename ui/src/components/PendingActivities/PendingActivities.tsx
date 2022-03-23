import React from 'react';
import { PendingAccountInvites } from '../PendingAccountInvites/PendingAccountInvites';
import { PendingSwaps } from '../PendingSwaps/PendingSwaps';
import { PendingTransfers } from '../PendingTransfers/PendingTransfers';

export interface PendingActivitiesPageProps {
  isInbound: boolean;
}

// the key is the assetTemplate
// mapping it to a string


export const PendingActivities: React.FC<PendingActivitiesPageProps> = ({isInbound}) => { 
  return (
    <>
    <PendingTransfers isInbound={isInbound}/>
    <PendingAccountInvites isInbound={isInbound}/>
    <PendingSwaps isInbound={isInbound}/>
    </>
  )
}