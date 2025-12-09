-- Garantir que RLS está habilitado na tabela training_leads
ALTER TABLE training_leads ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes para recriar corretamente
DROP POLICY IF EXISTS "Anyone can insert training leads" ON training_leads;
DROP POLICY IF EXISTS "Admins can view training leads" ON training_leads;

-- Política para permitir inserção pública (formulário de leads)
CREATE POLICY "Anyone can insert training leads" ON training_leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Política para permitir apenas admins autenticados visualizarem os leads
CREATE POLICY "Admins can view training leads" ON training_leads
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));