
import {  IconButton, Box, Typography, Fab } from '@mui/material';
import React from 'react';
import { Card, CardContent } from 'semantic-ui-react';
import { useGetMyOwnedAssetsByAssetType, useLedgerHooks } from '../../ledgerHooks/ledgerHooks';
import { enableFabBack } from '../../pages/IssueAirdropPage';
import { isMobile } from '../../platform/platform';
import { SwapDetails } from '../SwapDetails/SwapDetails';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import { useParty } from '@daml/react/defaultLedgerContext';
import { Asset } from '@daml.js/wallet-refapp';
import { ContractId } from '@daml/types';
import { Trade } from '@daml.js/wallet-refapp/lib/Trade/module';
import { usePageStyles } from '../../pages/PendingActivityDetailsPage/PendingActivityDetailsPage';
import { LoadingButton } from '@mui/lab';
interface SwapProps {
  proposerAssetCid: ContractId<Asset.Asset>;
  receiverAssetSymbol: string;
  receiverAssetAmount: string;
  proposerAssetSymbol: string;
  proposerAssetAmount: string;
  proposerAssetIsFungible: boolean;
  receiverAssetIsFungible: boolean;
  receiverAssetIssuer: string;
  proposerAssetIssuer: string;
  receiverAssetReference: string;
  proposerAssetReference: string;
  proposerAssetOwner: string;
  receiverAssetOwner: string;
  requestedAssetsTxPreApproval: string;
  proposer: string;
  tradeCid: ContractId<Trade>;
  receiver: string;
  isInbound: string;
}
interface Errors {
  accept: string;
  reject: string;
  cancel: string;
}
const errors: Errors = {
  accept: 'Error, unable to accept',
  reject: 'Error, unable to reject',
  cancel: 'Error, unable to cancel'
}

interface Success  {
  accept: string,
  reject: string,
  cancel: string 
}

const successMessage: Success = {
  accept: 'accepted',
  reject: 'rejected',
  cancel: 'canceled'
}

