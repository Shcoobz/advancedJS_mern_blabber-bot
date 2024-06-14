import { AppBar, Toolbar } from '@mui/material';

import Logo from './shared/Logo';
import Navigation from './shared/Navigation';

import { useAuth } from '../context/useAuth';

import '../css/components/Header.css';

function Header() {
  const auth = useAuth();
  return (
    <AppBar className='appBar'>
      <Toolbar className='toolbar'>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <Navigation
                to='/chat'
                text='Go to Chat'
                bgColor='bg-blue'
                textColorClass='text-black'
              />
              <Navigation
                to='/'
                text='Logout'
                bgColor='bg-dark'
                textColorClass='text-white'
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <Navigation
                to='/login'
                text='Login'
                bgColor='bg-blue'
                textColorClass='text-black'
              />
              <Navigation
                to='/signup'
                text='Signup'
                bgColor='bg-dark'
                textColorClass='text-white'
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
