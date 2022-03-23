import React from 'react'; 

import { Button, Card, CardContent, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useMessageCardsStyles } from '../CreateAssetAccountSuccess/CreateAssetAccountSuccess';
import { useNavigate } from 'react-router';


interface IssueSuccessProps {
  onNext?: () => void
  onDoneClick?: () => void;
}

export const IssueSuccess: React.FC<IssueSuccessProps> = ({onDoneClick, onNext}) => {
  const classes = useMessageCardsStyles();
  const nav = useNavigate();
  const onClick = () => {
    nav(-1)
  }
  return (
    <Card elevation={0} className={classes.success}>
      <CardContent>
        <CheckCircleIcon className={classes.icon}/>
        <Typography>
         You have successfully issued your token, issue another, or try airdrop.
        </Typography>
        <Button  onClick={onClick} fullWidth className={classes.button} variant='outlined'>
          Back
        </Button>
      </CardContent>
    </Card>
  )
}