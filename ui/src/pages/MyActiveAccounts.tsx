import {  Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { IssuedByMeTab } from '../tabContents/IssuedByMeTab';
import { OwnedByMeTab } from '../tabContents/OwnedByMeTab';
import { CreateAssetAccountPage } from './CreateAssetAccountPage';
import { isMobile } from '../platform/platform';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: isMobile() ? theme.spacing(0,0, 0, 0) : theme.spacing(3)
  }
}))
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

export const BasicTabs: React.FC<unknown> =() => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
    const classes = useStyles();


  return (
    <>
      <Box sx={{ marginBottom:1, borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Owned By Me" {...a11yProps(1)} />
          <Tab label="Issued By Me" {...a11yProps(0)} />
          <Tab label="Create" {...a11yProps(1)} />

        </Tabs>
      </Box>
      <Box sx={{marginLeft: isMobile() ? 2 : 0, marginRight: isMobile()? 2 : 0}}>
      <TabPanel value={value} index={1}>
        <IssuedByMeTab/>
      </TabPanel>
      <TabPanel value={value} index={0}>
        <OwnedByMeTab/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CreateAssetAccountPage/>
      </TabPanel>
      </Box>
      </>
  );
}

export const MyActiveAccountsPage: React.FC = () => {
  const classes = useStyles();

  return (
      <Box component="main" sx={{ flexGrow: 1, }} className={classes.root}>
        <Toolbar />
        <BasicTabs/>
      </Box>
  )
}