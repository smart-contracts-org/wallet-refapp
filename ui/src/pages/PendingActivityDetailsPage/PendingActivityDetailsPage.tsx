import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, Box, Button, Card, CardContent, Divider, Fab, IconButton, Typography } from '@mui/material';
import { isMobile } from '../../platform/platform';
import { AssetDetails } from '../../components/AssetDetails/AssetDetails';
import { enableFabBack } from '../IssueAirdropPage';
import { chipColors } from '../../components/RowChip/RowChip';
import { SwapDetails } from '../../components/SwapDetails/SwapDetails';
import { demoPartyId } from '../../components/TopAppBar/TopAppBar';

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
  const isInbound = query.get('isInbound')

  //TODO: Delete
  const inboundTicker = 'REPL';
  const outboundTicker = 'REPL'
  const inboundQuantity = 1000;
  const outboundQuantity = 400;
  const sendAmount = 500;
  const sender = demoPartyId;
  const receiver = demoPartyId

  const replaceProps = {
    inboundQuantity : inboundQuantity, 
    outboundQuantity : outboundQuantity, 
    inboundTicker : inboundTicker,
    sendAmount: sendAmount,
    outboundTicker : outboundTicker, 
    sender : sender, 
    receiver : receiver, 
    isFungible: false,
    isShareable: false, 
    isAirdroppable: false, 
    issuer: demoPartyId, 
    owner: demoPartyId
  }

  const actionLabel = query.get('templateName')
  const tickerFromQuery = query.get('sendTicker')
  const params = useParams();
  const classes = usePageStyles();


  const onBack = () => {
    nav(-1)
  }
  // TODO: 
  // Fetch token details useQuery
  const demoDataQuantity = 100
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
                {demoPartyId}
              </Typography>
            </div>
            {actionLabel !== 'swap' && <Avatar className={classes.avatar}>
              {tickerFromQuery?.[0] || 'U'}
            </Avatar>}
            {actionLabel !== 'swap' && <div className={classes.tickerAmount}>
              {actionLabel !== 'assetInvite' && <Typography sx={{ marginRight: 1 }}>
                {demoDataQuantity || 0}
              </Typography>}
              <Typography>
                { tickerFromQuery || '[TickerName]'}
              </Typography>
            </div>}

            {actionLabel === 'swap' && <SwapDetails isInbound={isInbound === 'true' ? true : false} {...replaceProps} />}
            {actionLabel !== 'swap' && <AssetDetails quantity={replaceProps.sendAmount} ticker={tickerFromQuery || '[Ticker]'} {...replaceProps} />}
          </CardContent>
          <div className={classes.actions}>
            {isInbound === 'true' && <Button fullWidth sx={{marginLeft: 1, marginRight: 1 }} variant='outlined'  >
              Accept
            </Button>}
            {isInbound === 'true' && <Button fullWidth sx={{ marginRight: 1 }} variant='outlined'>
              Reject
          </Button>}
          {isInbound === 'false' && <Button fullWidth sx={{ marginRight: 1 }} variant='outlined'>
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