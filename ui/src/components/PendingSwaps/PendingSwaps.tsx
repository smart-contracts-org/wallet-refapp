import { AssetInSwap } from '@daml.js/wallet-refapp/lib/Trade';
import { ContractId } from '@daml/types';
import {   LinearProgress } from '@mui/material';
import React from 'react'; 
import { useGetAssetSwapRequests } from '../../ledgerHooks/ledgerHooks';
import { PendingActivitiesPageProps } from '../PendingActivities/PendingActivities';
import { PendingSwapRow } from '../PendingSwapRow/PendingSwapRow';


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
    const proposerAssetCid = contract.payload.offeredAssetCid as ContractId<AssetInSwap>;
    console.log('contract', contract)
    const requestedAssetTxPreApprovalCid = contract.payload.requestedAssetTxPreApprovalCid;

    const pendingSwapRowProps = {
      proposer,
      receiver,
      proposerAssetCid,
      requestedAssetTxPreApprovalCid,
      isInbound,
      tradeCid
    }
    return (
      <PendingSwapRow key={tradeCid} {...pendingSwapRowProps}/>
    )
  })

  return (
    <>
    {pendingSwapRows}
    </>
  )
}