-- Remover políticas RLS existentes
DROP POLICY IF EXISTS "Anyone can insert training leads" ON public.training_leads;
DROP POLICY IF EXISTS "Admins can view training leads" ON public.training_leads;

-- Excluir a tabela training_leads
DROP TABLE IF EXISTS public.training_leads;