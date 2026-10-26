# Clubstride Rugga

Rugby club platform (Next.js App Router), adapted from the Clubstride Football app. The product specification in `PROMPT.md` is converted to rugby: numbered rugby positions, 15/12/10/7-a-side match shapes, rugby field markings, and a rugby drill library with SA Rugby licence levels.

```bash
npm install
npm run dev
```

Open http://localhost:3000 and choose Developer, Club admin, Head coach, or Player. A developer sees every registered club and its balances; the other roles are scoped to the club that was open when they signed in. The official rugby drill library is included. The imported players start on U12 Prem, and each one can be edited. Other age groups start empty. Club records are saved in this browser.

The static build targets the `/Clubstride-Rugga/` base path. This repo has no GitHub remote or Pages site yet.

This app is a static export, so `npm run build` does not need secrets. Supabase credentials stay optional; see `.env.example`.

## Supabase

`main` added the club schema in `supabase/migrations/20261003120000_initial_schema.sql` (tables, row level security, and a signup trigger). The screens in this branch do not call that database yet. They keep the club in the browser. Apply the migration when a server connection is wired up:

```bash
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
```

The migration does not insert auth users. Copy `.env.example` to `.env.local` only for that later connection.
