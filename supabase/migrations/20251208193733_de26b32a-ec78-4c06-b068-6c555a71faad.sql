-- Update RLS policies for products table to require admin authentication
DROP POLICY IF EXISTS "Anyone can insert products" ON products;
DROP POLICY IF EXISTS "Anyone can update products" ON products;
DROP POLICY IF EXISTS "Anyone can delete products" ON products;

CREATE POLICY "Admins can insert products" ON products
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update products" ON products
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete products" ON products
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Update RLS policies for categories table
DROP POLICY IF EXISTS "Anyone can insert categories" ON categories;
DROP POLICY IF EXISTS "Anyone can update categories" ON categories;
DROP POLICY IF EXISTS "Anyone can delete categories" ON categories;

CREATE POLICY "Admins can insert categories" ON categories
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update categories" ON categories
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete categories" ON categories
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Update RLS policies for product_images table
DROP POLICY IF EXISTS "Anyone can insert product images" ON product_images;
DROP POLICY IF EXISTS "Anyone can update product images" ON product_images;
DROP POLICY IF EXISTS "Anyone can delete product images" ON product_images;

CREATE POLICY "Admins can insert product images" ON product_images
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update product images" ON product_images
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete product images" ON product_images
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Update RLS policies for hero_images table
DROP POLICY IF EXISTS "Anyone can insert hero images" ON hero_images;
DROP POLICY IF EXISTS "Anyone can update hero images" ON hero_images;
DROP POLICY IF EXISTS "Anyone can delete hero images" ON hero_images;

CREATE POLICY "Admins can insert hero images" ON hero_images
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update hero images" ON hero_images
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete hero images" ON hero_images
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Update RLS policies for blog_posts table
DROP POLICY IF EXISTS "Anyone can insert blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can update blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can delete blog posts" ON blog_posts;

CREATE POLICY "Admins can insert blog posts" ON blog_posts
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blog posts" ON blog_posts
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blog posts" ON blog_posts
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Update RLS policies for blog_categories table
DROP POLICY IF EXISTS "Anyone can insert blog categories" ON blog_categories;
DROP POLICY IF EXISTS "Anyone can update blog categories" ON blog_categories;
DROP POLICY IF EXISTS "Anyone can delete blog categories" ON blog_categories;

CREATE POLICY "Admins can insert blog categories" ON blog_categories
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blog categories" ON blog_categories
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blog categories" ON blog_categories
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'));