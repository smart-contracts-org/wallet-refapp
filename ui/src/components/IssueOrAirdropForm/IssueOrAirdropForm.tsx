import * as React from 'react';
import {  Button, Card } from '@mui/material';
import { IssueToSelfForm } from '../IssueToSelfForm/IssueToSelfForm';
import { AirdropForm } from '../AirdropForm/AirdropForm';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const useStyles = makeStyles((theme: Theme) => ({
    buttonContainer: {
      display: 'flex', 
      flexDirection: 'row'
    }
}))


export interface IssueAirdropPopupContentProps {
  handleClose: () => void;
  ticker: string;
}

export const IssueOrAirdropForm: React.FC<IssueAirdropPopupContentProps> = ({ ticker, handleClose }) => {
  const [value, setValue] = React.useState(0);
const classes = useStyles();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card>
      <div className={classes.buttonContainer}>
        <Button>
          Mint to self
      </Button>
        <Button>
          Airdrop
      </Button>
      </div>
      <IssueToSelfForm handleClose={handleClose} ticker={ticker} />
      <Button
        variant='outlined'
        size='small'
        fullWidth
        onClick={handleClose}
      >
        cancel
      </Button>
      <AirdropForm />
      <Button
        variant='outlined'
        size='small'
        fullWidth
        onClick={handleClose}
      >
        cancel
      </Button>
    </Card>
  );
}
