import { ReactNode, createContext, useEffect, useState } from 'react';
import {
  checkAuthStatus,
  fetchUserData,
  loginUser,
  logoutUser,
  signupUser,
} from '../helpers/api-communicator';
import { ERROR } from '../constants/constants';

/**
 * Type representing a user in the application.
 * @typedef {Object} User
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user.
 */
type User = {
  name: string;
  email: string;
};

/**
 * Type representing the user authentication context.
 * @typedef {Object} UserAuth
 * @property {boolean} isLoggedIn - Indicates whether the user is logged in.
 * @property {User | null} user - The authenticated user or null if not authenticated.
 * @property {Function} login - Function to log in a user.
 * @property {Function} signup - Function to sign up a new user.
 * @property {Function} logout - Function to log out the user.
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
 * @type {React.Context<UserAuth | null>}
 */
export const AuthContext = createContext<UserAuth | null>(null);

/**
 * AuthProvider component that provides authentication context to its children.
 * @param {Object} props - The props for the AuthProvider component.
 * @param {ReactNode} props.children - The child components that will consume the authentication context.
 * @returns {JSX.Element} The AuthContext.Provider with authentication value.
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
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
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
   * @param {string} name - The name of the new user.
   * @param {string} email - The email of the new user.
   * @param {string} password - The password of the new user.
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
