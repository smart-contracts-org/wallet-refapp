import React from 'react';
import {  useNavigate } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, Box, Card, CardContent, IconButton, LinearProgress, Typography } from '@mui/material';
import { useGetAssetHoldingInviteByContractId,  useLedgerHooks } from '../ledgerHooks/ledgerHooks';
import { usePageStyles } from './PendingActivityDetailsPage/PendingActivityDetailsPage';
import { AssetDetails } from '../components/AssetDetails/AssetDetails';
import { isMobile } from '../platform/platform';
import { enableFabBack } from './IssueAirdropPage';
import { ContractId } from '@daml/types';
import { FloatingBackButton } from '../components/FloatingBackButton/FloatingBackButton';
import { AssetHoldingAccountProposal } from '@daml.js/wallet-refapp/lib/Account';
import { LoadingButton } from '@mui/lab';


interface Errors {
  accept: string;
  reject: string;
  cancel: string;
}
const errors: Errors = {
  accept: 'Error, unable to accept',
  reject: 'Error, unable to reject.',
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
  sender: string;
  recipient: string;
  symbol: string;
  issuer: string;
  contractId: ContractId<AssetHoldingAccountProposal>;
  isInbound: string;
  isAirdroppable: boolean;
  isShareable: boolean;
  owner: string;
}
export type ActionType = 'accept' | 'reject' | 'cancel';

export const PendingAssetInviteDetailsPage: React.FC<PendingSendDetailsPageProps> = (props) => {
  const {
    contractId,
    recipient,
    isInbound,
    sender, 
    symbol,
    issuer,
    isAirdroppable,
    isShareable,
    owner
  } = props;

  //TODO grab contract details
  const nav = useNavigate();
  const [actionLoading, setLoadingAction] = React.useState<string| undefined>(undefined);
  const [success, setSuccess] = React.useState<'accept'|'reject'|'cancel'|undefined>();
  const [error, setError] = React.useState<'accept'|'reject'|'cancel'|undefined>();

  //TODO: can we use something else besdies contract
  // TODO: This is merely used to check if the contract exists
  // If someone copy and pastes a URL with an invalid contractId, 
  // we can error out here, but the below is not necessary
  const {loading, contract: accountInviteContract} = useGetAssetHoldingInviteByContractId(contractId);
  
  const classes = usePageStyles();
  const ledgerHooks = useLedgerHooks();

  if(loading){
    <LinearProgress/>
  }
  
  if(!accountInviteContract){
    return (
      <Card sx={{width: '100%'}}>
        <CardContent>
         This account invite Contract doesn't exist
        </CardContent>
      </Card>
    )
  }


  
  const onClick = async(action: ActionType) => {
    setLoadingAction(action);
    const result = await ledgerHooks.exerciseAssetHolderInvite(contractId as ContractId<AssetHoldingAccountProposal>, action);
    if(result.isOk){
      setSuccess(action);
      setError(undefined);
      setLoadingAction(undefined);
    } else {
      setError(action)
      setSuccess(undefined);
      setLoadingAction(undefined);
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
        {isMobile() && <Typography color='primary'>Accounts / {symbol}</Typography>
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
                {isInbound? recipient : sender}
              </Typography>
            </div>
             <Avatar className={classes.avatar}>
              {symbol[0] || 'U'}
            </Avatar>
            <Typography>
              {symbol}
            </Typography>
             <AssetDetails  issuer={issuer} owner={owner} isAirdroppable={isAirdroppable} isShareable={isShareable} ticker={symbol} />
          </CardContent>
          {
            success && !!successMessage[success] && <Card sx={{margin: 1}}><CardContent>{successMessage[success]}</CardContent></Card>
          }
          {
            error && !!errors[error] && <Card sx={{margin: 1}}><CardContent>{errors[error]}</CardContent></Card>
          }
          
  
          {(success === undefined )&& <div className={classes.actions}>
            {isInbound === 'true' && <LoadingButton  loading={actionLoading === 'accept'}  onClick={() =>onClick('accept')} fullWidth sx={{marginLeft: 1, marginRight: 1 }} variant='outlined'  >
              Accept
            </LoadingButton>}
            {isInbound === 'true' && <LoadingButton loading={actionLoading === 'reject'}   onClick={() =>onClick('reject')} fullWidth sx={{ marginRight: 1 }} variant='outlined'>
              Reject
          </LoadingButton>}
          {isInbound === 'false' && success !== 'cancel' && <LoadingButton loading={actionLoading === 'cacenl'}   disabled={success==='cancel'} onClick={() =>onClick('cancel')} fullWidth sx={{ marginRight: 1 }} variant='outlined'>
              Cancel
          </LoadingButton>}
          </div>}
        </Card>
      </Box>

      {enableFabBack && isMobile() && <FloatingBackButton/>}
    </div>
  )
}