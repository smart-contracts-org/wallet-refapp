import TextField from '@mui/material/TextField';
import { AlertColor, Button, Card, CardContent, FormControl, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React, { useContext } from 'react';
import { LoadingButton } from '@mui/lab';
import { useLedgerHooks } from '../../ledgerHooks/ledgerHooks';
import { useNavigate } from 'react-router';
import { SharedSnackbarContext } from '../../context/SharedSnackbarContext';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(0, 0, 0, 0),
  }
}))

interface IssueToSelfFormProps {
  ticker: string;
  handleClose: () => void;
  onNext?: () => void;
  onDoneClick?: () => void;
  issueLater?: () => void;
  cancelText?: string;
  reference: string;
  isFungible: boolean;
}

export const IssueToSelfForm: React.FC<IssueToSelfFormProps> = (props) => {
  const { isFungible, reference, cancelText, issueLater, ticker, handleClose } = props;
  const classes = useStyles()
  const ledgerHooks = useLedgerHooks();
  const {openSnackbar} = useContext(SharedSnackbarContext)
  const nav = useNavigate();
  const onBack = () => {
    nav(-1)
  }
  const [hasError, setError] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [amount, setAmount] = React.useState<string>('');
  const [isIssueToSelfSuccess, setIsIssueToSelfSuccess] = React.useState(false);

  const onIssue = async () => {
    setLoading(true);
    const result = await ledgerHooks.issueAsset({ ticker, amount: amount, isFungible, reference })

    if (result.isOk) {
      setLoading(false);
      handleClose()
      setIsIssueToSelfSuccess(true)
      setLoading(false)
      openSnackbar(`Issued ${amount} ${ticker}`, 'success' as AlertColor)
  
    } else {
      openSnackbar('Encountered an error when issuing', 'error')
      setLoading(false)
      setError(true)

    }


  }
  const onChange = (e: React.BaseSyntheticEvent) => {
    setAmount(e.target.value);
  }
  const onReset = () => {
    setAmount("")
    setIsIssueToSelfSuccess(false)

  }
  const handleKeyboardEvent = (e: React.KeyboardEvent<HTMLImageElement>) => {
    if(e.key === 'Enter'){
      isIssueToSelfSuccess ? onReset() : onIssue();
    }
  };

  return (
    <>
      { (
        <><FormControl fullWidth>
          <Card className={classes.root} elevation={0} variant='outlined'>
            <Typography color='text.primary' variant='body2' p={1}>
              The assets will be created directly in your wallet with the attributes you previously defined when creating the Asset Holding Account.
        </Typography>
          </Card>
          <TextField
            margin="dense"
            id="symbol"
            label={`${ticker}`}
            type="text"
            fullWidth
            variant="outlined"
            disabled
            size='small'
          />
          <TextField
            margin="none"
            id="quantity"
            label="Quantity"
            type="number"
            value={amount}
            fullWidth
            onKeyDown={handleKeyboardEvent}
            variant="outlined"
            disabled={isIssueToSelfSuccess}
            size='small'
            onChange={(e) => { onChange(e) }}
            inputProps={{
              inputMode: 'decimal',
              type: 'number',
              pattern: "[0-9]*"
            }}
          />
          <Typography variant='caption' color='text.secondary'>
            Specify the quanity you would like to issue to wallet.
        </Typography>
        </FormControl>

          <LoadingButton
            loading={isLoading}
            fullWidth
            variant="outlined"
            onClick={isIssueToSelfSuccess ? onReset : onIssue}
            sx={{
              marginBottom: 0.5
            }}
          >
            {isIssueToSelfSuccess ?"Issue Again" : "Issue"}
      </LoadingButton>
          <Button
            variant='outlined'
            size='medium'
            fullWidth
            onClick={onBack || (issueLater && issueLater) || handleClose}
          >
            {cancelText || 'Back'}
          </Button>

        </>)}
      {hasError && <Card sx={{margin: 1, width: '100%'}}>
        <CardContent>
          ERROR
          </CardContent>
      </Card>}
    </>
  );
}
