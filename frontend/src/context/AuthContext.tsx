import { ReactNode, createContext, useEffect, useState } from 'react';

import { ERROR } from '../constants/constants';
import {
  checkAuthStatus,
  fetchUserData,
  loginUser,
  logoutUser,
  signupUser,
} from '../helpers/api-communicator';

/**
 * Type representing a user in the application.
 */
type User = {
  name: string;
  email: string;
};

/**
 * Type representing the user authentication context.
 */
type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;

  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

/**
 * Context for user authentication.
 */
export const AuthContext = createContext<UserAuth | null>(null);

/**
 * AuthProvider component that provides authentication context to its children.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkStatus();
  }, []);

  /**
   * Checks the authentication status of the user.
   * If authenticated, fetches user data and updates state.
   * Otherwise, resets the user state.
   */
  async function checkStatus() {
    const isAuthenticated = await checkAuthStatus();

    if (isAuthenticated) {
      try {
        const userData = await fetchUserData();
        setUser({ email: userData.email, name: userData.name });
        setIsLoggedIn(true);
      } catch (error) {
        console.error(ERROR.USER.FETCH_DATA, error);
        setUser(null);
        setIsLoggedIn(false);
      }
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }

  /**
   * Logs in the user with the provided email and password.
   * Updates state upon successful login.
   */
  async function login(email: string, password: string) {
    try {
      const data = await loginUser(email, password);

      if (data) {
        setUser({ email: data.email, name: data.name });
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(ERROR.USER.LOGIN, error);
    }
  }

  /**
   * Signs up a new user with the provided name, email, and password.
   * Updates state upon successful signup.
   */
  async function signup(name: string, email: string, password: string) {
    try {
      const data = await signupUser(name, email, password);

      if (data) {
        setUser({ email: data.email, name: data.name });
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(ERROR.USER.SIGNUP, error);
    }
  }

  /**
   * Logs out the current user.
   * Updates state and reloads the window upon successful logout.
   */
  async function logout() {
    await logoutUser();
    setIsLoggedIn(false);
    setUser(null);

    window.location.reload();
  }

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
