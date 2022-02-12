import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { RowChip } from '../RowChip/RowChip';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import clx from 'clsx'
interface PendingAssetInviteRowProps {
  ticker?: string;
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
    color: theme.palette.action.active
  }, 
  assetName: {
    color: theme.palette.primary.main
  }
}))

export const PendingAssetInviteRow: React.FC<PendingAssetInviteRowProps> = ({ sender, ticker }) => {
  // const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const classes = useStyles();
  // const handleOpen = () => {
  //   setIsOpen(true)
  // }
  // const handleClose = () => {
  //   setIsOpen(false);
  // }

  return (
    <>
      <Card className={classes.card}>
          <RowChip label={'Asset Account Invite'} requestType={'invite'} />
          <Typography variant='body2' className={classes.text} color="text.primary" >
            {sender}
          </Typography>
          <Typography variant='body2' color='text.secondary' className={classes.text} >
            Invites you to create asset holding account for
          </Typography>
          <Typography variant='body2' className={clx(classes.text, classes.assetName)} color="text.secondary" >
            {ticker}
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
