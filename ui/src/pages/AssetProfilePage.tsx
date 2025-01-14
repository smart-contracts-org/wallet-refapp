import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, Box, Card, CardContent, IconButton, LinearProgress, Typography } from '@mui/material';
import { AssetDetails } from '../components/AssetDetails/AssetDetails';
import SendIcon from '@mui/icons-material/Send';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import { isMobile } from '../platform/platform';
import { enableFabBack } from './IssueAirdropPage';
import { chipColors } from '../components/RowChip/RowChip';
import { useParty } from '@daml/react';
import { numberWithCommas } from '../utils/numberWithCommas';
import { useGetMyAssetAccountByKey, useGetMyOwnedAssetsByAssetType } from '../ledgerHooks/ledgerHooks';
import { getAssetSum } from '../utils/getAssetSum';
import { useQuery } from './PendingActivityDetailsPage/PendingActivityDetailsPage';
import { FloatingBackButton } from '../components/FloatingBackButton/FloatingBackButton';
import { useAdminParty } from '@daml/hub-react';
import { DeploymentMode, deploymentMode } from '../config';
import ReportIcon from '@mui/icons-material/Report';
export const usePageStyles = makeStyles((theme: Theme) => ({


  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: isMobile() ? undefined : 'center',
    width: '100%',
    flexGrow: '1',
    flexDirection: isMobile() ? 'column' : 'column',
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
    margin: theme.spacing(1),
    width: '100%',
    justifyContent: 'center',
    display: 'flex'
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
    margin: theme.spacing(1)
  },
  tickerAmount: {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonContainer: {
    marginBottom: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center',
    // marginRight: 'auto'
  },
  issueButton: {
    color: chipColors.issuer
  },
  issuerWarning: {
    backgroundColor: theme.palette.info.dark,
  }
}))

export const AssetProfilePage: React.FC = () => {
  const nav = useNavigate();
  const query = useQuery();
  const reference = query.get('reference') || ""
  const issuer = query.get('issuer') || ""
  const symbol = query.get('ticker') || ""
  const isFungible = query.get('isFungible') === 'true'
  const { contract: assetAccountContract } = useGetMyAssetAccountByKey({ issuer, symbol, fungible: isFungible, reference })
  const contractId = query.get('contractId');
  const isShareable = assetAccountContract?.payload.resharable
  const isAirdroppable = assetAccountContract?.payload.airdroppable
  const party = useParty();
  const { loading, contracts } = useGetMyOwnedAssetsByAssetType({ reference, issuer, symbol, isFungible, owner: party });
  const amount = getAssetSum(contracts);
  const formattedSum = numberWithCommas(amount)
  const classes = usePageStyles();
  const attributesPath = `?issuer=${issuer}&ticker=${symbol}&isFungible=${isFungible}&isShareable=${isShareable}&isAirdroppable=${isAirdroppable}&owner=${party}&contractId=${contractId}&reference=${reference}`
  const sendPath = `/send${attributesPath}`
  const swapPath = `/swap${attributesPath}`
  const assetInvitePath = `/invite${attributesPath}`
  const issueAirdropPath = `/issue${attributesPath}`
  const airdropRequestPath = `/airdrop-request${attributesPath}`
  const prodAdminParty = useAdminParty();
  const admin = deploymentMode === DeploymentMode.DEV ? 'a' : prodAdminParty;


  const onBack = () => {
    nav(-1)
  }

  if (loading) {
    return (
      <LinearProgress />
    )
  }

  return (
    <div className={classes.root}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box margin={1} width='100%' flexDirection='row' display='flex' alignItems='center' justifyContent='start'>
          <Box position='absolute'>
            <IconButton color='primary' onClick={onBack}>
              <ArrowBackIosNewIcon />
            </IconButton>
          </Box>
          <Box flexGrow='1' textAlign='center'>
            <Typography color='primary' variant='h5' sx={{ flexGrow: 1, marginLeft: 'auto' }}>
              {symbol}
            </Typography>
          </Box>
        </Box>
        <Card className={classes.card} >
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
              {issuer === admin && symbol === 'ET' && issuer !== party && <div className={classes.actionContainer}>


                <IconButton className={classes.issueButton} component={Link} to={airdropRequestPath}>
                  <AddBoxIcon />
                </IconButton>
                <Typography variant='caption'>
                  Request Airdrop
</Typography>
              </div>}
              {issuer === party && <div className={classes.actionContainer}>


                <IconButton className={classes.issueButton} component={Link} to={issueAirdropPath}>
                  <AddBoxIcon />
                </IconButton>
                <Typography variant='caption'>
                  issue / airdrop
                </Typography>
              </div>}
              <div className={classes.actionContainer}>


                <IconButton color='primary' disabled={amount === 0} component={Link} to={sendPath}>
                  <SendIcon />
                </IconButton>
                <Typography variant='caption'>
                  Send
              </Typography>
              </div>
              <div className={classes.actionContainer}>
                <IconButton color='primary' disabled={amount === 0} component={Link} to={swapPath}>
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
            {amount === 0 && issuer === party && <Card variant='outlined' sx={{ width: '100%', margin: 1, alignItems: 'center', padding: 1, display: 'flex' }} >
              <ReportIcon sx={{ marginRight: 1 }} />
              <Typography variant='body2'>
                You have {amount} amount. Click <b>issue / airdrop</b> to issue assets.
              </Typography>
            </Card>}
            <AssetDetails
              isShareable={isShareable}
              isAirdroppable={isAirdroppable}
              owner={party}
              issuer={issuer || "issuer"}
              reference={reference}
              isFungible={isFungible} quantity={formattedSum} ticker={symbol || 'Ticker'} />
          </CardContent>
        </Card>
      </Box>


      {enableFabBack && isMobile() &&
        <FloatingBackButton />}
    </div>
  )
}