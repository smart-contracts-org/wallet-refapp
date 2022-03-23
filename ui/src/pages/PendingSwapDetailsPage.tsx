import React from 'react';

import { ContractId } from '@daml/types';
import { Asset } from '@daml.js/wallet-refapp/lib/Asset';
import { Trade, TransferPreApproval } from '@daml.js/wallet-refapp/lib/Trade/module';
import { Swap } from '../components/Swap/Swap';
import { useGetTransferPreapprovalContractByContractId } from '../ledgerHooks/ledgerHooks';
import { LinearProgress } from '@mui/material';

interface PendingSwapDetailsPageProps {
  tradeCid: ContractId<Trade>;
  receiver: string;
  proposer: string;
  requestedAssetsTxPreApproval: ContractId<TransferPreApproval>;
  proposerAssetCid: ContractId<Asset>;
  isInbound: string;
  proposerAssetSymbol: string;
  proposerAssetReference: string;
  proposerAssetIssuer: string;
  proposerAssetAmount: string;
  proposerAssetOwner: string
  proposerAssetIsFungible: boolean;
  receiverAssetOwner: string
  receiverAssetSymbol: string;
  receiverAssetReference: string
  receiverAssetIsFungible: boolean;
  receiverAssetAmount: string
  receiverAssetIssuer: string
}

export const PendingSwapDetailsPage: React.FC<PendingSwapDetailsPageProps> = (props) => {
  const {
    proposer,
  tradeCid,
  receiver,
  requestedAssetsTxPreApproval,
  proposerAssetCid,
  isInbound,
  proposerAssetSymbol,
  proposerAssetReference,
  proposerAssetIssuer,
  proposerAssetAmount,
  proposerAssetOwner,
  proposerAssetIsFungible,
  receiverAssetOwner,
  receiverAssetSymbol,
  receiverAssetReference,
  receiverAssetIsFungible,
  receiverAssetAmount,
  receiverAssetIssuer,
  } = props;
  

  // TODO not sure if that's the right way
  
  const transferPreapprovalLoading = useGetTransferPreapprovalContractByContractId(requestedAssetsTxPreApproval).loading;
  
  
  // This is the receiver assets
  // since it is the proposer that iniates the swap, 
 
 
  if(transferPreapprovalLoading){
   return (<LinearProgress/>)
 }
 const swapProps = {
   tradeCid,
   requestedAssetsTxPreApproval,
   proposer,
   proposerAssetCid,
   receiverAssetSymbol,
   receiverAssetIsFungible,
   receiverAssetIssuer,
   receiverAssetReference,
   receiverAssetAmount,
   receiverAssetOwner,
   proposerAssetSymbol,
   proposerAssetIsFungible,
   proposerAssetReference,
   proposerAssetIssuer,
   proposerAssetOwner,
   proposerAssetAmount,
   receiver,
   isInbound,
 }
  return (
   <Swap {...swapProps}
    
 

   
   />
 )
}