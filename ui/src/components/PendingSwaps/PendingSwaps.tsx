import { Asset } from '@daml.js/wallet-refapp';
import { ContractId } from '@daml/types';
import { Card, CardContent, LinearProgress } from '@mui/material';
import React from 'react'; 
import { useGetAllAssetAccounts, useGetAssetInviteRequests, useGetAssetSendRequests, useGetAssetSwapRequests } from '../../ledgerHooks/ledgerHooks';
import { PendingActivitiesPageProps } from '../PendingActivities/PendingActivities';
import { PendingRowProps } from '../PendingRow/PendingRow';
import { PendingSwapRow } from '../PendingSwapRow/PendingSwapRow';
import { PendingTransferRow, PendingTransferRowProps } from '../PendingTransferRow/PendingTransferRow';


export const PendingSwaps: React.FC<PendingActivitiesPageProps> = (props) => {
  const {isInbound} = props;
  const {loading, contracts} = useGetAssetSwapRequests(isInbound)

  
  if(loading){
    return <LinearProgress/>
  }
  if(contracts.length === 0){
    return null
  }
  const pendingSwapRows = contracts.map((contract) => {
    const proposer = contract.payload.proposer;
    const receiver = contract.payload.receiver;
    const tradeCid = contract.contractId;
    const proposerAssetCid = contract.payload.offeredAsset as ContractId<Asset.Asset>;
    
    // TODO: add to documentation
    // the proposer creates a PreApproval proposal contract, on which the
    // swap receiver needs to accept / reject
    const requestedAssetsTxPreApproval = contract.payload.requestedAssetsTxPreApproval;

    const pendingSwapRowProps = {
      proposer,
      receiver,
      proposerAssetCid,
      requestedAssetsTxPreApproval,
      isInbound,
      tradeCid
    }
    return (
      <PendingSwapRow {...pendingSwapRowProps}/>
    )
  })

  return (
    <>
    {pendingSwapRows}
    </>
  )
}