-- Create blog categories table
CREATE TABLE public.blog_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  category_id UUID REFERENCES public.blog_categories(id),
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT[],
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  views_count INTEGER DEFAULT 0,
  reading_time INTEGER DEFAULT 5,
  author TEXT DEFAULT 'Smart Signage',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read access for blog
CREATE POLICY "Blog categories are publicly readable" 
ON public.blog_categories FOR SELECT USING (true);

CREATE POLICY "Blog posts are publicly readable" 
ON public.blog_posts FOR SELECT USING (is_published = true);

-- Admin write access (for MVP without auth)
CREATE POLICY "Anyone can insert blog categories" 
ON public.blog_categories FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update blog categories" 
ON public.blog_categories FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete blog categories" 
ON public.blog_categories FOR DELETE USING (true);

CREATE POLICY "Anyone can insert blog posts" 
ON public.blog_posts FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update blog posts" 
ON public.blog_posts FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete blog posts" 
ON public.blog_posts FOR DELETE USING (true);

-- Insert default categories
INSERT INTO public.blog_categories (name, slug, description, icon, display_order) VALUES
('Stands Modulares', 'stands-modulares', 'Tudo sobre stands modulares para feiras e eventos', 'Box', 1),
('Comunicação Visual e Smart Signage', 'comunicacao-visual', 'Soluções inteligentes em sinalização', 'Monitor', 2),
('Lightboxes & Tensionados', 'lightboxes-tensionados', 'Estruturas tensionadas e painéis iluminados', 'Lightbulb', 3),
('Varejo & Visual Merchandising', 'varejo-visual-merchandising', 'PDV, franquias e experiência de compra', 'Store', 4),
('Feiras & Eventos', 'feiras-eventos', 'Estratégias para feiras e eventos corporativos', 'Calendar', 5),
('Tendências e Inovações', 'tendencias-inovacoes', 'Novidades do mercado de comunicação visual', 'TrendingUp', 6),
('Guia Técnico', 'guia-tecnico', 'Conteúdo técnico para arquitetos e agências', 'FileText', 7),
('Comparativos e Soluções', 'comparativos-solucoes', 'Análises comparativas e soluções práticas', 'Scale', 8);

-- Create trigger for updated_at
CREATE TRIGGER update_blog_categories_updated_at
BEFORE UPDATE ON public.blog_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();