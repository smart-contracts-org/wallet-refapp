import React from 'react';
import TextField from '@mui/material/TextField';
import { Card, FormControl, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

interface InviteNewAssetOwnerFormProps {

}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center'
  }, 
  inputContainer: {
    display: 'flex', 
    flexDirection: 'column'
  }, 
  helpMessage: {
    margin: theme.spacing(1, 0, 1), 
    background: theme.palette.grey[200]
  }, 
  inviteButton: {
    marginBottom: theme.spacing(0.5)
  }
}))



export const InviteNewAssetOwnerForm: React.FC<InviteNewAssetOwnerFormProps> = () => {
  const classes = useStyles();
  return (
    <>
      <FormControl className={classes.root}>
        <TextField
          autoFocus
          margin="dense"
          id="recipient"
          label="Recipient"
          type="text"
          fullWidth
          variant="outlined"
          size='small'
        />
        <Card className={classes.helpMessage} elevation={0} variant='outlined'>
        <Typography color='text.primary' variant='body2' p={1}>
          You must create an Asset Account first before you can mint your assets. The asset account holds the assets. Hence this step must come first before you can own any assets.
        </Typography>
      </Card>
        <LoadingButton
        endIcon={<SendIcon />}
        loading={false}
        fullWidth
        loadingPosition="end"
        variant="outlined"
        className={classes.inviteButton}
      >
        Invite
      </LoadingButton>
      </FormControl>
      </>
  );
}
