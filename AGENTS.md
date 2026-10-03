# AGENTS.md

## Project overview

Edital TCDF is a private study tracker based on the MIT Studio Admin template. It uses React 19, TypeScript, Tailwind CSS v4 and shadcn/ui with Next-style App Router routes running through Vinext on Cloudflare Workers. Persistence is SQLite through D1; local Miniflare writes to ignored `.wrangler/state`.

Read README.md and CONTRIBUTING.md before changes. The original design direction is retained in docs/tcdf-reference/DESIGN.md. The full user-provided source is src/lib/study/syllabus.json. Do not invent syllabus items, progress, profiles or metrics.

## UI and structure

- Inspect local UI wrappers before use; they use the shadcn radix-nova style and may wrap different primitives.
- Do not modify files inside src/components/ui/ or src/components/calendar/. Compose and style components at their call sites.
- Keep feature pages, components and logic colocated under src/app/(main)/dashboard/edital/.
- Keep shared calculation and source mapping under src/lib/study/.
- Preserve the short four-item navigation, restrained palette, readable topic text, mobile drawer and hierarchical checked/indeterminate states.
- Progress counts leaf nodes only. Parent nodes derive their state from descendants. Never strike through reference text.
- Preserve literal source text, numbering, role, notes and hierarchy. Changes to content require an explicit source.

## Setup and checks

Use Node.js 24 and npm. Run npm ci, npm run build, npm run db:migrate, then npm run dev. See README.md for loopback-only development sign-in and production gateway requirements.

Applicable checks are npm run check:types, npm run test:catalog, npm run build and npm run db:migrate. Run relevant checks after changes. Do not claim browser/device verification when it was unavailable. Do not run broad formatting or unrelated refactors as part of a focused change.

Husky checks TypeScript, catalogue and checkbox regressions before local commits. The GitHub Actions workflow also checks types, catalogue, checkbox regressions, build and local migrations.

## Persistence and security

- All product state must remain server-side; localStorage is not a source of truth for study progress.
- Scope every progress query and mutation to the server-authenticated owner ID. Never accept ownership from the client.
- The hosted app requires a trusted authentication gateway that strips incoming identity headers and supplies verified ones. A direct public Worker is not an equivalent security boundary.
- Keep database access behind the existing helper and use prepared statements. One prepared SQL statement per prepare() call; use an atomic batch for descendant updates.
- Append migrations after schema changes. Never rewrite an applied migration or reset existing tasks, members or study progress.
- Do not commit real Site IDs, tokens, user data, local databases, generated builds, node_modules, .env files or runtime state. Only the generic hosting.example.json belongs in source control.

## Code conventions

Use strict TypeScript and precise types, existing @/ aliases, semantic markup, accessible labels and keyboard behavior. Prefer existing utilities and primitives over new dependencies. Keep loading/error states clear and preserve confirmed state when a save fails.

Use conventional commit prefixes and open pull requests in draft unless the user explicitly requests otherwise. Explain any runtime/dependency changes and the checks that actually ran.
