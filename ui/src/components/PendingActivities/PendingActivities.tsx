import { useParty } from '@daml/react';
import React from 'react';
import { useGetAssetSendRequests } from '../../ledgerHooks/ledgerHooks';
import { PendingRow } from '../PendingRow/PendingRow';

interface PendingActivitiesPageProps {
  isInbound: boolean;
}

export const PendingActivities: React.FC<PendingActivitiesPageProps> = ({isInbound}) => {
  // TODO: fetch pending contracts for swap and assetInvite
  const sendRequests = useGetAssetSendRequests(isInbound);
  const allRequests = sendRequests.contracts
  const myPartyId = useParty();
  const pendingRows = allRequests.map((asset, i)=> {
    
    const sender = asset.signatories[0]
    const sendAmount = asset.payload.asset.amount
    const receiver = asset.payload.recipient;
    const contractId = asset.contractId;
    const sendTicker = asset.payload.asset.assetType.symbol
    const issuer = asset.payload.asset.assetType.issuer
    
    // Todo: make query for sender instead of doing this filter
    if(!isInbound && receiver === myPartyId){
      return null;
    }
    return (
      <PendingRow contractId={contractId} issuer={issuer} sendTicker={sendTicker} sender={sender} sendAmount={sendAmount} templateName='send' receiver={receiver} isInbound={isInbound} isNarrow={true} key={i}/>
    )
  })
  
  return (
    <>
      {pendingRows}
    </>
  )
}