# Quiz Application Development

A production-ready full-stack React application template for building a quiz platform. It uses a modern stack with SPA routing, shared types, and an integrated Express server.

## Tech Stack
- React 18 + TypeScript + Vite
- React Router 6 (SPA)
- TailwindCSS 3
- Express (integrated with Vite in dev)
- Vitest
- Radix UI + Lucide Icons
- PNPM (preferred)

## Getting Started
1. Install pnpm if needed: https://pnpm.io/installation
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the dev server (client + server on a single port):
   ```bash
   pnpm dev
   ```

## Scripts
- `pnpm dev` – Start dev server (client + server)
- `pnpm build` – Build for production
- `pnpm start` – Run production build
- `pnpm typecheck` – TypeScript checks
- `pnpm test` – Run Vitest

## Project Structure
```
client/                   # React SPA frontend
├── pages/                # Route components (Index.tsx = home)
├── components/ui/        # UI library
├── App.tsx               # SPA routing setup
└── global.css            # Tailwind theme

server/                   # Express API backend
├── index.ts              # Express + routes
└── routes/               # API handlers

shared/                   # Shared types
└── api.ts                # Example shared API types
```

## Routing
Routes are defined in `client/App.tsx` using React Router 6. Add new pages under `client/pages/` and register the route in `App.tsx`.

## API
- All endpoints are prefixed with `/api/`
- Example: `GET /api/ping`, `GET /api/demo`
- Share types via `@shared/*`

## Styling
- TailwindCSS 3 utilities
- Theme tokens in `client/global.css`
- UI components in `client/components/ui/`

## Deployment
- Build: `pnpm build`
- You can deploy to Netlify or Vercel. The project includes `netlify.toml` for Netlify functions.

## Notes
- Prefer pnpm for consistency.
- Single-port dev with Vite + Express, full hot reload.
