import { useEffect, useState } from 'react';
import { removeBackground, loadImageFromSrc } from '@/utils/removeBackground';
import logoOriginal from '@/assets/logo-smartsignage-original.jpg';

const LogoProcessor = () => {
  const [processedLogo, setProcessedLogo] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const processLogo = async () => {
      try {
        setIsProcessing(true);
        console.log('Iniciando processamento do logo...');
        
        // Carregar a imagem original
        const img = await loadImageFromSrc(logoOriginal);
        console.log('Logo carregado');
        
        // Remover o fundo
        const blob = await removeBackground(img);
        console.log('Fundo removido');
        
        // Converter para URL
        const url = URL.createObjectURL(blob);
        setProcessedLogo(url);
        console.log('Logo processado com sucesso');
      } catch (error) {
        console.error('Erro ao processar logo:', error);
        // Em caso de erro, usar o logo original
        setProcessedLogo(logoOriginal);
      } finally {
        setIsProcessing(false);
      }
    };

    processLogo();
  }, []);

  if (isProcessing) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-sm">Processando logo...</span>
      </div>
    );
  }

  return (
    <img 
      src={processedLogo || logoOriginal} 
      alt="Smart Signage" 
      className="h-12"
    />
  );
};

export default LogoProcessor;
