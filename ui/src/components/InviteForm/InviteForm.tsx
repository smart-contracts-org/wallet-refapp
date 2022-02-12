import React from 'react';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { AirdropInvites } from '../AirdropInvites/AirdropInvites';

interface InviteFormProps {

}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center'
  }
}))



export const InviteForm: React.FC<InviteFormProps> = () => {
  const classes = useStyles();
  return (
    <div>
      <FormControl className={classes.root}>
        <TextField
          autoFocus
          margin="none"
          id="userId"
          label="user ID"
          type="text"
          fullWidth
          variant="outlined"
          size='small'
          sx={{marginRight: 1}}
        />
        <LoadingButton
        endIcon={<SendIcon />}
        loading={false}
        loadingPosition="end"
        variant="outlined"
        size='small'
      >
        Send
      </LoadingButton>
      </FormControl>
      <AirdropInvites/>
      </div>
  );
}
