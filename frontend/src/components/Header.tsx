import { AppBar, Toolbar } from '@mui/material';

import Logo from './shared/Logo';
import Navigation from './shared/Navigation';

import { useAuth } from '../context/useAuth';
import { NAVIGATION, BUTTON } from '../constants/constants';

import '../css/components/Header.css';

/**
 * Header component that displays the application's logo and navigation links.
 * The navigation links are dynamically rendered based on the user's authentication status.
 */
function Header() {
  const auth = useAuth();

  /**
   * Navigation buttons for authenticated users. Provides options for navigating to the chat page
   * and logging out, each styled according to their function.
   */
  const authenticatedUserButtons = (
    <>
      <Navigation to={NAVIGATION.CHAT} text={BUTTON.CHAT} className='header-btn-light' />
      <Navigation
        to={NAVIGATION.HOME}
        text={BUTTON.LOGOUT}
        className='header-btn-dark'
        onClick={auth!.logout}
      />
    </>
  );

  /**
   * Navigation buttons for guest users. Provides options for logging in or signing up,
   * each styled to encourage user actions appropriate for newcomers.
   */
  const guestUserButtons = (
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
  );

  /**
   * Main content of the Header component including the logo and navigation links.
   * The displayed links depend on the authentication status of the user.
   */
  const headerContent = (
    <AppBar className='appBar'>
      <Toolbar className='toolbar'>
        <Logo />
        <div>{auth?.isLoggedIn ? authenticatedUserButtons : guestUserButtons}</div>
      </Toolbar>
    </AppBar>
  );

  return headerContent;
}

export default Header;
