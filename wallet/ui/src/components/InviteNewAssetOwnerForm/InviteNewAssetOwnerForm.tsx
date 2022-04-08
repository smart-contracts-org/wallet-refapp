import React from 'react';
import TextField from '@mui/material/TextField';
import { Button, Card, CardContent, FormControl, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { useLedgerHooks } from '../../ledgerHooks/ledgerHooks';

interface InviteNewAssetOwnerFormProps {
  owner: string;
  issuer: string;
  symbol: string;
  fungible: boolean;
  //TODO add reference
  reference?: string;
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



export const InviteNewAssetOwnerForm: React.FC<InviteNewAssetOwnerFormProps> = ({ issuer, reference,symbol, fungible, owner}) => {
  const classes = useStyles();
  const [hasError, setError] = React.useState(false);
  const [recipient, setRecipient] = React.useState("");
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isSuccessful, setSuccessful] = React.useState<boolean>(false);
  const nav = useNavigate();
  const ledgerHooks = useLedgerHooks();

  const onBack = () => {
    nav(-1)
  }
  const onSubmit = async () => {
    setLoading(true);
    const result = await ledgerHooks.inviteNewAssetHolder({recipient, owner, assetType: {issuer, reference: reference || "", fungible, symbol}})
    if(result.isOk){
      setLoading(false);
      setSuccessful(true);
      setError(false);
    } else {
      setLoading(false)
      setError(true)
      setSuccessful(false);
    }
    
  }
  const onReset = () => {
    setSuccessful(false);
    setLoading(false);
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
          onChange={(e) => setRecipient(e.currentTarget.value)}

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
      <Button fullWidth variant='outlined' onClick={onBack}>
        Back
      </Button>
      </FormControl>
      {
        hasError && <Card sx={{width: '100%', margin: 1}}>
          <CardContent>
            Error Occured. Asset Account Cannot be shared.
          </CardContent>
        </Card>
      }
      </>
  );
}
