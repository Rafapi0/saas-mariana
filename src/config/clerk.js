import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  console.error("Chave pública do Clerk não encontrada. Verifique se a variável VITE_CLERK_PUBLISHABLE_KEY está definida no arquivo .env");
}

export const clerkProvider = ClerkProvider;
export const clerkPublishableKey = PUBLISHABLE_KEY; 