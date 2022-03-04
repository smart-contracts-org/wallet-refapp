import { Icon } from '@mui/material';
import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import DamlLogo from '../../daml-logo-dark.svg'
const useStyles = makeStyles((theme: Theme) => ({
  image: {
    height: '30px', 
    width: '30px', 
    marginRight: theme.spacing(1)
  }, 
  root: {
    marginRight: theme.spacing(1)
  }
}))
export const SvgIcon: React.FC = () => {
  const classes = useStyles();
  return (
    <Icon className={classes.root}>
      <img alt='daml' className={classes.image} src={DamlLogo} />
    </Icon>

  )
}