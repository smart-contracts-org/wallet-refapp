import React from 'react';
import Dialog from '@mui/material/Dialog';
import { AssetAction } from '../../types/AssetAction';
import { PopupContent } from '../PopupContent/PopupContent';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export interface ContentTypes {
  issueAirdrop: JSX.Element
}

interface PopUpProps {
  assetAction?: AssetAction;
  handleClose: () => void;
  ticker: string;
  issuer: string;
  owner: string;
  quantity: number;
  isFungible: boolean;
  isShareable: boolean;
  isAirdroppable: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: '400px'
  }
}))


export const PopUp: React.FC<PopUpProps> = ({ owner, issuer, isAirdroppable, isFungible, isShareable, quantity, ticker, assetAction, handleClose }) => {
  const classes = useStyles()
  return (
    <Dialog className={classes.root} open={assetAction !== undefined} onClose={handleClose}>
      <PopupContent
        quantity={quantity}
        owner={owner}
        issuer={issuer}
        isFungible={isFungible}
        isAirdroppable={isAirdroppable}
        isShareable={isAirdroppable}
        ticker={ticker}
        contentType={assetAction}
        handleClose={handleClose} />
    </Dialog>
  );
}
