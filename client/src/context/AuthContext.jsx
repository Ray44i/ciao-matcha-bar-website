import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem("ciao_token"));
  const [user, setUser] = useState(() => {
    const raw = sessionStorage.getItem("ciao_user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (token) sessionStorage.setItem("ciao_token", token);
    else sessionStorage.removeItem("ciao_token");
  }, [token]);

  useEffect(() => {
    if (user) sessionStorage.setItem("ciao_user", JSON.stringify(user));
    else sessionStorage.removeItem("ciao_user");
  }, [user]);

  async function login(email, password) {
    const data = await api.post("/auth/login", { email, password });
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }

  async function register(name, email, password) {
    const data = await api.post("/auth/register", { name, email, password });
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }

  function logout() {
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
