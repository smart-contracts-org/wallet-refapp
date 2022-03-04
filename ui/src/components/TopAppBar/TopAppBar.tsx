import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton } from '@mui/material';
import { isMobile } from '../../platform/platform';
import { SvgIcon } from '../SvgIcon/SvgIcon';

interface TopAppBarProps {
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  isOpen: boolean;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ isOpen, handleDrawerOpen, handleDrawerClose }) => {
  // const [auth, setAuth] = React.useState<boolean>(true);
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAuth(event.target.checked);
  // };

  // const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const [checked, setChecked] = React.useState(true);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked);
  // };

  // const location = useLocation();
  // const navigate = useNavigate();
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {!isMobile() && <SvgIcon/>}
        {isMobile() && <IconButton
          onClick={isOpen ? handleDrawerClose : handleDrawerOpen}
        >
          {isOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>}
        {isMobile() && <SvgIcon/>}
        <Typography variant="h6" noWrap component="div">
          Wallet RefApp
      </Typography>
      </Toolbar>
    </AppBar>
  );
}
