import React from 'react';
import Card from '@mui/material/Card';
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
import { useAdminParty } from '@daml/hub-react';
import { DeploymentMode, deploymentMode } from '../../config';

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
    marginLeft: theme.spacing(1),
  },
  buttonText: {
    overflow: 'hidden',
    whiteSpace:'nowrap',
    textOverflow: 'ellipsis'
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
  contractId: string;
  reference: string;
}

export const AssetAccountRow: React.FC<AssetAccountRowProps> = ({reference, contractId,isFungible, issuer, ticker, owner, isShareable, isAirdroppable }) => {
  const classes = useStyles()
  const prodAdminParty = useAdminParty();
  const admin = deploymentMode === DeploymentMode.DEV ? 'a' :  prodAdminParty;
  const { loading, contracts } = useGetMyOwnedAssetsByAssetType({ issuer, symbol: ticker, isFungible: !!isFungible, owner, reference});
  const attributesPath = `?issuer=${issuer}&ticker=${ticker}&isFungible=${isFungible}&isShareable=${isShareable}&isAirdroppable=${isAirdroppable}&owner=${owner}&contractId=${contractId}&reference=${reference}`
  const assetPath = `/asset${attributesPath}`
  const sendPath = `/send${attributesPath}`
  const swapPath = `/swap${attributesPath}`
  const airdropRequestPath =`/airdrop-request${attributesPath}`
  const assetInvitePath = `/invite${attributesPath}`
  const issueAirdropPath = `/issue${attributesPath}`
  const assetSum = getAssetSum(contracts);
  const formattedSum = numberWithCommas(assetSum)
  return (
    <>
      <Card sx={{marginBottom: 1}} >
        <CardActionArea component={Link} to={assetPath}
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
            {!isMobile() && issuer === owner && <Button sx={{marginRight:1}} variant='outlined' size="small" component={Link} to={issueAirdropPath}>Issue / Airdrop</Button>
            }
             {!isMobile() && issuer === admin && ticker === 'ET' && <Button sx={{marginRight:1}} variant='outlined' size="small" component={Link} to={airdropRequestPath}>Request Airdrop</Button>
            }
            {!isMobile() &&<Button sx={{marginRight:1}} component={Link} to={sendPath}  variant='outlined' size="small"
            >Send</Button>}
            {!isMobile() &&<Button sx={{marginRight:1}} component={Link} to={swapPath}  variant='outlined' size="small"
            >Swap</Button>}
            {!isMobile() &&<Button className={classes.buttonText} sx={{marginRight:1}} variant='outlined' component={Link} to={assetInvitePath}  size="small"
            >Invite New Asset Owner</Button>}
          </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
