-- Remove a política SELECT da tabela user_roles
-- Todas as verificações de roles são feitas via função has_role() que é SECURITY DEFINER
-- Usuários não precisam consultar diretamente a tabela
DROP POLICY IF EXISTS "Users can only view their own roles" ON public.user_roles;