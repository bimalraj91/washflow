# WashFlow — marketing site

Marketing website for WashFlow, car wash management software.

- Next.js 16 (App Router) · React 19 · TypeScript · SCSS Modules
- GSAP + ScrollTrigger, Lenis, Framer Motion, Recharts

## Develop

```bash
npm install
npm run dev
```

## Configure

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used for metadata, sitemap and JSON-LD (defaults to `https://washflow.app`) |

Subscription plans and prices live in `src/lib/plans.ts` (placeholders). All product screens use demo data from `src/lib/mockData.ts`.
