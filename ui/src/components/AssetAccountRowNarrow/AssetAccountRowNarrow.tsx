import React from 'react';
import Card from '@mui/material/Card';
import { Link } from "react-router-dom";

import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { RowChip } from '../RowChip/RowChip';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { AssetAction } from '../../types/AssetAction';
import { AssetAccountRowProps } from '../AssetAccountRow/AssetAccountRow';
import Collapse from '@mui/material/Collapse';
import { Box, CardActionArea, IconButton, SwipeableDrawer } from '@mui/material';
import clx from 'clsx'
import Avatar from '@mui/material/Avatar';
import { AssetDetailsPopupContent } from '../AssetDetailsPopupContent/AssetDetailsPopupContent';
// import { SendForm } from '../SendForm/SendForm';
// import { SendPopupContent } from '../SendPopupContent/SendPopupContent';
import { PopupContent } from '../PopupContent/PopupContent';

//TODO: issuer and owner currently hardcoded as 'me'
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'start',
    // width: '100%',
    marginBottom: theme.spacing(1),
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
    width: '100%',
    alignItems: 'center'
  },
  expandContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  expandButton: {
    marginLeft: 'auto'
  },
  avatar: {
    marginRight: theme.spacing(1)
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    marginBottom: theme.spacing(0.5)
  },
  drawer: {
    height: '80%'
  }
}))

export const AssetAccountRowNarrow: React.FC<AssetAccountRowProps> = ({ issuer, isIssuedByMeTab, ticker, quantity, owner, isShareable, isFungible, isAirdroppable }) => {
  const classes = useStyles()
  const buttonVariant = 'contained';
  const assetProfilePath = `/asset/${issuer}/${ticker}`
  const [isExpanded, setExpand] = React.useState<boolean>(false);
  const [popupContent, setPopupContent] = React.useState<AssetAction | undefined>(undefined)
  const toggleExpand = () => {
    setExpand(!isExpanded);
  }

  const [open, setOpen] = React.useState(false);
  const selectPopupContent = (contentType: AssetAction) => {
    setPopupContent(contentType)
    setOpen(!open)
  }
  const handleClose = () => {
    setPopupContent(undefined);
  }

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const expandContent = (
    <CardContent>
      <div className={classes.buttonsContainer}>
        {isIssuedByMeTab && <Button className={classes.button} variant={buttonVariant} size="medium" onClick={() => selectPopupContent(AssetAction.IssueAirdrop)}>Issue / Airdrop</Button>
        }
        {!isIssuedByMeTab && <Button className={classes.button} disabled={issuer !== owner && !isShareable} variant={buttonVariant} size="medium" component={Link} to="/send" onClick={() => selectPopupContent(AssetAction.Send)}>Send</Button>}
        {!isIssuedByMeTab && <Button className={classes.button} disabled={issuer !== owner && !isShareable} variant={buttonVariant} size="medium" onClick={() => selectPopupContent(AssetAction.Swap)}>Swap</Button>}
        <Button variant={buttonVariant} disabled={issuer !== owner && !isShareable} size="medium" onClick={() => selectPopupContent(AssetAction.InviteNewAssetOwner)} >Invite New Asset Owner</Button>
      </div>
      <AssetDetailsPopupContent
        ticker={ticker}
        issuer={issuer}
        owner={owner}
        quantity={quantity || 0}
        isShareable={!!isShareable}
        isAirdroppable={!!isAirdroppable}
        isFungible={!!isFungible}
        handleClose={toggleExpand}
        isNarrow
      />
    </CardContent>
  )

  return (
    <>
      <Card className={classes.root}  >
        <CardActionArea component={Link} to={assetProfilePath}>
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
            {!isIssuedByMeTab && issuer === owner && <div className={classes.expandButton}><RowChip requestType={'issuer'} label='Issuer' /></div>}

           
          </CardContent>

          <Collapse timeout="auto" in={isExpanded} className={classes.expandContainer}>
            {expandContent}
          </Collapse>
        </CardActionArea>

      </Card>
  

      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        className={classes.drawer}
      >
        <Box style={{ height: '500px' }}>
          <PopupContent
            issuer={issuer}
            owner={owner}
            isAirdroppable={!!isAirdroppable}
            isFungible={!!isFungible}
            quantity={quantity || 0}
            isShareable={isShareable || false}
            ticker={ticker}
            contentType={popupContent}
            handleClose={toggleDrawer(false)} />
        </Box>
      </SwipeableDrawer>
    </>
  );
}
