import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { RowChip } from '../RowChip/RowChip';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Avatar, CardActionArea } from '@mui/material';
import { Link } from "react-router-dom";
import { isMobile } from '../../platform/platform';
import { useGetMyOwnedAssetsByAssetType } from '../../ledgerHooks/ledgerHooks';
import { numberWithCommas } from '../../utils/numberWithCommas';
import { getAssetSum } from '../../utils/getAssetSum';

//TODO: issuer and owner currently hardcoded as 'me'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(1),
  },
  quantity: {
    marginRight: theme.spacing(1)
  }
}))

export interface AssetAccountRowProps {
  ticker: string;
  quantity?: number;
  isIssuer?: boolean;
  issuer: string;
  owner: string;
  isShareable?: boolean;
  isFungible?: boolean;
  isAirdroppable?: boolean;
}

export const AssetAccountRow: React.FC<AssetAccountRowProps> = ({ issuer, ticker, owner, isShareable }) => {
  const classes = useStyles()
  const { loading, contracts } = useGetMyOwnedAssetsByAssetType({ issuer, symbol: ticker, isFungible: true, owner });
  const assetProfilePath = `/asset/${issuer}/${ticker}`
  const assetSum = getAssetSum(contracts);
  const formattedSum = numberWithCommas(assetSum)
  return (
    <>
      <Card className={classes.root}>
        <CardActionArea component={Link} to={assetProfilePath}
        sx={{display: isMobile() ? undefined : 'flex'}}
        >
          <CardContent sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
            <Avatar sx={{ marginRight: 1 }}>
              {ticker[0]}
            </Avatar>
            <div>
              <Typography sx={{ fontSize: 14, marginRight: 1, fontWeight: '500' }} color="text.primary" >
                {ticker}
              </Typography>
              {!loading && <Typography className={classes.quantity} sx={{ fontSize: 14 }} color="text.secondary" >
                {formattedSum}
              </Typography>}
            </div>
          </CardContent>
          {!isMobile() && <CardActions sx={{ marginLeft: 'auto' }}>
            {issuer === owner && <RowChip requestType={'issuer'} label='Issuer' />}

            {issuer === owner && <Button variant='outlined' size="small" component={Link} to={`/issue/${issuer}/${ticker}`}>Issue / Airdrop</Button>
            }
            {<Button component={Link} to={`/send/${issuer}/${ticker}`} disabled={issuer !== owner && !isShareable} variant='outlined' size="small"
            >Send</Button>}
            {<Button component={Link} to={`/swap/${issuer}/${ticker}`} disabled={issuer !== owner && !isShareable} variant='outlined' size="small"
            >Swap</Button>}
            <Button variant='outlined' component={Link} to={`/invite/${issuer}/${ticker} `} disabled={issuer !== owner && !isShareable} size="small"
            >Invite New Asset Owner</Button>
          </CardActions>}
        </CardActionArea>
      </Card>
    </>
  );
}
