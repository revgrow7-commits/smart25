# Smart Signage - Documentação Técnica

## 📋 Visão Geral

**Smart Signage** é uma aplicação web moderna para uma empresa de sinalização e displays promocionais. O sistema oferece catálogo de produtos, blog, área administrativa, visualizador de stands e páginas institucionais.

**URL de Produção:** `smart-stand.com.br`

---

## 🏗️ Arquitetura

### Stack Tecnológico

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| React | 18.3.1 | Framework UI |
| TypeScript | - | Tipagem estática |
| Vite | - | Build tool |
| Tailwind CSS | - | Estilização |
| shadcn/ui | - | Componentes UI |
| React Router | 6.30.1 | Roteamento |
| React Query | 5.83.0 | Gerenciamento de estado/cache |
| i18next | 25.6.3 | Internacionalização |
| Supabase | 2.85.0 | Backend (DB, Auth, Storage) |

### Estrutura de Diretórios

```
src/
├── assets/              # Imagens e recursos estáticos
│   └── booths/          # Imagens de stands/booths
├── components/          # Componentes React
│   ├── admin/           # Componentes do painel admin
│   ├── subscription/    # Componentes da página de assinatura
│   ├── training/        # Componentes da escola de treinamento
│   └── ui/              # Componentes shadcn/ui
├── contexts/            # Contextos React (BudgetContext)
├── hooks/               # Custom hooks
├── i18n/                # Configuração de internacionalização
│   └── locales/         # Arquivos de tradução (pt, en, es)
├── integrations/        # Integrações externas
│   └── supabase/        # Cliente e tipos Supabase
├── lib/                 # Utilitários
├── pages/               # Páginas/rotas da aplicação
└── utils/               # Funções utilitárias
```

---

