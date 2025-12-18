-- Drop existing SELECT policy
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- Create improved SELECT policy that allows:
-- 1. Users to view their own roles
-- 2. Admins to view all roles
CREATE POLICY "Users can view own roles and admins can view all"
ON public.user_roles
FOR SELECT
USING (
  auth.uid() = user_id 
  OR public.has_role(auth.uid(), 'admin'::app_role)
);