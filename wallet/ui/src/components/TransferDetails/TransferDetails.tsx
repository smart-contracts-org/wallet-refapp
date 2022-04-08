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

export const TransferDetails: React.FC = () => {
  return (
    <div>
      <Typography>
        From
          </Typography>
          <Typography>
            username
          </Typography>
      <Typography>
        to another user
        </Typography>
        <Typography>
        to another user
        </Typography>
      <Typography>
        Ticker
        </Typography>
      <Typography>
        quantity
        </Typography>
        <Typography>
        1000
        </Typography>

    </div>
  )
}