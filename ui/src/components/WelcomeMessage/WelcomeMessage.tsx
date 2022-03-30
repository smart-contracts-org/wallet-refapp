import React from 'react';

import { Card, CardContent,  Typography } from '@mui/material';
export const WelcomeMessage: React.FC = () => {
  return (
    <Card sx={{margin: 1}}>
          <CardContent>
            <Typography color='primary' sx={{fontWeight: 'bold'}} variant='h6'>
              Welcome To the DA Wallet Ref App
            </Typography>
            <Typography>
            an open-sourced, fully functional wallet powered by Daml smart contracts, ReactJs, and deployed onto Daml hub.
The purpose of this app is to provide developers a working example of how to acheive common workflows with regards to digital assets. These include Airdrops, atomic swaps, transfer of ownership (sending tokens)
            </Typography>
          </CardContent>
        </Card>
  )
}