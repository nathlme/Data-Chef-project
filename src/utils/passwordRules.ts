export function validatePassword(password: string, username?: string): string | null {
  if (!password.trim()) {
    return "Le mot de passe est requis.";
  }

  if (password.length < 8 || password.length > 20) {
    return "Le mot de passe doit contenir entre 8 et 20 caracteres.";
  }

  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    return "Le mot de passe doit contenir au moins une minuscule et une majuscule.";
  }

  if (!/\d/.test(password)) {
    return "Le mot de passe doit contenir au moins un chiffre.";
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return "Le mot de passe doit contenir au moins un caractere special (!@#$%^&*).";
  }

  if (/\s/.test(password)) {
    return "Le mot de passe ne doit pas contenir d'espaces.";
  }

  if (/(.)\1\1/.test(password)) {
    return "Le mot de passe ne doit pas contenir trois caracteres identiques consecutifs.";
  }

  if (username && username.trim() && password.toLowerCase().includes(username.trim().toLowerCase())) {
    return "Le mot de passe ne doit pas contenir le nom d'utilisateur.";
  }

  return null;
}
