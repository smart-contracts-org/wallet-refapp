
import React from 'react';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import clx from 'clsx'
import { Divider } from '@mui/material';

interface InboundSendRowContentsProps {
  ticker?: string;
  quantity?: number;
  sender?: string;
  isInbound?: boolean;
  isNarrow?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    alignItems: 'center',
  },
  narrowCard: {
    display: 'flex',
    flexDirection: 'column'
  },
  actions: {
    marginLeft: 'auto'
  },
  button: {
    marginRight: theme.spacing(1)
  },
  quantity: {
    backgroundColor: 'green'
  },
  text: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5)
  },
  sender: {
    color: theme.palette.text.primary,
  },
  assetName: {
    color: theme.palette.primary.main
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  marginBottom: {
    marginBottom: theme.spacing(1)
  },
  divider: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)

  }
}))

export const InboundSendRowContents: React.FC<InboundSendRowContentsProps> = ({ isNarrow, isInbound, sender, ticker, quantity }) => {
  const classes = useStyles();

  return (
    <div className={isNarrow ? classes.narrowCard : classes.card}>
      <Typography variant='body2' className={clx(classes.text, classes.sender)} color="text.secondary" >
        {sender}
      </Typography>
      <Divider className={classes.divider} />
      <Typography variant='body2' color='text.secondary' className={clx(classes.text)} >
        wants to send you
          </Typography>
      <Divider className={classes.divider} />

      <div className={isNarrow ? classes.row : classes.column}>
        <Typography variant='body2' className={classes.text} color="text.secondary"  >
          {quantity}
        </Typography>
        <Typography variant='body2' className={clx(classes.text, classes.assetName)} color="text.secondary" >
          {ticker}
        </Typography>
      </div>
    </div>
  );
}
