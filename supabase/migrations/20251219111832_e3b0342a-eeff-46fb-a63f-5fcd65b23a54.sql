-- Drop existing SELECT policy
DROP POLICY IF EXISTS "Users can view own roles and admins can view all" ON public.user_roles;

-- Create new restrictive SELECT policy
-- Users can ONLY view their own roles - no exceptions
-- This prevents enumeration of admin users
CREATE POLICY "Users can only view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);