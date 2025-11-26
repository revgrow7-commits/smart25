import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";

interface ImportStats {
  total: number;
  imported: number;
  errors: number;
}

const ExcelUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [stats, setStats] = useState<ImportStats | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.xlsx') && !selectedFile.name.endsWith('.xls')) {
        toast.error("Por favor, selecione um arquivo Excel (.xlsx ou .xls)");
        return;
      }
      setFile(selectedFile);
      setStats(null);
      toast.success(`Arquivo "${selectedFile.name}" selecionado`);
    }
  };

  const processExcelData = async () => {
    if (!file) {
      toast.error("Por favor, selecione um arquivo");
      return;
    }

    setImporting(true);
    setProgress(0);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const totalRows = jsonData.length;
      let imported = 0;
      let errors = 0;

      // Buscar categorias existentes
      const { data: categories } = await supabase
        .from('categories')
        .select('id, name');

      const categoryMap = new Map(
        categories?.map(cat => [cat.name, cat.id]) || []
      );

      for (let i = 0; i < jsonData.length; i++) {
        const row: any = jsonData[i];
        setProgress(Math.round(((i + 1) / totalRows) * 100));

        try {
          // Mapear os dados da planilha para o formato do banco
          const categoryName = row['Grupos'] || row['Category'] || row['Categoria'];
          const categoryId = categoryMap.get(categoryName);

          if (!categoryId) {
            console.warn(`Categoria não encontrada: ${categoryName}`);
            errors++;
            continue;
          }

          const productData = {
            category_id: categoryId,
            item_code: row['Item Code'] || row['Código'] || `PROD-${Date.now()}-${i}`,
            name: row['Description'] || row['Descrição'] || 'Produto Importado',
            frame_size: row['Frame Size (mm)'] || row['Tamanho Frame'] || '',
            graphic_size: row['Graphic size (mm)'] || row['Tamanho Gráfico'] || '',
            pcs_per_ctn: parseInt(row['pcs /ctn'] || row['Peças/Caixa'] || '0'),
            gross_weight: row['G.W. (kgs)/Ibs'] || row['Peso'] || '',
            packing_size: row['Packing Size(cm) /ctn (cm)'] || row['Tamanho Embalagem'] || '',
            price: parseFloat(row['price'] || row['Preço'] || '0'),
            distributor_price: parseFloat(row['distributor price'] || row['Preço Distribuidor'] || '0'),
            status: 'active',
          };

          const { error } = await supabase
            .from('products')
            .insert(productData);

          if (error) {
            console.error('Erro ao inserir produto:', error);
            errors++;
          } else {
            imported++;
          }
        } catch (err) {
          console.error('Erro ao processar linha:', err);
          errors++;
        }
      }

      setStats({ total: totalRows, imported, errors });
      
      if (errors === 0) {
        toast.success(`${imported} produtos importados com sucesso!`);
      } else {
        toast.warning(`${imported} produtos importados, ${errors} com erro`);
      }
    } catch (error) {
      console.error('Erro ao processar Excel:', error);
      toast.error("Erro ao processar arquivo Excel");
    } finally {
      setImporting(false);
      setProgress(0);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Upload de Planilha Excel</h3>
          <p className="text-muted-foreground text-sm">
            Faça upload de uma planilha Excel (.xlsx ou .xls) para importar produtos em massa
          </p>
        </div>

        <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/60 transition-colors">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="hidden"
            id="excel-upload"
            disabled={importing}
          />
          <label
            htmlFor="excel-upload"
            className="cursor-pointer flex flex-col items-center gap-4"
          >
            {file ? (
              <>
                <FileSpreadsheet className="h-16 w-16 text-primary" />
                <div>
                  <p className="font-semibold">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </>
            ) : (
              <>
                <Upload className="h-16 w-16 text-primary" />
                <div>
                  <p className="font-semibold">Clique para selecionar arquivo</p>
                  <p className="text-sm text-muted-foreground">
                    Formatos: .xlsx, .xls
                  </p>
                </div>
              </>
            )}
          </label>
        </div>

        {importing && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Importando...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {stats && (
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <FileSpreadsheet className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold text-green-500">{stats.imported}</p>
              <p className="text-sm text-muted-foreground">Importados</p>
            </div>
            <div className="text-center p-4 bg-red-500/10 rounded-lg">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 text-red-500" />
              <p className="text-2xl font-bold text-red-500">{stats.errors}</p>
              <p className="text-sm text-muted-foreground">Erros</p>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <Button
            onClick={processExcelData}
            disabled={!file || importing}
            className="flex-1 btn-primary"
          >
            {importing ? (
              "Importando..."
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Importar Produtos
              </>
            )}
          </Button>
          
          {file && !importing && (
            <Button
              variant="outline"
              onClick={() => {
                setFile(null);
                setStats(null);
              }}
            >
              Limpar
            </Button>
          )}
        </div>

        <div className="text-sm text-muted-foreground space-y-2">
          <p className="font-semibold">💡 Dicas:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>A planilha deve ter colunas: Grupos, Item Code, Description, etc.</li>
            <li>As categorias devem existir antes da importação</li>
            <li>Produtos duplicados serão ignorados</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default ExcelUpload;
