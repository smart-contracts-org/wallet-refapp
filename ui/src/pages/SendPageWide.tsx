import React from 'react';
import { SendPopupContent } from '../components/SendPopupContent/SendPopupContent';
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, Card, CardContent, IconButton } from '@mui/material';
import { SendForm } from '../components/SendForm/SendForm';
import { isMobile } from '../platform/platform';
import { usePageStyles } from './AssetProfilePages';



export const SendPageWide: React.FC = () => {
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
      <div className={classes.buttonContainer}
      >
        <IconButton color='primary' onClick={onBack}>
          <ArrowBackIosNewIcon />
        </IconButton>
      </div>
      <Card variant='outlined' >
        <CardContent className={classes.cardContent}>
          <Avatar className={classes.avatar}>
            {params?.ticker?.[0] || 'undefined'}
          </Avatar>
          <SendForm quantity={demoDataQuantity} ticker={params.ticker || 'NA'}/>
        </CardContent>
      </Card>
    </div>
  )
}