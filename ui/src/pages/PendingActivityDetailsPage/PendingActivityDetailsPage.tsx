import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, Box, Button, Card, CardContent, Fab, IconButton, Typography } from '@mui/material';
import { isMobile } from '../../platform/platform';
import { AssetDetails } from '../../components/AssetDetails/AssetDetails';
import { enableFabBack } from '../IssueAirdropPage';
import { chipColors } from '../../components/RowChip/RowChip';
import { SwapDetails } from '../../components/SwapDetails/SwapDetails';
import { demoPartyId } from '../../components/TopAppBar/TopAppBar';
import { useGetAssetInviteRequests, useGetAssetTransferByContractId, useGetSingleAssetSendRequest, useLedgerHooks } from '../../ledgerHooks/ledgerHooks';
import { useParty } from '@daml/react';

export const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const usePageStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: isMobile() ? undefined : 'center',
    width: '100%',
    flexDirection: isMobile() ? 'column' : 'row',
    margin: theme.spacing(1),
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: isMobile() ? '100%' : '500px',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerText: {
    justifySelf: 'center'
  },
  card: {
    // margin: theme.spacing(1), 
  },
  avatar: {
    margin: theme.spacing(1)
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: theme.spacing(1)
  },
  tickerAmount: {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonContainer: {
    marginBottom: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center'
  },
  issueButton: {
    color: chipColors.issuer
  },
  fromContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  from: {
    fontWeight: 'bold'

  }
}))

export const PendingActivityDetailsPage: React.FC = () => {
  
  //TODO grab contract details
  const nav = useNavigate();
  const query = useQuery()
  const myPartyId = useParty();
  const [isCancelled, setIsCancelled] = React.useState(false);
  const contractId = query.get('contractId')
  const sendTicker = query.get('sendTicker') || "";
  const sendAmount = query.get('sendAmount')||"0";
  const recipient = query.get('receiver') ||""
  const issuer = query.get('issuer') || ""
  const isInbound = query.get('isInbound')
  
  //TODO: can we use something else besdies contract
  const sendContract = useGetAssetTransferByContractId({contractId});
  const inviteContract = useGetAssetInviteRequests();
  console.log(inviteContract)
  console.log('sendcontract', sendContract);
  
  const inboundTicker = query.get('inboundTicker');
  const outboundTicker = query.get('outboundTicker')
  const inboundQuantity = query.get('inboundQuantity')
  const outboundQuantity = query.get('outboundQuantity')
  const sender = query.get('sender');

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
  if(!sendContract){
    return (
      <Card>
        <CardContent>
          Contract doesn't exist
        </CardContent>
      </Card>
    )
  }
  const onCancel = async() => {
    const result = await ledgerHooks.cancelAssetTransfer({assetTransferCid: sendContract.contract?.contractId})
    if(result.isOk){
      setIsCancelled(true);
    }
  }
  const onAccept = async() => {
    await ledgerHooks.acceptAssetTransfer({assetTransferCid: sendContract.contract?.contractId})
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
          {isInbound === 'true' ? 'Inbound' : 'Outbound'} {actionLabel} Request
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
            {actionLabel !== 'swap' && <AssetDetails quantity={replaceProps.sendAmount} ticker={tickerFromQuery || '[Ticker]'} {...replaceProps} />}
          </CardContent>
          {
            isCancelled && <Card sx={{margin: 1}}><CardContent>Cancelled</CardContent></Card>
          }
          <div className={classes.actions}>
            {isInbound === 'true' && <Button onClick={onAccept} fullWidth sx={{marginLeft: 1, marginRight: 1 }} variant='outlined'  >
              Accept
            </Button>}
            {isInbound === 'true' && <Button fullWidth sx={{ marginRight: 1 }} variant='outlined'>
              Reject
          </Button>}
          {isInbound === 'false' && !isCancelled && <Button disabled={isCancelled} onClick={onCancel} fullWidth sx={{ marginRight: 1 }} variant='outlined'>
              Cancel
          </Button>}
            <Button fullWidth sx={{ marginRight: 1 }} variant='outlined'>
              Back
          </Button>
          </div>
          
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