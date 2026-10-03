# Contribuindo com Edital TCDF

Este fork mantém a estrutura colocalizada do Studio Admin e usa React 19, TypeScript, Tailwind v4, Shadcn, Vinext e Cloudflare D1/SQLite. Leia o README para executar localmente e para os requisitos de autenticação de produção.

## Fluxo

1. Crie uma branch a partir da `main` atual.
2. Instale com `npm ci`, compile, aplique as migrations locais e execute `npm run dev`.
3. Mantenha a V1 focada em dashboard e edital verticalizado. Não invente métricas, perfis ou conteúdo programático.
4. Preserve os componentes em `src/components/ui/` e `src/components/calendar/`; componha no local de uso.
5. Rode `npm run check:types`, `npm run test:catalog`, `npm run build` e `npm run db:migrate` conforme as mudanças.
6. Abra um PR em rascunho, descrevendo mudanças, testes e limites. Inclua capturas de desktop/mobile quando conseguir verificá-las.

Husky executa checagem TypeScript, testes de catálogo e regressão dos checkboxes antes de commits locais. A instalação usa `prepare`; em automações que deliberadamente não precisam de hooks, use `HUSKY=0`. Os checks de CI são independentes dos hooks.

## Organização

- `src/app/(main)/dashboard/edital/`: shell, dashboard de estudos, página de matéria e estados do cliente.
- `src/lib/study/`: JSON integral fornecido, tipos e cálculo hierárquico.
- `src/app/api/study/progress/`: leitura e atualização privada do progresso.
- `db/schema.ts` e `drizzle/`: esquema e migrations incrementais.
- `build/`: adapter Worker e helper de autenticação somente para desenvolvimento local.
- `.openai/hosting.example.json`: bindings lógicos sem identidade de hospedagem. O arquivo real `hosting.json` é local e ignorado.

Não commite bancos, dados de usuários, arquivos `.env`, credenciais, IDs de hospedagem, `.wrangler`, `.sites-runtime`, builds ou `node_modules`. Não reescreva migrations aplicadas nem altere dados antigos para preencher exemplos.

Mantenha strings, numeração e notas do JSON fornecido. Uma atualização de conteúdo precisa de fonte explícita; não corrija silenciosamente redações legais ou acrescente tópicos não enviados. O material desta versão não foi conferido de forma independente com o edital oficial.
