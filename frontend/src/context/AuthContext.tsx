import { ReactNode, createContext, useEffect, useState } from 'react';
import {
  checkAuthStatus,
  fetchUserData,
  loginUser,
  logoutUser,
  signupUser,
} from '../helpers/api-communicator';

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;

  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // async function checkStatus() {
    //   const data = await checkAuthStatus();

    //   if (data) {
    //     setUser({ email: data.email, name: data.name });
    //     setIsLoggedIn(true);
    //   }
    // }

    // checkStatus();

    async function checkStatus() {
      const isAuthenticated = await checkAuthStatus();

      if (isAuthenticated) {
        const userData = await fetchUserData();
        setUser({ email: userData.email, name: userData.name });
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    }

    checkStatus();
  }, []);

  async function login(email: string, password: string) {
    const data = await loginUser(email, password);

    if (data) {
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }
  }

  async function signup(name: string, email: string, password: string) {
    const data = await signupUser(name, email, password);

    if (data) {
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }
  }

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
