import { AppBar, Toolbar } from '@mui/material';

import Logo from './shared/Logo';
import Navigation from './shared/Navigation';

import { useAuth } from '../context/AuthContext';

function Header() {
  const auth = useAuth();
  return (
    <AppBar sx={{ bgcolor: 'transparent', position: 'static', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex' }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <Navigation bg='#00fffc' to='/chat' text='Go to Chat' textColor='black' />
              <Navigation
                bg='#51538f'
                to='/'
                text='Logout'
                textColor='white'
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <Navigation bg='#00fffc' to='/login' text='Login' textColor='black' />
              <Navigation bg='#51538f' to='/signup' text='Signup' textColor='white' />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
