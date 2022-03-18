import { useParty } from '@daml/react';
import React from 'react';
import { useGetAssetInviteRequests, useGetAssetSendRequests } from '../../ledgerHooks/ledgerHooks';
import { PendingRow } from '../PendingRow/PendingRow';

interface PendingActivitiesPageProps {
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

interface TemplateNameMap {
  AssetHoldingAccountProposal: string,
  AssetTransfer: string;
}
const templateNameMap: TemplateNameMap = {
  AssetHoldingAccountProposal: 'assetInvite', 
  AssetTransfer: 'send'
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
}

export const PendingActivities: React.FC<PendingActivitiesPageProps> = ({isInbound}) => {
  // TODO: get swap requests
  const assetTransferContracts = useGetAssetSendRequests(isInbound).contracts;
  const assetInviteContracts = useGetAssetInviteRequests(isInbound).contracts;
  const allContracts = [...assetTransferContracts, ...assetInviteContracts]
  const flattenedAllContracts = allContracts.map((contract) => flattenObject(contract)) as Contract[]
  const myPartyId = useParty();


 
  const pendingRows = flattenedAllContracts.map((contract, i)=> {
    
    const sender = contract?.signatories?.[0] || ""
    const sendAmount = contract?.amount
    const receiver = contract?.recipient ||""
    console.log(receiver)
    const contractId = contract?.contractId;
    const assetAccountTicker = contract?.symbol
    const sendTicker = contract?.symbol
    const issuer = contract?.issuer || ""
    const isFungible = contract?.fungible;
    const templateId = contract.templateId?.split(':')[2] || ""
    
    // Todo: make query for sender instead of doing this filter
    if(!isInbound && receiver === myPartyId){
      return null;
    }
    return (
      <PendingRow isFungible={isFungible}  contractId={contractId} issuer={issuer} sendTicker={assetAccountTicker || sendTicker} sender={sender} sendAmount={sendAmount} templateName={templateNameMap[templateId]} receiver={receiver} isInbound={isInbound} isNarrow={true} key={i}/>
    )
  })
  
  return (
    <>
      {pendingRows}
    </>
  )
}