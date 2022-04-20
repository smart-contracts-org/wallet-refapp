import React from "react";

import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export const useMessageCardsStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  quantity: {
    marginRight: theme.spacing(1),
  },
  success: {
    background: theme.palette.success.dark,
    display: "flex",
    justifyContent: "center",
  },
  icon: {
    justifySelf: "center",
    width: "100%",
  },
}));

interface CreateAssetWorkflowDoneProps {
  onNext?: () => void;
  onDoneClick?: () => void;
}

export const CreateAssetWorkflowDone: React.FC<CreateAssetWorkflowDoneProps> =
  ({ onDoneClick, onNext }) => {
    const classes = useMessageCardsStyles();
    return (
      <Card elevation={0} color="theme.success" className={classes.success}>
        <CardContent>
          <CheckCircleIcon className={classes.icon} />
          <Typography>
            You have completed the steps. Go to "Issued by me" to see your
            issues.
          </Typography>
        </CardContent>
      </Card>
    );
  };
