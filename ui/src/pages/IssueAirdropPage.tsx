import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, Box, Button, Card, CardContent, IconButton, Typography } from '@mui/material';
import { InviteNewAssetOwnerForm } from '../components/InviteNewAssetOwnerForm/InviteNewAssetOwnerForm';
import { usePageStyles } from './AssetProfilePage';
import { IssueToSelfForm } from '../components/IssueToSelfForm/IssueToSelfForm';
import { AirdropForm } from '../components/AirdropForm/AirdropForm';
import Fab from '@mui/material/Fab';
import { isMobile } from '../platform/platform';

export const enableFabBack = true

export const IssueAirdropPage: React.FC = () => {
  const nav = useNavigate();
  const params = useParams();
  const classes = usePageStyles();
  const [index, setIndex] = React.useState(1)
  const onBack = () => {
    nav(-1)
  }
  const onButtonClick = (val: number) => {
    setIndex(val)
  }
  // TODO: 
  // Fetch token quantity
  return (
    <div className={classes.root}>
     <div className={classes.buttonContainer} onClick={onBack}>
        <IconButton  color='primary'>
          <ArrowBackIosNewIcon />
        </IconButton>
        {isMobile() && <Typography color='primary'>Back</Typography>}
      </div>
      <Card variant='outlined' className={classes.card} >
        <CardContent className={classes.cardContent}>
          
          <Avatar className={classes.avatar}>
            {params?.ticker?.[0] || 'undefined'}
          </Avatar>
          <Box sx={{ marginBottom: 1, display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Button sx={{ marginRight: 0.5 }} onClick={() => { onButtonClick(1) }} fullWidth variant={index === 1 ? 'contained' : 'outlined'} >Issue</Button>
            <Button sx={{ marginLeft: 0.5 }} onClick={() => { onButtonClick(2) }} fullWidth variant={index === 2 ? 'contained' : 'outlined'}>Airdrop</Button>
          </Box>
          {index === 1 && <IssueToSelfForm />}
          {index === 2 && <AirdropForm />}
        </CardContent>
      </Card>
     {enableFabBack && isMobile() && <Fab  sx={{ position: 'fixed', bottom: 20, right: 30 }}>
        <IconButton  color='primary' onClick={onBack}>
          <ArrowBackIosNewIcon  color='info'/>
        </IconButton>      
        </Fab>}
    </div>
  )
}