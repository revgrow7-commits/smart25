import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ProductFormProps {
  productId?: string | null;
  onClose: () => void;
}

const ProductForm = ({ productId, onClose }: ProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    category_id: '',
    item_code: '',
    name: '',
    description: '',
    frame_size: '',
    graphic_size: '',
    pcs_per_ctn: '',
    gross_weight: '',
    packing_size: '',
    price: '',
    distributor_price: '',
    status: 'active',
  });

  useEffect(() => {
    fetchCategories();
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').order('name');
    setCategories(data || []);
  };

  const fetchProduct = async () => {
    if (!productId) return;
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (error) {
      toast.error("Erro ao carregar produto");
      return;
    }

    setFormData({
      category_id: data.category_id || '',
      item_code: data.item_code || '',
      name: data.name || '',
      description: data.description || '',
      frame_size: data.frame_size || '',
      graphic_size: data.graphic_size || '',
      pcs_per_ctn: data.pcs_per_ctn?.toString() || '',
      gross_weight: data.gross_weight || '',
      packing_size: data.packing_size || '',
      price: data.price?.toString() || '',
      distributor_price: data.distributor_price?.toString() || '',
      status: data.status || 'active',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...formData,
        pcs_per_ctn: formData.pcs_per_ctn ? parseInt(formData.pcs_per_ctn) : null,
        price: formData.price ? parseFloat(formData.price) : null,
        distributor_price: formData.distributor_price ? parseFloat(formData.distributor_price) : null,
      };

      if (productId) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', productId);

        if (error) throw error;
        toast.success("Produto atualizado com sucesso");
      } else {
        const { error } = await supabase
          .from('products')
          .insert(productData);

        if (error) throw error;
        toast.success("Produto criado com sucesso");
      }

      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      toast.error("Erro ao salvar produto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold">
        {productId ? 'Editar Produto' : 'Novo Produto'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Categoria *</Label>
          <Select
            value={formData.category_id}
            onValueChange={(value) => setFormData({ ...formData, category_id: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="item_code">Código do Produto *</Label>
          <Input
            id="item_code"
            value={formData.item_code}
            onChange={(e) => setFormData({ ...formData, item_code: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="name">Nome do Produto *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="frame_size">Tamanho Frame</Label>
          <Input
            id="frame_size"
            value={formData.frame_size}
            onChange={(e) => setFormData({ ...formData, frame_size: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="graphic_size">Tamanho Gráfico</Label>
          <Input
            id="graphic_size"
            value={formData.graphic_size}
            onChange={(e) => setFormData({ ...formData, graphic_size: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Preço</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="distributor_price">Preço Distribuidor</Label>
          <Input
            id="distributor_price"
            type="number"
            step="0.01"
            value={formData.distributor_price}
            onChange={(e) => setFormData({ ...formData, distributor_price: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
              <SelectItem value="draft">Rascunho</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? "Salvando..." : "Salvar Produto"}
        </Button>
        {productId && (
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
