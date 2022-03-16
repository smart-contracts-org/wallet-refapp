import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Avatar, Box, Button, Card, CardContent, Fab, IconButton, Typography } from '@mui/material';
import { isMobile } from '../../platform/platform';
import { SwapDetails } from '../../components/SwapDetails/SwapDetails';
import { useGetAssetInviteRequests, useGetAssetTransferByContractId, useGetSingleAssetSendRequest, useLedgerHooks } from '../../ledgerHooks/ledgerHooks';
import { useParty } from '@daml/react';
import { PendingSendDetailsPage } from '../PendingSendDetailsPage';
import { PendingSwapDetailsPage } from '../PendingSwapDetailsPage';
import { chipColors } from '../../components/RowChip/RowChip';
import { PendingAssetInviteDetailsPage } from '../PendingAssetInviteDetailsPage';

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
    width: '100%'
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
  
  const query = useQuery()
  const contractId = query.get('contractId')
  const myPartyId=useParty()
  //TODO: can we use something else besdies contract
  
  const actionLabel = query.get('templateName')
  const sendTicker = query.get('sendTicker') || "";
  const sendAmount = query.get('sendAmount')||"0";
  const recipient = query.get('receiver') ||""
  const issuer = query.get('issuer') || ""
  const isInbound = query.get('isInbound') || 'false';
  const inboundTicker = query.get('inboundTicker');
  const outboundTicker = query.get('outboundTicker')
  const inboundQuantity = query.get('inboundQuantity')
  const isShareable = query.get('isShareable') === 'true';
  const isFungible = query.get('isFungible') === 'true';
  const isAirdroppable = query.get('isAirdroppable') === 'true'
  const outboundQuantity = query.get('outboundQuantity')
  const sender = query.get('sender');

  const props = {
    sender, 
    inboundQuantity,
    inboundTicker,
    outboundTicker,
    outboundQuantity,
    issuer,
    isFungible,
    isAirdroppable,
    isShareable,
    sendAmount,
    sendTicker,
    contractId,
    owner: myPartyId,
    isInbound, 
    recipient
  }
  
  if(actionLabel === 'send'){
    return <PendingSendDetailsPage
      {...props}

    
    />
  }
  if(actionLabel ==='assetInvite'){
    return <PendingAssetInviteDetailsPage
    {...props}
    />
  }
  if(actionLabel ==='swap'){
    return <PendingSwapDetailsPage/>
  }
  return (
    <Card>
      Page doesn't exist
    </Card>
  )
}