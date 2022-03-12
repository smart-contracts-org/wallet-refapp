import React from 'react';
import { SendPopupContent } from '../components/SendPopupContent/SendPopupContent';
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, Card, CardContent, IconButton } from '@mui/material';
import { InviteNewAssetOwnerForm } from '../components/InviteNewAssetOwnerForm/InviteNewAssetOwnerForm';
import { usePageStyles } from './AssetProfilePages';


export const AssetInvitePage: React.FC = () => {
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
      <div className={classes.buttonContainer}>
        <IconButton color='primary' onClick={onBack}>
          <ArrowBackIosNewIcon  />
        </IconButton>
      </div>
      <Card variant='outlined' className={classes.card} >
        <CardContent className={classes.cardContent}>
          <Avatar className={classes.avatar}>
            {params?.ticker?.[0] || 'undefined'}
          </Avatar>
          <InviteNewAssetOwnerForm/>
        </CardContent>
      </Card>
    </div>
  )
}