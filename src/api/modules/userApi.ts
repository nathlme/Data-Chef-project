import type { HttpClient } from "../httpClient";

export type ProfileDTO = {
  id: string;
  username: string;
  email?: string;
  imagekey?: string;
};

export type UserApi = {
  getByUsername: (username: string) => Promise<ProfileDTO>;
  search: (query: string) => Promise<ProfileDTO[]>;
  updateProfile: (formData: FormData) => Promise<ProfileDTO>;
  deleteProfile: (id: string) => Promise<void>;
};

export function createUserApi(http: HttpClient): UserApi {
  return {
    getByUsername: (username) => http.get<ProfileDTO>(`/api/user/${encodeURIComponent(username)}`, undefined, { authenticated: true }),
    search: (query) =>
      http.get<ProfileDTO[]>("/api/user/search", {
        query,
      }, {
        authenticated: true,
      }),
    updateProfile: (formData) =>
      http.patch<ProfileDTO>("/api/user/update", formData, {
        authenticated: true,
      }),
    deleteProfile: (id) =>
      http.delete<void>(`/api/user/${id}`, {
        authenticated: true,
      }),
  };
}
