import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { Link } from "react-router-dom";
import { Avatar, Box, CardActionArea, IconButton, Typography } from '@mui/material';
import { PendingRowProps } from '../PendingRow/PendingRow';
import { PendingSwapRowContents } from '../PendingSwapRowContents/PendingSwapRowContents';
import { PendingAssetInviteRowContent } from '../PendingAssetInviteRowContent/PendingAssetInviteRowContent';
import { isMobile } from '../../platform/platform';
import { useGetAssetContractByContractId, useGetTransferPreapprovalContractByContractId } from '../../ledgerHooks/ledgerHooks';

export const useNarrowPendingStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(1),
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1)
  },
  button: {
    marginBottom: theme.spacing(0.5),
    marginRight: theme.spacing(1)
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
    flexDirection: 'row',
    alignItems: 'center'
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
  avatar: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(2)
  }
}))

export const PendingSwapRow: React.FC<PendingRowProps> = ({ outboundAssetCid, requestedAssetsTxPreApproval, isFungible, contractId, sendTicker, templateName, isInbound, sender, sendAmount, issuer }) => {
  const classes = useNarrowPendingStyles();
  const transferPreapproval = useGetTransferPreapprovalContractByContractId(requestedAssetsTxPreApproval).contract;
  const offeredAsset = useGetAssetContractByContractId(outboundAssetCid).contract
  const inboundTicker = isInbound? offeredAsset?.payload.assetType?.symbol : transferPreapproval?.payload.asset.assetType.symbol
  const inboundQuantity = isInbound ? offeredAsset?.payload.amount : transferPreapproval?.payload.asset.amount
  const outboundTicker = !isInbound ? offeredAsset?.payload.assetType.symbol : transferPreapproval?.payload.asset.assetType.symbol
  const outboundQuantity = !isInbound ? offeredAsset?.payload.amount : transferPreapproval?.payload.asset.amount
  
  const onAccept = (event: React.SyntheticEvent) => {
    event.preventDefault();
  }

  const onCancel = (event: React.SyntheticEvent) => {
    event.preventDefault();
  }
  const onReject = (event: React.SyntheticEvent) => {
    event.preventDefault();
  }

  const outboundAsset = useGetAssetContractByContractId(outboundAssetCid).contract
  console.log('Asset Got', outboundAsset)
  
  const receiver = transferPreapproval?.payload.asset.owner || ""
  console.log('Transfer pre approval', transferPreapproval)
  console.log('inboundTicker', inboundTicker)
  console.log('inboundAmount', inboundQuantity)

  const path = `/pending-activity?isInbound=${isInbound ? 'true' : 'false'}&templateName=${templateName}&sender=${sender}&inboundQuantity=${inboundQuantity}&inboundTicker=${inboundTicker}&sendAmount=${sendAmount}&sendTicker=${sendTicker}&outboundTicker=${outboundTicker}&outboundQuantity=${outboundQuantity}&receiver=${receiver}&issuer=${issuer}&contractId=${contractId}&isFungible=${isFungible}&outboundAssetCid=${outboundAssetCid}&requestedAssetsTxPreApproval=${requestedAssetsTxPreApproval}`
  return (
    <>
      <Card className={classes.card}>
        <CardActionArea component={Link} to={path}>
          <div className={classes.symbolTextContainer} >
            <Avatar className={classes.avatar}>
              <SwapHorizIcon />
            </Avatar>

            <PendingSwapRowContents
              outboundAssetCid={outboundAssetCid}
              requestedAssetsTxPreApproval={requestedAssetsTxPreApproval}
              receiver={receiver} 
              outboundQuantity={outboundQuantity} 
              outboundTicker={outboundTicker} 
              isInbound={isInbound} 
              sender={sender} 
              inboundQuantity={inboundQuantity} 
              inboundTicker={inboundTicker} />

            {!isMobile() && <div className={classes.actions}>
              {isInbound && <Button className={classes.button} variant='outlined' size="small" onClick={onAccept}>Accept</Button>}
              <Button onClick={isInbound ? onReject : onCancel} className={classes.button} variant='outlined' size="small">{isInbound ? 'Reject Request' : 'Cancel Request'}</Button>
              <Button className={classes.button} variant='outlined' size="small"
              >Details</Button>
            </div>}
          </div>
        </CardActionArea>
      </Card>
    </>
  );
}
