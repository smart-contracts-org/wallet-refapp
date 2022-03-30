import {  Card, CardContent } from '@mui/material';
import React from 'react';
import { CreateAccountForm } from '../components/CreateAccountForm/CreateAccountForm';
import { CreateAssetAccountSteps } from '../components/CreateAssetAccountSteps/CreateAssetAccountSteps';
import { usePageStyles } from './AssetProfilePage';


export const CreateAssetAccountPage: React.FC = () => {
  
  const classes = usePageStyles();
  
  return (
    <div className={classes.root}>
      <CreateAccountForm/>
    </div>

      
   
  )
}