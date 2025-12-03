import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, Clock, User, ArrowLeft, Share2, 
  Box, Monitor, Lightbulb, Store, TrendingUp, FileText, Scale,
  ChevronRight, BookOpen
} from "lucide-react";
import { Helmet } from "react-helmet";

const iconMap: { [key: string]: any } = {
  Box, Monitor, Lightbulb, Store, Calendar, TrendingUp, FileText, Scale
};

const BlogPost = () => {
  const { slug } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          blog_categories (name, slug, icon)
        `)
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    }
  });

  const { data: relatedPosts } = useQuery({
    queryKey: ['related-posts', post?.category_id],
    queryFn: async () => {
      if (!post?.category_id) return [];
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`*, blog_categories (name, slug, icon)`)
        .eq('category_id', post.category_id)
        .eq('is_published', true)
        .neq('id', post.id)
        .limit(3);
      if (error) throw error;
      return data;
    },
    enabled: !!post?.category_id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-8 bg-muted rounded w-3/4 mb-4" />
            <div className="h-4 bg-muted rounded w-1/2 mb-8" />
            <div className="h-64 bg-muted rounded mb-8" />
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Artigo não encontrado</h1>
          <p className="text-muted-foreground mb-8">O artigo que você procura não existe ou foi removido.</p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const category = post.blog_categories as any;
  const IconComponent = iconMap[category?.icon || 'FileText'] || FileText;

  return (
    <>
      <Helmet>
        <title>{post.meta_title || post.title} | Blog Smart Signage</title>
        <meta name="description" content={post.meta_description || post.excerpt || ''} />
        {post.keywords && <meta name="keywords" content={post.keywords.join(', ')} />}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || ''} />
        {post.featured_image && <meta property="og:image" content={post.featured_image} />}
        <link rel="canonical" href={`${window.location.origin}/blog/${post.slug}`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Breadcrumb */}
        <div className="pt-24 pb-4 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
              </nav>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Voltar ao Blog
              </Link>
            </div>
          </div>
        </div>
        
        {/* Header */}
        <header className="pb-8 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {category && (
                <Badge className="mb-4 flex items-center gap-1.5 w-fit bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                  <IconComponent className="w-3.5 h-3.5" />
                  {category.name}
                </Badge>
              )}
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  {post.author || 'Smart Signage'}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  {post.published_at ? new Date(post.published_at).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  }) : '-'}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  {post.reading_time} min de leitura
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="container mx-auto px-4 mb-8">
            <div className="max-w-4xl mx-auto">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img 
                  src={post.featured_image} 
                  alt={post.title}
                  className="w-full h-64 md:h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <article className="py-8 md:py-12 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Article Content with Custom Styling */}
              <div 
                className="blog-article-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Keywords Tags */}
              {post.keywords && post.keywords.length > 0 && (
                <div className="mt-10 pt-6 border-t border-border/50">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-muted-foreground mr-2">Tags:</span>
                    {post.keywords.map((keyword: string, index: number) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="bg-muted/50 hover:bg-muted transition-colors"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="mt-8 pt-8 border-t border-border/50">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Gostou do conteúdo? Compartilhe!</span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-primary/30 hover:bg-primary/10 hover:border-primary"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({ title: post.title, url: window.location.href });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                        }
                      }}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Compartilhar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="py-12 md:py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-1 h-8 bg-primary rounded-full" />
                  Artigos Relacionados
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => {
                    const relatedCategory = relatedPost.blog_categories as any;
                    return (
                      <Card key={relatedPost.id} className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
                        <Link to={`/blog/${relatedPost.slug}`}>
                          {relatedPost.featured_image && (
                            <div className="overflow-hidden">
                              <img 
                                src={relatedPost.featured_image} 
                                alt={relatedPost.title}
                                className="w-full h-36 object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                          )}
                          <CardContent className="p-4">
                            {relatedCategory && (
                              <Badge variant="secondary" className="text-xs mb-2">
                                {relatedCategory.name}
                              </Badge>
                            )}
                            <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {relatedPost.reading_time} min
                            </p>
                          </CardContent>
                        </Link>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-12 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Precisa de stands modulares para seu evento?</h3>
              <p className="text-muted-foreground mb-6">
                Conheça nosso catálogo completo de soluções em comunicação visual
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/catalogo">
                  <Button size="lg" className="w-full sm:w-auto">
                    Ver Catálogo
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/#contato">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Fale Conosco
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <HomeFooter />
      </div>

      {/* Custom Blog Article Styles */}
      <style>{`
        .blog-article-content {
          font-size: 1.125rem;
          line-height: 1.8;
          color: hsl(var(--foreground));
        }
        
        .blog-article-content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: hsl(var(--foreground));
          border-left: 4px solid hsl(var(--primary));
          padding-left: 1rem;
        }
        
        .blog-article-content h3 {
          font-size: 1.375rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          color: hsl(var(--foreground));
        }
        
        .blog-article-content h4 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          color: hsl(var(--primary));
        }
        
        .blog-article-content p {
          margin-bottom: 1.25rem;
          color: hsl(var(--muted-foreground));
        }
        
        .blog-article-content strong {
          color: hsl(var(--foreground));
          font-weight: 600;
        }
        
        .blog-article-content ul,
        .blog-article-content ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }
        
        .blog-article-content ul {
          list-style-type: none;
        }
        
        .blog-article-content ul li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
          color: hsl(var(--muted-foreground));
        }
        
        .blog-article-content ul li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.65rem;
          width: 8px;
          height: 8px;
          background: hsl(var(--primary));
          border-radius: 50%;
        }
        
        .blog-article-content ol {
          list-style-type: decimal;
        }
        
        .blog-article-content ol li {
          margin-bottom: 0.75rem;
          color: hsl(var(--muted-foreground));
        }
        
        .blog-article-content ol li::marker {
          color: hsl(var(--primary));
          font-weight: 600;
        }
        
        .blog-article-content a {
          color: hsl(var(--primary));
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: opacity 0.2s;
        }
        
        .blog-article-content a:hover {
          opacity: 0.8;
        }
        
        .blog-article-content blockquote {
          border-left: 4px solid hsl(var(--primary));
          background: hsl(var(--muted) / 0.5);
          padding: 1.25rem 1.5rem;
          margin: 1.5rem 0;
          border-radius: 0 0.5rem 0.5rem 0;
          font-style: italic;
        }
        
        .blog-article-content blockquote p {
          margin-bottom: 0;
        }
        
        .blog-article-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          font-size: 0.95rem;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }
        
        .blog-article-content thead {
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
        }
        
        .blog-article-content th {
          padding: 1rem;
          text-align: left;
          font-weight: 600;
        }
        
        .blog-article-content tbody tr {
          border-bottom: 1px solid hsl(var(--border));
          transition: background 0.2s;
        }
        
        .blog-article-content tbody tr:hover {
          background: hsl(var(--muted) / 0.5);
        }
        
        .blog-article-content tbody tr:last-child {
          border-bottom: none;
        }
        
        .blog-article-content td {
          padding: 0.875rem 1rem;
          color: hsl(var(--muted-foreground));
        }
        
        .blog-article-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 1.5rem 0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        .blog-article-content hr {
          border: none;
          border-top: 2px solid hsl(var(--border));
          margin: 2.5rem 0;
        }
        
        .blog-article-content code {
          background: hsl(var(--muted));
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
        }
        
        .blog-article-content pre {
          background: hsl(var(--muted));
          padding: 1.5rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        
        .blog-article-content pre code {
          background: none;
          padding: 0;
        }
        
        /* FAQ Styling */
        .blog-article-content h2:has(+ p strong),
        .blog-article-content h3:has(+ p strong) {
          margin-top: 3rem;
        }
        
        @media (max-width: 768px) {
          .blog-article-content {
            font-size: 1rem;
          }
          
          .blog-article-content h2 {
            font-size: 1.5rem;
          }
          
          .blog-article-content h3 {
            font-size: 1.25rem;
          }
          
          .blog-article-content table {
            font-size: 0.85rem;
          }
          
          .blog-article-content th,
          .blog-article-content td {
            padding: 0.625rem 0.75rem;
          }
        }
      `}</style>
    </>
  );
};

export default BlogPost;
