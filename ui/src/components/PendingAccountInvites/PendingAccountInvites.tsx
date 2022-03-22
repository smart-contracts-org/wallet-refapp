import React from 'react';
import { Card, CardContent, LinearProgress } from '@mui/material';
import { PendingActivitiesPageProps } from '../PendingActivities/PendingActivities';
import { useGetAssetInviteRequests } from '../../ledgerHooks/ledgerHooks';
import { PendingAccountInviteRow } from '../PendingAccountInviteRow/PendingAccountInviteRow';



export const PendingAccountInvites: React.FC<PendingActivitiesPageProps> = (props) => {
  const {isInbound} = props;
  const {loading, contracts} = useGetAssetInviteRequests(isInbound);
  const accountInviteRows = contracts.map((contract) => {
  const {
    symbol,
    issuer, 
    fungible, 
    reference
  } = contract.payload.account.assetType
  
  const {
    owner,
    airdroppable,
    resharable
  } = contract.payload.account

  const receiver = contract.payload.recipient
  const accountInviteCid = contract.contractId;
  const sender = contract.signatories[0];
  const pendingAccountInviteRowProps = {
    symbol, 
    issuer, 
    isFungible: fungible, 
    reference: reference as string,
    isInbound,
    owner,
    isAirdroppable: airdroppable,
    isShareable: resharable,
    receiver,
    isNarrow: true,
    accountInviteCid,
    sender
  }

    return (
      <PendingAccountInviteRow {...pendingAccountInviteRowProps} />
    )
  })
  
  if(loading){
    return <LinearProgress/>
  }
  if(contracts.length === 0){
    return (
      null
    )
  }
  
  return ( 
    <>
    {accountInviteRows}
    </>
  )
}