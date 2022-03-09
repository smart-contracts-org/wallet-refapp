import { Button, Card, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.success.dark
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }, 
  icon: {
    alignSelf: 'center', 
    width: '100%'
  }
}))

interface TransactionSuccessfulProps {
  action: string;
  onClick?: () => void;
}

export const TransactionSuccessful: React.FC<TransactionSuccessfulProps> = ({ onClick, action }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <CheckCircleIcon className={classes.icon} />
        <div className={classes.text}>
          <Typography>
            Your {action} is successful
          </Typography>
        </div>
        <div>
        <Divider/>
          <Typography>
            From user
          </Typography>
          <Typography>
            to another user
          </Typography>
        </div>

        <Button
          fullWidth
          variant='outlined'
          onClick={onClick && onClick}>
          Make new transaction
      </Button>
      </CardContent>
    </Card>
  )
}