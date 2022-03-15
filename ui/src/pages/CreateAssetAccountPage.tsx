import { Avatar, Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateAssetAccountSteps } from '../components/CreateAssetAccountSteps/CreateAssetAccountSteps';
import { usePageStyles } from './AssetProfilePage';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { isMobile } from '../platform/platform';

export const CreateAssetAccountPage: React.FC = () => {
  
  const nav = useNavigate();
  const params = useParams();
  const classes = usePageStyles();
  const onBack = () => {
    nav(-1)
  }
  return (
    <div className={classes.root}>
      <Card variant='outlined' >
        <CardContent className={classes.cardContent}>
          <CreateAssetAccountSteps />
        </CardContent>
      </Card>
    </div>
   
  )
}