export const Swap: React.FC<SwapProps> = (props) => {
  const {
    tradeCid,
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
  
  } = props;
  console.log('props', props)
  const nav = useNavigate();
  const myPartyId = useParty();
  const [isLoading, setLoading] = React.useState<string | undefined>(undefined);
  const [success, setSuccess] = React.useState<'accept'|'reject'|'cancel'|undefined>();
  const [error, setError] = React.useState<'accept'|'reject'|'cancel'|undefined>();

  console.log('BEFORE CALL')
  
  // Getting all the assets of what the proposer wants
  const outboundAssetContracts = useGetMyOwnedAssetsByAssetType(
    { 
      issuer: receiverAssetIssuer , 
      symbol: receiverAssetSymbol, 
      isFungible:  receiverAssetIsFungible, 
      owner: myPartyId, 
      reference: receiverAssetReference
    }).contracts

  // for the receiver, this is what they will be sending out
  const outboundAssetCids = outboundAssetContracts.map((contract) => contract.contractId)
  
  
  const classes = usePageStyles();
  const ledgerHooks = useLedgerHooks();
  // const acceptersAssetsOld = useGetMyOwnedAssetsByAssetType({ issuer: !isInbound? offeredIssuer: transferPreapprovalIssuer , symbol: !isInbound? offeredSymbol :  transferPreapprovalSymbol, isFungible: !isInbound? offeredFungible :  transferPreapprovalFungible, owner: myPartyId}).contracts
  console.log('MY OUTBOUND CIDS', outboundAssetCids)
  
  
  
  const swapProps = {
    isInbound: isInbound === 'true',
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
     proposer,
     receiver
   }
  
  const onReject = () => {

  }

  // For ACCEPTING a swap
  // we need the assetAccount of the asset that is going out
  
  const onAccept = async () => {
    if(outboundAssetContracts.length === 0){
      console.log('cannot')
      return
    }
    // receiver exercises mergeSplit on the account that
    // holds the asset of what the proposer wants
    const mergeSplitResult = await ledgerHooks.exerciseMergeSplit({
      outIssuer: receiverAssetIssuer, 
      outSymbol: receiverAssetSymbol , 
      outReference: receiverAssetReference, 
      outFungible:  receiverAssetIsFungible, 
      outputAmount: receiverAssetAmount, 
      assetCids: outboundAssetCids
    })
    if(!mergeSplitResult.isOk){
      setError('accept')
      setSuccess(undefined)
      setLoading(undefined)
      return;
    }
    console.log('mergeSplitResult', mergeSplitResult)
    
    const preApprove = await ledgerHooks.exercisePreApprove(
      {owner: proposerAssetOwner, 
        issuer: proposerAssetIssuer, 
        fungible: proposerAssetIsFungible, 
        symbol: proposerAssetSymbol, 
        reference: proposerAssetReference, 
        amount: proposerAssetAmount })
    console.log('PREApprove', preApprove)
    if(!preApprove.isOk){
      console.log(preApprove.payload)
      setError('accept')
      setSuccess(undefined)
      setLoading(undefined);
      return
    }
    const resultTrade = await ledgerHooks.exerciseTradeSettle(tradeCid, mergeSplitResult.payload[0][1] , preApprove.payload[0])
    if(!resultTrade.isOk){
      setError('accept')
      setSuccess(undefined)
      setLoading(undefined);
      return
    }
    setLoading(undefined);
    setError(undefined);
    setSuccess('accept');
  }
  
  const onClick = async(action: 'cancel' | 'reject') => {
    // if(!assetAccountCid || !assetTransferCid){
    //   return;
    // }
    // setLoading(action);
    // const result = await ledgerHooks.exerciseAssetTransferChoice(assetTransferCid, action);
    // if(result.isOk){
    //   setSuccess(action);
    //   setError(undefined);
    //   setLoading(undefined);
    // } else {
    //   setError(action)
    //   setSuccess(undefined);
    //   setLoading(undefined);
    // }
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
       
      </div>}
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant='h6' color='primary' sx={{marginBottom: 0.5, textTransform: 'capitalize'}}>
          {isInbound === 'true'  ? 'Inbound' : 'Outbound'} Swap Request
          </Typography>
        <Card variant='outlined' className={classes.card} >
          <CardContent className={classes.cardContent}>
            <div className={classes.fromContainer}>
              <Typography className={classes.from} variant='caption'>
                {isInbound === 'true'  ? 'From:' : 'To:'}
              </Typography>
              <Typography variant='caption' color='primary'>
                {isInbound === 'true' ? proposer : receiver}
              </Typography>
            </div>
         
            <SwapDetails {...swapProps} />
          </CardContent>
          {
            success && !!successMessage[success] && <Card sx={{margin: 1}}><CardContent>{successMessage[success]}</CardContent></Card>
          }
          {
            error && !!errors[error] && <Card sx={{margin: 1}}><CardContent>{errors[error]}</CardContent></Card>
          }
          {success === undefined && <div className={classes.actions}>
            {isInbound === 'true' && <LoadingButton loadingPosition='end' loading={isLoading === 'accept'} onClick={onAccept} fullWidth sx={{marginLeft: 1, marginRight: 1 }} variant='outlined'  >
              Accept Request
            </LoadingButton>}
            {isInbound === 'true' && <LoadingButton loadingPosition='end' loading={isLoading === 'reject'} fullWidth onClick={() => onClick('reject')} sx={{ marginRight: 1 }} variant='outlined'>
              Reject Request
          </LoadingButton>}
          {isInbound === 'false' && success !== 'cancel' && <LoadingButton  loadingPosition='end' loading={isLoading === 'cancel'} onClick={() => {onClick('cancel')}} fullWidth sx={{ margin: 1 }} variant='outlined'>
              Cancel Request
          </LoadingButton>}
          </div>}
        </Card>
      </Box>



      {enableFabBack && isMobile() && <Fab sx={{ position: 'fixed', bottom: 20, right: 30 }}>
        <IconButton color='primary' onClick={onBack}>
          <ArrowBackIosNewIcon color='info' />
        </IconButton>
      </Fab>}
    </div>
)}