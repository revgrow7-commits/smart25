-- Drop existing restrictive INSERT policy
DROP POLICY IF EXISTS "Admins can insert products" ON public.products;

-- Create permissive INSERT policy for all authenticated users (MVP testing)
CREATE POLICY "Authenticated users can insert products" 
ON public.products 
FOR INSERT 
WITH CHECK (true);