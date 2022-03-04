import React from 'react';
import { PendingAssetInviteRow } from '../PendingAssetInviteRow/PendingAssetInviteRow';
import { PendingAssetInviteRowNarrow } from '../PendingAssetInviteRowNarrow/PendingAssetInviteRowNarrow';
import { PendingSendRow } from '../PendingSendRow/PendingSendRow';
import { PendingSendRowNarrow } from '../PendingSendRowNarrow/PendingSendRowNarrow';
import { PendingSwapRow } from '../PendingSwapRow/PendingSwapRow';
import { PendingSwapRowNarrow } from '../PendingSwapRowNarrow/PendingSwapRowNarrow';

export interface PendingRowProps {
  sender?: string;
  isInbound: boolean;
  inboundTicker?: string;
  inboundQuantity?: number;
  outboundTicker?: string;
  outboundQuantity?: number;
  isNarrow?: boolean;
  templateName?: string;
}

export const PendingRow: React.FC<PendingRowProps> = (props) => {
  const { isNarrow } = props
  console.log(props)
  if (props.templateName === 'swap') {
    return (isNarrow ? <PendingSwapRowNarrow {...props} /> : <PendingSwapRow {...props} />
    )
  }
  if (props.templateName === 'send') {
    return (
      isNarrow ? <PendingSendRowNarrow {...props} /> : <PendingSendRow {...props} />
    )
  }
  return (
    isNarrow ? <PendingAssetInviteRowNarrow {...props} /> : <PendingAssetInviteRow {...props} />
  )
}