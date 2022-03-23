import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { Link } from "react-router-dom";
import { Avatar, CardActionArea, CardContent } from '@mui/material';
import { PendingSwapRowContents } from '../PendingSwapRowContents/PendingSwapRowContents';
import { isMobile } from '../../platform/platform';
import { useGetAssetContractByContractId, useGetTransferPreapprovalContractByContractId } from '../../ledgerHooks/ledgerHooks';
import { ContractId } from '@daml/types';
import { TransferPreApproval } from '@daml.js/wallet-refapp/lib/Trade/module';
import { createQueriesString } from '../../utils/createQueriesString';
import { Asset } from '@daml.js/wallet-refapp';

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

interface PendingSwapRowProps {
  proposer: string;
  receiver: string;
  requestedAssetsTxPreApproval: ContractId<TransferPreApproval>;
  proposerAssetCid: ContractId<Asset.Asset>;
  isInbound: boolean;
  isSwapDetailsPage?: boolean;
  tradeCid: string;
}

export const PendingSwapRow: React.FC<PendingSwapRowProps> = (props) => {
  const { 
    proposerAssetCid, 
    requestedAssetsTxPreApproval, 
    proposer,
    receiver,
    isInbound,
    tradeCid
  } = props;
  const classes = useNarrowPendingStyles();
  const transferPreapproval = useGetTransferPreapprovalContractByContractId(requestedAssetsTxPreApproval).contract;
  const proposerAsset = useGetAssetContractByContractId(proposerAssetCid).contract
  const proposerAssetSymbol = proposerAsset?.payload.assetType?.symbol|| "";
  const proposerAssetAmount = proposerAsset?.payload.amount|| "";
  const proposerAssetIsFungible = proposerAsset?.payload.assetType.fungible || false 
  console.log('pending',proposerAssetIsFungible
  )
  const proposerAssetIssuer = proposerAsset?.payload.assetType.issuer|| "";
  const proposerAssetOwner = proposerAsset?.payload.owner|| "";


  const proposerAssetReference = proposerAsset?.payload.assetType.reference as string

  const receiverAssetSymbol = transferPreapproval?.payload.asset.assetType.symbol || "";
  const receiverAssetAmount = transferPreapproval?.payload.asset.amount|| ""
  const receiverAssetIssuer = transferPreapproval?.payload.asset.assetType.issuer || "";
  const receiverAssetIsFungible = transferPreapproval?.payload.asset.assetType.fungible|| ""
  const receiverAssetReference = transferPreapproval?.payload.asset.assetType.reference as string

  const receiverAssetOwner = transferPreapproval?.payload.asset.owner || "";
  
  if(!proposerAsset || !transferPreapproval){
    return null
  }
  const onAccept = (event: React.SyntheticEvent) => {
    event.preventDefault();
  }

  const onCancel = (event: React.SyntheticEvent) => {
    event.preventDefault();
  }
  const onReject = (event: React.SyntheticEvent) => {
    event.preventDefault();
  }

  

  const queriesInput: string[][] = [
    ['proposer', proposer],
    ['receiver', receiver],
    ['requestedAssetsTxPreApproval', requestedAssetsTxPreApproval],
    ['tradeCid', tradeCid],
    ['isInbound', `${isInbound}`],
    ['templateName', 'swap'],
    ['proposerAssetCid', proposerAssetCid],
    ['receiverAssetIssuer', receiverAssetIssuer],
    ['receiverAssetSymbol', receiverAssetSymbol],
    ['proposerAssetSymbol', proposerAssetSymbol],
    ['receiverAssetIsFungible', `${receiverAssetIsFungible}`],
    ['receiverAssetOwner', receiverAssetOwner],
    ['receiverAssetAmount', receiverAssetAmount],
    ['receiverAssetReference', receiverAssetReference],
    ['proposerAssetIssuer', proposerAssetIssuer],
    ['proposerAssetAmount', proposerAssetAmount],
    ['proposerAssetOwner', proposerAssetOwner],
    ['proposerAssetReference', proposerAssetReference],
    ['proposerAssetIsFungible', `${proposerAssetIsFungible}`],


   
  ]
  const queries = createQueriesString(queriesInput)
  const path = `/pending-activity?` + queries
  
  if(proposerAssetAmount === undefined || proposerAssetSymbol === undefined || receiverAssetAmount === undefined || receiverAssetSymbol === undefined){
    return (
      <>
      <Card>
        <CardContent>
          Error in retriving data
        </CardContent>
      </Card>
      </>
    )
  }

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea component={Link} to={path}>
          <div className={classes.symbolTextContainer} >
            <Avatar className={classes.avatar}>
              <SwapHorizIcon />
            </Avatar>

            <PendingSwapRowContents
              proposer={proposer}
              receiver={receiver}
              isInbound={isInbound}
              isSwapDetailsPage={false}
              proposerAssetAmount={proposerAssetAmount}
              proposerAssetSymbol={proposerAssetSymbol}
              receiverAssetAmount={receiverAssetAmount}
              receiverAssetSymbol={receiverAssetSymbol}
              />

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