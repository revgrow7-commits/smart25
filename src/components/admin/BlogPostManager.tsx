import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Eye, EyeOff, Sparkles, Loader2, CalendarClock } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  category_id: string | null;
  meta_title: string | null;
  meta_description: string | null;
  keywords: string[] | null;
  is_published: boolean;
  published_at: string | null;
  scheduled_at: string | null;
  reading_time: number;
  author: string;
}

const BlogPostManager = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [aiCategory, setAiCategory] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    category_id: "",
    meta_title: "",
    meta_description: "",
    keywords: "",
    is_published: false,
    scheduled_at: "",
    reading_time: 5,
    author: "Smart Signage"
  });

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
    queryKey: ['admin-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`*, blog_categories (name)`)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData & { id?: string }) => {
      const postData = {
        title: data.title,
        slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        excerpt: data.excerpt || null,
        content: data.content,
        featured_image: data.featured_image || null,
        category_id: data.category_id || null,
        meta_title: data.meta_title || null,
        meta_description: data.meta_description || null,
        keywords: data.keywords ? data.keywords.split(',').map(k => k.trim()) : null,
        is_published: data.is_published,
        published_at: data.is_published ? new Date().toISOString() : null,
        scheduled_at: data.scheduled_at ? new Date(data.scheduled_at).toISOString() : null,
        reading_time: data.reading_time,
        author: data.author
      };

      if (data.id) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert(postData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast.success(editingPost ? "Artigo atualizado!" : "Artigo criado!");
      resetForm();
    },
    onError: (error) => {
      toast.error("Erro ao salvar artigo");
      console.error(error);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast.success("Artigo excluído!");
    }
  });

  const togglePublishMutation = useMutation({
    mutationFn: async ({ id, is_published }: { id: string; is_published: boolean }) => {
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          is_published,
          published_at: is_published ? new Date().toISOString() : null
        })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast.success("Status atualizado!");
    }
  });

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featured_image: "",
      category_id: "",
      meta_title: "",
      meta_description: "",
      keywords: "",
      is_published: false,
      scheduled_at: "",
      reading_time: 5,
      author: "Smart Signage"
    });
    setEditingPost(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      featured_image: post.featured_image || "",
      category_id: post.category_id || "",
      meta_title: post.meta_title || "",
      meta_description: post.meta_description || "",
      keywords: post.keywords?.join(', ') || "",
      is_published: post.is_published,
      scheduled_at: post.scheduled_at ? new Date(post.scheduled_at).toISOString().slice(0, 16) : "",
      reading_time: post.reading_time,
      author: post.author
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(editingPost ? { ...formData, id: editingPost.id } : formData);
  };

  const handleGenerateWithAI = async () => {
    if (!aiTopic.trim()) {
      toast.error("Digite um tema para o artigo");
      return;
    }

    setIsGenerating(true);
    try {
      const categoryName = categories?.find(c => c.id === aiCategory)?.name;
      
      const response = await supabase.functions.invoke('generate-blog-article', {
        body: { topic: aiTopic, category: categoryName }
      });

      if (response.error) {
        throw new Error(response.error.message || "Erro ao gerar artigo");
      }

      const { article } = response.data;
      
      if (!article) {
        throw new Error("Nenhum artigo foi gerado");
      }

      // Fill the form with generated content
      setFormData({
        title: article.title || "",
        slug: article.slug || "",
        excerpt: article.excerpt || "",
        content: article.content || "",
        featured_image: "",
        category_id: aiCategory || "",
        meta_title: article.meta_title || "",
        meta_description: article.meta_description || "",
        keywords: Array.isArray(article.keywords) ? article.keywords.join(", ") : "",
        is_published: false,
        scheduled_at: "",
        reading_time: article.reading_time || 5,
        author: "Smart Signage"
      });

      setIsAIDialogOpen(false);
      setIsDialogOpen(true);
      setAiTopic("");
      toast.success("Artigo gerado com sucesso! Revise e salve.");
    } catch (error) {
      console.error("Error generating article:", error);
      toast.error(error instanceof Error ? error.message : "Erro ao gerar artigo com IA");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-4">
        <CardTitle>Gerenciar Artigos do Blog</CardTitle>
        <div className="flex gap-2">
          <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600">
                <Sparkles className="w-4 h-4 mr-2" />
                Gerar com IA
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Gerar Artigo com IA</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Tema do Artigo *</Label>
                  <Input 
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    placeholder="Ex: Vantagens dos stands modulares para feiras"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select value={aiCategory} onValueChange={setAiCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-muted-foreground">
                  A IA irá gerar um artigo completo otimizado para SEO com base no tema fornecido.
                </p>
                <Button 
                  onClick={handleGenerateWithAI} 
                  disabled={isGenerating || !aiTopic.trim()}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Gerando artigo...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Gerar Artigo
                    </>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Artigo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingPost ? "Editar Artigo" : "Novo Artigo"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Título *</Label>
                    <Input 
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Slug (URL)</Label>
                    <Input 
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="auto-gerado se vazio"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Categoria</Label>
                    <Select 
                      value={formData.category_id} 
                      onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tempo de leitura (min)</Label>
                    <Input 
                      type="number"
                      value={formData.reading_time}
                      onChange={(e) => setFormData({ ...formData, reading_time: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Resumo (Excerpt)</Label>
                  <Textarea 
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Conteúdo (HTML) *</Label>
                  <Textarea 
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={10}
                    required
                    placeholder="<h2>Título da Seção</h2><p>Conteúdo...</p>"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Imagem de Destaque (URL)</Label>
                  <Input 
                    value={formData.featured_image}
                    onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Meta Title (SEO)</Label>
                    <Input 
                      value={formData.meta_title}
                      onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                      maxLength={60}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Keywords (separadas por vírgula)</Label>
                    <Input 
                      value={formData.keywords}
                      onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Meta Description (SEO)</Label>
                  <Textarea 
                    value={formData.meta_description}
                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                    maxLength={160}
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <CalendarClock className="w-4 h-4" />
                      Agendar Publicação
                    </Label>
                    <Input 
                      type="datetime-local"
                      value={formData.scheduled_at}
                      onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Deixe vazio para publicar imediatamente ao marcar como publicado
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Autor</Label>
                    <Input 
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch 
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                  />
                  <Label>Publicado</Label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={saveMutation.isPending}>
                    {saveMutation.isPending ? "Salvando..." : "Salvar"}
                  </Button>
                </div>
              </form>
          </DialogContent>
        </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Agendamento</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts?.map((post) => {
                const isScheduled = post.scheduled_at && new Date(post.scheduled_at) > new Date();
                return (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{(post.blog_categories as any)?.name || '-'}</TableCell>
                  <TableCell>
                    <Badge variant={post.is_published ? "default" : "secondary"}>
                      {post.is_published ? "Publicado" : "Rascunho"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {post.scheduled_at ? (
                      <div className="flex items-center gap-1">
                        <CalendarClock className="w-3 h-3" />
                        <span className={isScheduled ? "text-amber-600" : "text-green-600"}>
                          {new Date(post.scheduled_at).toLocaleString('pt-BR', { 
                            day: '2-digit', 
                            month: '2-digit', 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    ) : '-'}
                  </TableCell>
                  <TableCell>
                    {post.published_at 
                      ? new Date(post.published_at).toLocaleDateString('pt-BR')
                      : new Date(post.created_at).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => togglePublishMutation.mutate({ 
                          id: post.id, 
                          is_published: !post.is_published 
                        })}
                      >
                        {post.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(post)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          if (confirm("Excluir este artigo?")) {
                            deleteMutation.mutate(post.id);
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default BlogPostManager;
