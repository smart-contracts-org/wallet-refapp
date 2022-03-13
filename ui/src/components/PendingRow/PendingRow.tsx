import React from 'react';
import { PendingRowContents } from '../PendingRowContents/PendingRowContents';

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
  return (
    <PendingRowContents {...props}/>
  )
}