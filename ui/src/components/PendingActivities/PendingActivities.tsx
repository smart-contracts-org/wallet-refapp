import { useParty } from '@daml/react';
import React from 'react';
import { useGetAssetInviteRequests, useGetAssetSendRequests } from '../../ledgerHooks/ledgerHooks';
import { PendingRow } from '../PendingRow/PendingRow';

interface PendingActivitiesPageProps {
  isInbound: boolean;
}

export const PendingActivities: React.FC<PendingActivitiesPageProps> = ({isInbound}) => {
  // TODO: fetch pending contracts for swap and assetInvite
  const sendRequests = useGetAssetSendRequests(isInbound);
  const inviteRequests = useGetAssetInviteRequests(isInbound);
  
  console.log(inviteRequests)
  const allRequests = sendRequests.contracts
  const allInviteRequests = inviteRequests.contracts
  const all = [...allRequests, ...allInviteRequests]
  const myPartyId = useParty();

  const templateNameMap = {
    AssetHoldingAccountProposal: 'assetInvite', 
    AssetTransfer: 'send'

  }
  
  const pendingRows = all.map((asset, i)=> {
    
    const sender = asset.signatories[0]
    const sendAmount = asset.payload?.asset?.amount
    const receiver = asset.payload.recipient;
    const contractId = asset.contractId;
    const assetAccountTicker = asset.payload.account?.assetType?.symbol
    const sendTicker = asset.payload?.asset?.assetType.symbol
    const issuer = asset.payload?.asset?.assetType.issuer
    const templateId = asset.templateId.split(':')[2]
    console.log('tempid', templateId)
    
    // Todo: make query for sender instead of doing this filter
    if(!isInbound && receiver === myPartyId){
      return null;
    }
    return (
      <PendingRow contractId={contractId} issuer={issuer} sendTicker={assetAccountTicker || sendTicker} sender={sender} sendAmount={sendAmount} templateName={templateNameMap[templateId]} receiver={receiver} isInbound={isInbound} isNarrow={true} key={i}/>
    )
  })
  
  return (
    <>
      {pendingRows}
    </>
  )
}