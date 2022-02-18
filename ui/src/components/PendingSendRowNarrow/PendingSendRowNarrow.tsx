import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { RowChip } from '../RowChip/RowChip';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { InboundSendRowContents } from '../InboundSendRowContents/InboundSendRowContents';
import { OutboundSendRowContents } from '../OutboundSendRowContents/OutboundSendRowContents';
import { PendingSendRowProps } from '../PendingSendRow/PendingSendRow';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CardContent, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import clx from 'clsx';
const useStyles = makeStyles((theme: Theme) => ({
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
  }
}))

export const PendingSendRowNarrow: React.FC<PendingSendRowProps> = ({ isInbound, sender, ticker, quantity }) => {
  // const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const classes = useStyles();
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
          <IconButton size='small' color='success'>
            <ArrowBackIcon />
          </IconButton>
          {isInbound ? <InboundSendRowContents isNarrow sender={sender} quantity={quantity} ticker={ticker}

          /> : <OutboundSendRowContents sender={sender} quantity={quantity} ticker={ticker} />}


          <IconButton onClick={toggleExpand} className={classes.moreButton} size='medium'>
           {isExpanded ? <ExpandLessIcon/> : <ExpandMoreIcon />}
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
