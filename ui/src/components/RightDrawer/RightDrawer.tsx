import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { Link } from "react-router-dom";
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import ListItemText from '@mui/material/ListItemText';
import { Button, Card, CardContent, Divider, Drawer, ListItemButton, Typography } from '@mui/material';
import { menuItems } from '../../configs/sideMenu.config';
import { WelcomeMessage } from '../WelcomeMessage/WelcomeMessage';
import { GettingStartedMessage } from '../GettingStartedMessage/GettingStarted';

const drawerWidth: string = '30%';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.text.secondary
  }
}))

interface SideMenuMobileProps {
  isOpen: boolean;
  handleDrawerOpen: () => void; 
  handleDrawerClose: () => void;
}
export const RightDrawer: React.FC<SideMenuMobileProps> = ({isOpen, handleDrawerOpen, handleDrawerClose}) => {
  
  const [selected, setSelected] = React.useState<number>(0);
  const classes = useStyles()
  const onClick = (index: number) => {
    setSelected(index)
    handleDrawerClose();
  }
  return (
    <>
    <Drawer
      open={true}
      variant="permanent"
      anchor="right"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar/>
      <Box sx={{overflowY:'auto'}}>
      <WelcomeMessage/>
      <GettingStartedMessage/>
      </Box>
     
    </Drawer>
    </>
  );
}
