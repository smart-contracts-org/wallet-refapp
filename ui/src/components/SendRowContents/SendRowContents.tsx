
import React from 'react';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import clx from 'clsx'
import { Divider } from '@mui/material';
import { PendingRowProps } from '../PendingRow/PendingRow';

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

export const SendRowContents: React.FC<PendingRowProps> = ({ isNarrow, isInbound, sender, inboundTicker, inboundQuantity }) => {
  const classes = useStyles();

  const inboundMessage = (
    <>
      <Divider className={classes.divider} />
      <Typography variant='body1' className={clx(classes.text, classes.sender)} color="text.secondary" >
        {sender}
      </Typography>
      <Divider className={classes.divider} />
      <Typography variant='body1' color='text.secondary' className={clx(classes.text)} >
        wants to send you
          </Typography>
      <Divider className={classes.divider} />
    </>
  )
  const outboundMessage = (
    <>
      <Divider className={classes.divider} />
      <Typography variant='body1' color='text.secondary' className={classes.text} >
        You want to send
  </Typography>
      <Divider className={classes.divider} />
      <Typography variant='body1' className={clx(classes.text, classes.sender)} color="text.secondary" >
        {sender}
      </Typography>
      <Divider className={classes.divider} />

    </>
  )

  return (
    <div className={isNarrow ? classes.narrowCard : classes.card}>
      {isInbound ? inboundMessage : outboundMessage}
      <div className={ classes.row}>
        <Typography variant='body1' className={classes.text} color="text.secondary"  >
          {inboundQuantity}
        </Typography>
        <Typography variant='body1' className={clx(classes.text, classes.assetName)} color="text.secondary" >
          {inboundTicker}
        </Typography>
      </div>
      <Divider className={classes.divider} />

    </div>
  );
}
