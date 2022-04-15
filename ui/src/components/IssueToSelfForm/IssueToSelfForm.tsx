import TextField from '@mui/material/TextField';
import { AlertColor, Button, Card, CardContent, FormControl, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React, { useContext } from 'react';
import { LoadingButton } from '@mui/lab';
import { IssueSuccess } from '../IssueSuccess/IssueSuccess';
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
  const { isFungible, reference, cancelText, issueLater, onDoneClick, onNext, ticker, handleClose } = props;
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
  const onIssueMoreClick = () => {
    setAmount("")
    setIsIssueToSelfSuccess(false)
  }
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
      setLoading(false)
      setError(true)
    }


  }
  const onChange = (e: React.BaseSyntheticEvent) => {
    setAmount(e.target.value);
  }

  return (
    <>
      { (
        <><FormControl fullWidth>
          <Card className={classes.root} elevation={0} variant='outlined'>
            <Typography color='text.primary' variant='body2' p={1}>
              The assets will be created directly in your wallet with the attributes you defined when creating the asset account.
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
            variant="outlined"
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
            onClick={isIssueToSelfSuccess ? onIssueMoreClick : onIssue}
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
