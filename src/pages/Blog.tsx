import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  Search, Calendar, Clock, User, ArrowRight,
  Box, Monitor, Lightbulb, Store, TrendingUp, FileText, Scale
} from "lucide-react";
import { Helmet } from "react-helmet";

const iconMap: { [key: string]: any } = {
  Box, Monitor, Lightbulb, Store, Calendar, TrendingUp, FileText, Scale
};

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const selectedCategory = searchParams.get("categoria");

  const { data: categories } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('display_order');
      if (error) throw error;
      return data;
    }
  });

  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-posts', selectedCategory, searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          blog_categories (name, slug, icon)
        `)
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (selectedCategory) {
        const category = categories?.find(c => c.slug === selectedCategory);
        if (category) {
          query = query.eq('category_id', category.id);
        }
      }

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!categories
  });

  const handleCategoryClick = (slug: string | null) => {
    if (slug) {
      setSearchParams({ categoria: slug });
    } else {
      setSearchParams({});
    }
  };

  return (
    <>
      <Helmet>
        <title>Blog Smart Signage | Comunicação Visual, Stands Modulares e Eventos</title>
        <meta name="description" content="Conteúdo especializado sobre comunicação visual, stands modulares, lightboxes, varejo e eventos. Guias, comparativos e tendências do mercado." />
        <meta name="keywords" content="stands modulares, comunicação visual, lightbox, tensionado, varejo, eventos, feiras, visual merchandising" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-24 pb-12 bg-gradient-to-b from-[#0a0a2e] to-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Blog <span className="text-primary">Smart Signage</span>
              </h1>
              <p className="text-gray-400 text-lg mb-8">
                Conteúdo especializado sobre comunicação visual, stands modulares, 
                lightboxes e tendências do mercado de eventos e varejo.
              </p>
              
              {/* Search */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input 
                  placeholder="Buscar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-6 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-6 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge 
                variant={!selectedCategory ? "default" : "outline"}
                className="cursor-pointer px-4 py-2"
                onClick={() => handleCategoryClick(null)}
              >
                Todos
              </Badge>
              {categories?.map((category) => {
                const IconComponent = iconMap[category.icon || 'FileText'] || FileText;
                return (
                  <Badge 
                    key={category.id}
                    variant={selectedCategory === category.slug ? "default" : "outline"}
                    className="cursor-pointer px-4 py-2 flex items-center gap-2"
                    onClick={() => handleCategoryClick(category.slug)}
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.name}
                  </Badge>
                );
              })}
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-muted" />
                    <CardContent className="p-6">
                      <div className="h-4 bg-muted rounded mb-2" />
                      <div className="h-4 bg-muted rounded w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : posts?.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Nenhum artigo encontrado
                </h2>
                <p className="text-muted-foreground">
                  {searchTerm 
                    ? "Tente buscar por outros termos" 
                    : "Em breve novos conteúdos serão publicados"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts?.map((post) => {
                  const category = post.blog_categories as any;
                  const IconComponent = iconMap[category?.icon || 'FileText'] || FileText;
                  
                  return (
                    <Card key={post.id} className="group overflow-hidden hover:shadow-lg transition-all">
                      <Link to={`/blog/${post.slug}`}>
                        {post.featured_image && (
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={post.featured_image} 
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {category && (
                              <Badge className="absolute top-4 left-4 flex items-center gap-1">
                                <IconComponent className="w-3 h-3" />
                                {category.name}
                              </Badge>
                            )}
                          </div>
                        )}
                        <CardHeader className="pb-2">
                          <h2 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h2>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {post.published_at ? new Date(post.published_at).toLocaleDateString('pt-BR') : '-'}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {post.reading_time} min
                              </span>
                            </div>
                            <span className="flex items-center gap-1 text-primary group-hover:gap-2 transition-all">
                              Ler mais <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <HomeFooter />
      </div>
    </>
  );
};

export default Blog;
