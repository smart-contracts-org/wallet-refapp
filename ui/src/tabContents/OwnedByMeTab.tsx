import React from 'react';
import { AssetAccountRow } from '../components/AssetAccountRow/AssetAccountRow';
import { ContractsContext } from '../providers/ContractsProvider';
import { Prompt } from '../components/Prompts/Prompt';
import {  LinearProgress, Typography } from '@mui/material';
import { AssetAccountRowNarrow } from '../components/AssetAccountRowNarrow/AssetAccountRowNarrow';
import { isMobile } from '../platform/platform';
import { useGetAllAssetAccounts } from '../ledgerHooks/ledgerHooks';

export const OwnedByMeTab: React.FC = () => {
  const allAssetAccounts = useGetAllAssetAccounts();
  const contractContext = React.useContext(ContractsContext)
  const state = contractContext.state
  
  return (
    <>
      <Prompt>
        <Typography color='text.primary' variant='body2'>
          Assets that you own are shown here. If there is an asset that you would like to own, contact an existing owner and request an invite to the asset account with you.
        </Typography>
      </Prompt>
      {
        allAssetAccounts.loading ? <LinearProgress /> : allAssetAccounts.contracts.map((contract) => {
          const owner = contract.payload.owner
          const issuer = contract.payload.assetType.issuer
          const ticker = contract.payload.assetType.symbol

          return (
            <AssetAccountRow owner={owner} issuer={issuer} ticker={ticker} />
          )
        })
      }

      { <AssetAccountRow isFungible isAirdroppable isShareable owner={'me'} issuer={'Digital Asset'} ticker={'DAMLCOIN'} quantity={800} isIssuer /> }
      { <AssetAccountRow owner={'me'} issuer={'Alex'} ticker={'ATOKEN'} quantity={100000} /> }
      {<AssetAccountRow owner={'me'} issuer={'THEWEEKEND'} ticker={'TICKET'} quantity={1} /> }

    </>
  )
}