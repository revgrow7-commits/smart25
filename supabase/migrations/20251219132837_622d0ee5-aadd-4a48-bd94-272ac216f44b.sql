-- Adiciona política para usuários verem suas próprias roles
-- Isso é útil se o app precisar mostrar ao usuário sua role na UI
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);