import { LinearProgress, Typography } from '@mui/material';
import React from 'react';
import { useGetAccountInvitesByAssetType, useGetMyIssuedAssetAccounts } from '../../ledgerHooks/ledgerHooks';
import { AirdropInviteRow } from '../AirdropInviteRow/AirdropInviteRow';

interface AirdropInvitesProps {
  reference: string;
  isFungible: boolean;
  symbol: string;
}

export const AirdropInvites: React.FC<AirdropInvitesProps> = (props) => {
  const { reference, isFungible, symbol} = props;
  const pendingInvites = useGetAccountInvitesByAssetType({ reference, symbol, fungible: isFungible}).contracts
  console.log('pendign', pendingInvites)
  const {loading, contracts} = useGetMyIssuedAssetAccounts({fungible: isFungible, symbol, reference})
  console.log(contracts)
  const pendingInviteRows = pendingInvites.map((contract) => {
    const {issuer,fungible, reference,symbol } = contract.payload.account.assetType
    const recipient = contract.payload.recipient
    return (
      <AirdropInviteRow   owner={recipient} isAccepted={false} issuer={issuer} fungible={fungible} reference={reference || ""} symbol={symbol} />
    )
  })
  const inviteRows = contracts.map((contract) => {
    const {issuer,fungible, reference,symbol } = contract.payload.assetType
    const {owner} = contract.payload
    return (
      <AirdropInviteRow owner={owner} isAccepted={true} issuer={issuer} fungible={fungible} reference={reference || ""} symbol={symbol} />
    )
  })
  if(loading){
    return (
      <LinearProgress/>
    )
  }
  return (
    <>
      <Typography marginTop={2} marginBottom={1} variant='body2' color='text.secondary'>
        Airdrop Invitations
        </Typography>
      {inviteRows}
      {pendingInviteRows}

    </>
  )
}