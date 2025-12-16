
-- Drop existing permissive policies for products
DROP POLICY IF EXISTS "Authenticated users can insert products" ON public.products;
DROP POLICY IF EXISTS "Anyone can update products" ON public.products;
DROP POLICY IF EXISTS "Anyone can delete products" ON public.products;

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
DROP POLICY IF EXISTS "Anyone can insert categories" ON public.categories;
DROP POLICY IF EXISTS "Anyone can update categories" ON public.categories;
DROP POLICY IF EXISTS "Anyone can delete categories" ON public.categories;

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
DROP POLICY IF EXISTS "Anyone can insert product images" ON public.product_images;
DROP POLICY IF EXISTS "Anyone can update product images" ON public.product_images;
DROP POLICY IF EXISTS "Anyone can delete product images" ON public.product_images;

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

-- Drop existing permissive policies for hero_images
DROP POLICY IF EXISTS "Anyone can insert hero images" ON public.hero_images;
DROP POLICY IF EXISTS "Anyone can update hero images" ON public.hero_images;
DROP POLICY IF EXISTS "Anyone can delete hero images" ON public.hero_images;

-- Create admin-only policies for hero_images
CREATE POLICY "Only admins can insert hero images" 
ON public.hero_images 
FOR INSERT 
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update hero images" 
ON public.hero_images 
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete hero images" 
ON public.hero_images 
FOR DELETE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Drop existing permissive policies for blog_posts
DROP POLICY IF EXISTS "Anyone can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can delete blog posts" ON public.blog_posts;

-- Create admin-only policies for blog_posts
CREATE POLICY "Only admins can insert blog posts" 
ON public.blog_posts 
FOR INSERT 
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update blog posts" 
ON public.blog_posts 
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete blog posts" 
ON public.blog_posts 
FOR DELETE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Drop existing permissive policies for blog_categories
DROP POLICY IF EXISTS "Anyone can insert blog categories" ON public.blog_categories;
DROP POLICY IF EXISTS "Anyone can update blog categories" ON public.blog_categories;
DROP POLICY IF EXISTS "Anyone can delete blog categories" ON public.blog_categories;

-- Create admin-only policies for blog_categories
CREATE POLICY "Only admins can insert blog categories" 
ON public.blog_categories 
FOR INSERT 
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update blog categories" 
ON public.blog_categories 
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete blog categories" 
ON public.blog_categories 
FOR DELETE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
