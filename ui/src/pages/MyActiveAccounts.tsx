import Box from '@mui/material/Box';
import React from 'react';
import { isMobile } from '../platform/platform';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { AssetAccountRow } from '../components/AssetAccountRow/AssetAccountRow';
import { Prompt } from '../components/Prompts/Prompt';
import {  LinearProgress, Typography } from '@mui/material';
import { useGetAllAssetHoldingAccounts } from '../ledgerHooks/ledgerHooks';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: isMobile() ? theme.spacing(0) : theme.spacing(1), 
    overflow: 'hidden'
  }, 
  welcome: {
    fontWeight: 'bold'
  }
}))


export const MyActiveAccountsPage: React.FC = () => {
  console.log('my')
  const classes = useStyles();
  const { loading, contracts } = useGetAllAssetHoldingAccounts();
  const assetRows = contracts.map((contract) => <AssetAccountRow
    key={contract.contractId}
    contractId={contract.contractId} 
    isFungible={contract.payload.assetType.fungible} 
    owner={contract.payload.owner} 
    issuer={contract.payload.assetType.issuer} 
    reference={contract.payload.assetType.reference || ""}
    ticker={contract.payload.assetType.symbol} 
    isAirdroppable={contract.payload.airdroppable}
    isShareable={contract.payload.resharable}
    />)

  if (loading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    )
  }
  return (
    <Box component="main" sx={{ flexGrow: 1, }} className={classes.root}>
      <Box sx={{margin: isMobile() ? 1: 0}}>
        <Prompt>
          <Typography color='text.primary' variant='body2'>
            Assets that you own are shown here. If there is an asset that you would like to own, contact an existing owner and request an invite to the asset account with you.
        </Typography>
        </Prompt>
        {assetRows}
        {/* <AssetAccountRow reference={""} contractId={'demo'} isFungible isAirdroppable isShareable owner={'me'} issuer={'Digital Asset'} ticker={'DAMLCOIN'} quantity={800} isIssuer />
        <AssetAccountRow reference={""}  contractId={'demo'} owner={'me'} issuer={'Alex'} ticker={'ATOKEN'} quantity={100000} />
        <AssetAccountRow reference={""} contractId={'demo'} owner={'me'} issuer={'THEWEEKEND'} ticker={'TICKET'} quantity={1} /> */}

      </Box>
    </Box>
  )
}