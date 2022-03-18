import Box from '@mui/material/Box';
import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { isMobile } from '../platform/platform';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { PendingActivities } from '../components/PendingActivities/PendingActivities';
import { Link, useParams } from "react-router-dom";

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
  const {direction} = useParams();
  const [value, setValue] = React.useState(direction === 'inbound'? 0 : 1);
 
  React.useEffect(() => {
    if(direction === 'inbound'){
      setValue(0)
    } else {
      setValue(1)
    }
  },[direction])
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ marginBottom:1, borderBottom: 1, borderColor: 'divider' }}>
        <Tabs variant={isMobile() ? 'fullWidth': undefined} value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Inbound" {...a11yProps(0)} component={Link} to={'/pending/inbound'} />
          <Tab component={Link} to={'/pending/outbound'} label="Outbound" {...a11yProps(1)} />

        </Tabs>
      </Box>
      <Box sx={{marginLeft: isMobile() ? 1 : 0, marginRight: isMobile()? 1 : 0}}>
      <TabPanel value={value} index={0}>
        <PendingActivities isInbound={true}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PendingActivities isInbound={false}/>
      </TabPanel>
      </Box>
      </>
  );
}

export const PendingActivitiesPage: React.FC = () => {
  const classes = useStyles();

  return (
      <Box component="main" sx={{ flexGrow: 1, }} className={classes.root}>
        <BasicTabs/>
      </Box>
  )
}