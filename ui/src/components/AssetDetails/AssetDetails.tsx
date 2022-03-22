import {  Divider, Typography } from '@mui/material';
import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { demoPartyId } from '../TopAppBar/TopAppBar';
import { useGetAssetAccountByKey } from '../../ledgerHooks/ledgerHooks';

const useStyles = makeStyles((theme: Theme) => ({
  row: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(1), 
  },
  rowLabel: {
    marginRight: theme.spacing(1),
  },
  data: {
    fontWeight: 'bold'
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  }
}))

export interface AssetDetailsProps {
  ticker: string;
  issuer: string;
  owner: string;
  // optional because for account invite, there is no quantity
  quantity?: string;
  isFungible?: boolean;
  // optional because template Asset won't have these attributes
  isShareable?: boolean;
  isAirdroppable?: boolean;
}

const dataColor = 'primary'

export const AssetDetails: React.FC<AssetDetailsProps> = ({ issuer, owner, quantity, isShareable, isFungible, isAirdroppable, ticker }) => {
  const classes = useStyles();

  return (
    <div className={classes.table}>
      <div className={classes.row}>
        <Typography className={classes.rowLabel} variant='caption'>
          Ticker
        </Typography>
        <Typography className={classes.data} color={dataColor} variant='caption'>
          {ticker}
        </Typography>
        <Divider />
      </div>
      <div className={classes.row}>
        <Typography className={classes.rowLabel} variant='caption'>
          Issuer
        </Typography>
        <Typography className={classes.data} color={dataColor} variant='caption'>
          {issuer || demoPartyId}
        </Typography>
        <Divider />
      </div>
      <div className={classes.row}>
        <Typography className={classes.rowLabel} variant='caption'>
          Owner
        </Typography>
        <Typography className={classes.data} color={dataColor} variant='caption'>
          {owner || demoPartyId}
        </Typography>
        <Divider />
      </div>
      <div className={classes.row}>
        <Typography className={classes.rowLabel} variant='caption'>
          Quantity
        </Typography>
        <Typography className={classes.data} color={dataColor} variant='caption'>
          {quantity}
        </Typography>
        <Divider />
      </div>
      <div className={classes.row}>
        <Typography className={classes.rowLabel} variant='caption'>
          Fungible
        </Typography>
        <Typography className={classes.data} color={dataColor} variant='caption'>
          {isFungible ? 'yes' : 'no'}
        </Typography>
        <Divider />

      </div>
      <div className={classes.row}>
        <Typography className={classes.rowLabel} variant='caption'>
          Airdroppable
        </Typography>
        <Typography className={classes.data} color={dataColor} variant='caption'>
          {isAirdroppable ? 'yes' : 'no'}
        </Typography>
        <Divider />
      </div>
      <div className={classes.row}>
        <Typography className={classes.rowLabel} variant='caption'>
          Resharable
        </Typography>
        <Typography className={classes.data} color={dataColor} variant='caption'>
          {isShareable ? 'yes' : 'no'}
        </Typography>
      </div>
    </div>
  )
}