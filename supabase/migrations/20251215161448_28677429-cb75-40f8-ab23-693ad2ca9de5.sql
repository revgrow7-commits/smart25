-- Atualizar políticas para categories (MVP - acesso público)
DROP POLICY IF EXISTS "Admins can insert categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can update categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can delete categories" ON public.categories;

CREATE POLICY "Anyone can insert categories" 
ON public.categories 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update categories" 
ON public.categories 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete categories" 
ON public.categories 
FOR DELETE 
USING (true);

-- Atualizar políticas para hero_images (MVP - acesso público)
DROP POLICY IF EXISTS "Admins can insert hero images" ON public.hero_images;
DROP POLICY IF EXISTS "Admins can update hero images" ON public.hero_images;
DROP POLICY IF EXISTS "Admins can delete hero images" ON public.hero_images;

CREATE POLICY "Anyone can insert hero images" 
ON public.hero_images 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update hero images" 
ON public.hero_images 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete hero images" 
ON public.hero_images 
FOR DELETE 
USING (true);

-- Atualizar políticas para products (MVP - acesso público para UPDATE e DELETE)
DROP POLICY IF EXISTS "Admins can update products" ON public.products;
DROP POLICY IF EXISTS "Admins can delete products" ON public.products;

CREATE POLICY "Anyone can update products" 
ON public.products 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete products" 
ON public.products 
FOR DELETE 
USING (true);

-- Atualizar políticas para blog_posts (MVP - acesso público)
DROP POLICY IF EXISTS "Admins can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can delete blog posts" ON public.blog_posts;

CREATE POLICY "Anyone can insert blog posts" 
ON public.blog_posts 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update blog posts" 
ON public.blog_posts 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete blog posts" 
ON public.blog_posts 
FOR DELETE 
USING (true);

-- Atualizar políticas para blog_categories (MVP - acesso público)
DROP POLICY IF EXISTS "Admins can insert blog categories" ON public.blog_categories;
DROP POLICY IF EXISTS "Admins can update blog categories" ON public.blog_categories;
DROP POLICY IF EXISTS "Admins can delete blog categories" ON public.blog_categories;

CREATE POLICY "Anyone can insert blog categories" 
ON public.blog_categories 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update blog categories" 
ON public.blog_categories 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete blog categories" 
ON public.blog_categories 
FOR DELETE 
USING (true);