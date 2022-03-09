import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PopUp } from '../PopUp/PopUp';
import { RowChip } from '../RowChip/RowChip';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { AssetAction } from '../../types/AssetAction';
import { Avatar } from '@mui/material';

//TODO: issuer and owner currently hardcoded as 'me'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  quantity: {
    marginRight: theme.spacing(1)
  }
}))

export interface AssetAccountRowProps {
  ticker: string;
  quantity?: number;
  isIssuer?: boolean;
  isIssuedByMeTab?: boolean;
  issuer: string;
  owner: string;
  isShareable?: boolean;
  isFungible?: boolean;
  isAirdroppable?: boolean;
}


export const AssetAccountRow: React.FC<AssetAccountRowProps> = ({ issuer, isIssuedByMeTab, ticker, quantity, owner, isShareable, isFungible, isAirdroppable }) => {
  const classes = useStyles()
  const [popupContent, setPopupContent] = React.useState<AssetAction | undefined>(undefined)

  const selectPopupContent = (contentType: AssetAction) => {
    setPopupContent(contentType)
  }
  const handleClose = () => {
    setPopupContent(undefined);
  }

  return (
    <>
      <Card sx={{ minWidth: 275 }} className={classes.root}>
        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{marginRight: 1}}>
            {ticker[0]}
          </Avatar>
          <Typography sx={{ fontSize: 14, marginRight: 1 }} color="text.secondary" >
            {ticker}
          </Typography>
          <Typography className={classes.quantity} sx={{ fontSize: 14 }} color="text.secondary" >
            {quantity}
          </Typography>
        </CardContent>
        <CardActions sx={{ marginLeft: 'auto'  }}>
        {!isIssuedByMeTab && issuer === owner && <RowChip requestType={'issuer'} label='Issuer' />}

          {isIssuedByMeTab && <Button variant='outlined' size="small" onClick={() => selectPopupContent(AssetAction.IssueAirdrop)}>Issue / Airdrop</Button>
          }
          {!isIssuedByMeTab && <Button disabled={ issuer !== owner && !isShareable} variant='outlined' size="small" onClick={() => selectPopupContent(AssetAction.Send)}>Send</Button>}
          {!isIssuedByMeTab && <Button disabled={ issuer !== owner && !isShareable} variant='outlined' size="small" onClick={() => selectPopupContent(AssetAction.Swap)}>Swap</Button>}
          <Button variant='outlined' disabled={ issuer !== owner && !isShareable} size="small" onClick={() => selectPopupContent(AssetAction.InviteNewAssetOwner)} >Invite New Asset Owner</Button>
          <Button variant='outlined' size="small" onClick={() => selectPopupContent(AssetAction.Details)} >Details</Button>
        </CardActions>
      </Card>
      <PopUp
        issuer={issuer}
        owner={owner}
        isAirdroppable={!!isAirdroppable}
        isFungible={!!isFungible}
        quantity={quantity || 0}
        isShareable={isShareable || false}
        ticker={ticker}
        assetAction={popupContent}
        handleClose={handleClose} />
    </>
  );
}
