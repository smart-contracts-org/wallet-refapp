import { LinearProgress } from "@mui/material";
import React from "react";
import { useGetAssetTransfers } from "../../ledgerHooks/ledgerHooks";
import { PendingTransferRow } from "../PendingTransferRow/PendingTransferRow";

interface PendingTransfersProps {
  isInbound: boolean;
}

export const PendingTransfers: React.FC<PendingTransfersProps> = (props) => {
  const { isInbound } = props;
  console.log("isinbond", isInbound);
  const { loading, contracts } = useGetAssetTransfers(isInbound);
  console.log(loading, contracts);

  if (loading) {
    return <LinearProgress sx={{ width: "100%" }} />;
  }
  const pendingTransferRows = contracts.map((contract) => {
    const amount = contract.payload.asset.amount;
    const sender = contract.payload.asset.owner;
    const { issuer, fungible, symbol, reference } =
      contract.payload.asset.assetType;
    const receiver = contract.payload.recipient;
    const transferCid = contract.contractId;
    const owner = contract.payload.asset.owner;
    const pendingTransferRowProps = {
      amount,
      symbol,
      sender,
      receiver,
      issuer,
      isInbound,
      isNarrow: true,
      transferCid,
      isFungible: fungible,
      reference: reference as string,
      owner,
    };
    return <PendingTransferRow {...pendingTransferRowProps} />;
  });

  return <>{pendingTransferRows}</>;
};
