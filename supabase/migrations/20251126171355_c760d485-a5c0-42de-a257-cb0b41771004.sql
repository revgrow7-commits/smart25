-- Criar bucket para imagens de produtos
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Política para permitir qualquer um fazer upload (admin público)
CREATE POLICY "Qualquer um pode fazer upload de imagens"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'product-images');

-- Política para permitir visualização de imagens
CREATE POLICY "Imagens de produtos são públicas"
ON storage.objects
FOR SELECT
USING (bucket_id = 'product-images');

-- Política para permitir deletar imagens
CREATE POLICY "Qualquer um pode deletar imagens de produtos"
ON storage.objects
FOR DELETE
USING (bucket_id = 'product-images');

-- Política para permitir atualizar imagens
CREATE POLICY "Qualquer um pode atualizar imagens de produtos"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'product-images');