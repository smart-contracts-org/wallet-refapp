import React from 'react';
import TextField from '@mui/material/TextField';
import { Box, Card, FormControl, Link, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

interface SendFormProps {
  ticker: string
}

const useStyles = makeStyles((theme: Theme) => ({
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
    // background: theme.palette.grey[200]
  },
}))



export const SendForm: React.FC<SendFormProps> = ({ ticker }) => {
  const classes = useStyles();
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const onClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 1000)

  }
  return (
    <>
      <FormControl className={classes.root}>
        <Box display='flex'>
          <Typography color='text.secondary' variant='body2' gutterBottom>
            Sending
      </Typography>
          <Typography marginLeft={1} color='primary' variant='body2'>
            {ticker || 'No ticker defined'}
          </Typography>
        </Box>
        <TextField
          margin="normal"
          id="recipient"
          label="Recipient"
          type="text"
          fullWidth
          variant="outlined"
          size='small'
        />
        <TextField
          margin="none"
          id="quantity"
          label="quantity"
          type="number"
          fullWidth
          variant="outlined"
          size='small'
          inputProps={{
            inputMode: 'numeric',
            type:'number',
            pattern:"[0-9]*"
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
          endIcon={<SendIcon />}
          loading={isLoading}
          fullWidth
          loadingPosition="end"
          variant="outlined"
          onClick={onClick}
          sx={{
            marginBottom: 0.5
          }}
        >
          Send
      </LoadingButton>
      </FormControl>
    </>
  );
}
