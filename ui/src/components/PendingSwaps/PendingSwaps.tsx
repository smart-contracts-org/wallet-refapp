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

  console.log('contracts', contracts)
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
    console.log('proposerAssetCid',proposerAssetCid)
    // TODO: add to documentation
    // the proposer creates a PreApproval proposal contract, on which the
    // swap receiver needs to accept / reject
    const requestedAssetsTxPreApprovalCid = contract.payload.requestedAssetsTxPreApprovalCid;

    const pendingSwapRowProps = {
      proposer,
      receiver,
      proposerAssetCid,
      requestedAssetsTxPreApprovalCid,
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