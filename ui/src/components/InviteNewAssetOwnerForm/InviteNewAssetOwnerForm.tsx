import React from 'react';
import TextField from '@mui/material/TextField';
import { Card, FormControl, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
  }, 
  inviteButton: {
    marginBottom: theme.spacing(0.5)
  }
}))



export const InviteNewAssetOwnerForm: React.FC<InviteNewAssetOwnerFormProps> = () => {
  const classes = useStyles();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isSuccessful, setSuccessful] = React.useState<boolean>(false);

  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
      setSuccessful(true);
    }, 1000)
  }
  const onReset = () => {
    setSuccessful(false);
  }
  return (
    <>
      <FormControl className={classes.root}>
        <TextField
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
        endIcon={isSuccessful  ? <CheckCircleIcon/> : <SendIcon />}
        loading={isLoading}
        fullWidth
        color={isSuccessful ? 'success' : undefined}
        loadingPosition="end"
        variant="outlined"
        onClick={isSuccessful ? onReset : onSubmit}
        className={classes.inviteButton}
      >
        {isSuccessful ? 'Sent, send another' : 'Invite'}
      </LoadingButton>
      </FormControl>
      </>
  );
}
