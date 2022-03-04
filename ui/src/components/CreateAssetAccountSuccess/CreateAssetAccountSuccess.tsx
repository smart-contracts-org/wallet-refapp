import React from 'react';

import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Button, Card, CardContent, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const useMessageCardsStyles = makeStyles((theme: Theme) => ({
  success: {
    background: theme.palette.success.main,
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  icon: {
    justifySelf: 'center',
    width: '100%'
  },
  button: {
    marginRight: theme.spacing(1),
    color: 'white',
    border: '1px solid white'
  }
}))

interface CreateAssetAccountSuccessProps {
  onNextClick: () => void;
  onDoneClick?: () => void;
}

export const CreateAssetAccountSuccess: React.FC<CreateAssetAccountSuccessProps> = ({ onDoneClick, onNextClick }) => {
  const classes = useMessageCardsStyles();
  return (
    <Card elevation={0} variant='outlined' className={classes.success}>
      <CardContent>
        <CheckCircleIcon className={classes.icon} />
        <Typography variant='body2'>
          You have successfully created Asset account for MAXCOIN
          Follow the next step to issue assets.
        </Typography>
        <Button sx={{ marginBottom: 1 }} fullWidth className={classes.button} variant='outlined' onClick={onNextClick}>
          Next
        </Button>
        <Button fullWidth className={classes.button} disableElevation variant='outlined' onClick={onDoneClick && onDoneClick}>
          Issue Later
        </Button>
      </CardContent>
    </Card>
  )
}