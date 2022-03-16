import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { SwapForm } from '../components/SwapForm/SwapForm';
import { usePageStyles } from './AssetProfilePage';
import { isMobile } from '../platform/platform';
import { enableFabBack } from './IssueAirdropPage';
import { FloatingBackButton } from '../components/FloatingBackButton/FloatingBackButton';


export const SwapPage: React.FC = () => {
  const nav = useNavigate();
  const params = useParams();
  const classes = usePageStyles();
  const onBack = () => {
    nav(-1)
  }
  // TODO: 
  // Fetch token quantity
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
            {params?.ticker?.[0] || 'undefined'}
          </Avatar>
          <SwapForm  ticker={params.ticker || 'NA'}/>
        </CardContent>
      </Card>
      </Box>
      {enableFabBack &&  isMobile() && <FloatingBackButton/>}

    </div>
  )
}