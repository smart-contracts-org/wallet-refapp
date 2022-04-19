import React from 'react';
import TextField from '@mui/material/TextField';
import { Box, Card, FormControl, Typography, Link, Button, MenuItem, Select, SelectChangeEvent, CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { getAssetSum } from '../../utils/getAssetSum';
import { useParty } from '@daml/react';
import { useGetAllAssetHoldingAccounts, useGetMyOwnedAssetsByAssetType, useLedgerHooks } from '../../ledgerHooks/ledgerHooks';
import { AssetType } from '@daml.js/wallet-refapp/lib/Asset';
import { SharedSnackbarContext } from '../../context/SharedSnackbarContext';
import { useAdminParty } from '@daml/hub-react';
import { deploymentMode, DeploymentMode } from '../../config';
import InfoIcon from '@mui/icons-material/Info';

interface SwapFormProps {
  symbol: string;
  reference: string;
  issuer: string;
  isFungible: boolean;

}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left'
  },
  helpMessage: {
    margin: theme.spacing(1, 0, 1, 0),
  },
  recipient: {
    marginBottom: theme.spacing(1)
  },
  recipientTextField: {
    marginBottom: 0,
    marginTop: theme.spacing(1)
  },
  swapAssetContainer: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(0.5),
  },
  textFieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  directionContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1),
    alignItems: 'center'
  },
  inboundArrow: {
    color: 'green'
  },
  outboundArrow: {
    color: 'red'
  }
}))



