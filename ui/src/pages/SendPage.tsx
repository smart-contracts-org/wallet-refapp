import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { SendForm } from '../components/SendForm/SendForm';
import { isMobile } from '../platform/platform';
import { usePageStyles } from './AssetProfilePage';

export const SendPage: React.FC = () => {
  const nav = useNavigate();
  const params = useParams();
  const classes = usePageStyles();
  const onBack = () => {
    nav(-1)
  }
  // TODO: 
  // Fetch token quantity
  const demoDataQuantity = 100
  return (
    <div className={classes.root}>
      {!isMobile() && <div className={classes.buttonContainer}>
        <IconButton color='primary' onClick={onBack}>
          <ArrowBackIosNewIcon />
        </IconButton>
      </div>}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ marginBottom: 0.5 }} color='primary' variant='h5'>
          Send
          </Typography>
        <Card variant='outlined' >
          <CardContent className={classes.cardContent}>
            <Avatar className={classes.avatar}>
              {params?.ticker?.[0] || 'undefined'}
            </Avatar>
            <SendForm quantity={demoDataQuantity} ticker={params.ticker || 'NA'} />
          </CardContent>
        </Card>
      </Box>
    </div>
  )
}