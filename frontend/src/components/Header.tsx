import { AppBar, Toolbar } from '@mui/material';

import Logo from './shared/Logo';
import Navigation from './shared/Navigation';

import { useAuth } from '../context/useAuth';

import '../css/components/Header.css';
import { NAVIGATION, BUTTON } from '../constants/constants';

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
                text={BUTTON.CHAT}
                className='header-btn-light'
              />
              <Navigation
                to={NAVIGATION.HOME}
                text={BUTTON.LOGOUT}
                className='header-btn-dark'
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <Navigation
                to={NAVIGATION.LOGIN}
                text={BUTTON.LOGIN}
                className='header-btn-light'
              />
              <Navigation
                to={NAVIGATION.SIGNUP}
                text={BUTTON.SIGNUP}
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
