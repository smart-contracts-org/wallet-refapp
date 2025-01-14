import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { Link, useLocation } from "react-router-dom";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ListItemText from "@mui/material/ListItemText";
import {
  Divider,
  ListItemButton,
  Typography,
  Link as LinkBtn,
} from "@mui/material";
import { menuItems } from "../../configs/sideMenu.config";

const drawerWidth: number = 200;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.text.secondary,
  },
}));

interface SideMenuMobileProps {
  isOpen: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
}
export const SideMenuMobile: React.FC<SideMenuMobileProps> = ({
  isOpen,
  handleDrawerOpen,
  handleDrawerClose,
}) => {
  const location = useLocation();
  const [selected, setSelected] = React.useState<string | undefined>(
    location.pathname
  );

  React.useEffect(() => {
    if (localStorage.getItem("lastPath") !== selected) {
      setSelected(location.pathname);
    }
  }, [location.pathname, selected]);

  const setLastPath = (path: string) => {
    localStorage.setItem("lastPath", path);
  };

  const classes = useStyles();
  const onClick = (path: string) => {
    setSelected(path);
    setLastPath(path);
    handleDrawerClose();
  };
  return (
    <SwipeableDrawer
      anchor={"left"}
      open={isOpen}
      onClose={handleDrawerClose}
      onOpen={handleDrawerOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box>
        <List>
          {menuItems.map((item, index) => (
            <ListItemButton
              onClick={() => onClick(item.path)}
              selected={selected === item.path}
              key={index}
              component={Link}
              to={item.path}
            >
              <ListItemText className={classes.root}>{item.label}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Box>
      <Box marginTop={"auto"} marginBottom={3}>
        <Divider />
        <Box
          padding={2}
          flexDirection="column"
          display="flex"
          justifyContent="start"
        >
          <Typography variant="caption" color="text.secondary">
            <LinkBtn
              sx={{ textDecoration: "none" }}
              target="_blank"
              href="https://github.com/maxhsu-da/wallet-refapp"
            >
              App ReadMe
            </LinkBtn>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            <LinkBtn
              sx={{ textDecoration: "none" }}
              target="_blank"
              href="https://github.com/maxhsu-da/wallet-refapp"
            >
              Github
            </LinkBtn>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            <LinkBtn
              sx={{ textDecoration: "none" }}
              target="_blank"
              href="https://github.com/maxhsu-da/wallet-refapp/issues"
            >
              Feature Requests
            </LinkBtn>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            <LinkBtn
              sx={{ textDecoration: "none" }}
              href="https://docs.daml.com/getting-started/installation.html"
              target="_blank"
            >
              Download Daml
            </LinkBtn>
          </Typography>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};
