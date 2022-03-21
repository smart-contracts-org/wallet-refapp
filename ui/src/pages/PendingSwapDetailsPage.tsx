import React from 'react';
import {  useNavigate, useParams } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, Box, Button, Card, CardContent, Fab, IconButton, LinearProgress, Typography } from '@mui/material';
import { useGetAssetContractByContractId, useGetAssetInviteRequests, useGetAssetTransferByContractId, useGetMyOwnedAssetsByAssetType, useGetSingleAssetSendRequest, useGetTradeContractByCid, useGetTransferPreapprovalContractByContractId, useLedgerHooks } from '../ledgerHooks/ledgerHooks';
import { useParty } from '@daml/react';
import { usePageStyles, useQuery } from './PendingActivityDetailsPage/PendingActivityDetailsPage';
import { AssetDetails } from '../components/AssetDetails/AssetDetails';
import { SwapDetails } from '../components/SwapDetails/SwapDetails';
import { demoPartyId } from '../components/TopAppBar/TopAppBar';
import { isMobile } from '../platform/platform';
import { enableFabBack } from './IssueAirdropPage';
import { ContractId } from '@daml/types';
import { Asset } from '@daml.js/wallet-refapp/lib/Asset';
import { Trade } from '@daml.js/wallet-refapp/lib/Trade/module';
import { Swap } from '../components/Swap/Swap';

export const PendingSwapDetailsPage: React.FC = () => {
  
  //TODO grab contract details
  const nav = useNavigate();
  const query = useQuery()
  const myPartyId = useParty();
  const [isCancelled, setIsCancelled] = React.useState(false);
  const tradeCid = query.get('contractId') as ContractId<Trade> || "" as ContractId<Trade>

  const sendAmount = query.get('sendAmount')||"0";
  const recipient = query.get('receiver') ||""
  const issuer = query.get('issuer') || ""
  const isInbound = query.get('isInbound') === 'true'
  const tradeContract = useGetTradeContractByCid(tradeCid)
  const offered = tradeContract.contract
  console.log('offered', offered)
  //TODO: can we use something else besdies contract
  const inboundTicker = query.get('inboundTicker');
  const outboundTicker = query.get('outboundTicker')
  const inboundQuantity = query.get('inboundQuantity')
  const outboundQuantity = query.get('outboundQuantity')
  const requestedAssetsTxPreApproval = query.get('requestedAssetsTxPreApproval') || ""
  // TODO not sure if that's the right way
  const offeredCid = query.get('outboundAssetCid') as ContractId<Asset> || "" as ContractId<Asset>
  
  const sender = query.get('sender');
  console.log('requestedAssetsTxPreApproval', requestedAssetsTxPreApproval)
  const transferPreapproval = useGetTransferPreapprovalContractByContractId(requestedAssetsTxPreApproval).contract;
  const transferPreapprovalLoading = useGetTransferPreapprovalContractByContractId(requestedAssetsTxPreApproval).loading;
  console.log('loading', transferPreapprovalLoading)
  
  console.log('TRANSFER PRE APRROVAL', transferPreapproval)
  
  const transferPreapprovalIssuer = transferPreapproval?.payload.asset.assetType.issuer || "";
  const transferPreapprovalSymbol= transferPreapproval?.payload.asset.assetType.symbol || "W";
  const transferPreapprovalFungible= transferPreapproval?.payload.asset.assetType.fungible || false;
  const transferPreapprovalReference= transferPreapproval?.payload.asset.assetType.reference || ""
  const transferPreapprovalAmount= transferPreapproval?.payload.asset.amount || ""
  console.log('BEFORE CALL')
  console.log('transferPreapprovalIssuer', transferPreapprovalIssuer)
  const outboundAssetContracts = useGetMyOwnedAssetsByAssetType({ issuer: transferPreapprovalIssuer , symbol: transferPreapprovalSymbol, isFungible:  transferPreapprovalFungible, owner: myPartyId, reference: transferPreapprovalReference}).contracts
  const outboundAssetCids = outboundAssetContracts.map((contract) => contract.contractId)
  const offeredAsset = useGetAssetContractByContractId(offeredCid).contract
  console.log('OFFERED ASSET', offeredAsset)
  const offeredIssuer = offeredAsset?.payload.assetType.issuer || ""
  const offeredFungible = offeredAsset?.payload.assetType.fungible || false
  const offeredReference = offeredAsset?.payload.assetType.reference || ""
  const offeredSymbol = offeredAsset?.payload.assetType.symbol || ""
  const offeredAmount = offeredAsset?.payload.amount || ""
  const actionLabel = query.get('templateName')
  const tickerFromQuery = query.get('sendTicker')
 if(transferPreapprovalLoading){
   console.log(transferPreapprovalLoading)
   return (<LinearProgress/>)
 }
  return (
   <Swap
   transferPreapprovalIssuer={transferPreapprovalIssuer}
   transferPreapprovalSymbol={transferPreapprovalSymbol}
   transferPreapprovalFungible={transferPreapprovalFungible}
   transferPreapprovalReference={transferPreapprovalReference}
   transferPreapprovalAmount={transferPreapprovalAmount}
   inboundTicker={inboundTicker}
   outboundTicker={outboundTicker}
   inboundQuantity={inboundQuantity}
   outboundQuantity={outboundQuantity}
   requestedAssetsTxPreApproval={requestedAssetsTxPreApproval}
   offeredCid={offeredCid}
   sender={sender}
   tradeCid={tradeCid}
   sendAmount={sendAmount}
   recipient={recipient}
   issuer={issuer}
   isInbound={isInbound}
   actionLabel={actionLabel}
   tickerFromQuery={tickerFromQuery}

   
   />
 )
}