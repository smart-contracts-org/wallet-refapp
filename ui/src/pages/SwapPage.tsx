import React from 'react';
import {  useNavigate } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, Box, Card, CardContent, IconButton, LinearProgress, Typography } from '@mui/material';
import { SwapForm } from '../components/SwapForm/SwapForm';
import { usePageStyles } from './AssetProfilePage';
import { isMobile } from '../platform/platform';
import { enableFabBack } from './IssueAirdropPage';
import { FloatingBackButton } from '../components/FloatingBackButton/FloatingBackButton';
import { useQuery } from './PendingActivityDetailsPage/PendingActivityDetailsPage';
import { useGetAssetAccountByKey, useGetMyOwnedAssetsByAssetType } from '../ledgerHooks/ledgerHooks';
import { getAssetSum } from '../utils/getAssetSum';
import { useParty } from '@daml/react';


export const SwapPage: React.FC = () => {
  const nav = useNavigate();
  const query = useQuery();
  
  const reference = ""
  const party = useParty();
  const issuer = query.get('issuer') || ""
  const symbol = query.get('ticker') || ""
  const isFungible = query.get('isFungible') === 'true'
  // get your owned asset account
  const { contract: assetAccountContract, loading: assetAccountContractLoading} = useGetAssetAccountByKey({issuer, symbol, fungible: isFungible, reference: ''})
  
  const { loading: assetContractsLoading, contracts: assetContracts } = useGetMyOwnedAssetsByAssetType({ issuer: issuer, symbol: symbol, isFungible: isFungible, owner: party });


  const classes = usePageStyles();
  const onBack = () => {
    nav(-1)
  }
  // TODO: 
  // Fetch token quantity
  if(assetContractsLoading){
    return (
      <LinearProgress/>
    )
  }
  return (
    <div className={classes.root}>
      <div className={classes.buttonContainer} onClick={onBack}>
        <IconButton  color='primary'>
          <ArrowBackIosNewIcon />
        </IconButton>
        {isMobile() && <Typography color='primary'>Back</Typography>}
      </div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ marginBottom: 0.5 }} color='primary' variant='h6'>
          Swap
          </Typography>
      <Card variant='outlined' >
        <CardContent className={classes.cardContent}>
          <Avatar className={classes.avatar}>
            {symbol?.[0] || 'undefined'}
          </Avatar>
          <SwapForm issuer={issuer} isFungible={isFungible} reference={reference}  symbol={symbol || 'NA'}/>
        </CardContent>
      </Card>
      </Box>
      {enableFabBack &&  isMobile() && <FloatingBackButton/>}

    </div>
  )
}