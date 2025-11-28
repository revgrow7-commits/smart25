import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2, Plus, Monitor, Tv, Projector, Smartphone, Tablet, Speaker, Camera, Router, Headphones, HardDrive, Box, Package, Grid3x3, Shapes, LayoutGrid } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
}

const iconOptions = [
  { value: 'Monitor', label: 'Monitor', Icon: Monitor },
  { value: 'Tv', label: 'TV', Icon: Tv },
  { value: 'Projector', label: 'Projetor', Icon: Projector },
  { value: 'Smartphone', label: 'Smartphone', Icon: Smartphone },
  { value: 'Tablet', label: 'Tablet', Icon: Tablet },
  { value: 'Speaker', label: 'Alto-falante', Icon: Speaker },
  { value: 'Camera', label: 'Câmera', Icon: Camera },
  { value: 'Router', label: 'Roteador', Icon: Router },
  { value: 'Headphones', label: 'Fones', Icon: Headphones },
  { value: 'HardDrive', label: 'Disco', Icon: HardDrive },
  { value: 'Box', label: 'Caixa', Icon: Box },
  { value: 'Package', label: 'Pacote', Icon: Package },
  { value: 'Grid3x3', label: 'Grade', Icon: Grid3x3 },
  { value: 'Shapes', label: 'Formas', Icon: Shapes },
  { value: 'LayoutGrid', label: 'Layout', Icon: LayoutGrid },
];

const CategoryManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '',
  });

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      toast.error("Erro ao carregar categorias");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const slug = formData.slug || generateSlug(formData.name);

      if (editing) {
        const { error } = await supabase
          .from('categories')
          .update({ ...formData, slug })
          .eq('id', editing);

        if (error) throw error;
        toast.success("Categoria atualizada");
      } else {
        const { error } = await supabase
          .from('categories')
          .insert({ ...formData, slug });

        if (error) throw error;
        toast.success("Categoria criada");
      }

      setFormData({ name: '', slug: '', description: '', icon: '' });
      setEditing(null);
      fetchCategories();
    } catch (error: any) {
      console.error('Erro ao salvar categoria:', error);
      if (error.code === '23505') {
        toast.error("Já existe uma categoria com este nome");
      } else {
        toast.error("Erro ao salvar categoria");
      }
    }
  };

  const editCategory = (category: Category) => {
    setEditing(category.id);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      icon: category.icon || '',
    });
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Tem certeza? Produtos desta categoria ficarão sem categoria.")) return;

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success("Categoria deletada");
      fetchCategories();
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
      toast.error("Erro ao deletar categoria");
    }
  };

  if (loading) {
    return <Card className="p-6">Carregando categorias...</Card>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">
          {editing ? 'Editar Categoria' : 'Nova Categoria'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder={generateSlug(formData.name)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Ícone</Label>
            <Select
              value={formData.icon}
              onValueChange={(value) => setFormData({ ...formData, icon: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um ícone" />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((option) => {
                  const Icon = option.Icon;
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {option.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              <Plus className="mr-2 h-4 w-4" />
              {editing ? 'Atualizar' : 'Criar'} Categoria
            </Button>
            {editing && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditing(null);
                  setFormData({ name: '', slug: '', description: '', icon: '' });
                }}
              >
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Categorias Cadastradas</h3>

        {categories.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Nenhuma categoria cadastrada
          </p>
        ) : (
          <div className="space-y-3">
            {categories.map((category) => {
              const iconOption = iconOptions.find(opt => opt.value === category.icon);
              const CategoryIcon = iconOption?.Icon;
              
              return (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {CategoryIcon && <CategoryIcon className="w-5 h-5 text-primary" />}
                    <div>
                      <p className="font-semibold">{category.name}</p>
                      <p className="text-sm text-muted-foreground">{category.slug}</p>
                    </div>
                  </div>

                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => editCategory(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => deleteCategory(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CategoryManager;
