import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { RowChip } from '../RowChip/RowChip';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { InboundSendRowContents } from '../InboundSendRowContents/InboundSendRowContents';
import { OutboundSendRowContents } from '../OutboundSendRowContents/OutboundSendRowContents';

interface PendingSendRowProps {
  ticker?: string;
  quantity?: number;
  sender?: string;
  isInbound: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1)

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
  }
}))

export const PendingSendRow: React.FC<PendingSendRowProps> = ({ isInbound, sender, ticker, quantity }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const classes = useStyles();
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false);
  }

  return (
    <>
      <Card className={classes.card}>
        <RowChip label={'Send Request'} requestType={'send'} />
        {isInbound ? <InboundSendRowContents sender={sender} quantity={quantity} ticker={ticker}
        
        /> : <OutboundSendRowContents sender={sender} quantity={quantity} ticker={ticker} />}

        <div className={classes.actions}>
          {isInbound && <Button className={classes.button} variant='outlined' size="small">Accept</Button>}
          <Button className={classes.button} variant='outlined' size="small">{isInbound ? 'Reject' : 'Cancel'}</Button>
          <Button className={classes.button} variant='outlined' size="small" onClick={handleOpen} >Details</Button>
        </div>
      </Card>
      {/* <PopUp isOpen={isOpen} handleClose={handleClose}/> */}
    </>
  );
}
