# TrustPlane — Infrastructure Console UI Prototype

## Overview

A static, UI-only prototype of an infrastructure-grade control-plane console. Inspired by Stripe, AWS, and Cloudflare console aesthetics. No backend, no API calls, no real authentication.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (dev server on port 5000, `host: 0.0.0.0`, `allowedHosts: true`)
- **Tailwind CSS** (utility-first, custom CSS variables for theming)
- **Lucide React** (iconography)

## Project Constraints (Strict)

### Scope
- UI only — no backend logic, no API calls, no authentication flows, no database connections.
- Static placeholder data only. No fake workflows, no mock persistence.

### Layout Architecture
- Preserve the existing AppShell: Sidebar + Header + ContextBar + Content area.
- Do NOT redesign the layout hierarchy or introduce new layout systems.

### Context Bar
- Keep the existing global context strip (org / environment / system status).
- Treat as placeholder UI only. Do NOT remove or redesign it.

### Navigation
- Navigation behaves like real multi-page routing (context-based, not URL-based).
- Do NOT convert pages into tabbed single-page views.
- Maintain current sidebar structure.

### Design Style
- Infrastructure-grade operational UI only.
- No consumer SaaS styling, gradients, glass effects, shadows, or decorative visuals.
- Avoid rounded card layouts and marketing-style components.
- Prefer flat surfaces, dividers, tables, and dense information layouts.

### Data Density
- Favor tables, lists, and structured rows over large empty panels.
- Avoid oversized components or excessive spacing.

### Placeholder Policy
- All content should be clearly placeholder/static.
- Do NOT imply real system state or real user data.
- Do NOT generate fake "smart" behaviors.

### Stability
- Do NOT refactor styling, spacing, or structure unless explicitly requested.
- Do NOT introduce new features without request.
- Do NOT modify existing pages beyond what is necessary.

## Architecture

### Navigation System (`src/contexts/NavigationContext.tsx`)
- State-driven routing via `currentPage: PageId` and `currentDomain: DomainId`.
- `DomainId`: `'core' | 'trust' | 'verification' | 'developers' | 'account' | 'admin'`
- Secondary sidebar appears when a domain is active (e.g., `trust`, `verification`).

### Page Registration (`src/App.tsx`)
Pages are registered in the `pageConfig` record mapping `PageId` → `{ title, breadcrumbs, content }`.

### Sidebar (`src/components/Sidebar.tsx`)
Nav items with a `domain` property trigger the secondary sidebar when clicked.

## Pages

| Page ID | Title | Notes |
|---|---|---|
| `dashboard` | Dashboard | Main landing page |
| `verification` | Verification | Hub — lists all verification methods |
| `verification-email` | Email Verification | Detail page |
| `verification-phone` | Phone Verification | Detail page |
| `verification-identity` | Identity Verification | Detail page |
| `activity` | Activity Log | Event log table |
| `trust-profile` | Trust Profile | Score + signals + capabilities |
| `trust-signals` | Trust Signals | Signal breakdown |
| `trust-timeline` | Trust Timeline | Historical trust events |
| `trust-integrity` | Integrity | Integrity checks |
| `trust-capabilities` | Capabilities | Feature flags by trust level |
| `developers-overview` | Developer Overview | Placeholder |
| `api-keys` | API Keys | Key management table |
| `settings` | Settings | Placeholder |
| `profile` | Profile | Placeholder |
| `public-profile` | Public Profile | Public trust identity surface |
| `security` | Security | Placeholder |
| `preferences` | Preferences | Placeholder |
| `reviews` | Reviews | Placeholder |
| `system` | System | Placeholder |

## Running

```bash
npm install
npm run dev   # http://localhost:5000
```
