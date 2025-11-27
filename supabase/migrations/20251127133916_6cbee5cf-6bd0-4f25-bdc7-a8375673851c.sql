-- Add product_group column to products table
ALTER TABLE public.products 
ADD COLUMN product_group text;

-- Create index for better query performance
CREATE INDEX idx_products_group ON public.products(product_group);

COMMENT ON COLUMN public.products.product_group IS 'Grupo do produto dentro da família (categoria)';