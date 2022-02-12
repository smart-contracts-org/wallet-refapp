import React from 'react';
import { PendingAssetInviteRow } from '../PendingAssetInviteRow/PendingAssetInviteRow';
import { PendingSendRow } from '../PendingSendRow/PendingSendRow';
import { PendingSwapRow } from '../PendingSwapRow/PendingSwapRow';

export const PendingInboundActivities: React.FC = () => {
  return (
    <>
      <PendingSendRow isInbound sender='User-1000101-010100' ticker={'BTOKEN'} quantity={1000} />
      <PendingSendRow isInbound sender='User-Alex-43324' ticker={'ALEX'} quantity={25000} />
      <PendingSwapRow sender='User-B-2849283' inboundQuantity={10} inboundTicker={'BTOKEN'} outboundQuantity={50} outboundTicker={'CTOKEN'} />
      <PendingAssetInviteRow sender='User-Max-3024894' ticker={'MAXCOIN'} />
    </>
  )
}