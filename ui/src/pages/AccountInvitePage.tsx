import React from 'react';
import { useNavigate } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { InviteNewAssetOwnerForm } from '../components/InviteNewAssetOwnerForm/InviteNewAssetOwnerForm';
import { usePageStyles } from './AssetProfilePage';
import { enableFabBack } from './IssueAirdropPage';
import { FloatingBackButton } from '../components/FloatingBackButton/FloatingBackButton';
import { isMobile } from '../platform/platform';
import { useQuery } from './PendingActivityDetailsPage/PendingActivityDetailsPage';


export const AccountInvitePage: React.FC = () => {
  const nav = useNavigate();
  const classes = usePageStyles();
  const query = useQuery();
  const issuer = query.get('issuer') || ""
  const symbol = query.get('ticker') || ""
  const owner = query.get('owner') || ""
  const isFungible = query.get('isFungible') === 'true'

  const onBack = () => {
    nav(-1)
  }

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
              {symbol?.[0] || 'undefined'}
            </Avatar>
            <Typography>
              {symbol}
            </Typography>
            <InviteNewAssetOwnerForm owner={owner} issuer={issuer} symbol={symbol} fungible={isFungible} reference={""} />
          </CardContent>
        </Card>
      </Box>
      {enableFabBack && isMobile() && <FloatingBackButton />}
    </div>
  )
}