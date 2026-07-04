import { createContext, useContext, useMemo, useState } from "react";

export const AuthContext = createContext();

const AUTH_TOKEN_KEY = "aiwedding_token";
const AUTH_USER_KEY = "aiwedding_user";

const getStoredValue = (key) => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(key);
};

const parseUser = (value) => {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredValue(AUTH_TOKEN_KEY));
  const [user, setUser] = useState(() => parseUser(getStoredValue(AUTH_USER_KEY)));

  const login = ({ token: nextToken, user: nextUser }) => {
    if (typeof window !== "undefined") {
      if (nextToken) {
        window.localStorage.setItem(AUTH_TOKEN_KEY, nextToken);
      }

      if (nextUser) {
        window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser));
      }
    }

    setToken(nextToken ?? null);
    setUser(nextUser ?? null);
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(AUTH_TOKEN_KEY);
      window.localStorage.removeItem(AUTH_USER_KEY);
    }

    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
      setUser,
      setToken,
    }),
    [token, user],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}