import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Box, Button, Card, CardActionArea, CardContent, Chip, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { isMobile } from '../../platform/platform';
import { SvgIcon } from '../SvgIcon/SvgIcon';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';

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
  const [isCopied, setCopy] = React.useState(false);
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
    navigator.clipboard.writeText(party).then(() => setCopy(true)).then(() => setTimeout(() => { setCopy(false) }, 2000))

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
              <Chip icon={<AccountCircleIcon />} onClick={handleOpenUserMenu} label={party.length < 10 ? party + demoPartyId : party}
                sx={{ maxWidth: '230px' }} deleteIcon={<AccountCircleIcon />} />
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
            elevation={20}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <Card sx={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant='caption'>
                  Ledger ID:
                </Typography>
                <Card  variant='outlined'  sx={{ mb: 1, mt: 1, borderRadius: 1 }}>
                  <CardActionArea onClick={copy} sx={{ padding: 1 }}>
                    <Typography variant='caption' color='primary'>
                      {party.length < 10 ? party + demoPartyId : party}
                    </Typography>
                    <IconButton size='small' >
                      {isCopied ?<CheckIcon /> : <ContentCopyIcon  />}
                    </IconButton>
                  </CardActionArea>
                </Card>
                <Card variant='outlined' sx={{ padding: 1 }}>
                <Box display='flex' flexDirection='row' alignItems='center'mb={1}>
                  <InfoIcon sx={{marginRight:1}} color='primary'/> 
                  <Typography variant='caption'><i>Whats the ledger ID used for ?</i></Typography>
                  </Box>
                  <Typography color='text.primary' variant='caption' sx={{alignItems: 'center'}}>
                  
                   You unique ledgerID is associated with this wallet. It is required to receive transfers / swaps / asset holding invites, or any other activity that requires your unique Ledger ID as a counter party.
                  </Typography>
                </Card >

              </CardContent>
            </Card>
            <MenuItem sx={{ display: 'flex', alignItems: 'center' }} key={'Logout'} onClick={onLogout && onLogoutClick}>
              <Button color='error' fullWidth variant='outlined'>{'Logout'}</Button>
            </MenuItem>
          </Menu>
        </Box>
        )}
      </Toolbar>
    </AppBar >
  );
}