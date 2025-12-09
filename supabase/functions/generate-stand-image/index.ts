import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, referenceImage } = await req.json();
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY não encontrada');
      throw new Error('GEMINI_API_KEY não configurada');
    }

    console.log('=== INÍCIO DA GERAÇÃO ===');
    console.log('Prompt recebido:', prompt?.substring(0, 100) + '...');
    console.log('Referência de imagem:', referenceImage ? 'SIM' : 'NÃO');

    // Preparar conteúdo para o Gemini
    const parts: any[] = [{ text: prompt }];

    // Se houver imagem de referência, adicionar como inline_data
    if (referenceImage) {
      // Extrair base64 e mimeType da imagem
      const match = referenceImage.match(/^data:(.+);base64,(.+)$/);
      if (match) {
        parts.push({
          inline_data: {
            mime_type: match[1],
            data: match[2]
          }
        });
      }
    }

    console.log('Chamando Gemini API...');
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: parts
        }],
        generationConfig: {
          responseModalities: ["TEXT", "IMAGE"]
        }
      }),
    });

    console.log('Status da resposta:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro na API Gemini:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Limite de requisições excedido. Tente novamente mais tarde.' }),
          { 
            status: 429, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      throw new Error(`Erro na geração: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Resposta recebida do Gemini');
    
    // Extrair a imagem gerada do formato Gemini
    let imageUrl = null;
    let textResponse = '';
    
    const candidates = data.candidates || [];
    for (const candidate of candidates) {
      const content = candidate.content;
      if (content && content.parts) {
        for (const part of content.parts) {
          if (part.inlineData) {
            // Converter para data URL
            imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          }
          if (part.text) {
            textResponse = part.text;
          }
        }
      }
    }
    
    console.log('ImageUrl encontrada:', imageUrl ? 'SIM' : 'NÃO');
    
    if (!imageUrl) {
      console.error('Estrutura completa da resposta:', JSON.stringify(data, null, 2));
      throw new Error('Nenhuma imagem foi gerada');
    }

    console.log('=== SUCESSO ===');
    
    return new Response(
      JSON.stringify({ 
        imageUrl: imageUrl,
        message: textResponse || 'Imagem gerada com sucesso'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('=== ERRO NA FUNÇÃO ===');
    console.error('Tipo:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('Mensagem:', error instanceof Error ? error.message : String(error));
    console.error('Stack:', error instanceof Error ? error.stack : 'N/A');
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Erro desconhecido ao gerar imagem' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
