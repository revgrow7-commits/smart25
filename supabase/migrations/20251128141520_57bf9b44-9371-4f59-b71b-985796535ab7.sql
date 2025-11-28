-- Remove políticas existentes e cria novas políticas públicas para o MVP

-- Products table
DROP POLICY IF EXISTS "Only admins can insert products" ON products;
DROP POLICY IF EXISTS "Only admins can update products" ON products;
DROP POLICY IF EXISTS "Only admins can delete products" ON products;

CREATE POLICY "Anyone can insert products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update products" ON products FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete products" ON products FOR DELETE USING (true);

-- Categories table
DROP POLICY IF EXISTS "Only admins can insert categories" ON categories;
DROP POLICY IF EXISTS "Only admins can update categories" ON categories;
DROP POLICY IF EXISTS "Only admins can delete categories" ON categories;

CREATE POLICY "Anyone can insert categories" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update categories" ON categories FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete categories" ON categories FOR DELETE USING (true);

-- Product images table
DROP POLICY IF EXISTS "Only admins can insert product images" ON product_images;
DROP POLICY IF EXISTS "Only admins can update product images" ON product_images;
DROP POLICY IF EXISTS "Only admins can delete product images" ON product_images;

CREATE POLICY "Anyone can insert product images" ON product_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update product images" ON product_images FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete product images" ON product_images FOR DELETE USING (true);

-- Hero images table
DROP POLICY IF EXISTS "Only admins can insert hero images" ON hero_images;
DROP POLICY IF EXISTS "Only admins can update hero images" ON hero_images;
DROP POLICY IF EXISTS "Only admins can delete hero images" ON hero_images;

CREATE POLICY "Anyone can insert hero images" ON hero_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update hero images" ON hero_images FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete hero images" ON hero_images FOR DELETE USING (true);