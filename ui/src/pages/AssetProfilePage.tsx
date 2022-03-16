import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, Card, CardContent, Fab, IconButton, LinearProgress, Typography } from '@mui/material';
import { AssetDetails } from '../components/AssetDetails/AssetDetails';
import SendIcon from '@mui/icons-material/Send';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import { isMobile } from '../platform/platform';
import { enableFabBack } from './IssueAirdropPage';
import { chipColors } from '../components/RowChip/RowChip';
import { useParty } from '@daml/react';
import { numberWithCommas } from '../utils/numberWithCommas';
import { useGetMyOwnedAssetsByAssetType } from '../ledgerHooks/ledgerHooks';
import { getAssetSum } from '../utils/getAssetSum';
import { useQuery } from './PendingActivityDetailsPage/PendingActivityDetailsPage';
import { FloatingBackButton } from '../components/FloatingBackButton/FloatingBackButton';

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
    width: isMobile() ? '90%' : '50%',
    margin: theme.spacing(1)
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
  }
}))

export const AssetProfilePage: React.FC = () => {
  const nav = useNavigate();
  const query = useQuery();
  const issuer = query.get('issuer')
  const symbol = query.get('ticker');
  const isFungible = query.get('isFungible')
  const party = useParty();
  const params = useParams();
  const { loading, contracts } = useGetMyOwnedAssetsByAssetType({ issuer: issuer || "", symbol: symbol || "", isFungible: !!isFungible, owner: party });
  const amount = getAssetSum(contracts);
  const formattedSum = numberWithCommas(amount)
  const classes = usePageStyles();
  const sendPath = `/send/${params?.issuer}/${params?.ticker}`
  const swapPath = `/swap/${params?.issuer}/${params?.ticker}`
  const assetInvitePath = `/invite/${params?.issuer}/${params?.ticker}`
  const issueAirdropPath = `/issue/${params?.issuer}/${params?.ticker}`
  const onBack = () => {
    nav(-1)
  }
  if (loading) {
    return (
      <LinearProgress />
    )
  }
  // TODO: 
  // Fetch token details
  return (
    <div className={classes.root}>
      <div className={classes.buttonContainer} onClick={onBack}>
        <IconButton color='primary'>
          <ArrowBackIosNewIcon />
        </IconButton>
        {isMobile() && <Typography color='primary'>Accounts / {symbol}</Typography>
        }      </div>
      <Card variant='outlined' className={classes.card} >
        <CardContent className={classes.cardContent}>
          <Avatar className={classes.avatar}>
            {symbol?.[0] || 'undefined'}
          </Avatar>
          <div className={classes.tickerAmount}>
            <Typography sx={{ marginRight: 1 }} variant='h6'>
              {formattedSum || 0}
            </Typography>
            <Typography variant='h6'>
              {symbol || 'undefined'}
            </Typography>
          </div>
          <div className={classes.actions}>
            {params.issuer === party && <div className={classes.actionContainer}>


              <IconButton className={classes.issueButton} component={Link} to={issueAirdropPath}>
                <AddBoxIcon />
              </IconButton>
              <Typography variant='caption'>
                issue / airdrop
                </Typography>
            </div>}
            <div className={classes.actionContainer}>


              <IconButton color='primary' component={Link} to={sendPath}>
                <SendIcon />
              </IconButton>
              <Typography variant='caption'>
                Send
              </Typography>
            </div>
            <div className={classes.actionContainer}>
              <IconButton color='primary' component={Link} to={swapPath}>
                <SwapHorizontalCircleIcon />
              </IconButton>
              <Typography variant='caption'>
                Swap
              </Typography>
            </div>
            <div className={classes.actionContainer}>
              <IconButton color='primary' component={Link} to={assetInvitePath}>
                <AccountBalanceWalletIcon />
              </IconButton>
              <Typography variant='caption'>
                Invite
              </Typography>
            </div>
          </div>
          <AssetDetails isFungible={!!isFungible} quantity={amount} ticker={symbol || 'Ticker'} />
        </CardContent>
      </Card>


      {enableFabBack && isMobile() &&
        <FloatingBackButton />}
    </div>
  )
}