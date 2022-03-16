import React from 'react';
import { useGetAssetSendRequests } from '../../ledgerHooks/ledgerHooks';
import { PendingRow, PendingRowProps } from '../PendingRow/PendingRow';
import { demoPartyId } from '../TopAppBar/TopAppBar';

// TODO: query templates
export const demoPendingData: PendingRowProps[] = [
  {
    sender: demoPartyId,
    sendTicker: 'BTOKEN', 
    sendAmount: 500,
    templateName: 'send',
    receiver: demoPartyId,
  }, 
  {
    sender: demoPartyId,
    inboundQuantity: 10, 
    inboundTicker: 'BTOKEN',
    outboundQuantity: 50, 
    outboundTicker: 'CTOKEN',
    templateName: 'swap',
    receiver: demoPartyId,

  }, 
  {
    sender: demoPartyId, 
    inboundTicker: 'ALEX', 
    inboundQuantity: 0,
    templateName: 'assetInvite',
    receiver: demoPartyId,
  }
]

export const PendingInboundActivities: React.FC = () => {
  // TODO: fetch pending contracts
  // stream of contracts
  const sendRequests = useGetAssetSendRequests();
  console.log(sendRequests)
  const pendingRows = demoPendingData.map((asset, i)=> {
    return (
      <PendingRow  {...asset} isInbound={true} isNarrow={true} key={i}/>
    )
  })
  return (
    <>
      {pendingRows}
    </>
  )
}