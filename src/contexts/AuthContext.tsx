import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiClient, clearStoredAccessToken, getStoredAccessToken, setStoredAccessToken, setUnauthorizedHandler } from "../api";

export type AuthUser = {
  id: string;
  username: string;
  email?: string;
  imageKey?: string;
};

type LoginPayload = {
  username: string;
  password: string;
};

type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const payloadString = atob(padded);
    return JSON.parse(payloadString) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function getTokenSubject(token: string): string | null {
  const payload = decodeJwtPayload(token);
  if (!payload) return null;

  const subject = payload.sub;
  return typeof subject === "string" && subject.trim() ? subject.trim() : null;
}

function isTokenExpired(token: string): boolean {
  const payload = decodeJwtPayload(token);
  if (!payload) return true;

  const exp = payload.exp;
  if (typeof exp !== "number") return true;

  return exp * 1000 <= Date.now();
}

function clearLocalSession(setAccessToken: (token: string | null) => void, setUser: (user: AuthUser | null) => void): void {
  clearStoredAccessToken();
  setAccessToken(null);
  setUser(null);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(getStoredAccessToken());
  const [isInitializing, setIsInitializing] = useState(true);

  const hydrateUserFromToken = useCallback(async (token: string): Promise<AuthUser | null> => {
    const username = getTokenSubject(token);
    if (!username) return null;

    const profile = await apiClient.user.getByUsername(username);
    return {
      id: profile.id,
      username: profile.username,
      email: profile.email,
      imageKey: profile.imagekey,
    };
  }, []);

  const applyTokenAndUser = useCallback(async (token: string): Promise<void> => {
    setStoredAccessToken(token);
    setAccessToken(token);
    const hydratedUser = await hydrateUserFromToken(token);
    setUser(hydratedUser);
  }, [hydrateUserFromToken]);

  const refreshSession = useCallback(async (): Promise<boolean> => {
    try {
      const refreshedToken = await apiClient.auth.refreshToken();
      if (!refreshedToken) {
        clearLocalSession(setAccessToken, setUser);
        return false;
      }

      await applyTokenAndUser(refreshedToken);
      return true;
    } catch {
      clearLocalSession(setAccessToken, setUser);
      return false;
    }
  }, [applyTokenAndUser]);

  const login = useCallback(async (payload: LoginPayload): Promise<void> => {
    const token = await apiClient.auth.login(payload);
    await applyTokenAndUser(token);
  }, [applyTokenAndUser]);

  const register = useCallback(async (payload: RegisterPayload): Promise<void> => {
    const token = await apiClient.auth.register(payload);
    await applyTokenAndUser(token);
  }, [applyTokenAndUser]);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await apiClient.auth.logout();
    } catch {
      // Ignore logout API errors and always clear local session.
    }

    clearLocalSession(setAccessToken, setUser);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const bootstrapSession = async () => {
      const storedToken = getStoredAccessToken();

      if (!storedToken) {
        if (isMounted) {
          clearLocalSession(setAccessToken, setUser);
          setIsInitializing(false);
        }
        return;
      }

      if (isTokenExpired(storedToken)) {
        const refreshed = await refreshSession();
        if (!isMounted) return;

        if (!refreshed) {
          clearLocalSession(setAccessToken, setUser);
        }

        setIsInitializing(false);
        return;
      }

      try {
        const hydratedUser = await hydrateUserFromToken(storedToken);
        if (!isMounted) return;

        setAccessToken(storedToken);
        setUser(hydratedUser);
      } catch {
        if (!isMounted) return;
        const refreshed = await refreshSession();
        if (!refreshed) {
          clearLocalSession(setAccessToken, setUser);
        }
      } finally {
        if (isMounted) {
          setIsInitializing(false);
        }
      }
    };

    void bootstrapSession();

    return () => {
      isMounted = false;
    };
  }, [hydrateUserFromToken, refreshSession]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== "datachef_access_token") return;

      const token = getStoredAccessToken();
      setAccessToken(token);
      if (!token) {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      clearLocalSession(setAccessToken, setUser);
    });

    return () => {
      setUnauthorizedHandler(null);
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    accessToken,
    isAuthenticated: Boolean(accessToken && user),
    isInitializing,
    login,
    register,
    logout,
    refreshSession,
  }), [user, accessToken, isInitializing, login, register, logout, refreshSession]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
