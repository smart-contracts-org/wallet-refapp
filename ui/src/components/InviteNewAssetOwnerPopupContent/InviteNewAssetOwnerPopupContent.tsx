import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { AppBar, Button } from '@mui/material';
import { InviteNewAssetOwnerForm } from '../InviteNewAssetOwnerForm/InviteNewAssetOwnerForm';
import { InviteNewAssetOwnerRecipients } from '../InviteNewAssetOwnerRecipients/InviteNewAssetOwnerRecipients';
import { TabPanel, a11yProps } from '../TabPanel/TabPanel';


export interface InviteNewAssetOwnerPopupContentProps {
  handleClose: () => void
}

export const InviteNewAssetOwnerPopupContent: React.FC<InviteNewAssetOwnerPopupContentProps> = ({handleClose}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <AppBar position="static">
          <Tabs value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
          >
            <Tab label="Invite New Asset Owner" {...a11yProps(0)} />
            <Tab label="Recipients" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
      </Box>
        <TabPanel value={value} index={0}>
        <InviteNewAssetOwnerForm/>
        <Button
        variant='outlined'
        fullWidth
        size='small'
        onClick={handleClose}
        >
          Cancel
        </Button>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <InviteNewAssetOwnerRecipients/>
      </TabPanel>
    </Box>
  );
}
