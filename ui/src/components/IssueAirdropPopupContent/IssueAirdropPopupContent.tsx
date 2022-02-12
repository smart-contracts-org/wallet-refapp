import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { AppBar, Button } from '@mui/material';
import { IssueToSelfForm } from '../IssueToSelfForm/IssueToSelfForm';
import { AirdropForm } from '../AirdropForm/AirdropForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
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

export interface IssueAirdropPopupContentProps {
  handleClose: () => void;
  ticker: string;
}

export const IssueAirdropPopupContent: React.FC<IssueAirdropPopupContentProps> = ({ ticker, handleClose }) => {
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
            <Tab label="Issue to self" {...a11yProps(0)} />
            <Tab label="Airdrop" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
      </Box>
      <TabPanel value={value} index={0}>
        <IssueToSelfForm handleClose={handleClose} ticker={ticker} />
        <Button
          variant='outlined'
          size='small'
          fullWidth
          onClick={handleClose}
        >
          cancel
      </Button>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AirdropForm />
        <Button
          variant='outlined'
          size='small'
          fullWidth
          onClick={handleClose}
        >
          cancel
      </Button>
      </TabPanel>
    </Box>
  );
}
