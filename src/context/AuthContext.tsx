import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Children,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };
    checkToken();
  }, []);

  const login = async (token: string) => {
    await AsyncStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
