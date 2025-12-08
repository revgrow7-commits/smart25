-- Fix training_leads RLS policy to require admin authentication
DROP POLICY IF EXISTS "Admins can view training leads" ON training_leads;

CREATE POLICY "Admins can view training leads" ON training_leads
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'));