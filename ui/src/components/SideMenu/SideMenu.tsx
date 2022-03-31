import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { Link } from "react-router-dom";
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import ListItemText from '@mui/material/ListItemText';
import { Divider,  ListItemButton, Switch, Typography } from '@mui/material';
import { menuItems } from '../../configs/sideMenu.config';

const drawerWidth: number = 200;



const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.text.secondary
  }
}))


interface SideMenuProps {
  isRightOpen: boolean;
  toggleRightOpen: () => void;
}
export const SideMenu: React.FC<SideMenuProps> = (props) => {
  const {isRightOpen, toggleRightOpen} = props;
  const [selected, setSelected] = React.useState<number>(0);
  const classes = useStyles()
  const onClick = (index: number) => {
    setSelected(index)
  }
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <List>
          {menuItems.map((item, index) => (
            <ListItemButton onClick={() => onClick(index)} selected={selected === index} key={index} component={Link} to={item.path}>
              <ListItemText className={classes.root}>
                {item.label}
              </ListItemText>
            </ListItemButton>

          ))}

        </List>
        
      </Box>
      <Box marginTop={'auto'} marginBottom={3}>
        <Divider />
        <Box marginTop={1}>
            <Switch checked={isRightOpen} onChange={toggleRightOpen} />
            <Typography variant='caption'>Show App Guide</Typography>
          </Box>
        <Box padding={2} flexDirection='column' display='flex' justifyContent='start'>
          <Typography variant='caption' color='text.secondary'>
            Documentation
        </Typography>
          <Typography variant='caption' color='text.secondary'>
            Github
        </Typography>
          <Typography variant='caption' color='text.secondary'>
            Feature Requests
        </Typography>
          <Typography variant='caption' color='text.secondary'>
            Download Daml
        </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}
