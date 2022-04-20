import { AlertColor } from "@mui/material";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SharedSnackbarContext } from "../context/SharedSnackbarContext";
import {
  useGetAssetInviteRequests,
  useGetAssetSwapRequests,
  useGetAssetTransfers,
} from "../ledgerHooks/ledgerHooks";
import { usePrevious } from "../utils/usePrevious";
import { AccountInvitePage } from "./AccountInvitePage";
import { AirdropRequestPage } from "./AirdropRequestPage";
import { AssetProfilePage } from "./AssetProfilePage";
import { CreateAssetAccountPage } from "./CreateAssetAccountPage";
import { IssueAirdropPage } from "./IssueAirdropPage";
import { MyActiveAccountsPage } from "./MyActiveAccounts";
import { PendingActivitiesPage } from "./PendingActivitiesPage";
import { PendingActivityDetailsPage } from "./PendingActivityDetailsPage/PendingActivityDetailsPage";
import { SendPage } from "./SendPage";
import { SwapPage } from "./SwapPage";

export const Pages: React.FC = () => {
  // Todo: redux, or extract
  const { contracts: inviteContracts } = useGetAssetInviteRequests(true);
  const { contracts: transferContracts } = useGetAssetTransfers(true);
  const { contracts: swapContracts } = useGetAssetSwapRequests(true);
  const { openSnackbar } = React.useContext(SharedSnackbarContext);
  const prevInvites = usePrevious(inviteContracts.length);
  const prevTranfers = usePrevious(transferContracts.length);
  const prevSwaps = usePrevious(swapContracts.length);
  React.useEffect(() => {
    if (inviteContracts.length > prevInvites) {
      openSnackbar(`Asset Account Invite`, "info" as AlertColor, true);
    }
    if (transferContracts.length > prevTranfers) {
      openSnackbar(`Transfer Request Received`, "info" as AlertColor, true);
    }
    if (swapContracts.length > prevSwaps) {
      openSnackbar(`Swap Request Received`, "info" as AlertColor, true);
    }
  }, [
    inviteContracts.length,
    transferContracts.length,
    swapContracts.length,
    openSnackbar,
    prevInvites,
    prevSwaps,
    prevTranfers,
  ]);
  return (
    <Routes>
      <Route path="/asset" element={<AssetProfilePage />} />
      <Route path="/pending/" element={<PendingActivitiesPage />} />
      <Route
        path="/pending-activity"
        element={<PendingActivityDetailsPage />}
      />
      <Route path="/send" element={<SendPage />} />
      <Route path="/airdrop-request" element={<AirdropRequestPage />} />
      <Route path="/swap" element={<SwapPage />} />
      <Route path="/issue" element={<IssueAirdropPage />} />
      <Route path="/invite" element={<AccountInvitePage />} />
      <Route path="/create" element={<CreateAssetAccountPage />} />
      <Route path="/" element={<MyActiveAccountsPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};
