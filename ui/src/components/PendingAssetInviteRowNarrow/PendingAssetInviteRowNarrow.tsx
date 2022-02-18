import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Avatar, CardContent, Collapse, Divider, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import clx from 'clsx'
import { useNarrowPendingStyles } from '../PendingSendRowNarrow/PendingSendRowNarrow';
import { PendingRowProps } from '../PendingRow/PendingRow';

export const PendingAssetInviteRowNarrow: React.FC<PendingRowProps> = ({ isInbound, sender, inboundTicker }) => {
  // const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const classes = useNarrowPendingStyles();
  const [isExpanded, setExpand] = React.useState<boolean>(false);
  const toggleExpand = () => {
    setExpand(!isExpanded)
  }

  const inboundMessage = (
    <>
      <Divider className={classes.divider} />

      <Typography variant='body2' className={classes.text} color="text.primary" >
        {sender}
      </Typography>
      <Divider className={classes.divider} />
      <Typography variant='body2' color='text.secondary' className={classes.text} >
        Invites you to create asset holding account for
          </Typography>
      <Divider className={classes.divider} />

      <Typography variant='body2' className={clx(classes.text, classes.assetName)} color="text.secondary" >
        {inboundTicker}
      </Typography>
      <Divider className={classes.divider} />

    </>
  )
  const outboundMessage = (
    <>
      <Divider className={classes.divider} />
      <Typography variant='body2' color='text.secondary' className={classes.text} >
        You are inviting {sender} to create asset holding account for
    </Typography>
      <Divider className={classes.divider} />
      <Typography variant='body2' className={clx(classes.text, classes.assetName)} color="text.secondary" >
        {inboundTicker}
      </Typography>
      <Divider className={classes.divider} />
    </>
  )

  return (
    <>
      <Card className={classes.card}>
        <div className={classes.symbolTextContainer}>
          <IconButton size='small'>
            <Avatar>
              <AccountBalanceWalletIcon />
            </Avatar>
          </IconButton>
          <div>
            {isInbound ? inboundMessage : outboundMessage}
          </div>
          <IconButton onClick={toggleExpand} className={classes.moreButton} size='medium'>
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </div>
        <Collapse in={isExpanded} className={clx(classes.actions)}>
          <CardContent>
            {isInbound && <Button fullWidth className={classes.button} variant='outlined' color='success' size="medium">Accept</Button>}
            <Button fullWidth className={classes.button} variant='outlined' color='error' size="medium">{isInbound ? 'Reject' : 'Cancel'}</Button>
            <Button fullWidth variant='outlined' size="medium"
            // onClick={handleOpen} 
            >Details</Button>
          </CardContent>
        </Collapse>
      </Card>
      {/* <PopUp isOpen={isOpen} handleClose={handleClose}/> */}
    </>
  );
}


