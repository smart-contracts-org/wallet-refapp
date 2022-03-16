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
  const [isRejected, setRejected] = React.useState(false);
  const [isCancelled, setIsCancelled] = React.useState(false);
  const [hasAcceptError, setAcceptError] = React.useState(false);
  
  
  //TODO: can we use something else besdies contract
  const contract = useGetAssetHoldingInviteByContractId(contractId);
  console.log('sendcontract', contract);
 
  const classes = usePageStyles();
  const ledgerHooks = useLedgerHooks();
  
  if(!contract?.contract){
    return (
      <Card>
        <CardContent>
          Contract doesn't exist
        </CardContent>
      </Card>
    )
  }
  const onCancel = async() => {
    if(!contract?.contract?.contractId){
      return;
    }
    const result = await ledgerHooks.cancelAssetTransfer(contract.contract.contractId as ContractId<Cancel_Transfer>)
    if(result.isOk){
      setIsCancelled(true);
    }
  }

  const onAccept = async() => {
    if(!contract?.contract?.contractId){
      return;
    }
    const result = await ledgerHooks.exerciseAssetHolderInvite(contract.contract.contractId as ContractId<Asset.Accept_Transfer>, 'accept');
    if(result.isOk){

    } else {
      setAcceptError(true)
    }
  }
  const onReject = async() => {
    if(!contract?.contract?.contractId){
      return;
    }
    const result = await ledgerHooks.exerciseAssetHolderInvite(contract.contract.contractId as ContractId<Asset.Accept_Transfer>, 'reject');
    if(result.isOk){
      setRejected(true)
    } else {
      setRejected(false);
      setAcceptError(true)
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
            isCancelled && <Card sx={{margin: 1}}><CardContent>Cancelled</CardContent></Card>
          }
          {
            hasAcceptError && <Card sx={{margin: 1}}><CardContent>Error: Unable to accept</CardContent></Card>
          }
          {
            isRejected && <Card sx={{margin: 1}}><CardContent>Request Rejected</CardContent></Card>
          }
          <div className={classes.actions}>
            {isInbound === 'true' && <Button onClick={onAccept} fullWidth sx={{marginLeft: 1, marginRight: 1 }} variant='outlined'  >
              Accept
            </Button>}
            {isInbound === 'true' && <Button onClick={onReject} fullWidth sx={{ marginRight: 1 }} variant='outlined'>
              Reject
          </Button>}
          {isInbound === 'false' && !isCancelled && <Button disabled={isCancelled} onClick={onCancel} fullWidth sx={{ marginRight: 1 }} variant='outlined'>
              Cancel
          </Button>}
          </div>
        </Card>
      </Box>

      {enableFabBack && isMobile() && <FloatingBackButton/>}
    </div>
  )
}