## 📄 Páginas e Rotas

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` | `Index.tsx` | Página inicial com hero, produtos em destaque, FAQ |
| `/catalogo` | `Catalog.tsx` | Catálogo completo de produtos |
| `/produto/:id` | `ProductDetail.tsx` | Detalhes do produto |
| `/blog` | `Blog.tsx` | Lista de artigos do blog |
| `/blog/:slug` | `BlogPost.tsx` | Artigo individual |
| `/visualizador` | `StandVisualizer.tsx` | Visualizador de stands |
| `/clube-assinatura` | `SubscriptionClub.tsx` | Página do clube de assinatura |
| `/escola` | `TrainingSchool.tsx` | Escola de treinamento |
| `/admin` | `Admin.tsx` | Painel administrativo (protegido) |
| `/auth` | `Auth.tsx` | Login/Registro |
| `/acesso-negado` | `AccessDenied.tsx` | Página de acesso negado |

---

## 🗄️ Banco de Dados (Supabase)

### Tabelas

#### `products`
Catálogo de produtos da loja.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID | Identificador único |
| item_code | TEXT | Código do item |
| name | TEXT | Nome do produto |
| description | TEXT | Descrição |
| category_id | UUID | FK para categories |
| price | NUMERIC | Preço |
| is_featured | BOOLEAN | Produto em destaque |
| frame_size | TEXT | Tamanho do frame |
| graphic_size | TEXT | Tamanho do gráfico |
| packing_size | TEXT | Tamanho da embalagem |
| gross_weight | TEXT | Peso bruto |
| pcs_per_ctn | INTEGER | Peças por caixa |
| product_group | TEXT | Grupo do produto |
| video_url | TEXT | URL do vídeo |
| model_3d_url | TEXT | URL do modelo 3D |
| sketchfab_url | TEXT | URL do Sketchfab |
| status | TEXT | Status do produto |
| specifications | JSONB | Especificações técnicas |

#### `product_images`
Imagens dos produtos.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID | Identificador único |
| product_id | UUID | FK para products |
| image_url | TEXT | URL da imagem |
| alt_text | TEXT | Texto alternativo |
| is_primary | BOOLEAN | Imagem principal |
| display_order | INTEGER | Ordem de exibição |

#### `categories`
Categorias de produtos.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID | Identificador único |
| name | TEXT | Nome da categoria |
| slug | TEXT | Slug para URL |
| description | TEXT | Descrição |
| icon | TEXT | Ícone (Lucide) |

#### `blog_posts`
Artigos do blog.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID | Identificador único |
| title | TEXT | Título |
| slug | TEXT | Slug para URL |
| content | TEXT | Conteúdo (HTML) |
| excerpt | TEXT | Resumo |
| featured_image | TEXT | Imagem de destaque |
| author | TEXT | Autor |
| category_id | UUID | FK para blog_categories |
| is_published | BOOLEAN | Publicado |
| published_at | TIMESTAMP | Data de publicação |
| scheduled_at | TIMESTAMP | Agendamento |
| meta_title | TEXT | Título SEO |
| meta_description | TEXT | Descrição SEO |
| keywords | TEXT[] | Palavras-chave |
| reading_time | INTEGER | Tempo de leitura |
| views_count | INTEGER | Contagem de visualizações |

#### `blog_categories`
Categorias do blog.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID | Identificador único |
| name | TEXT | Nome |
| slug | TEXT | Slug |
| description | TEXT | Descrição |
| icon | TEXT | Ícone |
| display_order | INTEGER | Ordem |

#### `hero_images`
Imagens do carrossel hero.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID | Identificador único |
| image_url | TEXT | URL da imagem |
| title | TEXT | Título (opcional) |
| subtitle | TEXT | Subtítulo (opcional) |
| is_active | BOOLEAN | Ativo |
| display_order | INTEGER | Ordem |

#### `user_roles`
Roles de usuários para controle de acesso.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID | Identificador único |
| user_id | UUID | ID do usuário |
| role | app_role | 'admin' ou 'user' |

#### `favorite_prompts`
Prompts favoritos dos usuários.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID | Identificador único |
| user_id | UUID | ID do usuário |
| title | TEXT | Título |
| prompt | TEXT | Conteúdo do prompt |

### Storage Buckets

| Bucket | Público | Uso |
|--------|---------|-----|
| `product-images` | Sim | Imagens de produtos |
| `hero-images` | Sim | Imagens do hero carousel |
| `3d-models` | Sim | Modelos 3D |

### Funções do Banco

- `has_role(user_id, role)` - Verifica se usuário tem determinada role
- `handle_new_user()` - Trigger para criar role padrão em novo usuário
- `update_updated_at_column()` - Trigger para atualizar timestamp

---

## 🧩 Componentes Principais

### Layout

| Componente | Descrição |
|------------|-----------|
| `Navbar` | Navegação principal com menu responsivo |
| `HomeFooter` | Rodapé da página |
| `HeroSection` | Carrossel de imagens hero |

### Produtos

| Componente | Descrição |
|------------|-----------|
| `ProductCatalog` | Grid de produtos com filtros |
| `FeaturedProducts` | Carrossel de produtos em destaque |
| `ComparisonTable` | Tabela comparativa de produtos |
| `BudgetModal` | Modal de orçamento |

### Conteúdo

| Componente | Descrição |
|------------|-----------|
| `FAQ` | Accordion de perguntas frequentes |
| `Testimonials` | Depoimentos de clientes |
| `ContactSection` | Seção de contato |
| `InstagramFeed` | Feed do Instagram |
| `VideoShowcase` | Showcase de vídeos |

### Interativos

| Componente | Descrição |
|------------|-----------|
| `ProductChatbot` | Chatbot de produtos (IA) |
| `ROICalculator` | Calculadora de ROI |
| `AIVisualizer` | Visualizador com IA |
| `ARShowroom` | Showroom em AR |

### Admin

| Componente | Descrição |
|------------|-----------|
| `ProductForm` | Formulário de produto |
| `ProductList` | Lista de produtos |
| `CategoryManager` | Gerenciador de categorias |
| `BlogPostManager` | Gerenciador de posts |
| `HeroImageManager` | Gerenciador do hero |
| `FeaturedProductsManager` | Gerenciador de destaques |
| `ExcelUpload` | Upload de produtos via Excel |

---

## 🔌 Edge Functions (Supabase)

| Função | Descrição |
|--------|-----------|
| `chat-products` | Chatbot para consulta de produtos |
| `generate-blog-article` | Geração de artigos com IA |
| `generate-stand-image` | Geração de imagens de stands |
| `generate-stand-visualization` | Visualização de stands |

---

## 🌐 Internacionalização (i18n)

O projeto suporta 3 idiomas:

- **Português (pt)** - Padrão
- **Inglês (en)**
- **Espanhol (es)**

Arquivos de tradução em: `src/i18n/locales/`

### Uso

```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
return <h1>{t('hero.title')}</h1>;
```

---

## 🔐 Autenticação e Autorização

### Fluxo de Autenticação

1. Usuário acessa `/auth`
2. Login via email/senha (Supabase Auth)
3. Trigger `handle_new_user` cria role padrão
4. Hook `useAdminAuth` verifica permissões

### Proteção de Rotas

```tsx
<ProtectedRoute>
  <Admin />
