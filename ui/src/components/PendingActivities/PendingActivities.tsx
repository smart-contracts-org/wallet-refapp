import { Asset } from '@daml.js/wallet-refapp/lib/Asset';
import { useParty } from '@daml/react';
import { ContractId } from '@daml/types';
import React from 'react';
import { useGetAllAssetAccounts, useGetAssetInviteRequests, useGetAssetSendRequests, useGetAssetSwapRequests } from '../../ledgerHooks/ledgerHooks';
import { PendingAccountInvites } from '../PendingAccountInvites/PendingAccountInvites';
import { PendingRow } from '../PendingRow/PendingRow';
import { PendingTransfers } from '../PendingTransfers/PendingTransfers';

export interface PendingActivitiesPageProps {
  isInbound: boolean;
}

export const flattenObject = (obj: any) => {
  const flattened = {}

  Object.keys(obj).forEach((key) => {
    const value = obj[key]

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject(value))
    } else {
      flattened[key] = value
    }
  })

  return flattened
}

// the key is the assetTemplate
// mapping it to a string
interface TemplateNameMap {
  AssetHoldingAccountProposal: string,
  AssetTransfer: string;
  Trade: string;
}
const templateNameMap: TemplateNameMap = {
  AssetHoldingAccountProposal: 'assetInvite', 
  AssetTransfer: 'send',
  Trade: 'swap',
}
interface Contract {
  signatories?: string[];
  amount?: string;
  recipient?: string;
  contractId?: string;
  symbol?: string;
  issuer?: string;
  fungible?: boolean;
  templateId?: string;
  requestedAssetsTxPreApproval?: string;
  offeredAsset?: string;
}

// This components grabs all pending contracts
// that need to be actioned on
export const PendingActivities: React.FC<PendingActivitiesPageProps> = ({isInbound}) => {
  
  const assetInviteContracts = useGetAssetInviteRequests(isInbound).contracts;
  const allSwapContracts = useGetAssetSwapRequests(isInbound).contracts
  const allContracts = [ ...assetInviteContracts, ...allSwapContracts]
  const flattenedAllContracts = allContracts.map((contract) => flattenObject(contract)) as Contract[]
  const myPartyId = useParty();




  const pendingRows = flattenedAllContracts.map((contract, i)=> {
    
    console.log(contract)
    const sender = contract?.signatories?.[0] || ""
    const sendAmount = contract?.amount
    const receiver = contract?.recipient ||""
    const contractId = contract?.contractId;
    const assetAccountTicker = contract?.symbol
    const sendTicker = contract?.symbol
    const issuer = contract?.issuer || ""
    const isFungible = contract?.fungible;
    const templateId = contract.templateId?.split(':')[2] || ""
    
    // used in swaps
    const outboundAssetCid = contract?.offeredAsset as ContractId<Asset> || "";
    const requestedAssetsTxPreApproval = contract?.requestedAssetsTxPreApproval || ""
    // Todo: make query for sender instead of doing this filter
    
    if(!isInbound && receiver === myPartyId){
      return null;
    }
    if(templateNameMap[templateId] === 'swap' )
    return (
      <PendingRow 
      isFungible={isFungible}  
      contractId={contractId} 
      issuer={issuer} 
      sendTicker={assetAccountTicker || sendTicker} 
      sender={sender} sendAmount={sendAmount} 
      templateName={templateNameMap[templateId]} 
      receiver={receiver} 
      isInbound={isInbound} 
      isNarrow={true} 
      key={i}
      requestedAssetsTxPreApproval={requestedAssetsTxPreApproval}
      outboundAssetCid={outboundAssetCid}
      />
    )
  })
  
  return (
    <>
    <PendingTransfers isInbound={isInbound}/>
    <PendingAccountInvites isInbound={isInbound}/>
    </>
  )
}