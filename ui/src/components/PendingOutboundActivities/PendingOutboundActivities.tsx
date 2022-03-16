import React from 'react';
import { useGetAssetSendRequests } from '../../ledgerHooks/ledgerHooks';
import { demoPendingData } from '../PendingInboundActivities/PendingInboundActivities';
import { PendingRow } from '../PendingRow/PendingRow';

export const PendingOutboundActivities: React.FC = () => {
  // TODO: fetch pending contracts for swap and assetInvite
  const sendRequests = useGetAssetSendRequests();
  console.log(sendRequests)
  const allRequests = sendRequests.contracts
  
  const pendingRows = allRequests.map((asset, i)=> {
    const sender = asset.signatories[0]
    const sendAmount = asset.payload.asset.amount
    const receiver = asset.payload.recipient
    
    return (
      <PendingRow sender={sender}  {...asset} sendAmount={sendAmount} templateName='send' receiver={receiver} isInbound={false} isNarrow={true} key={i}/>
    )
  })
  return (
    <>
      {pendingRows}
    </>
  )
}