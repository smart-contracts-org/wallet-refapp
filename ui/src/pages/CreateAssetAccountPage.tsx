import { Card, CardContent } from '@mui/material';
import React from 'react';
import { CreateAssetAccountSteps } from '../components/CreateAssetAccountSteps/CreateAssetAccountSteps';
import { usePageStyles } from './AssetProfilePage';


export const CreateAssetAccountPage: React.FC = () => {
  
  const classes = usePageStyles();
  
  return (
      <Card variant='outlined' className={classes.root}>
        <CardContent className={classes.cardContent}>
          <CreateAssetAccountSteps />
        </CardContent>
      </Card>
   
  )
}