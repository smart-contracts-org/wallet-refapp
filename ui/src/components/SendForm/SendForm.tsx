import React from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, Card, CardContent, FormControl, LinearProgress, Link, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { useGetMyOwnedAssetsByAssetType, useLedgerHooks } from '../../ledgerHooks/ledgerHooks';
import { ContractId } from '@daml/types';
import { AssetHoldingAccount } from '@daml.js/wallet-refapp/lib/Account';
import { getAssetSum } from '../../utils/getAssetSum';
import { numberWithCommas } from '../../utils/numberWithCommas';

interface SendFormProps {
  ticker: string;
  quantity: number;
  isAirdroppable: boolean;
  isShareable: boolean;
  isFungible: boolean;
  owner: string;
  reference: string;
  issuer: string;
  assetAccountCid: ContractId<AssetHoldingAccount>;
}

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left'
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  helpMessage: {
    margin: theme.spacing(1, 0, 1, 0),
  },
  errorCard: {
    backgroundColor: theme.palette.error.dark
  }
}))

export const SendForm: React.FC<SendFormProps> = ({ assetAccountCid, issuer, isAirdroppable,isFungible,isShareable, quantity, ticker, owner }) => {
  const classes = useStyles();
  const nav = useNavigate();
  const ledgerHooks = useLedgerHooks();
  const { loading, contracts } = useGetMyOwnedAssetsByAssetType({ issuer, symbol: ticker, isFungible: !!isFungible, owner});
  const assetCids = contracts.map((contract) => contract.contractId)
  const assetSum = getAssetSum(contracts);
  const formattedSum = numberWithCommas(assetSum)

  const onCancel = () => {
    nav(-1)
  }
  const [recipient, setRecipient] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isSuccessful, setSuccessful] = React.useState<boolean>(false);
  const [hasError, setError] = React.useState<boolean>(false);
  

  const onSubmit = async () => {
    setLoading(true);
    const result = await ledgerHooks.sendAsset({assetAccountCid, amount, recipient, assetCids })
    if(result.isOk){
      setLoading(false);
      setSuccessful(true);
      setError(false);
    } else {
      setSuccessful(false);
      setLoading(false);
      setError(true);
    }
  }

  const onReset = () => {
    setAmount("");
    setRecipient("");
    setSuccessful(false);
    setError(false)
  }
  if(loading){
    return (
      <LinearProgress/>
    )
  }
  
  return (
    <>
      <FormControl className={classes.root}>
        <Box display='flex'  justifyContent='center'>
          <Typography color='text.secondary' variant='body2' gutterBottom>
            Sending
        </Typography>
          <Typography marginLeft={1} color='primary' variant='body2'>
            {ticker || 'No ticker defined'}
          </Typography>
          <Typography marginLeft={1} color='text.secondary' variant='body2'>
            Balance: 
          </Typography>
          <Typography marginLeft={1} color='primary' variant='body2'>
            {formattedSum || 'undefined'}
          </Typography>
        </Box>
        <TextField
          
          disabled={isLoading || isSuccessful}
          margin="normal"
          id="recipient"
          label="Recipient"
          type="text"
          value={recipient}
          fullWidth
          variant="outlined"
          size='small'
          onChange={(e) => setRecipient(e.currentTarget.value)}
        />
        <TextField
          disabled={isLoading || isSuccessful}
          margin="none"
          id="amount"
          value={amount}
          error={parseFloat(amount) < 0}
          label="Amount"
          type="number"
          fullWidth
          variant="outlined"
          size='small'
          onChange={(e) => setAmount(e.currentTarget.value)}
          inputProps={{
            inputMode: 'decimal',
            type: 'number',
            pattern: "[0-9]*"
          }}
        />
        <Card elevation={0} variant='outlined' className={classes.helpMessage}>
          <Typography color='text.primary' variant='body2' p={1}>
            This is a one-off send. This means when you send to the specified user,
            they must accept it first in order for the ownership of the asset to be transferred.
            This uses the 'propose and accept' pattern. Learn more about this pattern <Link target="_blank" href="https://docs.daml.com/daml/patterns/initaccept.html">here</Link>.
        </Typography>
        </Card>
        <LoadingButton
          endIcon={isSuccessful ? <CheckCircleIcon /> : <SendIcon />}
          loading={isLoading}
          fullWidth
          loadingPosition="end"
          variant="outlined"
          disabled={recipient.length <= 0}
          color={isSuccessful ? 'success' : undefined}
          onClick={isSuccessful ? onReset : onSubmit}
          sx={{
            marginBottom: 0.5
          }}
        >
          {isSuccessful ? 'Complete, make another transaction' : 'Send'}
        </LoadingButton>
        <Button variant='outlined' onClick={onCancel}>
          {isSuccessful ? 'Back' : 'Back'}
        </Button>
      </FormControl>
      {hasError && <Card className={classes.errorCard}  sx={{margin: 1, width: '100%'}} ><CardContent><Typography>
      An error was encountered, please try again. 
        </Typography>
        </CardContent></Card>}
    </>
  );
}
