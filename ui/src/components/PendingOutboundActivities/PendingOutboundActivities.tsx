import React from 'react';
import { demoPendingData } from '../PendingInboundActivities/PendingInboundActivities';
import { PendingRow } from '../PendingRow/PendingRow';

export const PendingOutboundActivities: React.FC = () => {
  // TODO: fetch pending contracts
  const pendingRows = demoPendingData.map((asset, i)=> {
    return (
      <PendingRow  {...asset} isInbound={false} isNarrow={true} key={i}/>
    )
  })
  return (
    <>
      {pendingRows}
    </>
  )
}