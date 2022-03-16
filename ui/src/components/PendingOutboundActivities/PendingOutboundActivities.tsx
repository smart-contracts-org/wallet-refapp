import React from 'react';
import { useGetAssetSendRequests } from '../../ledgerHooks/ledgerHooks';
import { PendingRow } from '../PendingRow/PendingRow';

interface PendingActivitiesPageProps {
  isInbound: boolean;
}

export const PendingOutboundActivities: React.FC<PendingActivitiesPageProps> = ({isInbound}) => {
  // TODO: fetch pending contracts for swap and assetInvite
  const sendRequests = useGetAssetSendRequests();
  console.log(sendRequests)
  const allRequests = sendRequests.contracts
  
  const pendingRows = allRequests.map((asset, i)=> {
    const sender = asset.signatories[0]
    const sendAmount = asset.payload.asset.amount
    const receiver = asset.payload.recipient
    const contractId = asset.contractId;
    const sendTicker = asset.payload.asset.assetType.symbol
    const issuer = asset.payload.asset.assetType.issuer
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