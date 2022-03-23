import React from 'react';
import { useLocation,  } from 'react-router-dom'
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Card, CardContent } from '@mui/material';
import { isMobile } from '../../platform/platform';
import { PendingSendDetailsPage } from '../PendingSendDetailsPage';
import { PendingSwapDetailsPage } from '../PendingSwapDetailsPage';
import { chipColors } from '../../components/RowChip/RowChip';
import { PendingAssetInviteDetailsPage } from '../PendingAssetInviteDetailsPage';
import { ContractId } from '@daml/types';
import { Trade, TransferPreApproval } from '@daml.js/wallet-refapp/lib/Trade/module';
import { Asset } from '@daml.js/wallet-refapp';
import { AssetHoldingAccountProposal } from '@daml.js/wallet-refapp/lib/Account';

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
  const contractId = query.get('contractId') as ContractId<AssetHoldingAccountProposal>
  
  // Common: 
  const isInbound = query.get('isInbound') || 'false';
  const recipient = query.get('receiver') ||""

  const actionLabel = query.get('templateName')
  const issuer = query.get('issuer') || ""
  
  const isShareable = query.get('isShareable') === 'true';
  const isFungible = query.get('isFungible') === 'true';
  const isAirdroppable = query.get('isAirdroppable') === 'true'
  
  const sender = query.get('sender');
  const symbol = query.get('symbol');
  const amount = query.get('amount');
  const owner = query.get('owner');
  
  
  // Specifically for swap
  const proposer = query.get('proposer');
  const proposerAssetCid = query.get('proposerAssetCid') as ContractId<Asset.Asset>
  const requestedAssetsTxPreApprovalCid = query.get('requestedAssetsTxPreApprovalCid') as ContractId<TransferPreApproval>
  const tradeCid = query.get('tradeCid') as ContractId<Trade>
  // proposer asset
  const proposerAssetAmount = query.get('proposerAssetAmount')|| "";
  const proposerAssetSymbol = query.get('proposerAssetSymbol')|| "";
  const proposerAssetIssuer = query.get('proposerAssetIssuer')|| "";
  const proposerAssetIsFungible = query.get('proposerAssetIsFungible') === 'true';
  const proposerAssetOwner = query.get('proposerAssetOwner') || "";
  const proposerAssetReference = query.get('proposerAssetReference') || ""
  // receiver asset
  const receiverAssetSymbol = query.get('receiverAssetSymbol')|| "";
  const receiverAssetAmount = query.get('receiverAssetAmount')|| "";
  const receiverAssetIssuer = query.get('receiverAssetIssuer') || ""
  const receiverAssetOwner = query.get('receiverAssetOwner') || ""
  const receiverAssetIsFungible = query.get('receiverAssetIsFungible') === 'true'
  const receiverAssetReference = query.get('receiverAssetReference') || ""

  
  if(actionLabel === 'send' &&
    symbol !== null &&
    amount !== null &&
    owner !== null && 
    contractId !== null
  ){
    return <PendingSendDetailsPage
    contractId={contractId}
    recipient={recipient}
    symbol={symbol}
    amount={amount}
    isInbound={isInbound}
    isFungible={isFungible}
    issuer={issuer}
    owner={owner}
    />
  }
  if(actionLabel ==='accountInvite' &&
    sender !== null &&
    symbol !== null &&
    owner !== null && 
    contractId !== null
  ){
    return <PendingAssetInviteDetailsPage
      sender={sender}
      recipient={recipient}
      isInbound={isInbound}
      symbol={symbol}
      issuer={issuer}
      isAirdroppable={isAirdroppable}
      isShareable={isShareable}
      owner={owner}
      contractId={contractId}
    />
  }
  if( actionLabel ==='swap' &&
      tradeCid !== null &&
      requestedAssetsTxPreApprovalCid !== null &&
      proposerAssetCid !== null &&
      proposer!== null && 
      proposerAssetSymbol !== null
  ){
    return <PendingSwapDetailsPage
    proposer={proposer}
    receiver={recipient}
    requestedAssetsTxPreApprovalCid={requestedAssetsTxPreApprovalCid}
    tradeCid={tradeCid}
    proposerAssetCid={proposerAssetCid}
    isInbound={isInbound}
    proposerAssetSymbol={proposerAssetSymbol}
    receiverAssetSymbol={receiverAssetSymbol}
    receiverAssetIssuer={receiverAssetIssuer}
    receiverAssetIsFungible={receiverAssetIsFungible}
    receiverAssetOwner={receiverAssetOwner}
    receiverAssetAmount={receiverAssetAmount
    }
    receiverAssetReference={receiverAssetReference}
    proposerAssetIssuer={proposerAssetIssuer}
    proposerAssetAmount={proposerAssetAmount}
    proposerAssetOwner={proposerAssetOwner}
    proposerAssetReference={proposerAssetReference}
    proposerAssetIsFungible={proposerAssetIsFungible}

    />
  }
  return (
    <Card sx={{margin: 1, width: '100%'}}>
      <CardContent>
      Page doesn't exist
      </CardContent>
    </Card>
  )
}