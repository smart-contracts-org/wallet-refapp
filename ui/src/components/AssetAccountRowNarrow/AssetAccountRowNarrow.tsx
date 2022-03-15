import React from 'react';
import Card from '@mui/material/Card';
import { Link } from "react-router-dom";

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { RowChip } from '../RowChip/RowChip';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { AssetAccountRowProps } from '../AssetAccountRow/AssetAccountRow';
import { CardActionArea } from '@mui/material';
import Avatar from '@mui/material/Avatar';

//TODO: issuer and owner currently hardcoded as 'me'
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(1),
  },
  quantity: {
    marginRight: theme.spacing(1)
  },
  nameValueContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  nameAndMoreContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  expandContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  expandButton: {
    marginLeft: 'auto'
  },
  avatar: {
    marginRight: theme.spacing(1)
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    marginBottom: theme.spacing(0.5)
  },
  drawer: {
    padding: 0, 
    margin: 0, 
  }
}))

export const AssetAccountRowNarrow: React.FC<AssetAccountRowProps> = ({ issuer, isIssuedByMeTab, ticker, quantity, owner, isShareable, isFungible, isAirdroppable }) => {
  const classes = useStyles()
  const assetProfilePath = `/asset/${issuer}/${ticker}`
 
  return (
    <>
      <Card className={classes.root}  >
        <CardActionArea 
        component={Link} 
        to={assetProfilePath}
        >
          <CardContent className={classes.nameAndMoreContainer}>
            <Avatar className={classes.avatar}>
              {ticker[0]}
            </Avatar>
            <div className={classes.nameValueContainer}>
              <Typography sx={{ fontSize: 14, marginRight: 1 }} color="text.primary" >
                {ticker}
              </Typography>
              <Typography className={classes.quantity} sx={{ fontSize: 14 }} color="text.secondary" >
                {quantity}
              </Typography>
            </div>
            {!isIssuedByMeTab && issuer === owner && <div className={classes.expandButton}><RowChip requestType={'issuer'} label='Issuer' /></div>}

          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
