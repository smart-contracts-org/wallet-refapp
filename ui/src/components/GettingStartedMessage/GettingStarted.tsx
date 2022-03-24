import React from 'react';

import { Card, CardContent, Divider, Drawer, ListItemButton, Typography } from '@mui/material';
import { menuItems } from '../../configs/sideMenu.config';
export const GettingStartedMessage: React.FC = () => {
  return (
    <>
    <Card sx={{margin: 1}}>
          <CardContent>
            <Typography color='primary' sx={{fontWeight: 'bold'}} variant='h6'>
              1. Getting Started
            </Typography>
            <Typography>
            To get started, click "Create" in the left hand side menu. 
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{margin: 1}}>
          <CardContent>
            <Typography color='primary' sx={{fontWeight: 'bold'}} variant='h6'>
             2. Create
            </Typography>
            <Typography>
            The AssetHoldingAccount template is created here. Once you create your account, you can mint it's associated assets. The purpose of the AssetHoldingAccount is also to allow the owner to perform additional actions such as creating a swap, transfering the associated asset. To see the full template, click here.              </Typography>
          </CardContent>
        </Card>
        <Card sx={{margin: 1}}>
          <CardContent>
            <Typography color='primary' sx={{fontWeight: 'bold'}} variant='h6'>
             3. Issue / Airdrop
            </Typography>
            <Typography>
            The AssetHoldingAccount template is created here. Once you create your account, you can mint it's associated assets. The purpose of the AssetHoldingAccount is also to allow the owner to perform additional actions such as creating a swap, transfering the associated asset. To see the full template, click here.              </Typography>
          </CardContent>
        </Card>
        </>
  )
}