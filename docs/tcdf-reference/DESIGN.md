# DESIGN — Edital Verticalizado TCDF

## Direção visual

A interface deve parecer uma ferramenta de estudo séria, limpa e silenciosa. O conteúdo do edital é o protagonista. O design deve reduzir carga cognitiva, não competir com ela.

### Princípios

1. **Hierarquia antes de decoração.**
2. **Poucas cores e estados claros.**
3. **Nenhuma métrica, perfil ou informação fictícia.**
4. **Sidebar curta e funcional.**
5. **Cards apenas quando agrupam informação útil.**
6. **Tópicos longos devem continuar confortáveis de ler.**
7. **A interface precisa funcionar em 1366px sem parecer espremida.**

## Paleta

- Canvas: `#F7F8FA`
- Surface: `#FFFFFF`
- Border: `#E5E7EB`
- Text primary: `#111827`
- Text secondary: `#6B7280`
- Accent: `#2563EB`
- Accent soft: `#EFF6FF`
- Success: `#059669`
- Success soft: `#ECFDF5`
- Disabled/Coming soon: `#9CA3AF`

Evitar múltiplos azuis concorrentes, preto absoluto em grandes áreas, badges coloridos em excesso e semáforo visual sem função.

## Tipografia

- UI: `Inter`, fallback `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Títulos: mesma família, peso 650–700
- Corpo: 14–15px, `line-height` 1.5–1.65
- Tópicos: 14px ou 15px com largura confortável

Não usar fonte monoespaçada para números comuns do edital. Numeração de tópico deve ser apenas semibold.

## Layout desktop

- Sidebar: 232px
- Conteúdo: fluido, `max-width: 1180px`
- Gutter: 24px
- Topbar: 64px
- Conteúdo principal sem painel lateral direito

A tela não deve ter três colunas permanentes. O painel direito do Stitch original adicionava ruído e diminuía a área útil do edital.

## Sidebar

Itens:

- Dashboard
- Edital Verticalizado
- Questões e Simulados — `Em breve`
- Discursivas — `Em breve`

Nada de Jurisprudência, Metas, perfil fictício, sincronização em nuvem ou filtros que não existam na V1.

## Dashboard

O dashboard deve responder rapidamente:

1. Quanto do edital foi estudado?
2. Quais matérias estão mais ou menos avançadas?
3. Qual matéria devo abrir?

Elementos:

- progresso geral;
- itens estudados / total;
- cards compactos por matéria;
- agrupamento por seção.

## Edital verticalizado

A página da matéria deve conter:

- breadcrumb simples;
- título curto da matéria;
- progresso;
- contador `x de y itens`;
- árvore hierárquica;
- checkboxes;
- estado indeterminado nos pais.

### Linha de tópico

- checkbox à esquerda;
- número e texto;
- filhos indentados;
- sem chips de revisão, questões, resumos ou tags que pertençam à V2.

### Estado concluído

- checkbox preenchido em azul;
- texto permanece legível;
- opcional: cor secundária mais suave;
- não riscar texto, porque o conteúdo continua sendo referência de estudo.

## Matérias — nomes de exibição

1. Português
2. LODF
3. Política para Mulheres
4. Primeiros Socorros
5. RLM e MF
6. Lei Orgânica TCDF
7. Direito Constitucional
8. Direito Previdenciário
9. Direito Civil
10. Direito Tributário
11. Dados, Estatística e IA
12. Direito Administrativo
13. AFO
14. Adm Geral e Pública
15. RJU DF
16. Contratos

## Responsividade

### Desktop >= 1024px

Sidebar fixa e conteúdo principal.

### Tablet 768–1023px

Sidebar recolhível ou rail compacto.

### Mobile < 768px

- navegação por drawer;
- cards em uma coluna;
- seletor de matéria;
- indentação reduzida em níveis profundos;
- sem rolagem horizontal da página.

## Anti-padrões removidos do Stitch original

- nome de produto fictício “TCDF Fiscal Focus”;
- cargo/especialidade inventados;
- perfil e e-mail fictícios;
- contagem regressiva sem dado real;
- “Edital publicado” como badge decorativo;
- painel lateral de filtros/revisões/metas sem função na V1;
- múltiplas cores sem necessidade;
- cards muito densos com metadados inventados;
- barra superior congestionada;
- duplicação de navegação;
- 3 colunas permanentes que comprimem o conteúdo.