</ProtectedRoute>
```

### Verificação de Role

```tsx
const { isAdmin, loading } = useAdminAuth();
```

---

## 🛒 Sistema de Orçamento

### BudgetContext

Gerencia itens selecionados para orçamento:

```tsx
const { items, addItem, removeItem, clearItems } = useBudget();
```

---

## 🎨 Design System

### Cores (CSS Variables)

```css
--background: 0 0% 100%;
--foreground: 0 0% 0%;
--primary: 240 5% 6%;
--secondary: 240 4% 16%;
--muted: 0 0% 96%;
--accent: 0 0% 96%;
--destructive: 0 84% 60%;
--border: 0 0% 90%;
```

### Componentes UI (shadcn)

Todos os componentes base estão em `src/components/ui/`:
- Button, Card, Dialog, Dropdown, Form, Input, Select, Table, Tabs, Toast, etc.

---

## 📦 Dependências Principais

```json
{
  "react": "^18.3.1",
  "react-router-dom": "^6.30.1",
  "@tanstack/react-query": "^5.83.0",
  "@supabase/supabase-js": "^2.85.0",
  "i18next": "^25.6.3",
  "react-i18next": "^16.3.5",
  "lucide-react": "^0.462.0",
  "tailwindcss": "latest",
  "framer-motion": "via embla-carousel",
  "recharts": "^2.15.4",
  "xlsx": "^0.18.5",
  "zod": "^3.25.76",
  "react-hook-form": "^7.61.1"
}
```

---

## 🚀 Scripts de Desenvolvimento

```bash
# Desenvolvimento local
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint
```

---

## 🔧 Variáveis de Ambiente

```env
VITE_SUPABASE_URL=https://vlwwedprsjyxsnhponwd.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGc...
VITE_SUPABASE_PROJECT_ID=vlwwedprsjyxsnhponwd
```

### Secrets (Edge Functions)

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GEMINI_API_KEY`
- `LOVABLE_API_KEY`

---

## 📱 Responsividade

O projeto utiliza breakpoints Tailwind:

| Breakpoint | Largura | Uso |
|------------|---------|-----|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Desktop large |
| `2xl` | 1536px | Desktop extra large |

---

## 🔄 Fluxo de Dados

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   React     │────▶│ React Query │────▶│  Supabase   │
│  Component  │◀────│   (Cache)   │◀────│  Database   │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Exemplo de Query

```tsx
const { data: products } = useQuery({
  queryKey: ['products'],
  queryFn: async () => {
    const { data } = await supabase
      .from('products')
      .select('*, product_images(*), categories(*)')
      .eq('status', 'active');
    return data;
  }
});
```

---

## 📝 Convenções de Código

- **Componentes**: PascalCase (`ProductCard.tsx`)
- **Hooks**: camelCase com prefixo `use` (`useAdminAuth.tsx`)
- **Utilitários**: camelCase (`removeBackground.ts`)
- **Estilos**: Tailwind classes inline
- **Estado global**: React Context ou React Query
- **Formulários**: React Hook Form + Zod

---

## 🐛 Debugging

### Console Logs

Acessíveis via DevTools do navegador.

### Network Requests

Todas as chamadas passam pelo cliente Supabase em `src/integrations/supabase/client.ts`.

### Edge Function Logs

Disponíveis no painel Lovable Cloud.

---

## 📚 Recursos Adicionais

- [Documentação Lovable](https://docs.lovable.dev)
- [Documentação Supabase](https://supabase.com/docs)
- [Documentação shadcn/ui](https://ui.shadcn.com)
- [Documentação Tailwind CSS](https://tailwindcss.com/docs)
- [Documentação React Query](https://tanstack.com/query/latest)

---

*Documentação gerada em: Janeiro 2026*
