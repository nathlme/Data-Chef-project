export type ApiQueryValue = string | number | boolean | null | undefined;
export type ApiQueryParams = Record<string, ApiQueryValue | ApiQueryValue[]>;

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export type RequestBody = BodyInit | Record<string, unknown> | undefined;

export type HttpRequestOptions = {
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  path: string;
  query?: ApiQueryParams;
  body?: RequestBody;
  headers?: HeadersInit;
  authenticated?: boolean;
};

export type HttpClientConfig = {
  baseUrl: string;
  withCredentials?: boolean;
  defaultHeaders?: HeadersInit;
  getAccessToken?: () => string | null;
  onUnauthorized?: () => void;
};

function serializeQuery(query?: ApiQueryParams): string {
  if (!query) return "";

  const searchParams = new URLSearchParams();

  for (const [key, rawValue] of Object.entries(query)) {
    if (rawValue == null) continue;

    if (Array.isArray(rawValue)) {
      for (const value of rawValue) {
        if (value == null) continue;
        searchParams.append(key, String(value));
      }
      continue;
    }

    searchParams.append(key, String(rawValue));
  }

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

function normalizeBaseUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function isBodyInit(value: unknown): value is BodyInit {
  return (
    value instanceof FormData ||
    value instanceof URLSearchParams ||
    value instanceof Blob ||
    value instanceof ArrayBuffer ||
    value instanceof ReadableStream ||
    typeof value === "string"
  );
}

export class HttpClient {
  private readonly config: HttpClientConfig;

  constructor(config: HttpClientConfig) {
    this.config = {
      ...config,
      baseUrl: normalizeBaseUrl(config.baseUrl),
      withCredentials: config.withCredentials ?? true,
    };
  }

  async request<T>(options: HttpRequestOptions): Promise<T> {
    const url = `${this.config.baseUrl}${options.path}${serializeQuery(options.query)}`;

    const headers = new Headers(this.config.defaultHeaders);
    if (options.headers) {
      const customHeaders = new Headers(options.headers);
      customHeaders.forEach((value, key) => headers.set(key, value));
    }

    if (options.authenticated && this.config.getAccessToken) {
      const token = this.config.getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    let body: BodyInit | undefined;
    if (options.body !== undefined) {
      if (isBodyInit(options.body)) {
        body = options.body;
      } else {
        headers.set("Content-Type", "application/json");
        body = JSON.stringify(options.body);
      }
    }

    const response = await fetch(url, {
      method: options.method,
      headers,
      body,
      credentials: this.config.withCredentials ? "include" : "same-origin",
    });

    const contentType = response.headers.get("content-type") ?? "";
    const isJsonResponse = contentType.includes("application/json");

    let responseBody: unknown = null;
    if (response.status !== 204) {
      responseBody = isJsonResponse ? await response.json() : await response.text();
    }

    if (!response.ok) {
      if (response.status === 401 && this.config.onUnauthorized) {
        this.config.onUnauthorized();
      }
      throw new ApiError(`HTTP ${response.status}`, response.status, responseBody);
    }

    return responseBody as T;
  }

  get<T>(path: string, query?: ApiQueryParams, options?: Omit<HttpRequestOptions, "method" | "path" | "query">): Promise<T> {
    return this.request<T>({ method: "GET", path, query, ...options });
  }

  post<T>(path: string, body?: RequestBody, options?: Omit<HttpRequestOptions, "method" | "path" | "body">): Promise<T> {
    return this.request<T>({ method: "POST", path, body, ...options });
  }

  patch<T>(path: string, body?: RequestBody, options?: Omit<HttpRequestOptions, "method" | "path" | "body">): Promise<T> {
    return this.request<T>({ method: "PATCH", path, body, ...options });
  }

  put<T>(path: string, body?: RequestBody, options?: Omit<HttpRequestOptions, "method" | "path" | "body">): Promise<T> {
    return this.request<T>({ method: "PUT", path, body, ...options });
  }

  delete<T>(path: string, options?: Omit<HttpRequestOptions, "method" | "path">): Promise<T> {
    return this.request<T>({ method: "DELETE", path, ...options });
  }
}
