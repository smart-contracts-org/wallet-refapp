import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import React from "react";
import { PendingAccountInvites } from "../PendingAccountInvites/PendingAccountInvites";
import { PendingSwaps } from "../PendingSwaps/PendingSwaps";
import { PendingTransfers } from "../PendingTransfers/PendingTransfers";

export interface PendingActivitiesPageProps {
  isInbound: boolean;
}

export const PendingActivities: React.FC<PendingActivitiesPageProps> = (
  props
) => {
  const { isInbound } = props;

  return (
    <>
      {isInbound ? (
        <Card elevation={0} variant="outlined" sx={{ mb: 1 }}>
          <Typography color="text.primary" variant="body2" p={1}>
            Pending inbound / outbound requests for asset transfers, swaps, and
            Asset Holding Account invitations are displayed here. Inbound page
            displays the requests other users send to you, which you can{" "}
            <b>accept</b> or <b>reject</b>.
          </Typography>
        </Card>
      ) : (
        <Card elevation={0} variant="outlined" sx={{ mb: 1 }}>
          <Typography color="text.primary" variant="body2" p={1}>
            Outbound page displays the requests you sent to other users. You can
            cancel an outbound request while it’s pending acceptance or
            rejection by the recipient.
          </Typography>
        </Card>
      )}
      <PendingTransfers isInbound={isInbound} />
      <PendingAccountInvites isInbound={isInbound} />
      <PendingSwaps isInbound={isInbound} />
    </>
  );
};
