import { HttpClient, type HttpClientConfig } from "./httpClient";
import { createAuthApi } from "./modules/authApi";
import { createRecipesApi } from "./modules/recipesApi";
import { createUserApi } from "./modules/userApi";
export { resetMockUsers } from "./localAuthMock";

export const ACCESS_TOKEN_KEY = "datachef_access_token";

let unauthorizedHandler: (() => void) | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null): void {
  unauthorizedHandler = handler;
}

export function getStoredAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setStoredAccessToken(token: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function clearStoredAccessToken(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export type ApiClient = ReturnType<typeof createApiClient>;

export function createApiClient(config?: Partial<HttpClientConfig>) {
  const baseUrl =
    config?.baseUrl ??
    (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
    "http://localhost:8080";

  const http = new HttpClient({
    baseUrl,
    withCredentials: config?.withCredentials ?? true,
    defaultHeaders: config?.defaultHeaders,
    getAccessToken: config?.getAccessToken ?? getStoredAccessToken,
    onUnauthorized: config?.onUnauthorized ?? (() => unauthorizedHandler?.()),
  });

  const localAuthMockEnv = import.meta.env.VITE_ENABLE_LOCAL_AUTH_MOCK as string | undefined;
  const useLocalAuthMock =
    localAuthMockEnv !== undefined
      ? localAuthMockEnv === "true"
      : false;

  return {
    http,
    auth: createAuthApi(http, { useLocalAuthMock }),
    recipes: createRecipesApi(http),
    user: createUserApi(http),
  };
}

export const apiClient = createApiClient();

export * from "./httpClient";
export * from "./modules/authApi";
export * from "./modules/recipesApi";
export * from "./modules/userApi";
