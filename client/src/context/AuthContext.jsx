import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        return;
      }

      const response = await api.get("/auth/me");
      setUser(response.data.data);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const token = response.data.data.token;
    const user = response.data.data.user;

    localStorage.setItem("token", token);
    setUser(user);

    return response.data;
  };

  const register = async (name, email, password, confirmPassword) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
      confirmPassword,
    });

    const token = response.data.data.token;
    const user = response.data.data.user;

    localStorage.setItem("token", token);
    setUser(user);

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, checkingAuth, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};