export const SwapForm: React.FC<SwapFormProps> = (props) => {
  const { symbol, isFungible, issuer, reference } = props
  const prodAdminParty = useAdminParty();
  const admin = deploymentMode === DeploymentMode.DEV ? 'a' :  prodAdminParty;
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [inboundAssetType, setInboundAssetType] = React.useState<undefined | AssetType>();
  const {openSnackbar} = React.useContext(SharedSnackbarContext)

  const handleChange = (event: SelectChangeEvent) => {
    const inboundAssetType = (event.target.value);
    setInSymbol(inboundAssetType);
  };
  const [recipient, setRecipient] = React.useState("");
  const [outAmount, setOutAmount] = React.useState("");
  const [inAmount, setInAmount] = React.useState("");
  const [isSuccessful, setSuccessful] = React.useState<boolean>(false);
  const [inSymbol, setInSymbol] = React.useState<string>("");
  const nav = useNavigate();
  const ledgerHooks = useLedgerHooks();
  const party = useParty();


  // get a list of available asset accounts you own:
  const { loading: loadingOwnedAssetAccounts, contracts: ownedAssetAccounts } = useGetAllAssetHoldingAccounts();


  const { loading: loadingAssetContracts, contracts: assetContracts } = useGetMyOwnedAssetsByAssetType({reference, issuer: issuer, symbol: symbol, isFungible: isFungible, owner: party });
  const outAssetCids = assetContracts.map((contract) => contract.contractId)
  const totalBalance = getAssetSum(assetContracts);
  
  const onBack = () => {
    nav(-1)
  }
  const onSubmit = async () => {
    setLoading(true)
    const result = await ledgerHooks.proposeSwap(
      {
        outAmount,
        outSymbol: symbol,
        outFungible: isFungible,
        outReference: reference,
        outIssuer: issuer,
        outAssetCids: outAssetCids,
        inAmount,
        inIssuer: inboundAssetType?.issuer || "",
        inSymbol,
        inFungible: inboundAssetType?.fungible || false,
        inReference: inboundAssetType?.reference || "",
        inOwner: recipient
      }
    )
    if(result.isOk){
      setLoading(false);
      setSuccessful(true);
      openSnackbar("Swap Request Sent", "success")
    } else {
      setLoading(false);
      setSuccessful(false)
    }

  }
  const onAdminClick = () => {
    if(!admin){
      return;
    }
    setRecipient(admin);
  }
  const classes = useStyles();
  if(loadingAssetContracts||loadingOwnedAssetAccounts){
    return (
      <CircularProgress/>
    )
  }
  return (
    <Box display='flex' flexDirection='column'>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <Typography color='text.secondary' variant='body2' marginRight={1} gutterBottom>
          Swapping
        </Typography>
        <Typography color='primary' variant='body2' gutterBottom>
          {symbol}
        </Typography>
        <Typography sx={{marginLeft: 1}} color='text.secondary' variant='body2' marginRight={1} gutterBottom>
          Balance
        </Typography>
        <Typography color='primary' variant='body2' gutterBottom>
          {totalBalance}
        </Typography>
      </Box>

      <div className={classes.root}>
        <Box className={classes.recipient}>
          <TextField
            id="recipient"
            label="Recipient"
            type="text"
            fullWidth
            variant="outlined"
            size='small'
            value={recipient}
            className={classes.recipientTextField}
            onChange={(e) => setRecipient(e.currentTarget.value)}
            InputProps={{endAdornment: <Button onClick={onAdminClick} fullWidth sx={{maxWidth: '120px', margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis', }} variant='contained' size='small'><Typography sx={{textTransform: 'capitalize'}} variant='caption'>Use Default Party</Typography></Button>}}

          />
        </Box>
        <div className={classes.swapAssetContainer} >
          <Box display='flex' flexDirection='column' justifyContent='center'>
            <Box className={classes.directionContainer}>
              <Typography sx={{ marginRight: 1 }} color='text.secondary' variant='caption'>
                Swapping Out
              </Typography>
              <EastIcon className={classes.outboundArrow} />
            </Box>
            <Box display='flex' flexDirection='row'>
              <Box className={classes.textFieldContainer} mr={0.5}>
                <TextField
                  margin="dense"
                  id="Ticker"
                  label={symbol}
                  type="text"
                  disabled
                  variant="outlined"
                  size='small'
                />
              </Box>
              <Box className={classes.textFieldContainer}>
                <TextField
                  margin="dense"
                  id="outbound-amount"
                  label="Amount"
                  type="text"
                  variant="outlined"
                  size='small'
                  onChange={(e) => setOutAmount(e.currentTarget.value)}
                  inputProps={{
                    inputMode: 'decimal',
                    type: 'number',
                    pattern: "[0-9]*"
                  }}

                />
              </Box>
            </Box>
          </Box>
        </div>
        <FormControl className={classes.swapAssetContainer} >
          <Box display='flex' flexDirection='column' justifyContent='center'>
            <Box className={classes.directionContainer}>
              <WestIcon className={classes.inboundArrow} />
              <Typography sx={{ marginLeft: 1 }} color='text.secondary' variant='caption'>
                Swapping In
              </Typography>
            </Box>
            <Box display='flex' flexDirection='row' alignItems='center'>
              <Box className={classes.textFieldContainer} mr={0.5}>
                {/* <InputLabel id="inbound-swap">swap</InputLabel> */}
                <Select
                  margin='dense'
                  labelId="inbound-swap"
                  id="demo-simple-select-autowidth"
                  value={inboundAssetType?.symbol ||""}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {ownedAssetAccounts.map((account) => {
                    const symbol = account.payload.assetType.symbol
                    return (
                      <MenuItem key={account.contractId} onClick={() => { setInboundAssetType(account.payload.assetType) }} value={symbol}>{symbol}</MenuItem>
                    )
                  })}

                </Select>
              </Box>
              <Box className={classes.textFieldContainer}>
                <TextField
                  margin="none"
                  id="inbound-amount"
                  label="Amount"
                  type="text"
                  variant="outlined"
                  size='small'
                  onChange={(e) => setInAmount(e.currentTarget.value)}
                  inputProps={{
                    inputMode: 'decimal',
                    type: 'number',
                    pattern: "[0-9]*"
                  }}
                />
              </Box>
            </Box>
          </Box>
        </FormControl>

        <Card elevation={0} variant='outlined' className={classes.helpMessage}>
        <Box display='flex' alignItems='center' margin={1}>
          <InfoIcon color='primary' sx={{marginRight:1}}/> <Typography variant='body2'><i>Please note</i></Typography>
            </Box>
          <Typography color='text.primary' variant='body2' p={1}>
          To execute a swap both parties need to have Asset Holding Accounts for both assets being swapped. For detailed description of a swap workflow, read <Link target="_blank" href="">Atomic Swap Implementation </Link>.
A swap proposal sent to the Default Party is accepted automatically. The Default Party is a bot implemented using Triggers.          
</Typography>
<Typography color='text.primary' variant='body2' p={1}>
A swap proposal sent to the Default Party is accepted automatically. The Default Party is a bot implemented using <Link target="_blank" href="https://docs.daml.com/triggers/index.html">Triggers</Link>.
</Typography>
        </Card>
        <LoadingButton
          disabled={recipient.length === 0}
          endIcon={isSuccessful ? <CheckCircleIcon /> : <SwapHorizIcon />}
          loading={isLoading}
          fullWidth
          onClick={isSuccessful ? undefined : onSubmit}
          color={isSuccessful ? 'success' : undefined}
          loadingPosition="end"
          variant="outlined"
          sx={{
            marginBottom: 0.5
          }}
        >
          {isSuccessful ? "Swap Request Sent" : "Request Swap"}
        </LoadingButton>
        <Button variant='outlined' onClick={onBack}>Back</Button>
      </div>
    </Box>
  );
}
