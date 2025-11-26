import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY não está configurado');
    }

    // Criar cliente Supabase para buscar informações dos produtos
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Buscar produtos e categorias para contexto
    const { data: products } = await supabase
      .from('products')
      .select(`
        *,
        categories(name, description)
      `)
      .eq('status', 'active')
      .limit(50);

    const { data: categories } = await supabase
      .from('categories')
      .select('*');

    // Construir contexto sobre os produtos
    const productsContext = products?.map(p => 
      `${p.name} (${p.item_code}): ${p.description || 'Sem descrição'}. Categoria: ${p.categories?.name}. Preço: ${p.price ? `R$ ${p.price}` : 'Sob consulta'}.`
    ).join('\n') || '';

    const categoriesContext = categories?.map(c => 
      `${c.name}: ${c.description || ''}`
    ).join('\n') || '';

    const systemPrompt = `Você é um assistente especializado em produtos Smart Signage. 
Seu objetivo é ajudar os clientes a encontrar os produtos ideais para suas necessidades.

PRODUTOS DISPONÍVEIS:
${productsContext}

CATEGORIAS:
${categoriesContext}

INSTRUÇÕES:
- Seja amigável e prestativo
- Responda em português brasileiro
- Sugira produtos específicos quando relevante
- Mencione preços quando disponíveis
- Pergunte sobre as necessidades do cliente para fazer melhores recomendações
- Se não souber algo, seja honesto
- Mantenha respostas concisas e diretas`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Limite de requisições excedido. Tente novamente em instantes.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Créditos insuficientes. Entre em contato com o suporte.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const errorText = await response.text();
      console.error('Erro da API AI:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Erro ao processar requisição' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });
  } catch (error) {
    console.error('Erro no chat:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Erro desconhecido' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
