-- Remover a política INSERT restritiva existente para product_images
DROP POLICY IF EXISTS "Admins can insert product images" ON public.product_images;

-- Criar uma política INSERT permissiva para todos os usuários (teste MVP)
CREATE POLICY "Anyone can insert product images" 
ON public.product_images 
FOR INSERT 
WITH CHECK (true);

-- Atualizar também as políticas DELETE e UPDATE para product_images
DROP POLICY IF EXISTS "Admins can delete product images" ON public.product_images;

DROP POLICY IF EXISTS "Admins can update product images" ON public.product_images;

CREATE POLICY "Anyone can delete product images" 
ON public.product_images 
FOR DELETE 
USING (true);

CREATE POLICY "Anyone can update product images" 
ON public.product_images 
FOR UPDATE 
USING (true);