import { Box, Button, Fab } from '@mui/material';
import React from 'react';
import { AssetAccountRow } from '../components/AssetAccountRow/AssetAccountRow';
import { UserPrompt } from '../components/UserPrompt/UserPrompt';
import AddIcon from '@mui/icons-material/Add';
import { PopUp } from '../components/PopUp/PopUp';
import { AssetAction } from '../types/AssetAction';
import { ContractsContext } from '../providers/ContractsProvider';
import { AssetAccountRowNarrow } from '../components/AssetAccountRowNarrow/AssetAccountRowNarrow';
import { isMobile } from '../platform/platform';

const isFabActivated = true

export const IssuedByMeTab: React.FC = () => {
  const [popupContent, setPopupContent] = React.useState<AssetAction | undefined>(undefined)
  const contractsContext = React.useContext(ContractsContext)
  const selectPopupContent = (contentType: AssetAction) => {
    setPopupContent(contentType)
  }
  const handleClose = () => {
    setPopupContent(undefined);
  }
  const allContracts = contractsContext.state
  const hasAccounts = Object.values(allContracts.assetAccounts).length > 0

  return (
    <Box>
      {!isFabActivated && <Button size='small' color='primary' variant='contained' onClick={() => selectPopupContent(AssetAction.CreateAccount)}>
        <AddIcon />
        Create asset account
      </Button>}
      {Object.values(allContracts.assetAccounts).map((assetAccount, i) => {
        return (isMobile() ? <AssetAccountRowNarrow
          key={assetAccount.ticker + i}
          isIssuedByMeTab
          {...assetAccount}
        /> : <AssetAccountRow
          key={assetAccount.ticker + i}
          isIssuedByMeTab
          {...assetAccount}
        />)
      })}
      {!hasAccounts && <UserPrompt />}
      <PopUp
        issuer={''}
        owner={''}
        quantity={0}
        isFungible={false}
        isShareable={false}
        isAirdroppable={false}
        ticker={''} assetAction={popupContent} handleClose={handleClose} />
      {isFabActivated && <Fab variant='extended' sx={{ position: 'fixed', bottom: 30, right: 30 }} size='small' color='primary' onClick={() => selectPopupContent(AssetAction.CreateAccount)}>
        <AddIcon />
        Create asset account
      </Fab>}
    </Box>
  )
}