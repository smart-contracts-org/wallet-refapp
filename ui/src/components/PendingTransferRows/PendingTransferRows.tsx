import React from 'react'; 
import { useGetAllAssetAccounts, useGetAssetInviteRequests, useGetAssetSendRequests, useGetAssetSwapRequests } from '../../ledgerHooks/ledgerHooks';

export const PendingTransferRows: React.FC = () => {
  const assetTransferContracts = useGetAssetSendRequests(isInbound).contracts;

  return (
    <>
    </>
  )
}