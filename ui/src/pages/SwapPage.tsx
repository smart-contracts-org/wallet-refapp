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
import { useGetMyAssetAccountByKey, useGetMyOwnedAssetsByAssetType } from '../ledgerHooks/ledgerHooks';
import { useParty } from '@daml/react';


export const SwapPage: React.FC = () => {
  const nav = useNavigate();
  const query = useQuery();
  
  const reference = query.get('reference') || ""
  const party = useParty();
  const issuer = query.get('issuer') || ""
  const symbol = query.get('ticker') || ""
  const isFungible = query.get('isFungible') === 'true'
  // get your owned asset account
  const { loading: assetAccountContractLoading} = useGetMyAssetAccountByKey({issuer, symbol, fungible: isFungible, reference})

  const { loading: assetContractsLoading} = useGetMyOwnedAssetsByAssetType({ issuer, symbol, isFungible, owner: party, reference });


  const classes = usePageStyles();
  const onBack = () => {
    nav(-1)
  }
  // TODO: 
  // Fetch token quantity
  if(assetContractsLoading || assetAccountContractLoading){
    return (
      <LinearProgress sx={{width:'100%'}}/>
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
          <Typography color='primary' variant='h5' sx={{flexGrow: 1, marginLeft: 'auto'}}>
            Swap
          </Typography>
          </Box>
        </Box>
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