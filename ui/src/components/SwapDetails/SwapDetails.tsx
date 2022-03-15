import { Avatar, Card, CardContent, Chip, Divider, Typography } from '@mui/material';
import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { PendingRowProps } from '../PendingRow/PendingRow';
import { AssetDetails } from '../AssetDetails/AssetDetails';
import { PendingSwapRowContents } from '../PendingSwapRowContents/PendingSwapRowContents';
import clx from 'clsx'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  detailsContainer: {
    display: 'flex',
  },
  direction: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    // alignItems: 'center',
    justifyContent: 'space-between'
  },
  tickerAmount: {
    display: 'flex',
    flexDirection: 'row'
  },
  avatar: {
    margin: theme.spacing(1)
  }, 
  directionLabel: {
    padding: theme.spacing(1), 
    margin: theme.spacing(0.5),
    borderRadius: 2
  },
  swappingOut: {
    backgroundColor: theme.palette.error.dark, 
  },
  swappingIn: {
    backgroundColor: theme.palette.success.dark, 
  }
}))

export const SwapDetails: React.FC<PendingRowProps> = ({ receiver, isInbound, sender, inboundQuantity, inboundTicker, outboundTicker, outboundQuantity }) => {
  const classes = useStyles();
  
  const swappingOut = {
    label: 'Swapping Out',
    quantity:outboundQuantity,
    ticker: outboundTicker, 
  }

  const swappingIn = {
    label: 'Swapping In',
    ticker: inboundTicker, 
    quantity: inboundQuantity
  }
  
  // User receiving a swap request
  // display what user is swapping in (recieving)
  const inboundSwap = [swappingIn, swappingOut];
  const outboundSwap = [swappingOut, swappingIn]
  return (

    <div className={classes.root}>
        <PendingSwapRowContents isSwapDetailsPage={true} sender={sender} receiver={receiver} isInbound={isInbound} inboundQuantity={inboundQuantity} inboundTicker={inboundTicker} outboundQuantity={outboundQuantity} outboundTicker={outboundTicker}/>
      <Divider sx={{marginBottom:2}}/>
      {(isInbound ? inboundSwap : outboundSwap).map((swap, i) => {
        return (
          <div className={classes.direction}>
            <div>

            <Typography className={clx(classes.directionLabel, swap.label==='Swapping In' ? classes.swappingIn : classes.swappingOut) } sx={{marginLeft: 1}} variant='h6'>
              {swap.label}
            </Typography>
            </div>
            <Card variant='outlined' sx={{ margin: 0.5, marginBottom: 1 }} >
              <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Avatar className={classes.avatar}></Avatar>
              <div className={classes.tickerAmount}>
            <Typography sx={{ marginRight: 1 }}>
              {swap.quantity}
            </Typography>
            <Typography>
              {swap.ticker || '[TickerName]'}
            </Typography>
          </div>
                <AssetDetails ticker={swap.ticker || 'ticker'} />
              </CardContent>
            </Card>
          </div>
        )
      })}
    </div>
  )
}