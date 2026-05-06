import { ApiError } from "./httpClient";
import type { LoginRequest, RegisterRequest } from "./modules/authApi";

const MOCK_USERS_KEY = "datachef_mock_users";

type MockUser = {
  id: string;
  username: string;
  email: string;
  password: string;
};

const seedUser: MockUser = {
  id: "mock-user-1",
  username: "demo",
  email: "demo@datachef.local",
  password: "Demo123!",
};

function hasWindow(): boolean {
  return typeof window !== "undefined";
}

function loadUsers(): MockUser[] {
  if (!hasWindow()) return [seedUser];

  const raw = window.localStorage.getItem(MOCK_USERS_KEY);
  if (!raw) {
    window.localStorage.setItem(MOCK_USERS_KEY, JSON.stringify([seedUser]));
    return [seedUser];
  }

  try {
    const parsed = JSON.parse(raw) as MockUser[];
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    window.localStorage.setItem(MOCK_USERS_KEY, JSON.stringify([seedUser]));
    return [seedUser];
  } catch {
    window.localStorage.setItem(MOCK_USERS_KEY, JSON.stringify([seedUser]));
    return [seedUser];
  }
}

function saveUsers(users: MockUser[]): void {
  if (!hasWindow()) return;
  window.localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function createMockToken(user: MockUser): string {
  const payload = `${user.id}:${Date.now()}`;
  return `mock.${btoa(payload)}.token`;
}

export function resetMockUsers(): void {
  saveUsers([seedUser]);
}

export function mockLogin(payload: LoginRequest): string {
  const users = loadUsers();
  const identifier = normalize(payload.username);

  const matched = users.find(
    (user) => normalize(user.username) === identifier || normalize(user.email) === identifier,
  );

  if (!matched || matched.password !== payload.password) {
    throw new ApiError("Bad credentials", 401, { message: "Bad credentials" });
  }

  return createMockToken(matched);
}

export function mockRegister(payload: RegisterRequest): string {
  const users = loadUsers();
  const username = normalize(payload.username);
  const email = normalize(payload.email);

  const alreadyExists = users.some(
    (user) => normalize(user.username) === username || normalize(user.email) === email,
  );

  if (alreadyExists) {
    throw new ApiError("Email or username already in use", 400, {
      message: "Email or username already in use",
    });
  }

  const newUser: MockUser = {
    id: `mock-user-${users.length + 1}`,
    username: payload.username.trim(),
    email: payload.email.trim(),
    password: payload.password,
  };

  const nextUsers = [...users, newUser];
  saveUsers(nextUsers);

  return createMockToken(newUser);
}
