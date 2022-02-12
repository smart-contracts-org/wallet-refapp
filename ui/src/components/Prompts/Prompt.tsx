import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  text: {
    textDecoration: 'italicized'
  }
}))

export const Prompt: React.FC = props => {
  const classes = useStyles();
  return (
    <Card variant='outlined' className={classes.root}>
      <CardContent>
        {props.children}
      </CardContent>
    </Card>
  );
};


