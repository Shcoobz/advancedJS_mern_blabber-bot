import { Routes } from 'react-router-dom';

import { useAuth } from './context/useAuth';
import { ROUTE } from './constants/constants';

import Header from './components/Header';

/**
 * The main App component that handles the routing and layout of the application.
 * It uses the `useAuth` hook to determine the authentication state of the user
 * and conditionally renders the chat route for authenticated users.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
function App() {
  const auth = useAuth();

  /**
   * Conditionally include the chat route if the user is authenticated.
   * @type {JSX.Element | null}
   */
  const authenticatedChatRoute = auth?.isLoggedIn && auth.user ? ROUTE.CHAT : null;

  /**
   * Routes component containing all the defined routes.
   * @type {JSX.Element}
   */
  const routes = (
    <Routes>
      {ROUTE.HOME}
      {ROUTE.LOGIN}
      {ROUTE.SIGNUP}
      {ROUTE.ERROR}
      {authenticatedChatRoute}
    </Routes>
  );

  /**
   * Main content of the application including the header and routes.
   * @type {JSX.Element}
   */
  const mainContent = (
    <main>
      <Header />
      {routes}
    </main>
  );

  return mainContent;
}

export default App;
