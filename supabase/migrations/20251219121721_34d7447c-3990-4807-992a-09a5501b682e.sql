-- Adiciona política SELECT explícita para a tabela user_roles
-- Apenas administradores podem visualizar atribuições de roles
-- Usuários regulares usam a função has_role() para verificações
CREATE POLICY "Only admins can view user roles"
ON public.user_roles
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));