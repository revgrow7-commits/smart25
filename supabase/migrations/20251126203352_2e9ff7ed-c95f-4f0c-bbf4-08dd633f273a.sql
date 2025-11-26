-- Fix storage bucket security by restricting write operations to admins only

-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Qualquer um pode fazer upload de imagens" ON storage.objects;
DROP POLICY IF EXISTS "Qualquer um pode atualizar imagens de produtos" ON storage.objects;
DROP POLICY IF EXISTS "Qualquer um pode deletar imagens de produtos" ON storage.objects;

-- Create admin-only policies for write operations
CREATE POLICY "Only admins can upload product images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Only admins can update product images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'product-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Only admins can delete product images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'product-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Keep the public SELECT policy (already exists as "Imagens de produtos são públicas")
-- No changes needed for read access