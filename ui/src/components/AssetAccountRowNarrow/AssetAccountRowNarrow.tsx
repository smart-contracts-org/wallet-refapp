import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PopUp } from '../PopUp/PopUp';
import { RowChip } from '../RowChip/RowChip';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { AssetAction } from '../../types/AssetAction';
import { AssetAccountRowProps } from '../AssetAccountRow/AssetAccountRow';
import Collapse from '@mui/material/Collapse';
import { IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';

//TODO: issuer and owner currently hardcoded as 'me'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    width: '100%',
    marginBottom: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  quantity: {
    marginRight: theme.spacing(1)
  },
  nameValueContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  nameAndMoreContainer: {
    display: 'flex',
    flexDirection: 'row', 
    width: '100%'
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  expandButton: {
    marginLeft: 'auto'
  },
  avatar: {
    marginRight: theme.spacing(1)
  }
}))

export const AssetAccountRowNarrow: React.FC<AssetAccountRowProps> = ({ issuer, isIssuedByMeTab, ticker, quantity, owner, isShareable, isFungible, isAirdroppable }) => {
  const classes = useStyles()
  const [isExpanded, setExpand] = React.useState<boolean>(false);
  const toggleExpand = () => {
    setExpand(!isExpanded);
  }
  const [popupContent, setPopupContent] = React.useState<AssetAction | undefined>(undefined)

  const selectPopupContent = (contentType: AssetAction) => {
    setPopupContent(contentType)
  }
  const handleClose = () => {
    setPopupContent(undefined);
  }

  return (
    <>
      <Card className={classes.root} >
        <CardContent className={classes.nameAndMoreContainer}>
          <Avatar className={classes.avatar}>
            {ticker[0]}
          </Avatar>
          <div className={classes.nameValueContainer}>
            <Typography sx={{ fontSize: 14, marginRight: 1 }} color="text.primary" >
              {ticker}
            </Typography>
            <Typography className={classes.quantity} sx={{ fontSize: 14 }} color="text.secondary" >
              {quantity}
            </Typography>
          </div>
          {/* {!isIssuedByMeTab && issuer === owner && <div className={classes.expandButton}><RowChip requestType={'issuer'} label='Issuer' /></div>} */}

          <IconButton className={classes.expandButton} onClick={toggleExpand}>
            <ExpandMoreIcon />
          </IconButton>
        </CardContent>

        <Collapse timeout="auto" in={isExpanded} className={classes.actionContainer}>
          <CardContent>
            {!isIssuedByMeTab && issuer === owner && <RowChip requestType={'issuer'} label='Issuer' />}

            {isIssuedByMeTab && <Button variant='outlined' size="small" onClick={() => selectPopupContent(AssetAction.IssueAirdrop)}>Issue / Airdrop</Button>
            }
            {!isIssuedByMeTab && <Button disabled={issuer !== owner && !isShareable} variant='outlined' size="small" onClick={() => selectPopupContent(AssetAction.Send)}>Send</Button>}
            {!isIssuedByMeTab && <Button disabled={issuer !== owner && !isShareable} variant='outlined' size="small" onClick={() => selectPopupContent(AssetAction.Swap)}>Swap</Button>}
            <Button variant='outlined' disabled={issuer !== owner && !isShareable} size="small" onClick={() => selectPopupContent(AssetAction.InviteNewAssetOwner)} >Invite New Asset Owner</Button>
            <Button variant='outlined' size="small" onClick={() => selectPopupContent(AssetAction.Details)} >Details</Button>
          </CardContent>
        </Collapse>
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
