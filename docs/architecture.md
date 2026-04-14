# Architecture

> **`implement-story`** and **`check-story-size`** treat this file as the **technical** contract (not product wishes; those belong in the PRD).

## System overview

- **Purpose:** (describe the product or workshop app)
- **Primary users / runtime:** Browser (SPA); Node.js only for tooling, build, and tests.

## Tech stack (pinned)

| Layer | Choice | Notes |
|--------|--------|--------|
| **Runtime (app)** | **React 19.2** | Client components by default unless you introduce a SSR framework later. |
| **Build / dev server** | **Vite 7.3.x** | Use the same major.minor line across the team; bump patch freely within 7.3.x. |
| **Node.js** | **> 24.0** | Local dev, CI, and Vitest must use Node 24+ (engines field recommended in `package.json`). |
| **Styling** | **Tailwind CSS** (latest stable) | Utility-first; keep design tokens and plugins documented here when you add them. |
| **Compiler** | **React Compiler** | Enable for the app build so memoization is automatic; follow rules of React—no mutating refs/state in render, no impure render. |
| **Unit / component tests** | **Vitest** (latest stable) | Vite-native runner; align `vitest.config` with `vite.config` (see [testing-guide.md](testing-guide.md)). |

## Repository layout

- `src/` — application source (components, hooks, routes, lib)
- `src/**/*.test.ts` / `src/**/*.test.tsx` — colocated tests (or `tests/` if you standardize that way—pick one and keep it)
- `docs/` — product artifacts (wishlist, PRD, stories, this file, [testing-guide.md](testing-guide.md))

## Key boundaries

- **Core domains / modules:** (list)
- **External integrations:** (APIs, env-specific endpoints)
- **Data stores:** (if any; otherwise N/A)

## Non-functional expectations

- **Security / auth:** (model, secrets via env only)
- **Performance:** (SLOs; React Compiler is not a substitute for lazy loading or code-splitting where needed)
- **Accessibility:** Target **WCAG 2.2** AA for user-facing UI; verify with automated + manual checks per testing guide.
- **Observability:** (logging/metrics if applicable)

## Constraints for implementers

- Use **React 19** patterns (e.g. ref as prop where applicable); do not target legacy React 17 APIs for new code.
- **Vite** is the source of truth for resolve aliases, `define`, and plugins—keep Vitest in sync via `mergeConfig` (see testing guide).
- **Tailwind:** prefer component composition over one-off arbitrary values unless documented.
- **React Compiler:** avoid patterns the compiler cannot optimize safely; run the compiler lint plugin in CI when configured.
- **Do not change without PRD/architecture update:** public routes, env contract, major dependency major-version jumps.

## Open technical decisions

- …
