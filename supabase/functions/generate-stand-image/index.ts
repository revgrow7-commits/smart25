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
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY não encontrada');
      throw new Error('LOVABLE_API_KEY não configurada');
    }

    console.log('=== INÍCIO DA GERAÇÃO ===');
    console.log('Prompt recebido:', prompt?.substring(0, 100) + '...');
    console.log('Referência de imagem:', referenceImage ? 'SIM' : 'NÃO');

    // Preparar conteúdo para o Lovable AI
    const content: any[] = [{ type: "text", text: prompt }];

    // Se houver imagem de referência, adicionar como image_url
    if (referenceImage) {
      content.push({
        type: "image_url",
        image_url: {
          url: referenceImage
        }
      });
    }

    console.log('Chamando Lovable AI Gateway...');
    
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [{
          role: 'user',
          content: content
        }],
        modalities: ['image', 'text']
      }),
    });

    console.log('Status da resposta:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro na Lovable AI:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Limite de requisições excedido. Tente novamente mais tarde.' }),
          { 
            status: 429, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Créditos insuficientes. Adicione créditos à sua conta Lovable.' }),
          { 
            status: 402, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      throw new Error(`Erro na geração: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Resposta recebida do Lovable AI');
    
    // Extrair a imagem gerada do formato Lovable AI
    let imageUrl = null;
    let textResponse = '';
    
    const message = data.choices?.[0]?.message;
    if (message) {
      textResponse = message.content || '';
      
      // Verificar se há imagens na resposta
      if (message.images && message.images.length > 0) {
        imageUrl = message.images[0].image_url?.url;
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
