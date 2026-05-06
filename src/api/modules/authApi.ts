import type { HttpClient } from "../httpClient";
import { mockLogin, mockRegister } from "../localAuthMock";

export type LoginRequest = {
  username: string;
  password: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export type ChangePasswordRequest = {
  userId: string;
  oldPassword: string;
  newPassword: string;
};

export type AuthApi = {
  login: (payload: LoginRequest) => Promise<string>;
  register: (payload: RegisterRequest) => Promise<string>;
  refreshToken: () => Promise<string>;
  logout: () => Promise<string>;
  logoutFromAll: () => Promise<string>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  changePassword: (payload: ChangePasswordRequest) => Promise<void>;
};

export type AuthApiOptions = {
  useLocalAuthMock?: boolean;
};

export function createAuthApi(http: HttpClient, options?: AuthApiOptions): AuthApi {
  return {
    login: (payload) =>
      options?.useLocalAuthMock
        ? Promise.resolve(mockLogin(payload))
        : http.post<string>("/api/auth/login", payload),
    register: (payload) =>
      options?.useLocalAuthMock
        ? Promise.resolve(mockRegister(payload))
        : http.post<string>("/api/auth/register", payload),
    refreshToken: () => http.post<string>("/api/auth/refresh"),
    logout: () => http.post<string>("/api/auth/logout"),
    logoutFromAll: () => http.post<string>("/api/auth/logout/all", undefined, { authenticated: true }),
    forgotPassword: (email) =>
      http.post<void>("/api/password/forgot", undefined, {
        query: { email },
      }),
    resetPassword: (token, newPassword) =>
      http.post<void>("/api/password/reset", undefined, {
        query: { token, newPassword },
      }),
    changePassword: (payload) =>
      http.post<void>("/api/password/change", payload, {
        authenticated: true,
      }),
  };
}
