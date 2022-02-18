import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { SendRowContents } from '../SendRowContents/SendRowContents';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar, CardContent, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import clx from 'clsx';
import { PendingRowProps } from '../PendingRow/PendingRow';
export const useNarrowPendingStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(1)
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    marginBottom: theme.spacing(0.5)
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
  symbolTextContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  moreButton: {
    marginLeft: 'auto',
  },
  marginTop: {
    marginTop: theme.spacing(1)
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
  },
  divider: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
  },
  inboundForOutboundContainer: {
    display: 'flex',
    flexDirection: 'row'
  },

}))

export const PendingSendRowNarrow: React.FC<PendingRowProps> = ({ isNarrow, isInbound, sender, inboundTicker, inboundQuantity }) => {
  // const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const classes = useNarrowPendingStyles();
  const [isExpanded, setExpand] = React.useState<boolean>(false);
  const toggleExpand = () => {
    setExpand(!isExpanded)
  }
  // const handleOpen = () => {
  //   setIsOpen(true)
  // }
  // const handleClose = () => {
  //   setIsOpen(false);
  // }

  return (
    <>
      <Card className={classes.card}>
        <div className={classes.symbolTextContainer} >
          <IconButton size='small' color='default'>
            <Avatar>

            <ArrowBackIcon />
            </Avatar>
          </IconButton>
          <SendRowContents isInbound={isInbound} isNarrow={isNarrow} sender={sender} inboundQuantity={inboundQuantity} inboundTicker={inboundTicker} />
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
