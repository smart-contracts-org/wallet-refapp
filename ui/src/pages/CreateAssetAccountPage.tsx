import { Box, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { CreateAssetAccountSteps } from '../components/CreateAssetAccountSteps/CreateAssetAccountSteps';
export const CreateAssetAccountPage: React.FC = () => {

  return (
    <>
      <Box sx={{ paddingLeft: 0 }}>
        <CreateAssetAccountSteps />
      </Box>
    </>
  )
}