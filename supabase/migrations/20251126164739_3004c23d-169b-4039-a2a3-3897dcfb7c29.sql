-- Criar tabela de categorias
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de produtos
CREATE TABLE IF NOT EXISTS public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  item_code TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  frame_size TEXT,
  graphic_size TEXT,
  pcs_per_ctn INTEGER,
  gross_weight TEXT,
  packing_size TEXT,
  price DECIMAL(10, 2),
  distributor_price DECIMAL(10, 2),
  specifications JSONB DEFAULT '{}'::jsonb,
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'draft')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de imagens de produtos
CREATE TABLE IF NOT EXISTS public.product_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_item_code ON public.products(item_code);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_product_images_product ON public.product_images(product_id);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para leitura pública
CREATE POLICY "Categorias são visíveis para todos"
  ON public.categories FOR SELECT
  USING (true);

CREATE POLICY "Produtos ativos são visíveis para todos"
  ON public.products FOR SELECT
  USING (status = 'active' OR status = 'draft');

CREATE POLICY "Imagens de produtos são visíveis para todos"
  ON public.product_images FOR SELECT
  USING (true);

-- Políticas RLS para escrita pública (CMS sem autenticação)
CREATE POLICY "Qualquer um pode inserir categorias"
  ON public.categories FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Qualquer um pode atualizar categorias"
  ON public.categories FOR UPDATE
  USING (true);

CREATE POLICY "Qualquer um pode deletar categorias"
  ON public.categories FOR DELETE
  USING (true);

CREATE POLICY "Qualquer um pode inserir produtos"
  ON public.products FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Qualquer um pode atualizar produtos"
  ON public.products FOR UPDATE
  USING (true);

CREATE POLICY "Qualquer um pode deletar produtos"
  ON public.products FOR DELETE
  USING (true);

CREATE POLICY "Qualquer um pode inserir imagens"
  ON public.product_images FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Qualquer um pode atualizar imagens"
  ON public.product_images FOR UPDATE
  USING (true);

CREATE POLICY "Qualquer um pode deletar imagens"
  ON public.product_images FOR DELETE
  USING (true);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir categorias iniciais baseadas na planilha
INSERT INTO public.categories (name, slug, description) VALUES
  ('EZ Tube Straight Wall', 'ez-tube-straight-wall', 'Paredes retas modulares EZ Tube'),
  ('EZ Tube Curved Wall', 'ez-tube-curved-wall', 'Paredes curvas modulares EZ Tube'),
  ('40mm SEG Banner Stand', '40mm-seg-banner-stand', 'Banner stands SEG de 40mm'),
  ('43mm EZ Tube Lightbox', '43mm-ez-tube-lightbox', 'Lightbox EZ Tube de 43mm'),
  ('56mm EZ Tube Lightbox', '56mm-ez-tube-lightbox', 'Lightbox EZ Tube de 56mm'),
  ('80mm SEG Lightbox', '80mm-seg-lightbox', 'Lightbox SEG de 80mm'),
  ('25mm Economic Banner Stands', '25mm-economic-banner-stands', 'Banner stands econômicos de 25mm'),
  ('Tube Banner Stands', 'tube-banner-stands', 'Banner stands com base de tubo'),
  ('EZ Tube S-shaped Wall', 'ez-tube-s-shaped-wall', 'Paredes em formato S EZ Tube')
ON CONFLICT (slug) DO NOTHING;