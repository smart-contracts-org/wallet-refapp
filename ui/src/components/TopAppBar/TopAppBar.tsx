import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Avatar, Box, Card, CardContent, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { isMobile } from '../../platform/platform';
import { SvgIcon } from '../SvgIcon/SvgIcon';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const demoPartyId = 'DEMO-ledger-party-03568cfb-dc57-4c54-90d6-7db79f0e3dc2'
interface TopAppBarProps {
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  isOpen: boolean;
  onLogout?: () => void;
  party?: string;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ party, onLogout, isOpen, handleDrawerOpen, handleDrawerClose }) => {
  
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogoutClick = () => {
    handleCloseUserMenu();
    onLogout && onLogout()
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {!isMobile() && <SvgIcon />}
        {party && isMobile() && <IconButton
          onClick={isOpen ? handleDrawerClose : handleDrawerOpen}
        >
          {isOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>}
        {isMobile() && <SvgIcon />}
        <Typography variant="h6" noWrap component="div">
          Wallet RefApp
      </Typography>
        {party && (<Box sx={{ flexGrow: 0, marginLeft: 'auto' }}>
          <Tooltip title="Open settings" >
            <IconButton size='small' onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar sx={{ marginLeft: 'auto' }} alt="profile" />
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
                  {party || demoPartyId}
                </Typography>
                <IconButton size='small'>
                  <ContentCopyIcon />
                </IconButton>
              </CardContent>
            </Card>
            <MenuItem key={'Logout'} onClick={onLogout && onLogoutClick}>
              <Typography textAlign="center">{'Logout'}</Typography>
            </MenuItem>
          </Menu>
        </Box>
        )}
      </Toolbar>
    </AppBar >
  );
}
