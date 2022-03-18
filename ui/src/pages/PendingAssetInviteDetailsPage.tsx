import React from 'react';
import {  useNavigate } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, Box, Button, Card, CardContent, Fab, IconButton, Typography } from '@mui/material';
import { useGetAssetHoldingInviteByContractId, useGetAssetInviteRequests, useGetAssetTransferByContractId, useGetSingleAssetSendRequest, useLedgerHooks } from '../ledgerHooks/ledgerHooks';
import { useParty } from '@daml/react';
import { usePageStyles, useQuery } from './PendingActivityDetailsPage/PendingActivityDetailsPage';
import { AssetDetails } from '../components/AssetDetails/AssetDetails';
import { SwapDetails } from '../components/SwapDetails/SwapDetails';
import { isMobile } from '../platform/platform';
import { enableFabBack } from './IssueAirdropPage';
import { AssetTransfer, Cancel_Transfer } from '@daml.js/wallet-refapp/lib/Asset';
import { ContractId } from '@daml/types';
import { Asset } from '@daml.js/wallet-refapp';
import { FloatingBackButton } from '../components/FloatingBackButton/FloatingBackButton';

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
export type ActionType = 'accept' | 'reject' | 'cancel';

export const PendingAssetInviteDetailsPage: React.FC<PendingSendDetailsPageProps> = (props) => {
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
    owner
  } = props;

  //TODO grab contract details
  const nav = useNavigate();
  const [isLoading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState<'accept'|'reject'|'cancel'|undefined>();
  const [error, setError] = React.useState<'accept'|'reject'|'cancel'|undefined>();

  //TODO: can we use something else besdies contract
  const contract = useGetAssetHoldingInviteByContractId(contractId);
  console.log('sendcontract', contract);

  const classes = usePageStyles();
  const ledgerHooks = useLedgerHooks();
  
  if(!contract?.contract){
    return (
      <Card sx={{width: '100%'}}>
        <CardContent>
          Contract doesn't exist
        </CardContent>
      </Card>
    )
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
  
  const onClick = async(action: ActionType) => {
    if(!contract?.contract?.contractId){
      return;
    }
    setLoading(true);
    const result = await ledgerHooks.exerciseAssetHolderInvite(contract.contract.contractId as ContractId<Asset.Accept_Transfer>, action);
    if(result.isOk){
      setSuccess(action);
      setError(undefined);
      setLoading(false);
    } else {
      setError(action)
      setSuccess(undefined);
      setLoading(false);
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
          {isInbound === 'true' ? 'Inbound' : 'Outbound'} Asset Holding Invite
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
            <Typography>
              {sendTicker}
            </Typography>
             <AssetDetails issuer={issuer} owner={owner} isAirdroppable={isAirdroppable} isFungible={isFungible} isShareable={isShareable} quantity={sendAmount} ticker={sendTicker || '[Ticker]'} />
          </CardContent>
          {
            success && !!successMessage[success] && <Card sx={{margin: 1}}><CardContent>{successMessage[success]}</CardContent></Card>
          }
          {
            error && !!errors[error] && <Card sx={{margin: 1}}><CardContent>{errors[error]}</CardContent></Card>
          }
          
  
          {(success === undefined )&& <div className={classes.actions}>
            {isInbound === 'true' && <Button onClick={() =>onClick('accept')} fullWidth sx={{marginLeft: 1, marginRight: 1 }} variant='outlined'  >
              Accept
            </Button>}
            {isInbound === 'true' && <Button onClick={() =>onClick('reject')} fullWidth sx={{ marginRight: 1 }} variant='outlined'>
              Reject
          </Button>}
          {isInbound === 'false' && success !== 'cancel' && <Button disabled={success==='cancel'} onClick={() =>onClick('cancel')} fullWidth sx={{ marginRight: 1 }} variant='outlined'>
              Cancel
          </Button>}
          </div>}
        </Card>
      </Box>

      {enableFabBack && isMobile() && <FloatingBackButton/>}
    </div>
  )
}