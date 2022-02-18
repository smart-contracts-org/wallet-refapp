import React from 'react';
import { SendPopupContent, SendPopupContentProps } from "../SendPopupContent/SendPopupContent"
import { AssetAction } from "../../types/AssetAction"
import { AssetDetailsPopupContent, AssetDetailsPopupContentProps } from "../AssetDetailsPopupContent/AssetDetailsPopupContent"
import { CreateAccountPopupContent, CreateAccountPopupContentProps } from "../CreateAccountPopupContent/CreateAccountPopupContent"
import { InviteNewAssetOwnerPopupContent, InviteNewAssetOwnerPopupContentProps } from "../InviteNewAssetOwnerPopupContent/InviteNewAssetOwnerPopupContent"
import { IssueAirdropPopupContent, IssueAirdropPopupContentProps } from "../IssueAirdropPopupContent/IssueAirdropPopupContent"
import { SwapPopupContent, SwapPopupContentProps } from "../SwapPopupContent/SwapPopupContent"

interface PopupContentTypes {
  [AssetAction.IssueAirdrop]: React.FC<IssueAirdropPopupContentProps>,
  [AssetAction.Send]: React.FC<SendPopupContentProps>,
  [AssetAction.InviteNewAssetOwner]: React.FC<InviteNewAssetOwnerPopupContentProps>,
  [AssetAction.Details]: React.FC<AssetDetailsPopupContentProps>,
  [AssetAction.CreateAccount]: React.FC<CreateAccountPopupContentProps>,
  [AssetAction.Swap]: React.FC<SwapPopupContentProps>
}

export const popupContentTypes: PopupContentTypes = {
  [AssetAction.IssueAirdrop]: IssueAirdropPopupContent,
  [AssetAction.Send]: SendPopupContent,
  [AssetAction.InviteNewAssetOwner]: InviteNewAssetOwnerPopupContent,
  [AssetAction.Details]: AssetDetailsPopupContent,
  [AssetAction.CreateAccount]: CreateAccountPopupContent,
  [AssetAction.Swap]: SwapPopupContent
}

interface PopupContentProps {
  contentType?: AssetAction;
  handleClose: () => void;
  ticker: string;
  quantity: number;
  issuer: string;
  isShareable: boolean;
  isFungible: boolean;
  isAirdroppable: boolean;
  owner: string
}

export const PopupContent: React.FC<PopupContentProps> = ({ quantity, issuer, owner, ticker, contentType, handleClose, isAirdroppable, isFungible, isShareable }) => {
  if (contentType === undefined) {
    return (
      <>
      </>
    )
  }
  const Selected = popupContentTypes[contentType]
  return <Selected
    owner={owner}
    issuer={issuer}
    quantity={quantity}
    ticker={ticker}
    isAirdroppable={isAirdroppable}
    isShareable={isShareable}
    isFungible={isFungible}
    handleClose={handleClose} 
    />
}