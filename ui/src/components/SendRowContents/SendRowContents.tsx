import React from "react";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import clx from "clsx";
import { Divider } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: "flex",
    alignItems: "center",
  },
  narrowCard: {
    display: "flex",
    flexDirection: "column",
  },
  actions: {
    marginLeft: "auto",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  quantity: {
    backgroundColor: "green",
  },
  text: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
  sender: {
    color: theme.palette.text.primary,
  },
  assetName: {
    color: theme.palette.primary.main,
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  marginBottom: {
    marginBottom: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
}));

interface SendRowContentsProps {
  issuer: string;
  isInbound: boolean;
  receiver: string;
  amount: string;
  isNarrow: boolean;
  sender: string;
  symbol: string;
}
export const SendRowContents: React.FC<SendRowContentsProps> = (props) => {
  const { amount, symbol, receiver, isNarrow, isInbound, sender } = props;
  const classes = useStyles();
  const inboundMessage = (
    <>
      <div className={classes.divider} />
      <Typography
        variant="body2"
        className={clx(classes.text, classes.sender)}
        color="text.secondary"
      >
        {sender}
      </Typography>
      <Divider className={classes.divider} />
      <Typography
        variant="body2"
        color="text.secondary"
        className={clx(classes.text)}
      >
        wants to send you
      </Typography>
      <Divider className={classes.divider} />
    </>
  );
  const outboundMessage = (
    <>
      <div className={classes.divider} />
      <Typography
        variant="body2"
        color="text.secondary"
        className={classes.text}
      >
        You want to send
      </Typography>
      <Divider className={classes.divider} />
      <Typography
        variant="body2"
        className={clx(classes.text, classes.sender)}
        color="text.secondary"
      >
        {receiver || "[name]"}
      </Typography>
      <Divider className={classes.divider} />
    </>
  );

  return (
    <div className={isNarrow ? classes.narrowCard : classes.card}>
      {isInbound ? inboundMessage : outboundMessage}
      <div className={classes.row}>
        <Typography
          variant="body2"
          className={classes.text}
          color="text.secondary"
        >
          {amount}
        </Typography>
        <Typography
          variant="body2"
          className={clx(classes.text, classes.assetName)}
          color="text.secondary"
        >
          {symbol}
        </Typography>
      </div>
      <div className={classes.divider} />
    </div>
  );
};
