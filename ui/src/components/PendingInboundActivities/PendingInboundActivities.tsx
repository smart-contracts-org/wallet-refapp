import React from 'react';
import { PendingRow, PendingRowProps } from '../PendingRow/PendingRow';

// TODO: query templates
const inboundData: PendingRowProps[] = [
  {
    isInbound: true, 
    sender: 'User-1000101-010100',
    inboundTicker: 'BTOKEN', 
    inboundQuantity: 1000,
    templateName: 'send'
  }, 
  {
    isInbound: true, 
    sender: 'User-B-2849283',
    inboundQuantity: 10, 
    inboundTicker: 'BTOKEN',
    outboundQuantity: 50, 
    outboundTicker: 'CTOKEN',
    templateName: 'swap'
  }, 
  {
    isInbound: true, 
    sender: 'User-Alex-4345', 
    inboundTicker: 'ALEX', 
    inboundQuantity: 0,
    templateName: 'assetInvite'
  }
]

export const PendingInboundActivities: React.FC = () => {
  // TODO: fetch pending contracts
  const pendingRows = inboundData.map((asset, i)=> {
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