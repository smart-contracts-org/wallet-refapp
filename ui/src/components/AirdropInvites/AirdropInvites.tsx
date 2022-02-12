import { Typography } from '@mui/material';
import React from 'react';
import { AirdropInviteRow } from '../AirdropInviteRow/AirdropInviteRow';

export const AirdropInvites: React.FC = () => {
  return (
    <>
      <Typography marginTop={2} marginBottom={1} variant='body2' color='text.secondary'>
        Airdrop Invitations
        </Typography>
      <AirdropInviteRow isAccepted />
      <AirdropInviteRow />
      <AirdropInviteRow />
      <AirdropInviteRow />
      <AirdropInviteRow />
      <AirdropInviteRow />

    </>
  )
}