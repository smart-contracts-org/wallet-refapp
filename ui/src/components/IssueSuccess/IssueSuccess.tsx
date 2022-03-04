import React from 'react'; 

import { Button, Card, CardContent, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useMessageCardsStyles } from '../CreateAssetAccountSuccess/CreateAssetAccountSuccess';


interface IssueSuccessProps {
  onNext?: () => void
  onDoneClick?: () => void;
}

export const IssueSuccess: React.FC<IssueSuccessProps> = ({onDoneClick, onNext}) => {
  const classes = useMessageCardsStyles();
  return (
    <Card elevation={0} className={classes.success}>
      <CardContent>
        <CheckCircleIcon className={classes.icon}/>
        <Typography>
         You have successfully issued your token, issue another, or try airdrop.
        </Typography>
        <Button fullWidth className={classes.button}  sx={{marginBottom: 1}} variant='outlined' >
          Issue more
        </Button>
        <Button fullWidth className={classes.button} variant='outlined' onClick={onDoneClick && onDoneClick}>
          Done
        </Button>
      </CardContent>
    </Card>
  )
}