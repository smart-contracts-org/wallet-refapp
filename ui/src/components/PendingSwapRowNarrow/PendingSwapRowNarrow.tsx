import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import clx from 'clsx'
import { PendingSwapRowProps } from '../PendingSwapRow/PendingSwapRow';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { Avatar, CardContent, Collapse, Divider, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useNarrowPendingStyles } from '../PendingSendRowNarrow/PendingSendRowNarrow';

export const PendingSwapRowNarrow: React.FC<PendingSwapRowProps> = ({ isInbound, outboundQuantity, outboundTicker, sender, inboundTicker, inboundQuantity }) => {
  const classes = useNarrowPendingStyles();
  const [isExpanded, setExpand] = React.useState<boolean>(false);
  const toggleExpand = () => {
    setExpand(!isExpanded);
  }
  // const [isOpen, setIsOpen] = React.useState<boolean>(false)
  // const handleOpen = () => {
  //   setIsOpen(true)
  // }
  // const handleClose = () => {
  //   setIsOpen(false);
  // }

  const inboundMessage = (
    <>
      <div>
        <Divider className={classes.divider} />
        <Typography variant='body1' className={clx(classes.text, classes.sender)} color="text.secondary" >
          {sender}
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant='body1' color='text.secondary' className={classes.text} >
          wants to swap
          </Typography>
        <Divider className={classes.divider} />

        <div className={classes.inboundForOutboundContainer}>
          <Typography variant='body1' className={clx(classes.text, classes.inboundQuantity)} color="text.secondary"  >
            {inboundQuantity}
          </Typography>
          <Typography variant='body1' className={clx(classes.text, classes.inboundTicker)} color="text.secondary" >
            {inboundTicker}
          </Typography>
          <Typography variant='body1' color='text.secondary' className={classes.text} >
            for
          </Typography>
          <Typography variant='body1' className={clx(classes.text, classes.outboundQuantity)} color="text.secondary"  >
            {outboundQuantity}
          </Typography>
          <Typography variant='body1' className={clx(classes.text)} color="primary" >
            {outboundTicker}
          </Typography>

        </div>
        <Divider className={classes.divider} />

      </div>
    </>
  )

  const outboundMessage = (
    <>
      <div>
        <Divider className={classes.divider} />
        <Typography variant='body1' color='text.secondary' className={classes.text} >
          you want to swap with
          </Typography>
        <Divider className={classes.divider} />
        <Typography variant='body1' className={clx(classes.text, classes.sender)} color="text.secondary" >
          {sender}
        </Typography>
        <Divider className={classes.divider} />

        <div className={classes.inboundForOutboundContainer}>
          <Typography variant='body1' className={clx(classes.text, classes.outboundQuantity)} color="text.secondary"  >
            {outboundQuantity}
          </Typography>
          <Typography variant='body1' className={clx(classes.text)} color="primary" >
            {outboundTicker}
          </Typography>
          <Typography variant='body1' color='text.secondary' className={classes.text} >
            for
          </Typography>
          <Typography variant='body1' className={clx(classes.text, classes.inboundQuantity)} color="text.secondary"  >
            {inboundQuantity}
          </Typography>
          <Typography variant='body1' className={clx(classes.text, classes.inboundTicker)} color="text.secondary" >
            {inboundTicker}
          </Typography>
        </div>
        <Divider className={classes.divider} />

      </div>
    </>
  )

  return (
    <>
      <Card className={classes.card}>
        <div className={classes.symbolTextContainer} >
          <IconButton size='small'>
            <Avatar>

              <SwapHorizIcon />
            </Avatar>
          </IconButton>
          {isInbound ? inboundMessage : outboundMessage}
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
