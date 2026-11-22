import { createContext, useContext, useEffect, useState } from "react";
import {
  getSession,
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
} from "../api/auth";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getSession()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);
  const login = async (...args) => {
    const { data } = await apiLogin(...args);
    setUser(data);
    return data;
  };
  const register = async (payload) => {
    const { data } = await apiRegister(payload);
    setUser(data);
  };
  const logout = async () => {
    await apiLogout();
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
