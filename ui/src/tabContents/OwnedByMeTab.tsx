import React from 'react';
import { AssetAccountRow } from '../components/AssetAccountRow/AssetAccountRow';
import { Prompt } from '../components/Prompts/Prompt';
import {  LinearProgress, Typography } from '@mui/material';
import { useGetAllAssetAccounts } from '../ledgerHooks/ledgerHooks';

export const OwnedByMeTab: React.FC = () => {
  const {loading, contracts} = useGetAllAssetAccounts();
  const assetRows = contracts.map((contract, i)  => <AssetAccountRow owner={contract.payload.owner} isFungible={contract.payload.assetType.fungible} owner={contract.payload.owner} issuer={contract.payload.assetType.issuer} ticker={contract.payload.assetType.symbol}/>)
  console.log(contracts)
  return (
    <>
      <Prompt>
        <Typography color='text.primary' variant='body2'>
          Assets that you own are shown here. If there is an asset that you would like to own, contact an existing owner and request an invite to the asset account with you.
        </Typography>
      </Prompt>

      {
        loading ? <LinearProgress /> : assetRows
      }
      

     <AssetAccountRow isFungible isAirdroppable isShareable owner={'me'} issuer={'Digital Asset'} ticker={'DAMLCOIN'} quantity={800} isIssuer /> 
      <AssetAccountRow owner={'me'} issuer={'Alex'} ticker={'ATOKEN'} quantity={100000} /> 
      <AssetAccountRow owner={'me'} issuer={'THEWEEKEND'} ticker={'TICKET'} quantity={1} />

    </>
  )
}