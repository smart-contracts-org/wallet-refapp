import React from 'react';
import { useNavigate } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, Box, Button, Card, CardContent, IconButton, Typography } from '@mui/material';
import { usePageStyles } from './AssetProfilePage';
import { IssueToSelfForm } from '../components/IssueToSelfForm/IssueToSelfForm';
import { AirdropForm } from '../components/AirdropForm/AirdropForm';
import Fab from '@mui/material/Fab';
import { isMobile } from '../platform/platform';
import { useQuery } from './PendingActivityDetailsPage/PendingActivityDetailsPage';

export const enableFabBack = true

export const IssueAirdropPage: React.FC = () => {
  const nav = useNavigate();
  const query = useQuery();
  // These params are passed into the ur
  // because we cannot pass props to the page components
  const issuer = query.get('issuer') || ""
  const symbol = query.get('ticker') || ""
  const owner = query.get('owner') || ""
  const isFungible = query.get('isFungible') === 'true'
  
  const classes = usePageStyles();
  const [index, setIndex] = React.useState(1)
  const onBack = () => {
    nav(-1)
  }
  const onButtonClick = (val: number) => {
    setIndex(val)
  }
  if (!symbol) {
    return (
      <Card>
        <CardContent>
          Missing Ticker Information
        </CardContent>
      </Card>

    )
  }
  // TODO: 
  // Fetch token quantity
  return (
    <div className={classes.root}>
      <div className={classes.buttonContainer} onClick={onBack}>
        <IconButton color='primary'>
          <ArrowBackIosNewIcon />
        </IconButton>
        {isMobile() && <Typography color='primary'>Back</Typography>}
      </div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ marginBottom: 0.5 }} color='primary' variant='h6'>
          Issue / Airdrop
          </Typography>
        <Card variant='outlined' className={classes.card} >
          <CardContent className={classes.cardContent}>
            <Avatar className={classes.avatar}>
              {symbol[0] || 'undefined'}
            </Avatar>
            <Box sx={{ marginBottom: 1, display: 'flex', flexDirection: 'row', width: '100%' }}>
              <Button sx={{ marginRight: 0.5 }} onClick={() => { onButtonClick(1) }} fullWidth variant={index === 1 ? 'contained' : 'outlined'} >Issue to Self</Button>
              <Button sx={{ marginLeft: 0.5 }} onClick={() => { onButtonClick(2) }} fullWidth variant={index === 2 ? 'contained' : 'outlined'}>Airdrop</Button>
            </Box>
            {index === 1 && <IssueToSelfForm handleClose={() => {}}  ticker={symbol} />}
            {/* TODO, add reference to URL, so we can pass it down */}
            {index === 2 && <AirdropForm issuer={issuer} owner={owner} symbol={symbol} isFungible={isFungible} reference={""} />}
          </CardContent>
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