import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

export const useAdminAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAdminRole = async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        console.error("Error checking admin role:", error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error("Exception checking admin role:", error);
      return false;
    }
  };

  useEffect(() => {
    let mounted = true;
    let checking = false;

    const checkAuth = async () => {
      if (checking) return;
      checking = true;

      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          if (mounted) {
            setLoading(false);
            navigate("/auth");
          }
          return;
        }

        if (!session) {
          if (mounted) {
            setLoading(false);
            navigate("/auth");
          }
          return;
        }

        if (mounted) {
          setUser(session.user);
        }

        const hasAdminRole = await checkAdminRole(session.user.id);

        if (!hasAdminRole) {
          if (mounted) {
            toast.error("Acesso negado. Você não tem permissão de administrador.");
            setLoading(false);
            navigate("/access-denied");
          }
          return;
        }

        if (mounted) {
          setIsAdmin(true);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error in checkAuth:", error);
        if (mounted) {
          setLoading(false);
          navigate("/auth");
        }
      } finally {
        checking = false;
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;

        if (event === "SIGNED_OUT" || !session) {
          setUser(null);
          setIsAdmin(false);
          navigate("/auth");
        } else if (event === "SIGNED_IN" && session) {
          setUser(session.user);
          checkAuth();
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsAdmin(false);
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Erro ao fazer logout");
    }
  };

  return { user, isAdmin, loading, signOut };
};