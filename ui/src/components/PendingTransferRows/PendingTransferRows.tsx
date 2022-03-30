import React from 'react'; 
import { useGetAllAssetAccounts, useGetAssetInviteRequests, useGetAssetTransfers, useGetAssetSwapRequests } from '../../ledgerHooks/ledgerHooks';

export const PendingTransferRows: React.FC = () => {
  const assetTransferContracts = useGetAssetTransfers(isInbound).contracts;

  return (
    <>
    </>
  )
}