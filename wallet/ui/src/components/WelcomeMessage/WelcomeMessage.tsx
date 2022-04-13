import React from 'react';

import { Card, CardContent, Typography, Link } from '@mui/material';
export const WelcomeMessage: React.FC = () => {
  return (
    <Card sx={{ margin: 1 }}>
      <CardContent>
        <Typography color='primary' sx={{ fontWeight: 'bold' }} variant='h6'>
          Welcome To the Wallet Ref App
            </Typography>
        <Typography>
        an open-source digital asset wallet powered by Daml smart contracts and Daml/React Javascript library and deployed in Daml Hub. This app  provides developers with a working example of how to implement essential workflows related to digital assets such as asset issuance, airdrop, transfer and atomic swaps. We assume the developer already has basic knowledge of Daml. You can view the full repo here.
            </Typography>
      </CardContent>
    </Card>
  )
}