import React from 'react';
import TextField from '@mui/material/TextField';
import { Box, CardContent, Card, FormControl, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { AirdropInvites } from '../AirdropInvites/AirdropInvites';
import { useLedgerHooks } from '../../ledgerHooks/ledgerHooks';

interface AirdropFormProps {
  symbol: string;
  isFungible: boolean;
  reference: string;
  owner: string;
  issuer: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'start'
  }
}))



export const AirdropForm: React.FC<AirdropFormProps> = (props) => {
  const {issuer, owner, symbol, isFungible, reference} = props;
  const [hasError, setError] = React.useState(false);
  const [recipient, setRecipient] = React.useState("");
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isSuccessful, setSuccessful] = React.useState<boolean>(false);
  const ledgerHooks = useLedgerHooks();

  const onSubmit = async () => {
    setLoading(true);
    const result = await ledgerHooks.inviteNewAssetHolder({recipient, owner, assetType: {issuer, reference: reference || "", fungible: isFungible, symbol}})
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

  const classes = useStyles();
  return (
    <>
      <FormControl error={hasError} className={classes.root}>
        <Box mr={0.5}>
        <TextField
          margin="none"
          id="userId"
          label="recipient"
          type="text"
          fullWidth
          variant="outlined"
          size='small'
          sx={{marginRight: 1}}
          onChange={(e) => setRecipient(e.currentTarget.value)}

        />
        <Typography variant='caption' color='text.secondary'>
          Input userID of the user you want to invite to airdrop.
        </Typography>
        </Box>
        <LoadingButton
        disabled={recipient.length === 0}
        loading={isLoading}
        loadingPosition="end"
        variant="outlined"
        onClick={onSubmit}
      >
        {isSuccessful ? 'Send': 'Send'}
      </LoadingButton>
      </FormControl>
      {hasError && <Card   sx={{margin: 1, width: '100%'}} ><CardContent><Typography>
      An error was encountered, please try again. 
        </Typography>
        </CardContent></Card>}
      <AirdropInvites symbol={symbol} isFungible={isFungible} reference={reference}/>
      </>
  );
}