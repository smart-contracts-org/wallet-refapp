import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { AppBar, Button } from '@mui/material';
import { SendForm } from '../SendForm/SendForm';
import { PendingFeatureSend } from '../PendingFeatureSend/PendingFeatureSend';
import { TabPanel, a11yProps } from '../TabPanel/TabPanel';

export interface SendPopupContentProps {
  handleClose: () => void;
  ticker: string;
}
export const SendPopupContent: React.FC<SendPopupContentProps> = ({ticker, handleClose}) => {
const [value, setValue] = React.useState(0);

const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  setValue(newValue);
};

return (
  <Box sx={{ width: '100%',
  // height: '500px' 
  }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <AppBar color='primary' position="sticky">
        <Tabs value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="Send" {...a11yProps(0)} />
          <Tab label="Recipients" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
    </Box>
      <TabPanel value={value} index={0}>
        <SendForm ticker={ticker}/>
        <Button fullWidth size='small' variant='outlined' onClick={handleClose}>
          Cancel
        </Button>
      </TabPanel>
      <TabPanel value={value} index={1}>
      {/* <InviteForm/> */}
      <PendingFeatureSend/>
      <Button fullWidth size='small' variant='outlined' onClick={handleClose}>
          Cancel
        </Button>
    </TabPanel>
  </Box>
);
}
