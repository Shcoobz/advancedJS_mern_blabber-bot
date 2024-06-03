import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { loginUser } from '../helpers/api-communicator';

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

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // fetch if users cookies are valid, skip login
  }, []);

  async function login(email: string, password: string) {
    const data = await loginUser(email, password);

    if (data) {
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }
  }

  async function signup(name: string, email: string, password: string) {}

  async function logout() {}

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
