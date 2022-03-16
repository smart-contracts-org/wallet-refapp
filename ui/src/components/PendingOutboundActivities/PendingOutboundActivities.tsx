import React from 'react';
import { useGetAssetSendRequests } from '../../ledgerHooks/ledgerHooks';
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
    const sendTicker = asset.payload.asset.assetType.symbol
    
    return (
      <PendingRow sendTicker={sendTicker} sender={sender}  {...asset} sendAmount={sendAmount} templateName='send' receiver={receiver} isInbound={false} isNarrow={true} key={i}/>
    )
  })
  return (
    <>
      {pendingRows}
    </>
  )
}