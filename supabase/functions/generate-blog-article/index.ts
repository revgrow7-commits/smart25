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
    const { topic, category } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log(`Generating blog article for topic: ${topic}, category: ${category}`);

    const systemPrompt = `Você é um especialista em criação de conteúdo SEO para um blog B2B especializado em:
- Comunicação visual
- Stands modulares
- Estruturas tensionadas
- Lightboxes
- Smart Signage
- Varejo, eventos e trade marketing

REGRAS OBRIGATÓRIAS:
1. Responda a pergunta principal nos primeiros 2 parágrafos
2. Use estrutura clara: H1 (título), H2 (seções), H3 (detalhes)
3. Parágrafos curtos e diretos
4. Inclua listas, bullets e tabelas quando fizer sentido
5. Reduza "enchimento" - foque em informação útil
6. Use entidades semânticas (ex: "stands modulares vs stands de madeira")
7. Tom profissional, claro e consultivo
8. Exemplos do mundo real (varejo, feiras, franquias, eventos)
9. Foco em: custo-benefício, montagem rápida, modularidade, sustentabilidade

FORMATO DO ARTIGO (retorne em JSON):
{
  "title": "Título otimizado para SEO (máx 60 caracteres)",
  "slug": "slug-url-amigavel",
  "excerpt": "Resumo do artigo em 2-3 frases (máx 160 caracteres)",
  "content": "Conteúdo completo em HTML com tags h2, h3, p, ul, li, table, etc.",
  "meta_title": "Meta título SEO (máx 60 caracteres)",
  "meta_description": "Meta descrição SEO (máx 160 caracteres)",
  "keywords": ["palavra1", "palavra2", "palavra3"],
  "reading_time": 5
}

ESTRUTURA DO CONTEÚDO HTML:
1. Introdução (resposta direta + contextualização)
2. Seções principais com H2 e H3
3. Lista ou checklist prático
4. Tabela comparativa (quando aplicável)
5. FAQ com 4-6 perguntas
6. Conclusão com CTA sutil B2B

Use classes CSS para estilização:
- prose para texto
- Tabelas com border e padding
- Listas com marcadores claros`;

    const userPrompt = `Crie um artigo completo sobre o tema: "${topic}"
${category ? `Categoria do artigo: ${category}` : ''}

O artigo deve ser otimizado para SEO tradicional (Google) e para motores de IA (ChatGPT Search, Perplexity, Google AI Overviews).

Retorne APENAS o JSON válido, sem markdown ou texto adicional.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em alguns minutos." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes. Adicione créditos ao workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error("No content received from AI");
    }

    console.log("Raw AI response:", content);

    // Parse the JSON response - handle potential markdown wrapping
    let articleData;
    try {
      // Remove markdown code blocks if present
      let cleanContent = content.trim();
      if (cleanContent.startsWith("```json")) {
        cleanContent = cleanContent.slice(7);
      } else if (cleanContent.startsWith("```")) {
        cleanContent = cleanContent.slice(3);
      }
      if (cleanContent.endsWith("```")) {
        cleanContent = cleanContent.slice(0, -3);
      }
      cleanContent = cleanContent.trim();
      
      articleData = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      throw new Error("Failed to parse AI response as JSON");
    }

    console.log("Parsed article data:", articleData);

    return new Response(JSON.stringify({ article: articleData }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error generating blog article:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
