# Edital TCDF · SQLite

Aplicação de acompanhamento de estudos baseada no Studio Admin/Shadcn e na especificação visual fornecida. O conteúdo é o edital verticalizado enviado pelo usuário: 16 matérias, 3 seções, 298 nós e 234 itens-folha.

## O que funciona

- Dashboard com progresso geral e por matéria, agrupado por seção.
- Árvore de tópicos, checkboxes de pais e filhos e estado indeterminado.
- Marcar um tópico-pai altera seus itens-folha em uma transação; pais não entram duas vezes nos percentuais.
- Progresso persistido em SQLite, isolado pelo identificador autenticado do usuário.
- Layout responsivo, drawer no celular/tablet, seletor de matéria e tipografia Inter local.
- Questões e Simulados e Discursivas aparecem como “Em breve”, sem ações falsas.
- Os módulos anteriores de tarefas e usuários continuam em `/dashboard/tasks` e `/dashboard/users`. Seus dados não são apagados. As demonstrações antigas redirecionam para o dashboard de estudos.

## Executar localmente

Requisitos: Node.js 24 LTS e npm. Nenhuma chave de API ou conta Cloudflare é necessária para desenvolvimento local.

```sh
npm ci
npm run build
npm run db:migrate
npm run dev
```

Abra `http://localhost:5173/signin-with-chatgpt?return_to=/dashboard/default`. No desenvolvimento, o helper de autenticação funciona **somente em loopback** e usa uma conta fictícia local de teste (`local_seedy`). Essa simulação não entra no build de produção. O primeiro `npm ci` cria `.openai/hosting.json` a partir do exemplo de bindings, sem identificar nenhum Site real.

O SQLite local fica em `.wrangler/state/`, fora do Git. Encerrar e reabrir o servidor preserva as marcações. `npm run db:migrate` registra as migrations aplicadas e pode ser repetido com segurança. Não remova essa pasta se quiser manter os dados locais.

`npm start` inicia uma prévia do Worker compilado; ela não emula login. Use `npm run dev` para o fluxo local completo de navegador.

## Adaptação de runtime e hospedagem

Esta versão mantém a estrutura de rotas e componentes Next/App Router, mas usa **Vinext + Cloudflare Workers** para executar o mesmo aplicativo do Site. Isso substitui os comandos `next dev/build` do template original; não é um export estático nem uma aplicação Node com `better-sqlite3`.

A persistência usa a API **D1**, que executa SQLite. Localmente, Miniflare mantém o arquivo SQLite; na hospedagem, um binding D1 chamado `DB` fornece o armazenamento durável. O UUID em `wrangler.local.json` é um placeholder de desenvolvimento, não um recurso remoto. Nenhum ID de Site, credencial, banco de usuário, build ou configuração pessoal está incluído neste repositório.

A produção atual foi projetada para hospedagem privada com um gateway autenticador confiável. O servidor usa os headers `oai-authenticated-user-id` e `oai-authenticated-user-email`, fornecidos pelo gateway do Sites. Esse gateway deve autenticar a requisição e remover quaisquer headers de identidade enviados pelo cliente. **Não publique o Worker diretamente na internet confiando nesses headers sem implementar um gateway equivalente ou outro mecanismo de autenticação verificado.** O repositório não cria contas, grants OAuth ou credenciais de produção.

Para publicar como Site, registre seu próprio projeto e mantenha o `project_id` no arquivo local ignorado `.openai/hosting.json`. Outra hospedagem exige adaptar autenticação e o binding SQLite/D1. A antiga configuração Vercel que redirecionava todo tráfego para a demonstração upstream foi removida; não há publicação Vercel pronta nesta versão.

## Modelo de dados

- `src/lib/study/syllabus.json`: fonte integral fornecida pelo usuário.
- `src/lib/study/catalog.ts`: nomes curtos de exibição, hierarquia e cálculo sobre folhas.
- `study_progress`: chave composta `(owner_id, topic_id)`, estado e data de atualização.
- IDs de tópico seguem `slug-da-materia:numero-do-topico`; itens coincidentes mantêm IDs estáveis.
- `tasks` e `members`: tabelas anteriores preservadas, sem reset ou seed automático.

Todas as consultas usam prepared statements. O servidor valida tópicos/booleanos, rejeita propriedade definida pelo cliente e bloqueia escritas de outra origem. As marcações só aparecem como salvas após confirmação do servidor; erros preservam o estado anterior.

Migrations em `drizzle/` são incrementais. Não reescreva migrations já aplicadas. Para mudar o esquema, edite `db/schema.ts`, execute `npm run db:generate`, revise o SQL e aplique a nova migration. O catálogo é versionado no código; não há importador de editais pelo navegador nesta V1.

## Conteúdo e validação

Textos, acentos, números, hierarquia, cargo e notas foram mantidos como enviados, inclusive a redação original. Não houve conferência independente com o edital oficial. Percentuais e checkboxes ilustrativos do protótipo não foram importados.

```sh
npm run check:types
npm run test:catalog
npm run test:checkbox
npm run build
npm run db:migrate
```

O teste de catálogo valida as 16 matérias, 298 nós, 234 folhas, nomes, notas, cargo, níveis profundos e estados mistos. Os fluxos HTTP/SQLite também foram testados localmente: leitura, marcação de pais/filhos, desfazer marcações, isolamento por conta, falhas de armazenamento e persistência após desligar e reiniciar o processo. A revisão visual em navegador/dispositivo não pôde ser executada no ambiente utilizado.

## Licença

O template original segue a licença MIT, preservada em `LICENSE`, copyright Mohammed Arham Khan. As fontes e o helper de desenvolvimento preservam suas licenças. `docs/tcdf-reference/` contém a referência visual enviada.
