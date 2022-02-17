import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { RowChip } from '../RowChip/RowChip';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import clx from 'clsx'

interface PendingSwapRowProps {
  inboundTicker?: string;
  inboundQuantity?: number;
  outboundTicker?: string;
  outboundQuantity?: number;
  sender?: string;
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
  text: {
    marginLeft: theme.spacing(0.5), 
    marginRight: theme.spacing(0.5)
  }, 
  sender: {
    color: theme.palette.text.primary, 
  }, 
  inboundTicker: {
    color: theme.palette.primary.main
  }, 
  inboundQuantity: {
    color: 'green'
  }, 
  outboundTicker: {
    color: 'red',
  }, 
  outboundQuantity: {
    color: 'red'
  }
}))

export const PendingSwapRow: React.FC<PendingSwapRowProps> = ({outboundQuantity,outboundTicker, sender, inboundTicker, inboundQuantity }) => {
  const classes = useStyles();
  // const [isOpen, setIsOpen] = React.useState<boolean>(false)
  // const handleOpen = () => {
  //   setIsOpen(true)
  // }
  // const handleClose = () => {
  //   setIsOpen(false);
  // }

  return (
    <>
      <Card className={classes.card}>
          <RowChip label={'Swap Request'} requestType={'swap'} />
          <Typography variant='body2' className={clx(classes.text, classes.sender)} color="text.secondary" >
            {sender}
          </Typography>
          <Typography variant='body2' color='text.secondary' className={classes.text} >
            wants to swap 
          </Typography>
          <Typography variant='body2' className={clx(classes.text, classes.inboundQuantity)} color="text.secondary"  >
            {inboundQuantity}
          </Typography>
          <Typography variant='body2' className={clx(classes.text, classes.inboundTicker)} color="text.secondary" >
            {inboundTicker}
          </Typography>
          <Typography variant='body2' color='text.secondary' className={classes.text} >
            for 
          </Typography>
          <Typography variant='body2' className={clx(classes.text, classes.outboundQuantity)} color="text.secondary"  >
            {outboundQuantity}
          </Typography>
          <Typography variant='body2'  className={clx(classes.text)} color="primary" >
            {outboundTicker}
          </Typography>
          
        <div className={classes.actions}>
            <Button className={classes.button} variant='outlined' size="small">Accept</Button>
            <Button className={classes.button} variant='outlined' size="small">Reject</Button>
            <Button className={classes.button} variant='outlined' size="small" 
            // onClick={handleOpen} 
            >Details</Button>
          </div>
      </Card>
      {/* <PopUp isOpen={isOpen} handleClose={handleClose}/> */}
    </>
  );
}
