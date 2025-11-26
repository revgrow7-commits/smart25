-- Remove distributor_price column from products table
ALTER TABLE public.products DROP COLUMN IF EXISTS distributor_price;