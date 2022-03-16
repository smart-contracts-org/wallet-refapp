import React from 'react';
import { useNavigate } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { SendForm } from '../components/SendForm/SendForm';
import { isMobile } from '../platform/platform';
import { usePageStyles } from './AssetProfilePage';
import { enableFabBack } from './IssueAirdropPage';
import { FloatingBackButton } from '../components/FloatingBackButton/FloatingBackButton';
import { useQuery } from './PendingActivityDetailsPage/PendingActivityDetailsPage';
import { useParty } from '@daml/react';
import { AssetHoldingAccount } from '@daml.js/wallet-refapp/lib/Account';
import { ContractId } from '@daml/types';

export const SendPage: React.FC = () => {
  const nav = useNavigate();
  const classes = usePageStyles();
  const query = useQuery();
  const issuer = query.get('issuer')
  const symbol = query.get('ticker');
  const owner = query.get('owner');
  const contractId = query.get('contractId') as ContractId<AssetHoldingAccount>
  const isFungible = query.get('isFungible') === 'true'
  const isShareable = query.get('isShareable') === 'true'
  const isAirdroppable = query.get('isAirdroppable') === 'true'
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
              {symbol?.[0] || 'undefined'}
            </Avatar>
            <SendForm
            assetAccountCid={contractId}
            issuer={issuer || ""}
            isAirdroppable={isAirdroppable}
            isFungible={isFungible}
            isShareable={isShareable}
            owner={owner || ""}
            reference={""}
            quantity={demoDataQuantity} ticker={symbol || 'NA'} />
          </CardContent>
        </Card>
      </Box>
      {enableFabBack &&  isMobile() && <FloatingBackButton/>}
    </div>
  )
}