import React from 'react';

import { Card, CardContent,  Typography } from '@mui/material';
export const GettingStartedMessage: React.FC = () => {
  return (
    <>
    <Card sx={{margin: 1}}>
          <CardContent>
            <Typography color='primary' sx={{fontWeight: 'bold'}} variant='h6'>
              1. Getting Started
            </Typography>
            <Typography>
            Click "Create" in the left hand menu to create your AssetHoldingAccount. The AssetHoldingAccount is responsible for sending / swapping / choices. Click here to see the full Daml template. 
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
        <Card sx={{margin: 1}}>
          <CardContent>
            <Typography color='primary' sx={{fontWeight: 'bold'}} variant='h6'>
             Issue To Self
            </Typography>
            <Typography>
              This option allows for issuance of the asset to be created directly in your wallet.
             </Typography>
          </CardContent>
        </Card>
        <Card sx={{margin: 1}}>
          <CardContent>
            <Typography color='primary' sx={{fontWeight: 'bold'}} variant='h6'>
             Airdrop
            </Typography>
            <Typography>
              This option allows for issuance of the asset to be created directly in your wallet.
             </Typography>
          </CardContent>
        </Card>
        
        </>
  )
}