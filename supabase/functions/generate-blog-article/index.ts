import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

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
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY não está configurada" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
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
2. Use estrutura clara: H2 (seções), H3 (detalhes)
3. Parágrafos curtos e diretos
4. Inclua listas, bullets e tabelas quando fizer sentido
5. Reduza "enchimento" - foque em informação útil
6. Use entidades semânticas (ex: "stands modulares vs stands de madeira")
7. Tom profissional, claro e consultivo
8. Exemplos do mundo real (varejo, feiras, franquias, eventos)
9. Foco em: custo-benefício, montagem rápida, modularidade, sustentabilidade

FORMATO DE RESPOSTA CRÍTICO:
- Retorne APENAS JSON válido
- SEM markdown, SEM code blocks, SEM backticks
- SEM concatenação de strings (+ entre aspas)
- NO HTML: NÃO use atributos com aspas (como border="1"). Use apenas tags simples: <table>, <tr>, <td>, <th>, <thead>, <tbody>
- Aspas duplas apenas para valores JSON, NUNCA dentro do HTML

Estrutura JSON:
{
  "title": "Título SEO máx 60 chars",
  "slug": "slug-url",
  "excerpt": "Resumo máx 160 chars",
  "content": "<h2>Seção</h2><p>Texto</p><table><thead><tr><th>Col1</th></tr></thead><tbody><tr><td>Valor</td></tr></tbody></table>",
  "meta_title": "Meta título máx 60 chars",
  "meta_description": "Meta descrição máx 160 chars",
  "keywords": ["palavra1", "palavra2"],
  "reading_time": 5
}

ESTRUTURA DO CONTEÚDO:
1. Introdução (resposta direta)
2. Seções com H2/H3
3. Listas práticas
4. Tabela comparativa (SEM atributos HTML)
5. FAQ 4-6 perguntas
6. Conclusão com CTA`;

    const userPrompt = `Crie um artigo completo sobre o tema: "${topic}"
${category ? `Categoria do artigo: ${category}` : ''}

O artigo deve ser otimizado para SEO tradicional (Google) e para motores de IA (ChatGPT Search, Perplexity, Google AI Overviews).

IMPORTANTE: Retorne APENAS o objeto JSON puro, sem code blocks (\`\`\`), sem markdown, sem concatenação de strings (+). O campo content deve ser uma única string HTML.`;

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
        return new Response(
          JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em alguns minutos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes. Adicione créditos ao workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: `Erro na API: ${response.status}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      console.error("No content received from AI");
      return new Response(
        JSON.stringify({ error: "Nenhum conteúdo recebido da IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Raw AI response length:", content.length);

    // Parse the JSON response - handle potential formatting issues
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
      
      // Fix JavaScript string concatenation if present
      if (cleanContent.includes('" + "') || cleanContent.includes("' + '")) {
        cleanContent = cleanContent
          .replace(/"\s*\+\s*"/g, '')
          .replace(/'\s*\+\s*'/g, '');
      }
      
      // Remove HTML attributes with quotes that break JSON
      cleanContent = cleanContent.replace(/(\s+\w+)=\\\\?"[^"]*\\\\?"/g, '');
      cleanContent = cleanContent.replace(/(\s+\w+)=\\"[^"]*\\"/g, '');
      
      articleData = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.error("Content preview:", content.substring(0, 500));
      return new Response(
        JSON.stringify({ error: "Falha ao processar resposta da IA. Tente novamente." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Article generated successfully:", articleData.title);

    return new Response(
      JSON.stringify({ article: articleData }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error generating blog article:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
