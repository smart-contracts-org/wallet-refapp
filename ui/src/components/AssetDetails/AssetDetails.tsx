import { Divider, Typography } from '@mui/material';
import React from 'react';

import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  row: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(1)
  },
  rowLabel: {
    marginRight: theme.spacing(1)
  },
  table: {
    display: 'flex',
    flexDirection: 'column'
  }
}))

export interface AssetDetailsProps {
  ticker: string;
  issuer: string;
  owner: string;
  quantity: number;
  isShareable: boolean;
  isFungible: boolean;
  isAirdroppable: boolean;
}

export const AssetDetails: React.FC<AssetDetailsProps> = ({issuer, owner, quantity, isShareable, isFungible, isAirdroppable, ticker}) => {
  const classes = useStyles();
  return (
    <div className={classes.table}>
      <div className={classes.row}>
        <Typography className={classes.rowLabel} variant='caption'>
         Ticker
        </Typography>
        <Typography variant='caption'>
         {ticker}
        </Typography>
        <Divider />
      </div>
      <div className={classes.row}>
        <Typography className={classes.rowLabel} variant='caption'>
          Issuer
        </Typography>
        <Typography variant='caption'>
          {issuer}
        </Typography>
        <Divider />
      </div>
      <div className={classes.row}>
        <Typography className={classes.rowLabel} variant='caption'>
          Owner
        </Typography>
        <Typography variant='caption'>
          {owner}
        </Typography>
        <Divider />
      </div>
      <div className={classes.row}>
        <Typography className={classes.rowLabel} variant='caption'>
          Quantity
        </Typography>
        <Typography variant='caption'>
          {quantity}
        </Typography>
        <Divider />
      </div>
      <div className={classes.row}>
        <Typography className={classes.rowLabel} variant='caption'>
          Fungible
        </Typography>
        <Typography variant='caption'>
          {isFungible ? 'yes' : 'no' }
        </Typography>
        <Divider />

      </div>
      <div className={classes.row}>
        <Typography className={classes.rowLabel} variant='caption'>
          Airdroppable
        </Typography>
        <Typography variant='caption'>
          {isAirdroppable ? 'yes': 'no'}
        </Typography>
        <Divider />
      </div>
      <div className={classes.row}>
        <Typography className={classes.rowLabel} variant='caption'>
          Resharable
        </Typography>
        <Typography variant='caption'>
          {isShareable ? 'yes' : 'no'}
        </Typography>
      </div>
    </div>
  )
}