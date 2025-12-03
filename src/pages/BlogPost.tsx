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
  Box, Monitor, Lightbulb, Store, TrendingUp, FileText, Scale
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
        
        {/* Header */}
        <header className="pt-24 pb-8 bg-gradient-to-b from-[#0a0a2e] to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Voltar ao Blog
              </Link>
              
              {category && (
                <Badge className="mb-4 flex items-center gap-1 w-fit">
                  <IconComponent className="w-3 h-3" />
                  {category.name}
                </Badge>
              )}
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.published_at ? new Date(post.published_at).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  }) : '-'}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.reading_time} min de leitura
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="container mx-auto px-4 -mt-4">
            <div className="max-w-4xl mx-auto">
              <img 
                src={post.featured_image} 
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div 
                className="prose prose-lg max-w-none dark:prose-invert
                  prose-headings:text-foreground prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-li:text-muted-foreground
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground
                  prose-table:border prose-table:border-border
                  prose-th:bg-muted prose-th:p-3
                  prose-td:p-3 prose-td:border prose-td:border-border"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Compartilhe este artigo:</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => {
                      navigator.share?.({ title: post.title, url: window.location.href });
                    }}>
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
          <section className="py-12 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Artigos Relacionados</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost.id} className="group overflow-hidden">
                      <Link to={`/blog/${relatedPost.slug}`}>
                        {relatedPost.featured_image && (
                          <img 
                            src={relatedPost.featured_image} 
                            alt={relatedPost.title}
                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                          />
                        )}
                        <CardContent className="p-4">
                          <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h3>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <HomeFooter />
      </div>
    </>
  );
};

export default BlogPost;
