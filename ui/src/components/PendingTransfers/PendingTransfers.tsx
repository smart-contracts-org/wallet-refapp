import { LinearProgress } from '@mui/material';
import React from 'react'; 
import { useGetAssetSendRequests } from '../../ledgerHooks/ledgerHooks';
import { PendingTransferRow } from '../PendingTransferRow/PendingTransferRow';

interface PendingTransfersProps {
  isInbound: boolean;
}

export const PendingTransfers: React.FC<PendingTransfersProps> = (props) => {
  const {isInbound} = props;
  const {loading, contracts} = useGetAssetSendRequests(isInbound);
  
  if(loading){
    return <LinearProgress/>
  }
  const pendingTransferRows = contracts.map((contract) => {
    const amount = contract.payload.asset.amount;
    const sender = contract.payload.asset.owner
    // assetType info for retrieving asset account
    const {issuer, fungible, symbol, reference} = contract.payload.asset.assetType
    const receiver = contract.payload.recipient
    const transferCid = contract.contractId
    const owner = contract.payload.asset.owner
    const pendingTransferRowProps = {
      amount,
      symbol,
      sender,
      receiver,
      issuer,
      isInbound,
      isNarrow: true,
      transferCid,
      isFungible: fungible, 
      reference: reference as string,
      owner
    }
    return (
      <PendingTransferRow {...pendingTransferRowProps}/>
    )
  })

  return (
    <>
    {pendingTransferRows}
    </>
  )
}