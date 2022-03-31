import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import {  Box, Card, CardContent, Chip, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { isMobile } from '../../platform/platform';
import { SvgIcon } from '../SvgIcon/SvgIcon';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
export const demoPartyId = 'DEMO-ledger-party-03568cfb-dc57-4c54-90d6-7db79f0e3dc2'
interface TopAppBarProps {
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  isOpen: boolean;
  onLogout?: () => void;
  party?: string;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ party, onLogout, isOpen, handleDrawerOpen, handleDrawerClose }) => {
  console.log('top rendered')
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
  const copy = () => {
    if (!party) {
      return;
    }
    navigator.clipboard.writeText(party);

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
        {!isMobile() && <Typography variant="h6" noWrap component="div">
          Wallet RefApp
      </Typography>}
        {party && (<Box sx={{ flexGrow: 0, marginLeft: 'auto' }}>
          <Tooltip title="Open settings"  >
            <>
              <Chip icon={<AccountCircleIcon />} onClick={handleOpenUserMenu} label={party.length < 10 ? party + demoPartyId : party}
                sx={{ maxWidth: '230px' }} deleteIcon={<AccountCircleIcon />} />
              <IconButton size='small' onClick={handleOpenUserMenu}>
                <KeyboardArrowDownIcon />
              </IconButton>
            </>
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
            <Card sx={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant='caption'>
                  Ledger ID:
                </Typography>
                <Box display='flex' flexDirection='row' sx={{ paddingBottom: 1 }}>
                  <Typography variant='caption' color='primary'>
                    {party.length < 10 ? party + demoPartyId : party}
                  </Typography>
                  <IconButton size='small' onClick={copy}>
                    <ContentCopyIcon sx={{ marginLeft: 1 }} />
                  </IconButton>
                </Box>
                <Card variant='outlined' sx={{ padding: 1 }}>
                  <Typography color='text.secondary' variant='caption'>
                    Your unique ledgerID is associated with this wallet. It is required to receive transfers / swaps / asset holding invites, or any other activity that requires your unique Ledger ID as a counter party.
                  </Typography>
                </Card >

              </CardContent>
            </Card>
            <MenuItem key={'Logout'} onClick={onLogout && onLogoutClick}>
              <Typography color='error' textAlign="center">{'Logout'}</Typography>
            </MenuItem>
          </Menu>
        </Box>
        )}
      </Toolbar>
    </AppBar >
  );
}
