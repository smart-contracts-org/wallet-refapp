import React from 'react';
import TextField from '@mui/material/TextField';
import { Box, FormControl, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { AirdropInvites } from '../AirdropInvites/AirdropInvites';

interface AirdropFormProps {

}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'start'
  }
}))



export const AirdropForm: React.FC<AirdropFormProps> = () => {
  const classes = useStyles();
  return (
    <>
      <FormControl className={classes.root}>
        <Box mr={0.5}>
        <TextField
          autoFocus
          margin="none"
          id="userId"
          label="UserId"
          type="text"
          fullWidth
          variant="outlined"
          size='small'
          sx={{marginRight: 1}}
        />
        <Typography variant='caption' color='text.secondary'>
          Input userID of the user you want to invite to airdrop.
        </Typography>
        </Box>
        <LoadingButton
        endIcon={<SendIcon />}
        loading={false}
        loadingPosition="end"
        variant="outlined"
        // size='small'
      >
        Send
      </LoadingButton>
      </FormControl>
      <AirdropInvites/>
      </>
  );
}
