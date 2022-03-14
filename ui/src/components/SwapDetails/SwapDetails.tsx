import { Avatar, Card, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { PendingRowProps } from '../PendingRow/PendingRow';
import { AssetDetails } from '../AssetDetails/AssetDetails';
import { PendingSwapRowContents } from '../PendingSwapRowContents/PendingSwapRowContents';

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
}))




export const SwapDetails: React.FC<PendingRowProps> = ({ receiver, isInbound, sender, inboundQuantity, inboundTicker, outboundTicker, outboundQuantity }) => {
  const classes = useStyles();
  const swaps = [1, 1];
  return (

    <div className={classes.root}>
                  <PendingSwapRowContents sender={sender} receiver={receiver} isInbound={isInbound} inboundQuantity={inboundQuantity} inboundTicker={inboundTicker} outboundQuantity={outboundQuantity} outboundTicker={outboundTicker}/>
      <Divider sx={{marginBottom:2}}/>
      {swaps.map((swap, i) => {
        return (
          <div className={classes.direction}>
            <Typography variant='caption'>
              {i === 0 ? 'outgoing' : 'incoming'}
            </Typography>
            <Card variant='outlined' sx={{ margin: 0.5 }} >
              <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Avatar></Avatar>
              <div className={classes.tickerAmount}>
            <Typography sx={{ marginRight: 1 }}>
              {10000}
            </Typography>
            <Typography>
              {'[TickerName]'}
            </Typography>
          </div>
                <AssetDetails />
              </CardContent>
            </Card>
          </div>
        )
      })}
    </div>
  )
}