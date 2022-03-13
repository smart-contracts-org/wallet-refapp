import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { InviteNewAssetOwnerForm } from '../components/InviteNewAssetOwnerForm/InviteNewAssetOwnerForm';
import { usePageStyles } from './AssetProfilePage';


export const AssetInvitePage: React.FC = () => {
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
      <div className={classes.buttonContainer}>
        <IconButton color='primary' onClick={onBack}>
          <ArrowBackIosNewIcon />
        </IconButton>
      </div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ marginBottom: 0.5 }} color='primary' variant='h6'>
          Invite
          </Typography>
        <Card variant='outlined' className={classes.card} >
          <CardContent className={classes.cardContent}>
            <Avatar className={classes.avatar}>
              {params?.ticker?.[0] || 'undefined'}
            </Avatar>
            <InviteNewAssetOwnerForm />
          </CardContent>
        </Card>
      </Box>
    </div>
  )
}