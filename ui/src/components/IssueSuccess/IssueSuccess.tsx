import React from 'react'; 

import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Button, Card, CardContent, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
export const useMessageCardsStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  quantity: {
    marginRight: theme.spacing(1)
  },
  success: {
    background: theme.palette.success.main, 
    display: 'flex'
  }, 
  button: {
    color: 'white'
  },
  icon: {
    width: '100%', 
    justifyContent: 'center'
  }
}))

interface IssueSuccessProps {
  onNext?: () => void
  onDoneClick?: () => void;
}

export const IssueSuccess: React.FC<IssueSuccessProps> = ({onDoneClick, onNext}) => {
  const classes = useMessageCardsStyles();
  return (
    <Card elevation={0} color='theme.success' className={classes.success}>
      <CardContent>
        <CheckCircleIcon className={classes.icon}/>
        <Typography>
          Issue sucessful, issue another, or try airdrop.
        </Typography>
        <Button className={classes.button}  variant='outlined' >
          Issue more
        </Button>
        <Button className={classes.button} variant='outlined' onClick={onDoneClick && onDoneClick}>
          Done
        </Button>
      </CardContent>
    </Card>
  )
}