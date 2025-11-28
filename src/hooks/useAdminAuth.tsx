import { useState } from "react";
import { User } from "@supabase/supabase-js";

// Hook simplificado para MVP - sem autenticação
export const useAdminAuth = () => {
  const [user] = useState<User | null>(null);
  const [isAdmin] = useState(true); // Sempre permite acesso para MVP
  const [loading] = useState(false); // Sem loading necessário

  const signOut = async () => {
    // Função vazia para manter compatibilidade
  };

  return { user, isAdmin, loading, signOut };
};