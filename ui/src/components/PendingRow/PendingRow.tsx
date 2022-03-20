import { Asset } from '@daml.js/wallet-refapp/lib/Asset';
import { ContractId } from '@daml/types';
import React from 'react';
import { PendingRowContents } from '../PendingRowContents/PendingRowContents';
import { PendingSwapRow } from '../PendingSwapRow/PendingSwapRow';

export interface PendingRowProps {
  sender: string;
  isInbound?: boolean;
  inboundTicker?: string;
  inboundQuantity?: number;
  sendAmount?: number | string;
  sendTicker?: string;
  outboundTicker?: string;
  outboundQuantity?: number;
  isNarrow?: boolean;
  templateName?: string;
  receiver: string;
  issuer: string;
  contractId?: string;
  isFungible?: boolean;
  outboundAssetCid?: ContractId<Asset>;
  requestedAssetsTxPreApproval?: string;
}

export const PendingRow: React.FC<PendingRowProps> = (props) => {
  if(props.templateName === 'swap'){
    return <PendingSwapRow {...props}/>
  }
  return (
    <PendingRowContents {...props}/>
  )
}