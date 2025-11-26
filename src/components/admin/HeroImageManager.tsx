import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, Upload, GripVertical } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface HeroImage {
  id: string;
  image_url: string;
  title: string | null;
  subtitle: string | null;
  display_order: number;
  is_active: boolean;
}

export const HeroImageManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [newImage, setNewImage] = useState({
    title: "",
    subtitle: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: heroImages, isLoading } = useQuery({
    queryKey: ['hero-images-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hero_images')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as HeroImage[];
    }
  });

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!selectedFile) throw new Error("Nenhum arquivo selecionado");

      setUploading(true);
      
      // Upload image to storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('hero-images')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('hero-images')
        .getPublicUrl(filePath);

      // Get the next display order
      const maxOrder = heroImages?.reduce((max, img) => Math.max(max, img.display_order), 0) || 0;

      // Insert into database
      const { error: dbError } = await supabase
        .from('hero_images')
        .insert({
          image_url: publicUrl,
          title: newImage.title || null,
          subtitle: newImage.subtitle || null,
          display_order: maxOrder + 1,
          is_active: true
        });

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero-images-admin'] });
      queryClient.invalidateQueries({ queryKey: ['hero-images'] });
      toast({
        title: "Imagem adicionada com sucesso!",
      });
      setNewImage({ title: "", subtitle: "" });
      setSelectedFile(null);
      setUploading(false);
    },
    onError: (error) => {
      toast({
        title: "Erro ao adicionar imagem",
        description: error.message,
        variant: "destructive",
      });
      setUploading(false);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('hero_images')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero-images-admin'] });
      queryClient.invalidateQueries({ queryKey: ['hero-images'] });
      toast({
        title: "Imagem removida com sucesso!",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao remover imagem",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('hero_images')
        .update({ is_active })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero-images-admin'] });
      queryClient.invalidateQueries({ queryKey: ['hero-images'] });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "Selecione uma imagem",
        variant: "destructive",
      });
      return;
    }
    uploadMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Nova Imagem</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image-file">Imagem</Label>
            <Input
              id="image-file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Título (opcional)</Label>
            <Input
              id="title"
              value={newImage.title}
              onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
              placeholder="Título da imagem"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtítulo (opcional)</Label>
            <Input
              id="subtitle"
              value={newImage.subtitle}
              onChange={(e) => setNewImage({ ...newImage, subtitle: e.target.value })}
              placeholder="Subtítulo da imagem"
            />
          </div>

          <Button
            onClick={handleUpload}
            disabled={uploading || !selectedFile}
            className="w-full"
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Adicionar Imagem
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Imagens do Hero ({heroImages?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {heroImages?.map((image) => (
              <div
                key={image.id}
                className="flex items-center gap-4 p-4 border rounded-lg"
              >
                <GripVertical className="h-5 w-5 text-muted-foreground" />
                
                <img
                  src={image.image_url}
                  alt={image.title || "Hero image"}
                  className="h-20 w-32 object-cover rounded"
                />
                
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{image.title || "Sem título"}</p>
                  {image.subtitle && (
                    <p className="text-sm text-muted-foreground">{image.subtitle}</p>
                  )}
                  <p className="text-xs text-muted-foreground">Ordem: {image.display_order}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`active-${image.id}`} className="text-sm">
                      Ativo
                    </Label>
                    <Switch
                      id={`active-${image.id}`}
                      checked={image.is_active}
                      onCheckedChange={(checked) =>
                        toggleActiveMutation.mutate({ id: image.id, is_active: checked })
                      }
                    />
                  </div>
                  
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteMutation.mutate(image.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {(!heroImages || heroImages.length === 0) && (
              <p className="text-center text-muted-foreground py-8">
                Nenhuma imagem adicionada ainda
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};