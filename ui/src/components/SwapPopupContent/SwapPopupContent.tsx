import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { AppBar, Button  } from '@mui/material';
import { SwapForm } from '../SwapForm/SwapForm';
import { TabPanel, a11yProps } from '../TabPanel/TabPanel';

export interface SwapPopupContentProps {
  handleClose: () => void;
  ticker: string
}
export const SwapPopupContent: React.FC<SwapPopupContentProps> = ({ticker, handleClose}) => {
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
          <Tab label="Swap" {...a11yProps(0)} />
          {/* <Tab label="Recipients" {...a11yProps(1)} /> */}
        </Tabs>
      </AppBar>
    </Box>
      <TabPanel value={value} index={0}>
        <SwapForm ticker={ticker}/>
        <Button fullWidth size='small' variant='outlined' onClick={handleClose}>
          Cancel
        </Button>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Button fullWidth size='small' variant='outlined' onClick={handleClose}>
          Cancel
        </Button>
    </TabPanel>
  </Box>
);
}
