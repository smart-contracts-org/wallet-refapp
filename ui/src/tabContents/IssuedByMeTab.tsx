import { Box, LinearProgress } from '@mui/material';
import React from 'react';
import { AssetAccountRow } from '../components/AssetAccountRow/AssetAccountRow';
import { UserPrompt } from '../components/UserPrompt/UserPrompt';
import { PopUp } from '../components/PopUp/PopUp';
import { AssetAction } from '../types/AssetAction';
import { AssetAccountRowNarrow } from '../components/AssetAccountRowNarrow/AssetAccountRowNarrow';
import { isMobile } from '../platform/platform';
import { useGetMyIssuedAssetAccounts } from '../ledgerHooks/ledgerHooks';

export const IssuedByMeTab: React.FC = () => {
  const [popupContent, setPopupContent] = React.useState<AssetAction | undefined>(undefined)
  const myIssuedAssetAccounts = useGetMyIssuedAssetAccounts()
  const isLoading = myIssuedAssetAccounts.loading
  const assetAccountRows = myIssuedAssetAccounts.contracts.map((contract,i) => {
    const ticker = contract.payload.assetType.symbol;
    const issuer = contract.payload.assetType.issuer;

    return (
      isMobile() ? <AssetAccountRowNarrow
      key={ticker + issuer + i}
      issuer={issuer}
      isIssuedByMeTab={true}
      owner={issuer}
      ticker={ticker}
      
    /> : <AssetAccountRow
    key={ticker + issuer + i}
    issuer={issuer}
    isIssuedByMeTab={true}
    owner={issuer}
    ticker={ticker}
    />
    )
  })
  const handleClose = () => {
    setPopupContent(undefined);
  }
  const hasAccounts = myIssuedAssetAccounts.contracts.length > 0

  return (
    <Box>
      {isLoading ? <LinearProgress/> : assetAccountRows}
      
      {!hasAccounts && <UserPrompt />}
      <PopUp
        issuer={''}
        owner={''}
        quantity={0}
        isFungible={false}
        isShareable={false}
        isAirdroppable={false}
        ticker={''} assetAction={popupContent} handleClose={handleClose} />
    </Box>
  )
}