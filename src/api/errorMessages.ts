import { ApiError } from "./httpClient";

export type ApiErrorContext = "default" | "login" | "signup";

type MessageLike = {
  message?: unknown;
  error?: unknown;
};

function extractText(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  if (value && typeof value === "object") {
    const record = value as MessageLike;
    if (typeof record.message === "string" && record.message.trim()) {
      return record.message.trim();
    }
    if (typeof record.error === "string" && record.error.trim()) {
      return record.error.trim();
    }
  }

  return null;
}

function isDuplicateIdentityMessage(message: string): boolean {
  const normalized = message.toLowerCase();
  return (
    normalized.includes("already") ||
    normalized.includes("exists") ||
    normalized.includes("duplicate") ||
    normalized.includes("email") ||
    normalized.includes("username")
  );
}

function isPasswordFormatMessage(message: string): boolean {
  const normalized = message.toLowerCase();
  return (
    normalized.includes("password") ||
    normalized.includes("mot de passe") ||
    normalized.includes("format") ||
    normalized.includes("regex") ||
    normalized.includes("min") ||
    normalized.includes("length") ||
    normalized.includes("8")
  );
}

export function getApiErrorMessage(error: unknown, fallbackMessage: string, context: ApiErrorContext = "default"): string {
  if (error instanceof ApiError) {
    const bodyMessage = extractText(error.body);

    if (context === "signup") {
      if (bodyMessage && isPasswordFormatMessage(bodyMessage)) {
        return "Le format du mot de passe est invalide.";
      }

      switch (error.status) {
        case 409:
          return "Ce nom d'utilisateur ou cet email est deja utilise.";
        case 400:
          if (bodyMessage && isDuplicateIdentityMessage(bodyMessage)) {
            return "Ce nom d'utilisateur ou cet email est deja utilise.";
          }
          return "Les informations d'inscription ne sont pas valides.";
        case 422:
          return "Les informations saisies ne sont pas valides.";
      }
    }

    if (context === "login") {
      switch (error.status) {
        case 400:
        case 401:
          return "Identifiants incorrects, verifie ton nom d'utilisateur/email et ton mot de passe.";
      }
    }

    switch (error.status) {
      case 400:
        return "Requete invalide. Verifie les champs du formulaire.";
      case 401:
        return "Identifiants incorrects, verifie ton nom d'utilisateur/email et ton mot de passe.";
      case 403:
        return "Acces refuse.";
      case 404:
        return "Ressource introuvable.";
      case 409:
        return "Conflit avec des donnees deja existantes.";
    }

    if (bodyMessage) {
      return bodyMessage;
    }

    return fallbackMessage;
  }

  return fallbackMessage;
}