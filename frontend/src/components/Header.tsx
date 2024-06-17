import { AppBar, Toolbar } from '@mui/material';

import Logo from './shared/Logo';
import Navigation from './shared/Navigation';

import { useAuth } from '../context/useAuth';

import '../css/components/Header.css';
import { NAVIGATION } from '../constants/navigation';
import { BUTTONS } from '../constants/buttons';

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
                to={NAVIGATION.CHAT}
                text={BUTTONS.CHAT}
                className='header-btn-light'
              />
              <Navigation
                to={NAVIGATION.HOME}
                text={BUTTONS.LOGOUT}
                className='header-btn-dark'
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <Navigation
                to={NAVIGATION.LOGIN}
                text={BUTTONS.LOGIN}
                className='header-btn-light'
              />
              <Navigation
                to={NAVIGATION.SIGNUP}
                text={BUTTONS.SIGNUP}
                className='header-btn-dark'
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
