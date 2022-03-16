import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { AppBar, Button} from '@mui/material';
import { CreateAccountForm } from '../CreateAccountForm/CreateAccountForm';
import { TabPanel, a11yProps } from '../TabPanel/TabPanel';
export interface CreateAccountPopupContentProps {
  handleClose: () => void
}

export const CreateAccountPopupContent: React.FC<CreateAccountPopupContentProps> = ({ handleClose }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <AppBar position="static" >
          <Tabs value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
          >
            <Tab label="Create Asset Account" {...a11yProps(0)} />
          </Tabs>
        </AppBar>
      </Box>
      <TabPanel value={value} index={0}>
        <CreateAccountForm handleClose={handleClose} />
        <Button
          variant='outlined'
          size='small'
          fullWidth
          onClick={handleClose}
        >
          Cancel
      </Button>
      </TabPanel>
    </Box>
  );
}
