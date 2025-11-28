-- Criar bucket para modelos 3D
INSERT INTO storage.buckets (id, name, public)
VALUES ('3d-models', '3d-models', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies para o bucket de modelos 3D
CREATE POLICY "Modelos 3D são públicos para visualização"
ON storage.objects FOR SELECT
USING (bucket_id = '3d-models');

CREATE POLICY "Admins podem fazer upload de modelos 3D"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = '3d-models');

CREATE POLICY "Admins podem atualizar modelos 3D"
ON storage.objects FOR UPDATE
USING (bucket_id = '3d-models');

CREATE POLICY "Admins podem deletar modelos 3D"
ON storage.objects FOR DELETE
USING (bucket_id = '3d-models');