import { useContext } from 'react';
import { AuthContext } from './AuthContext';

/**
 * Custom hook to access the authentication context.
 * Utilizes React's useContext to provide the current authentication state and functions.
 *
 * @returns {UserAuth | null} The current authentication context value, which includes
 *                            the user object, authentication status, and authentication functions.
 */
export function useAuth() {
  /**
   * Retrieves the authentication context value using React's useContext hook.
   */
  const authContext = useContext(AuthContext);

  return authContext;
}
