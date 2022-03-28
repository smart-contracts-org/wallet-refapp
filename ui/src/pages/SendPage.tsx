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
import { AssetHoldingAccount } from '@daml.js/wallet-refapp/lib/Account';
import { ContractId } from '@daml/types';

export const SendPage: React.FC = () => {
  const nav = useNavigate();
  const classes = usePageStyles();
  const query = useQuery();
  const issuer = query.get('issuer')
  const symbol = query.get('ticker');
  const owner = query.get('owner');
  const assetAccountCid = query.get('contractId') as ContractId<AssetHoldingAccount>
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
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box margin={1} width='100%' flexDirection='row' display='flex' alignItems='center' justifyContent='start'>
          <Box position='absolute'>
          <IconButton color='primary' onClick={onBack}>
            <ArrowBackIosNewIcon />
          </IconButton>
          </Box>
          <Box flexGrow='1' textAlign='center'>
          <Typography color='primary' variant='h5' sx={{flexGrow: 1, marginLeft: 'auto'}}>
            Send
          </Typography>
          </Box>
        </Box>

        <Card variant='outlined' >
          <CardContent className={classes.cardContent}>
            <Avatar className={classes.avatar}>
              {symbol?.[0] || 'undefined'}
            </Avatar>
            <SendForm
              assetAccountCid={assetAccountCid}
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
      {enableFabBack && isMobile() && <FloatingBackButton />}
    </div>
  )
}