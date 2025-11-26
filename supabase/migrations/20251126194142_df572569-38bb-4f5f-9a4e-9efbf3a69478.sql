-- Adicionar colunas para vídeo e modelos 3D na tabela products
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS video_url text,
ADD COLUMN IF NOT EXISTS model_3d_url text;

COMMENT ON COLUMN public.products.video_url IS 'URL do vídeo de demonstração do produto';
COMMENT ON COLUMN public.products.model_3d_url IS 'URL do modelo 3D para visualização de stands';