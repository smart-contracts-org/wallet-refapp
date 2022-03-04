import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Avatar, Box, Button, Card, CardContent, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { isMobile } from '../../platform/platform';
import { SvgIcon } from '../SvgIcon/SvgIcon';
import { Link } from "react-router-dom";
import { useParty } from '@daml/react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
interface TopAppBarProps {
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  isOpen: boolean;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ isOpen, handleDrawerOpen, handleDrawerClose }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const party = useParty();

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {!isMobile() && <SvgIcon />}
        {isMobile() && <IconButton
          onClick={isOpen ? handleDrawerClose : handleDrawerOpen}
        >
          {isOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>}
        {isMobile() && <SvgIcon />}
        <Typography variant="h6" noWrap component="div">
          Wallet RefApp
      </Typography>
        {party ? (<Box sx={{ flexGrow: 0, marginLeft: 'auto' }}>
          <Tooltip title="Open settings" >
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar sx={{ marginLeft: 'auto' }} alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <Card sx={{ width: '300px' }}>
              <CardContent>
                <Typography variant='caption'>
                  Party ID:
                </Typography>
                <Typography variant='caption'>
                  {party || 'ledger-party-03568cfb-dc57-4c54-90d6-7db79f0e3dc2'}
                </Typography>
                <IconButton size='small'>
                  <ContentCopyIcon />
                </IconButton>
              </CardContent>
            </Card>
            <MenuItem key={'Logout'} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{'Logout'}</Typography>
            </MenuItem>
          </Menu>
        </Box>
        ) : (<Button component={Link} to='/login' size='small' sx={{ marginLeft: 'auto' }} variant='outlined'>Login</Button>)}
      </Toolbar>
    </AppBar >
  );
}
