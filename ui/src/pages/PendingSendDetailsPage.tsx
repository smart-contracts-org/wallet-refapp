import React from 'react';
import {  useNavigate } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, Box, Card, CardContent, Fab, IconButton, Typography } from '@mui/material';
import { useGetAssetAccountByKey, useGetAssetTransferByContractId, useLedgerHooks } from '../ledgerHooks/ledgerHooks';
import { usePageStyles } from './PendingActivityDetailsPage/PendingActivityDetailsPage';
import { AssetDetails } from '../components/AssetDetails/AssetDetails';
import { isMobile } from '../platform/platform';
import { enableFabBack } from './IssueAirdropPage';
import { AssetTransfer } from '@daml.js/wallet-refapp/lib/Asset';
import { ContractId } from '@daml/types';
import { LoadingButton } from '@mui/lab';
import { FloatingBackButton } from '../components/FloatingBackButton/FloatingBackButton';

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
interface PendingSendDetailsPageProps {
  contractId: any;
  isInbound: string;
  recipient: string;
  sendTicker: string;
  sendAmount: string;
  issuer: string;
  owner: string;
  isShareable: boolean;
  isAirdroppable: boolean;
  isFungible: boolean;
}

export const PendingSendDetailsPage: React.FC<PendingSendDetailsPageProps> = (props) => {
  const {
    contractId,
    recipient,
    sendTicker,
    sendAmount,
    isInbound,
    isAirdroppable,
    isFungible,
    isShareable,
    issuer,
    owner, 
  } = props;

  //TODO grab contract details
  const nav = useNavigate();
  const [isLoading, setLoading] = React.useState<string | undefined>(undefined);
  const [success, setSuccess] = React.useState<'accept'|'reject'|'cancel'|undefined>();
  const [error, setError] = React.useState<'accept'|'reject'|'cancel'|undefined>();
  
  //TODO: can we use something else besdies contract
  const assetTransferResponse = useGetAssetTransferByContractId({contractId: contractId as ContractId<AssetTransfer>});
  const assetTransferCid = assetTransferResponse.contract?.contractId
  const assetAccountResponse = useGetAssetAccountByKey({issuer, symbol: sendTicker, fungible: isFungible, reference: ''})
  const assetAccountCid = assetAccountResponse.contract?.contractId
  const classes = usePageStyles();
  const ledgerHooks = useLedgerHooks();
  
  if(!assetTransferCid){
    return (
      <Card>
        <CardContent>
          Contract doesn't exist
        </CardContent>
      </Card>
    )
  }

  const onClick = async(action: 'cancel' | 'reject') => {
    if(!assetAccountCid || !assetTransferCid){
      return;
    }
    setLoading(action);
    const result = await ledgerHooks.exerciseAssetTransferChoice(assetTransferCid, action);
    if(result.isOk){
      setSuccess(action);
      setError(undefined);
      setLoading(undefined);
    } else {
      setError(action)
      setSuccess(undefined);
      setLoading(undefined);
    }
  }
  
  const onAccept = async () => {
    if(!assetAccountCid || !assetTransferCid){
      console.log(assetAccountCid, assetTransferCid)
      return;
    }
    const result = await ledgerHooks.acceptAssetTransfer(assetAccountCid, assetTransferCid);
    setLoading('accept');
    if(result.isOk){
      setLoading(undefined);
      setError(undefined);
      setSuccess('accept');
    } else {
      setError('accept')
      setSuccess(undefined)
      setLoading(undefined)
    }
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
        {isMobile() && <Typography color='primary'>Accounts / {sendTicker}</Typography>
        }
      </div>}
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant='h6' color='primary' sx={{marginBottom: 0.5, textTransform: 'capitalize'}}>
          {isInbound === 'true' ? 'Inbound' : 'Outbound'} Send Request
          </Typography>
        <Card variant='outlined' className={classes.card} >

          <CardContent className={classes.cardContent}>
            <div className={classes.fromContainer}>
              <Typography className={classes.from} variant='caption'>
                {isInbound === 'true' ? 'From:' : 'To:'}
              </Typography>
              <Typography variant='caption' color='primary'>
                {recipient}
              </Typography>
            </div>
             <Avatar className={classes.avatar}>
              {sendTicker?.[0] || 'U'}
            </Avatar>
            <div className={classes.tickerAmount}>
               <Typography sx={{ marginRight: 1 }}>
                {sendAmount || 0}
              </Typography>
              <Typography>
                { sendTicker || '[TickerName]'}
              </Typography>
            </div>
             <AssetDetails issuer={issuer} owner={owner} isAirdroppable={isAirdroppable} isFungible={isFungible} isShareable={isShareable} quantity={sendAmount} ticker={sendTicker || '[Ticker]'} />
          </CardContent>
          {
            success && !!successMessage[success] && <Card sx={{margin: 1}}><CardContent>{successMessage[success]}</CardContent></Card>
          }
          {
            error && !!errors[error] && <Card sx={{margin: 1}}><CardContent>{errors[error]}</CardContent></Card>
          }
          {success === undefined && <div className={classes.actions}>
            {isInbound === 'true' && <LoadingButton loadingPosition='end' loading={isLoading === 'accept'} onClick={onAccept} fullWidth sx={{marginLeft: 1, marginRight: 1 }} variant='outlined'  >
              Accept
            </LoadingButton>}
            {isInbound === 'true' && <LoadingButton loadingPosition='end' loading={isLoading === 'reject'} fullWidth onClick={() => onClick('reject')} sx={{ marginRight: 1 }} variant='outlined'>
              Reject
          </LoadingButton>}
          {isInbound === 'false' && success !== 'cancel' && <LoadingButton loadingPosition='end' loading={isLoading === 'cancel'} onClick={() => {onClick('cancel')}} fullWidth sx={{ marginRight: 1 }} variant='outlined'>
              Cancel
          </LoadingButton>}
          </div>}
        </Card>
      </Box>
      {enableFabBack && isMobile() && <FloatingBackButton/>}
    </div>
  )
}