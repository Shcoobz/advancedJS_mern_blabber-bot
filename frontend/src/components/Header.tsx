import { AppBar, Toolbar } from '@mui/material';

import Logo from './shared/Logo';

function Header() {
  return (
    <AppBar sx={{ bgcolor: 'transparent', position: 'static', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex' }}>
        <Logo />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
