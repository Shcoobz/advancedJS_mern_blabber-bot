import { useContext } from 'react';
import { AuthContext } from './AuthContext';

/**
 * Custom hook to access the authentication context.
 */
export function useAuth() {
  /**
   * Retrieves the authentication context value using React's useContext hook.
   */
  const authContext = useContext(AuthContext);

  return authContext;
}
