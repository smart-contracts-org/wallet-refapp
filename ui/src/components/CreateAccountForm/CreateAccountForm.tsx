import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Card, FormControl, Typography } from '@mui/material';
import React from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import { LoadingButton } from '@mui/lab';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { isMobile } from '../../platform/platform';
import { useParty } from '@daml/react';
import { useLedgerHooks } from '../../ledgerHooks/ledgerHooks';
interface CreateAccountFormProps {
  onSubmitSuccess?: () => void;
}


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(0,0,1,0),
  },
  issuerContainer: {
    display: 'flex',
    flexDirection: 'row',
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
  const ledgerHooks = useLedgerHooks();
  const classes = useStyles();
  const [ticker, setTicker] = React.useState<string | undefined>(undefined)
  const [isShareable, setShareable] = React.useState<boolean>(true);
  const [isFungible, setFungible] = React.useState<boolean>(true);
  const [isAirdroppable, setIsAirdroppable] = React.useState<boolean>(true);

  const onTextChange = (event: React.BaseSyntheticEvent) => {
    setTicker(event.target.value)
  }

  const submit = async () => {
    if(!ticker){
      setError(true);
      return;
    }
    setLoading(true);
    
      const result = await ledgerHooks.createAssetAccount({
        ticker,
        isFungible, 
        reference: '',
        isAirdroppable, 
        isShareable, 
      })
      if(result.isOk){
        console.log(result)
        onSubmitSuccess && onSubmitSuccess()
      } else {
      setError(true);
      setLoading(false);
      }
    
  }
  return (
    <div className={classes.formContainer}>
      <Card elevation={0} variant='outlined' className={classes.root}>
        <Typography color='text.secondary' variant='body2' p={1}>
          You must create an Asset Account first before you can mint your assets. Once you create the asset account, you will be able to mint tokens to yourself, or airdrop to other users.
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
          label="Symbol"
          type="text"
          fullWidth
          variant="outlined"
          size='small'
          error={hasError}
          onChange={(e) => onTextChange(e)}
        />
        <Typography variant='caption' color='text.secondary' mb={1}>
          The symbol / ticker used to identify the token that this asset account will hold.
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
            If activated, the asset can be divided. Set Fungible to true if you want to create an NFT.
          </Typography>
        </FormGroup>
      </FormControl>
      {/* <Card elevation={0} variant='outlined' className={classes.root}>
        <Typography color='text.secondary' variant='body2' p={1}>
          You must create an Asset Account first before you can mint your assets. Once you create the asset account, you will be able to mint tokens to yourself, or airdrop to other users.
        </Typography>
      </Card> */}
      <Card elevation={0} variant='outlined' className={classes.root}>
        <Typography className={classes.warningText} color='text.secondary' variant='body2' p={1}>
          <WarningIcon />
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
    </div>

  );
}
