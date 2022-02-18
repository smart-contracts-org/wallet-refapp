import React from 'react';
import { isMobile } from '../../platform/platform';
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

export const PendingOutboundActivities: React.FC = () => {
  // TODO: fetch pending contracts
  const isNarrow = isMobile();
  const pendingRows = inboundData.map((asset, i)=> {
    return (
      <PendingRow  {...asset} isInbound={false} isNarrow={isNarrow} key={i}/>
    )
  })
  return (
    <>
      {pendingRows}
    </>
  )
}