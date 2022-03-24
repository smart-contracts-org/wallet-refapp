import React from 'react';

import { Card, CardContent, Divider, Drawer, ListItemButton, Typography } from '@mui/material';
import { menuItems } from '../../configs/sideMenu.config';
export const WelcomeMessage: React.FC = () => {
  return (
    <Card sx={{margin: 1}}>
          <CardContent>
            <Typography color='primary' sx={{fontWeight: 'bold'}} variant='h6'>
              Welcome To the DA Wallet Ref App
            </Typography>
            <Typography>
            an open-sourced, fully functional wallet powered by Daml smart contracts, ReactJs, and deployed onto Daml hub.
The purpose of this app is to provide developers a working example of what they can acheive with Daml. 
            </Typography>
          </CardContent>
        </Card>
  )
}