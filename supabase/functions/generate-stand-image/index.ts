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

    // Preparar mensagens para o modelo
    const messages: any[] = [
      {
        role: "user",
        content: []
      }
    ];

    // Adicionar prompt de texto
    messages[0].content.push({
      type: "text",
      text: prompt
    });

    // Se houver imagem de referência, adicionar
    if (referenceImage) {
      messages[0].content.push({
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
        messages: messages,
        modalities: ["image", "text"]
      }),
    });

    console.log('Status da resposta:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro na API:', response.status, errorText);
      
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
          JSON.stringify({ error: 'Créditos insuficientes. Adicione mais créditos em seu workspace Lovable.' }),
          { 
            status: 402, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      throw new Error(`Erro na geração: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Resposta recebida. Estrutura:', JSON.stringify(Object.keys(data)));
    console.log('Choices:', data.choices ? data.choices.length : 0);
    
    // Extrair a imagem gerada
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    console.log('ImageUrl encontrada:', imageUrl ? 'SIM (tamanho: ' + imageUrl.length + ')' : 'NÃO');
    
    if (!imageUrl) {
      console.error('Estrutura completa da resposta:', JSON.stringify(data, null, 2));
      throw new Error('Nenhuma imagem foi gerada');
    }

    console.log('=== SUCESSO ===');
    
    return new Response(
      JSON.stringify({ 
        imageUrl: imageUrl,
        message: data.choices?.[0]?.message?.content || 'Imagem gerada com sucesso'
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
