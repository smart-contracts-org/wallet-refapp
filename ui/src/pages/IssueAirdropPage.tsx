import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { usePageStyles } from "./AssetProfilePage";
import { IssueToSelfForm } from "../components/IssueToSelfForm/IssueToSelfForm";
import { AirdropForm } from "../components/AirdropForm/AirdropForm";
import Fab from "@mui/material/Fab";
import { isMobile } from "../platform/platform";
import { useQuery } from "./PendingActivityDetailsPage/PendingActivityDetailsPage";
import { numberWithCommas } from "../utils/numberWithCommas";
import { useGetMyOwnedAssetsByAssetType } from "../ledgerHooks/ledgerHooks";
import { getAssetSum } from "../utils/getAssetSum";

export const enableFabBack = true;

export const IssueAirdropPage: React.FC = () => {
  const nav = useNavigate();
  const query = useQuery();
  // These params are passed into the ur
  // because we cannot pass props to the page components
  const issuer = query.get("issuer") || "";
  const symbol = query.get("ticker") || "";
  const owner = query.get("owner") || "";
  const reference = query.get("reference") || "";
  const isFungible = query.get("isFungible") === "true";
  const {  contracts } = useGetMyOwnedAssetsByAssetType({
    issuer,
    symbol,
    isFungible: isFungible,
    owner,
    reference,
  });
  const assetSum = getAssetSum(contracts);

  const formattedSum = numberWithCommas(assetSum);

  const classes = usePageStyles();
  const [index, setIndex] = React.useState(1);
  const onBack = () => {
    nav(-1);
  };
  const onButtonClick = (val: number) => {
    setIndex(val);
  };
  if (!symbol) {
    return (
      <Card>
        <CardContent>Missing Ticker Information</CardContent>
      </Card>
    );
  }

  return (
    <div className={classes.root}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box
          margin={1}
          width="100%"
          flexDirection="row"
          display="flex"
          alignItems="center"
          justifyContent="start"
        >
          <Box position="absolute">
            <IconButton color="primary" onClick={onBack}>
              <ArrowBackIosNewIcon />
            </IconButton>
          </Box>
          <Box flexGrow="1" textAlign="center">
            <Typography
              color="primary"
              variant="h5"
              sx={{ flexGrow: 1, marginLeft: "auto" }}
            >
              Issue / Airdrop
            </Typography>
          </Box>
        </Box>
        <Card variant="outlined" className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Avatar className={classes.avatar}>
              {symbol[0] || "undefined"}
            </Avatar>
            <Box display="flex" justifyContent="center">
              <Typography variant="h6">
                {formattedSum || "undefined"}
              </Typography>
              <Typography marginLeft={1} variant="h6">
                {symbol || "No ticker defined"}
              </Typography>
            </Box>
            <Box
              sx={{
                marginTop: 1,
                marginBottom: 3,
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Button
                sx={{ marginRight: 0.5 }}
                onClick={() => {
                  onButtonClick(1);
                }}
                fullWidth
                variant={index === 1 ? "contained" : "outlined"}
              >
                Issue to Self
              </Button>
              <Button
                sx={{ marginLeft: 0.5 }}
                onClick={() => {
                  onButtonClick(2);
                }}
                fullWidth
                variant={index === 2 ? "contained" : "outlined"}
              >
                Airdrop
              </Button>
            </Box>
            {index === 1 && (
              <IssueToSelfForm
                handleClose={() => {}}
                isFungible={isFungible}
                ticker={symbol}
                reference={reference}
              />
            )}
            {index === 2 && (
              <AirdropForm
                issuer={issuer}
                owner={owner}
                symbol={symbol}
                isFungible={isFungible}
                reference={reference}
              />
            )}
          </CardContent>
        </Card>
      </Box>
      {enableFabBack && isMobile() && (
        <Fab sx={{ position: "fixed", bottom: 20, right: 30 }}>
          <IconButton color="primary" onClick={onBack}>
            <ArrowBackIosNewIcon color="info" />
          </IconButton>
        </Fab>
      )}
    </div>
  );
};
