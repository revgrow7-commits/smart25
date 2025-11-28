import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, X, Star, Trash2 } from "lucide-react";

interface ProductFormProps {
  productId?: string | null;
  onClose: () => void;
}

interface ProductImage {
  id?: string;
  image_url: string;
  is_primary: boolean;
  alt_text?: string;
}

const ProductForm = ({ productId, onClose }: ProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploading3D, setUploading3D] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [images, setImages] = useState<ProductImage[]>([]);
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
    status: 'active',
    video_url: '',
    model_3d_url: '',
  });

  useEffect(() => {
    fetchCategories();
    if (productId) {
      fetchProduct();
      fetchProductImages();
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
      status: data.status || 'active',
      video_url: data.video_url || '',
      model_3d_url: data.model_3d_url || '',
    });
  };

  const fetchProductImages = async () => {
    if (!productId) return;
    
    const { data, error } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', productId)
      .order('display_order');

    if (!error && data) {
      setImages(data.map(img => ({
        id: img.id,
        image_url: img.image_url,
        is_primary: img.is_primary || false,
        alt_text: img.alt_text || ''
      })));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    const files = Array.from(e.target.files);

    try {
      const uploadedImages: ProductImage[] = [];

      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        uploadedImages.push({
          image_url: publicUrl,
          is_primary: images.length === 0 && uploadedImages.length === 0,
          alt_text: formData.name
        });
      }

      setImages([...images, ...uploadedImages]);
      toast.success(`${files.length} imagem(ns) carregada(s) com sucesso`);
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      toast.error("Erro ao fazer upload das imagens");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    // Se removeu a imagem principal, define a primeira como principal
    if (images[index].is_primary && newImages.length > 0) {
      newImages[0].is_primary = true;
    }
    setImages(newImages);
  };

  const setPrimaryImage = (index: number) => {
    setImages(images.map((img, i) => ({
      ...img,
      is_primary: i === index
    })));
  };

  const handle3DModelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    
    // Validar extensão do arquivo
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (fileExt !== 'glb' && fileExt !== 'gltf') {
      toast.error("Por favor, selecione um arquivo .glb ou .gltf");
      return;
    }

    // Validar tamanho (máximo 20MB)
    if (file.size > 20 * 1024 * 1024) {
      toast.error("O arquivo deve ter no máximo 20MB");
      return;
    }

    setUploading3D(true);

    try {
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('3d-models')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('3d-models')
        .getPublicUrl(filePath);

      setFormData({ ...formData, model_3d_url: publicUrl });
      toast.success("Modelo 3D carregado com sucesso");
    } catch (error) {
      console.error('Erro ao fazer upload do modelo 3D:', error);
      toast.error("Erro ao fazer upload do modelo 3D");
    } finally {
      setUploading3D(false);
    }
  };

  const remove3DModel = async () => {
    if (!formData.model_3d_url) return;

    try {
      // Extrair o nome do arquivo da URL
      const urlParts = formData.model_3d_url.split('/');
      const fileName = urlParts[urlParts.length - 1];

      // Deletar do storage
      const { error } = await supabase.storage
        .from('3d-models')
        .remove([fileName]);

      if (error) throw error;

      setFormData({ ...formData, model_3d_url: '' });
      toast.success("Modelo 3D removido com sucesso");
    } catch (error) {
      console.error('Erro ao remover modelo 3D:', error);
      toast.error("Erro ao remover modelo 3D");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...formData,
        pcs_per_ctn: formData.pcs_per_ctn ? parseInt(formData.pcs_per_ctn) : null,
        price: formData.price ? parseFloat(formData.price) : null,
      };

      let savedProductId = productId;

      if (productId) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', productId);

        if (error) throw error;

        // Remover imagens antigas
        await supabase
          .from('product_images')
          .delete()
          .eq('product_id', productId);
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert(productData)
          .select()
          .single();

        if (error) throw error;
        savedProductId = data.id;
      }

      // Salvar imagens
      if (images.length > 0 && savedProductId) {
        const imageRecords = images.map((img, index) => ({
          product_id: savedProductId,
          image_url: img.image_url,
          is_primary: img.is_primary,
          display_order: index,
          alt_text: img.alt_text || formData.name
        }));

        const { error: imageError } = await supabase
          .from('product_images')
          .insert(imageRecords);

        if (imageError) throw imageError;
      }

      toast.success(productId ? "Produto atualizado com sucesso" : "Produto criado com sucesso");
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
          <Label htmlFor="pcs_per_ctn">Peças por Caixa</Label>
          <Input
            id="pcs_per_ctn"
            type="number"
            value={formData.pcs_per_ctn}
            onChange={(e) => setFormData({ ...formData, pcs_per_ctn: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gross_weight">Peso Bruto</Label>
          <Input
            id="gross_weight"
            value={formData.gross_weight}
            onChange={(e) => setFormData({ ...formData, gross_weight: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="packing_size">Tamanho Embalagem</Label>
          <Input
            id="packing_size"
            value={formData.packing_size}
            onChange={(e) => setFormData({ ...formData, packing_size: e.target.value })}
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

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="video_url">URL do Vídeo (YouTube, Vimeo, etc.)</Label>
          <Input
            id="video_url"
            type="url"
            placeholder="https://www.youtube.com/embed/..."
            value={formData.video_url}
            onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            Cole a URL do vídeo embed (ex: YouTube embed URL)
          </p>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Modelo 3D (.glb ou .gltf)</Label>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('3d-model-upload')?.click()}
                disabled={uploading3D || !!formData.model_3d_url}
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploading3D ? 'Fazendo upload...' : 'Upload Modelo 3D'}
              </Button>
              <input
                id="3d-model-upload"
                type="file"
                accept=".glb,.gltf"
                className="hidden"
                onChange={handle3DModelUpload}
                disabled={uploading3D || !!formData.model_3d_url}
              />
              <span className="text-sm text-muted-foreground">
                Máximo 20MB | Formatos: .glb, .gltf
              </span>
            </div>

            {formData.model_3d_url && (
              <div className="border border-border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Modelo 3D carregado</p>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={remove3DModel}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remover
                  </Button>
                </div>
                
                <div className="aspect-video rounded-lg overflow-hidden bg-muted border border-border">
                  <model-viewer
                    src={formData.model_3d_url}
                    alt="Preview do modelo 3D"
                    camera-controls
                    auto-rotate
                    shadow-intensity="1"
                    style={{ width: '100%', height: '100%' }}
                  >
                  </model-viewer>
                </div>
              </div>
            )}

            <p className="text-xs text-muted-foreground">
              Faça upload de um arquivo .glb ou .gltf para visualização 3D interativa no catálogo
            </p>
          </div>
        </div>
      </div>

      {/* Upload de Imagens */}
      <div className="space-y-2 pt-4 border-t border-border">
        <Label>Imagens do Produto</Label>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('image-upload')?.click()}
              disabled={uploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? 'Fazendo upload...' : 'Adicionar Imagens'}
            </Button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploading}
            />
            <span className="text-sm text-muted-foreground">
              {images.length} imagem(ns) adicionada(s)
            </span>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square border border-border rounded-lg overflow-hidden group"
                >
                  <img
                    src={image.image_url}
                    alt={`Produto ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      type="button"
                      size="icon"
                      variant={image.is_primary ? "default" : "secondary"}
                      onClick={() => setPrimaryImage(index)}
                      title="Definir como principal"
                    >
                      <Star className={`h-4 w-4 ${image.is_primary ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {image.is_primary && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                      Principal
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={loading || uploading || uploading3D} className="flex-1">
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
