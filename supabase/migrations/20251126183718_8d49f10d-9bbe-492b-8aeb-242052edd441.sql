-- Update RLS policies to only allow admin modifications

-- Drop existing permissive policies for products
DROP POLICY IF EXISTS "Qualquer um pode atualizar produtos" ON public.products;
DROP POLICY IF EXISTS "Qualquer um pode deletar produtos" ON public.products;
DROP POLICY IF EXISTS "Qualquer um pode inserir produtos" ON public.products;

-- Create admin-only policies for products
CREATE POLICY "Only admins can insert products"
ON public.products
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update products"
ON public.products
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete products"
ON public.products
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Drop existing permissive policies for categories
DROP POLICY IF EXISTS "Qualquer um pode atualizar categorias" ON public.categories;
DROP POLICY IF EXISTS "Qualquer um pode deletar categorias" ON public.categories;
DROP POLICY IF EXISTS "Qualquer um pode inserir categorias" ON public.categories;

-- Create admin-only policies for categories
CREATE POLICY "Only admins can insert categories"
ON public.categories
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update categories"
ON public.categories
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete categories"
ON public.categories
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Drop existing permissive policies for product_images
DROP POLICY IF EXISTS "Qualquer um pode atualizar imagens" ON public.product_images;
DROP POLICY IF EXISTS "Qualquer um pode deletar imagens" ON public.product_images;
DROP POLICY IF EXISTS "Qualquer um pode inserir imagens" ON public.product_images;

-- Create admin-only policies for product_images
CREATE POLICY "Only admins can insert product images"
ON public.product_images
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update product images"
ON public.product_images
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete product images"
ON public.product_images
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));