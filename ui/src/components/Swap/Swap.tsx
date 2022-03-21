
import { LinearProgress, IconButton, Box, Typography, Avatar, Fab } from '@mui/material';
import React from 'react';
import { Card, CardContent, Button } from 'semantic-ui-react';
import { useGetAssetContractByContractId, useGetMyOwnedAssetsByAssetType, useGetTradeContractByCid, useGetTransferPreapprovalContractByContractId, useLedgerHooks } from '../../ledgerHooks/ledgerHooks';
import { usePageStyles } from '../../pages/AssetProfilePage';
import { enableFabBack } from '../../pages/IssueAirdropPage';
import { isMobile } from '../../platform/platform';
import { SwapDetails } from '../SwapDetails/SwapDetails';
import { demoPartyId } from '../TopAppBar/TopAppBar';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import { useParty } from '@daml/react/defaultLedgerContext';

interface SwapProps {
  transferPreapprovalIssuer: string;
  transferPreapprovalSymbol: string;
  transferPreapprovalFungible: boolean;
  transferPreapprovalReference: string;
  transferPreapprovalAmount: string;
  inboundTicker: string;
  outboundTicker: string;
  inboundQuantity: string;
  outboundQuantity: string;
  requestedAssetsTxPreApproval: string;
  offeredCid: string;
  sender: string;
  tradeCid: string;
  sendAmount: string;
  recipient: string;
  issuer: string;
  isInbound: boolean;
  actionLabel: string;
  tickerFromQuery: string;
}

export const Swap: React.FC<SwapProps> = (props) => {
  const {transferPreapprovalIssuer,
    transferPreapprovalSymbol,
    transferPreapprovalFungible,
    transferPreapprovalReference,
    transferPreapprovalAmount,
    inboundTicker,
    tradeCid,
    outboundTicker,
    inboundQuantity,
    outboundQuantity,
    requestedAssetsTxPreApproval,
    offeredCid,
    sender,
    sendAmount,
    recipient,
    issuer,
    isInbound,
    actionLabel,
    tickerFromQuery
  
  } = props;
  console.log('props', props)
  const nav = useNavigate();
  const myPartyId = useParty();
  const [isCancelled, setIsCancelled] = React.useState(false);

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
  const offeredOwner = offeredAsset?.payload.owner
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
  console.log(sender)


  const classes = usePageStyles();
  const ledgerHooks = useLedgerHooks();
  const tradeContract = useGetTradeContractByCid(tradeCid)
  console.log('TRADE CONTRCE', tradeContract)
  const offered = tradeContract.contract?.payload.offeredAsset
  console.log('OFFERED CID', offered)
  // const acceptersAssetsOld = useGetMyOwnedAssetsByAssetType({ issuer: !isInbound? offeredIssuer: transferPreapprovalIssuer , symbol: !isInbound? offeredSymbol :  transferPreapprovalSymbol, isFungible: !isInbound? offeredFungible :  transferPreapprovalFungible, owner: myPartyId}).contracts
  console.log('ASSETS I HAVE', outboundAssetCids)
  const transferPreapproval = useGetTransferPreapprovalContractByContractId(requestedAssetsTxPreApproval).contract;
  console.log(transferPreapproval)
  const transferPreapprovalLoading = useGetTransferPreapprovalContractByContractId(requestedAssetsTxPreApproval).loading;
  const onReject = () => {

  }

  // For ACCEPTING a swap
  // we need the assetAccount of the asset that is going out
  
  const onAccept = async () => {
    if(outboundAssetContracts.length === 0){
      console.log('cannot')
      return
    }
    const mergeSplitResult = await ledgerHooks.exerciseMergeSplit({outIssuer: !isInbound ? offeredIssuer : transferPreapprovalIssuer , outSymbol: !isInbound ? offeredSymbol : transferPreapprovalSymbol , outReference: !isInbound ? offeredReference : transferPreapprovalReference, outFungible: !isInbound ? offeredFungible : transferPreapprovalFungible, outputAmount: !isInbound ? offeredAmount :  transferPreapprovalAmount, assetCids: outboundAssetCids})
    console.log('mergeSplitResult', mergeSplitResult)
    const preApprove = await ledgerHooks.exercisePreApprove({owner:offeredOwner, issuer: offeredIssuer, fungible: offeredFungible, symbol: offeredSymbol, reference: offeredReference, amount: offeredAmount })
    console.log('PREApprove', preApprove)
    const resultTreade = await ledgerHooks.exerciseTradeSettle(tradeCid, mergeSplitResult.payload[0][1] , preApprove.payload[0])
    console.log('m', resultTreade)
  }
  const onCancel = async() => {
   
  }

  const onBack = () => {
    nav(-1)
  }
  
  if(transferPreapprovalLoading){
    return (
      <LinearProgress/>
    )
  }
  return (
    <div className={classes.root}>
      { !isMobile() && <div className={classes.buttonContainer} onClick={onBack}>
        <IconButton color='primary'>
          <ArrowBackIosNewIcon />
        </IconButton>
       
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
                {isInbound? sender : recipient}
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
            {actionLabel === 'swap' && <SwapDetails isInbound={isInbound} {...replaceProps} />}
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
)}