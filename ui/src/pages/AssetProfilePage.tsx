import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, Button, Card, CardContent, Fab, IconButton, Typography } from '@mui/material';
import { AssetDetails } from '../components/AssetDetails/AssetDetails';
import SendIcon from '@mui/icons-material/Send';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import { isMobile } from '../platform/platform';
import { enableFabBack } from './IssueAirdropPage';
import { chipColors } from '../components/RowChip/RowChip';
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
  const params = useParams();
  const classes = usePageStyles();
  const sendPath = `/send/${params?.issuer}/${params?.ticker}`
  const swapPath = `/swap/${params?.issuer}/${params?.ticker}`
  const assetInvitePath = `/invite/${params?.issuer}/${params?.ticker}`
  const issueAirdropPath = `/issue/${params?.issuer}/${params?.ticker}`
  const onBack = () => {
    nav(-1)
  }
  // TODO: 
  // Fetch token details
  const demoDataQuantity = 100
  return (
    <div className={classes.root}>
      <div className={classes.buttonContainer} onClick={onBack}>
        <IconButton  color='primary'>
          <ArrowBackIosNewIcon />
        </IconButton>
{isMobile() &&         <Typography color='primary'>Accounts / {params?.ticker}</Typography>
}      </div>
      <Card variant='outlined' className={classes.card} >
        <CardContent className={classes.cardContent}>
          <Avatar className={classes.avatar}>
            {params?.ticker?.[0] || 'undefined'}
          </Avatar>
          <div className={classes.tickerAmount}>
            <Typography sx={{ marginRight: 1 }}>
              {demoDataQuantity || 0}
            </Typography>
            <Typography>
              {params?.ticker || 'undefined'}
            </Typography>
          </div>
          <div className={classes.actions}>
            {<div className={classes.actionContainer}>


              <IconButton className={classes.issueButton}  component={Link} to={issueAirdropPath}>
                <AddBoxIcon />
              </IconButton>
              <Typography  variant='caption'>
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
          <AssetDetails quantity={demoDataQuantity} ticker={params.ticker || 'NA'} />
        </CardContent>
      </Card>
    
      {enableFabBack &&  isMobile() && <Fab sx={{ position: 'fixed', bottom: 20, right: 30 }}>
        <IconButton color='primary' onClick={onBack}>
          <ArrowBackIosNewIcon color='info' />
        </IconButton>
      </Fab>}
    </div>
  )
}