import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Card, CardContent, FormControl, Link, Typography } from '@mui/material';
import React from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import { LoadingButton } from '@mui/lab';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { isMobile } from '../../platform/platform';
import { useParty } from '@daml/react';
import { useNavigate } from 'react-router-dom'

import { useLedgerHooks } from '../../ledgerHooks/ledgerHooks';
interface CreateAccountFormProps {
  onSubmitSuccess?: () => void;
}


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(0, 0, 1, 0),
  },
  issuerContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2)
  },
  issuerText: {
    marginRight: theme.spacing(0.5)
  },
  formContainer: {
    padding: isMobile() ? theme.spacing(0, 0, 0, 0) : theme.spacing(0, 0, 0, 0)
  },
  warningText: {
    display: 'flex',
    alignItems: 'center'
  }
}))


export const CreateAccountForm: React.FC<CreateAccountFormProps> = ({ onSubmitSuccess }) => {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [hasError, setError] = React.useState<boolean>(false);
  const party = useParty();
  const nav = useNavigate();
  const ledgerHooks = useLedgerHooks();
  const classes = useStyles();
  const [ticker, setTicker] = React.useState<string | undefined>(undefined)
  const [reference, setReference] = React.useState<string>("");
  const [isShareable, setShareable] = React.useState<boolean>(true);
  const [isFungible, setFungible] = React.useState<boolean>(true);
  const [isAirdroppable, setIsAirdroppable] = React.useState<boolean>(true);

  const onTextChange = (event: React.BaseSyntheticEvent) => {
    setTicker(event.target.value)
  }
  const onRefChange = (event: React.BaseSyntheticEvent) => {
    setReference(event.target.value)
  }

  const submit = async () => {
    if (!ticker) {
      setError(true);
      return;
    }
    setLoading(true);
    const result = await ledgerHooks.createAssetAccount({
      ticker,
      isFungible,
      reference,
      isAirdroppable,
      isShareable,
    })
    if (result.isOk) {
      onSubmitSuccess && onSubmitSuccess()
      const contractId = result.payload.contractId
      nav(`/asset?issuer=${party}&ticker=${ticker}&isFungible=${isFungible}&isShareable=${isShareable ? 'true' : 'false'}&isAirdroppable=${isAirdroppable ? 'true' : 'false'}&contractId=${contractId}&reference=${reference}`)
    } else {
      setError(true);
      setLoading(false);
    }

  }
  return (
    <div className={classes.formContainer}>
      <Card>
        <CardContent>
        <Card elevation={0} variant='outlined' className={classes.root}>
        <Typography color='text.secondary' variant='body2' p={1}>
          Define the asset characteristics below and create your new Asset Holding Account.  After the Asset Holding Account is created, you can issue new asset quantities into the account and more. Read <Link target="_blank" href="https://github.com/maxhsu-da/wallet-refapp/blob/main/Concepts.md#wallet-daml-reference-app---concepts-and-their-implementation">Wallet Daml Reference App - concepts and their implementation article for details.</Link>
        </Typography>
      </Card>
      <div>
        <div className={classes.issuerContainer}>
          <Typography variant='caption' className={classes.issuerText}>
            Issuer:
          </Typography>
          <Typography variant='caption' color='primary'>
            {party || 'Demo Party ID'}
          </Typography>
        </div>
      </div>
      <FormControl fullWidth>
        <TextField
          margin="none"
          id="symbol"
          label="Symbol (Mandatory field)"
          type="text"
          autoComplete='off'
          fullWidth
          variant="outlined"
          size='small'
          error={hasError}
          onChange={(e) => onTextChange(e)}
          sx={{marginBottom: 1}}
        />
        <Typography variant='caption' color='text.secondary' mb={1}>
          The symbol used to identify the token that this asset account will hold.
          </Typography>
        <TextField
          margin="none"
          id="reference"
          label="Reference (Optional field)"
          type="text"
          autoComplete='off'
          fullWidth
          maxRows={4}
          multiline
          variant="outlined"
          size='small'
          error={hasError}
          onChange={(e) => onRefChange(e)}
          sx={{marginBottom: 1}}
        />
        <Typography variant='caption' color='text.secondary' mb={1}>
          <Typography variant='caption' color='primray'><b>Optional field</b></Typography> The reference is a unique text associated with the asset. It could be an image link or serial number.
          </Typography>

        <FormGroup>
          <FormControlLabel control={<Switch onChange={(e) => { setShareable(e.target.checked) }} defaultChecked />} label="Reshareable" />
          <Typography variant='caption' color='text.secondary' mb={1}>
            If activated, any owner can invite other users to become an owner of the asset account as well.
          </Typography>
          <FormControlLabel control={<Switch defaultChecked onChange={(e) => { setIsAirdroppable(e.target.checked) }} />} label="Airdroppable" />
          <Typography variant='caption' color='text.secondary' mb={1}>
            If activated, you will be able to invite other users to receive the tokens when airdropped.
          </Typography>
          <FormControlLabel control={<Switch defaultChecked onChange={(e) => { setFungible(e.target.checked) }} />} label="Fungible" />
          <Typography variant='caption' color='text.secondary' mb={1}>
            If activated, the asset can be divided. Set Fungible to false if you want the asset to be non-fungible, this means the contract cannot be divided, and it's only unit of issuance is 1.
          </Typography>
        </FormGroup>
      </FormControl>
      <Card elevation={0} variant='outlined' className={classes.root}>
        <Typography className={classes.warningText} color='text.secondary' variant='body2' p={1}>
          <WarningIcon sx={{marginRight: 1}}/>
          Once created, you will not be able to edit the attributes.
        </Typography>
      </Card>
      <LoadingButton
        loading={isLoading}
        fullWidth
        variant="outlined"
        onClick={submit}
        sx={{
          marginBottom: 0.5
        }}
      >
        Create
      </LoadingButton>

        </CardContent>
      

      </Card>
     
    </div>

  );
}
