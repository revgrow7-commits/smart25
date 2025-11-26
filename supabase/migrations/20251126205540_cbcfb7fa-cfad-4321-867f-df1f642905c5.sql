-- Create storage bucket for hero images
INSERT INTO storage.buckets (id, name, public)
VALUES ('hero-images', 'hero-images', true);

-- Create hero_images table
CREATE TABLE public.hero_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hero_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies for hero_images table
CREATE POLICY "Hero images are viewable by everyone"
ON public.hero_images
FOR SELECT
USING (is_active = true);

CREATE POLICY "Only admins can insert hero images"
ON public.hero_images
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update hero images"
ON public.hero_images
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete hero images"
ON public.hero_images
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Storage policies for hero-images bucket
CREATE POLICY "Hero images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'hero-images');

CREATE POLICY "Admins can upload hero images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'hero-images' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update hero images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'hero-images' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete hero images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'hero-images' AND has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_hero_images_updated_at
BEFORE UPDATE ON public.hero_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();