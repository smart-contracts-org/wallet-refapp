import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { RowChip } from '../RowChip/RowChip';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Avatar, Box, CardActionArea } from '@mui/material';
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
    alignItems: 'center', 
    width: '100%'
  },
  quantity: {
    marginRight: theme.spacing(1)
  }, 
  button: {
    marginLeft: theme.spacing(1)
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

export const AssetAccountRow: React.FC<AssetAccountRowProps> = ({isFungible, issuer, ticker, owner, isShareable, isAirdroppable }) => {
  const classes = useStyles()
  const { loading, contracts } = useGetMyOwnedAssetsByAssetType({ issuer, symbol: ticker, isFungible: !!isFungible, owner });
  const assetProfilePath = `/asset?issuer=${issuer}&ticker=${ticker}&isFungible=${isFungible}&isShareable=${isShareable}&isAirdroppable=${isAirdroppable}`
  const assetSum = getAssetSum(contracts);
  const formattedSum = numberWithCommas(assetSum)
  return (
    <>
      <Card sx={{marginBottom: 1}} >
        <CardActionArea component={Link} to={assetProfilePath}
        >
          <CardContent className={classes.root}  >
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
            <Box marginLeft={'auto'} display='flex' alignItems='center'>
            {issuer === owner && <RowChip requestType={'issuer'} label='Issuer' />}
            {!isMobile() && issuer === owner && <Button sx={{marginRight:1}} variant='outlined' size="small" component={Link} to={`/issue/${issuer}/${ticker}`}>Issue / Airdrop</Button>
            }
            {!isMobile() &&<Button sx={{marginRight:1}} component={Link} to={`/send/${issuer}/${ticker}`} disabled={issuer !== owner && !isShareable} variant='outlined' size="small"
            >Send</Button>}
            {!isMobile() &&<Button sx={{marginRight:1}} component={Link} to={`/swap/${issuer}/${ticker}`} disabled={issuer !== owner && !isShareable} variant='outlined' size="small"
            >Swap</Button>}
            {!isMobile() &&<Button sx={{marginRight:1}} variant='outlined' component={Link} to={`/invite/${issuer}/${ticker} `} disabled={issuer !== owner && !isShareable} size="small"
            >Invite New Asset Owner</Button>}
          </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
