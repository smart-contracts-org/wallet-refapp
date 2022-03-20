import React from 'react';
import {  useNavigate, useParams } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, Box, Button, Card, CardContent, Fab, IconButton, Typography } from '@mui/material';
import { useGetAssetContractByContractId, useGetAssetInviteRequests, useGetAssetTransferByContractId, useGetMyOwnedAssetsByAssetType, useGetSingleAssetSendRequest, useGetTransferPreapprovalContractByContractId, useLedgerHooks } from '../ledgerHooks/ledgerHooks';
import { useParty } from '@daml/react';
import { usePageStyles, useQuery } from './PendingActivityDetailsPage/PendingActivityDetailsPage';
import { AssetDetails } from '../components/AssetDetails/AssetDetails';
import { SwapDetails } from '../components/SwapDetails/SwapDetails';
import { demoPartyId } from '../components/TopAppBar/TopAppBar';
import { isMobile } from '../platform/platform';
import { enableFabBack } from './IssueAirdropPage';

export const PendingSwapDetailsPage: React.FC = () => {
  
  //TODO grab contract details
  const nav = useNavigate();
  const query = useQuery()
  const myPartyId = useParty();
  const [isCancelled, setIsCancelled] = React.useState(false);
  const sendTicker = query.get('sendTicker') || "";
  const sendAmount = query.get('sendAmount')||"0";
  const recipient = query.get('receiver') ||""
  const issuer = query.get('issuer') || ""
  const isInbound = query.get('isInbound') === 'true'
  
  //TODO: can we use something else besdies contract
  const inboundTicker = query.get('inboundTicker');
  const outboundTicker = query.get('outboundTicker')
  const inboundQuantity = query.get('inboundQuantity')
  const outboundQuantity = query.get('outboundQuantity')
  const requestedAssetsTxPreApproval = query.get('requestedAssetsTxPreApproval') || ""
  const offeredCid = query.get('outboundAssetCid') || ""
  
  console.log('outtt', offeredCid)
  const sender = query.get('sender');
  const transferPreapproval = useGetTransferPreapprovalContractByContractId(requestedAssetsTxPreApproval).contract;
  console.log('transferPreapproval', transferPreapproval)
  const transferPreapprovalIssuer = transferPreapproval?.payload.asset.assetType.issuer || "";
  const transferPreapprovalSymbol= transferPreapproval?.payload.asset.assetType.symbol || "";
  const transferPreapprovalFungible= transferPreapproval?.payload.asset.assetType.fungible || false;
  const transferPreapprovalReference= transferPreapproval?.payload.asset.assetType.reference || ""
  const transferPreapprovalAmount= transferPreapproval?.payload.asset.amount || ""


  const offeredAsset = useGetAssetContractByContractId(offeredCid).contract
  console.log('OFFEREDASSET', offeredAsset)
  const offeredIssuer = offeredAsset?.payload.assetType.issuer || ""
  const offeredFungible = offeredAsset?.payload.assetType.fungible || false
  const offeredReference = offeredAsset?.payload.assetType.reference || ""
  const offeredSymbol = offeredAsset?.payload.assetType.symbol || ""
  const offeredAmount = offeredAsset?.payload.amount || ""

  const replaceProps = {
    inboundQuantity : inboundQuantity, 
    outboundQuantity : outboundQuantity, 
    inboundTicker : inboundTicker,
    sendAmount: sendAmount,
    outboundTicker : outboundTicker, 
    sender : sender, 
    receiver : recipient, 
    isFungible: false,
    isShareable: false, 
    isAirdroppable: false, 
    issuer: issuer, 
    owner: demoPartyId
  }

  const actionLabel = query.get('templateName')
  const tickerFromQuery = query.get('sendTicker')
  const params = useParams();
  const classes = usePageStyles();
  const ledgerHooks = useLedgerHooks();
  
  const acceptersAssets = useGetMyOwnedAssetsByAssetType({ issuer: !isInbound? offeredIssuer: transferPreapprovalIssuer , symbol: !isInbound? offeredSymbol :  transferPreapprovalSymbol, isFungible: !isInbound? offeredFungible :  transferPreapprovalFungible, owner: myPartyId}).contracts
  console.log('acceptersAssets', acceptersAssets)

  const onReject = () => {

  }

  // For ACCEPTING a swap
  // we need the assetAccount of the asset that is going out
  
  const onAccept = async () => {
    const result = await ledgerHooks.exerciseMergeSplit({outIssuer: !isInbound ? offeredIssuer : transferPreapprovalIssuer , outSymbol: !isInbound ? offeredSymbol : transferPreapprovalSymbol , outReference: !isInbound ? offeredReference : transferPreapprovalReference, outFungible: !isInbound ? offeredFungible : transferPreapprovalFungible, outputAmount: !isInbound ? offeredAmount :  transferPreapprovalAmount, assetCids: acceptersAssets.map((contract) => contract.contractId)})
    console.log('RESULT', result)

  }
  const onCancel = async() => {
   
  }
 

  const onBack = () => {
    nav(-1)
  }
  
  return (
    <div className={classes.root}>
      { !isMobile() && <div className={classes.buttonContainer} onClick={onBack}>
        <IconButton color='primary'>
          <ArrowBackIosNewIcon />
        </IconButton>
        {isMobile() && <Typography color='primary'>Accounts / {params?.ticker}</Typography>
        }
      </div>}
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant='h6' color='primary' sx={{marginBottom: 0.5, textTransform: 'capitalize'}}>
          {isInbound  ? 'Inbound' : 'Outbound'} Swap Request
          </Typography>
        <Card variant='outlined' className={classes.card} >

          <CardContent className={classes.cardContent}>
            <div className={classes.fromContainer}>
              <Typography className={classes.from} variant='caption'>
                {isInbound  ? 'From:' : 'To:'}
              </Typography>
              <Typography variant='caption' color='primary'>
                {recipient}
              </Typography>
            </div>
            {actionLabel !== 'swap' && <Avatar className={classes.avatar}>
              {tickerFromQuery?.[0] || 'U'}
            </Avatar>}
            {actionLabel !== 'swap' && <div className={classes.tickerAmount}>
              {actionLabel !== 'assetInvite' && <Typography sx={{ marginRight: 1 }}>
                {sendAmount || 0}
              </Typography>}
              <Typography>
                { tickerFromQuery || '[TickerName]'}
              </Typography>
            </div>}
            {actionLabel === 'swap' && <SwapDetails isInbound={isInbound === 'true' ? true : false} {...replaceProps} />}
          </CardContent>
          {
            isCancelled && <Card sx={{margin: 1}}><CardContent>Cancelled</CardContent></Card>
          }
        
          <Button
          onClick={onAccept}
          >accept</Button>
        </Card>
      </Box>



      {enableFabBack && isMobile() && <Fab sx={{ position: 'fixed', bottom: 20, right: 30 }}>
        <IconButton color='primary' onClick={onBack}>
          <ArrowBackIosNewIcon color='info' />
        </IconButton>
      </Fab>}
    </div>
  )
}