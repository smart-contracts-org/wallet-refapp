import TextField from '@mui/material/TextField';
import { Button, Card, CardContent, FormControl, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { LoadingButton } from '@mui/lab';
import { IssueSuccess } from '../IssueSuccess/IssueSuccess';
import { useLedgerHooks } from '../../ledgerHooks/ledgerHooks';

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
}

export const IssueToSelfForm: React.FC<IssueToSelfFormProps> = ({ cancelText, issueLater, onDoneClick, onNext, ticker, handleClose }) => {
  const classes = useStyles()
  const ledgerHooks = useLedgerHooks();
  const [hasError, setError] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [amount, setAmount] = React.useState<string>('0');
  const [isIssueToSelfSuccess, setIsIssueToSelfSuccess] = React.useState(false);
  const isFungible = true;

  const onIssue = async () => {
    setLoading(true);
    const result = await ledgerHooks.issueAsset({ ticker, amount: amount, isFungible })

    if (result.isOk) {
      setLoading(false);
      handleClose()
      setIsIssueToSelfSuccess(true)
      setLoading(false)

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
      {isIssueToSelfSuccess ? (
        <IssueSuccess onNext={onNext} onDoneClick={onDoneClick} />
      ) : (
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
            onClick={onIssue}
            sx={{
              marginBottom: 0.5
            }}
          >
            Issue
      </LoadingButton>
          <Button
            variant='outlined'
            size='small'
            fullWidth
            onClick={(issueLater && issueLater) || handleClose}
          >
            {cancelText || 'Cancel'}
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
