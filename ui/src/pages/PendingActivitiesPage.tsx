import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { PendingInboundActivities } from '../components/PendingInboundActivities/PendingInboundActivities';
import { PendingOutboundActivities } from '../components/PendingOutboundActivities/PendingOutbouneActivities';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const TabPanel: React.FC<TabPanelProps> = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const BasicTabs: React.FC<unknown> = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ marginBottom: 1, borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Inbound" {...a11yProps(0)} />
          <Tab label="Outbound" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PendingInboundActivities/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PendingOutboundActivities/>
      </TabPanel>
    </Box>
  );
}

export const PendingActivitiesPage: React.FC = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <BasicTabs />
    </Box>
  )
}