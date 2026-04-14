# Testing guide

> The **`test-story`** skill must read this file **before** mapping acceptance criteria, running commands, or adding tests. Guidelines below match **[architecture.md](architecture.md)**: **React 19.2**, **Vite 7.3.x**, **Vitest** (latest), **Tailwind CSS** (latest), **React Compiler**, **Node.js > 24.0**.

## Where tests live

- **Unit / component tests:** colocated `src/**/*.{test,spec}.{ts,tsx}` (or a single `tests/` tree—stay consistent with the repo).
- **Integration / E2E:** (add when introduced, e.g. Playwright under `e2e/`—not required by the stack above).
- **Formal QA plans:** `docs/test-plans/` — from **`create-testplan`**. Each plan must include a **test-to-feature matrix** (test case **TC-*** ↔ story **feature** ↔ **AC**). When executing **`test-story`**, mirror that mapping in the story’s **`-test.md`** report so results stay **test-to-feature** aligned.

## Commands

Run from the repository root with **Node.js > 24.0** (match CI).

- **Full suite:** `npm test` or `pnpm test` or `npx vitest run` (use whatever the project wires in `package.json`).
- **Watch mode:** `npx vitest` (or `npm run test -- --watch` if scripted).
- **Single file:** `npx vitest run path/to/File.test.tsx`
- **Coverage (if enabled):** `npx vitest run --coverage`

## Vitest + Vite alignment

- Prefer **`vitest/config`** `defineConfig` and **`mergeConfig`** with **`vite.config.ts`** so aliases, `define`, React plugin, Tailwind pipeline, and **React Compiler** babel/plugin steps match production as closely as tests need. If `vite.config.ts` is a function, pass the same `configEnv` into both Vite and `mergeConfig` (see [Vitest config: merge with Vite](https://vitest.dev/config/#configuration)).
- Set **`test.environment`** to **`jsdom`** or **`happy-dom`** for React component tests; use **`node`** for pure utilities.
- Use **`setupFiles`** (e.g. `src/test/setup.ts`) for **@testing-library/jest-dom** matchers, `cleanup` if not using fresh `document` per test, and global test configuration.
- Enable **`globals: true`** only if the team wants `describe` / `it` / `expect` without imports; otherwise import from **`vitest`** explicitly for clarity.

## React 19 + React Testing Library

- **Assert what users see and do:** prefer **[Queries priority](https://testing-library.com/docs/queries/about#priority)**—`getByRole`, `getByLabelText`, then text; avoid `container.querySelector` unless there is no accessible handle.
- **User events:** use **`@testing-library/user-event`** (async) over fire-and-forget `fireEvent` except for trivial cases.
- **Async UI:** use **`findBy*`** / **`waitFor`** with specific assertions; no fixed `setTimeout` sleeps.
- **Suspense / concurrent-ish flows:** use RTL patterns that wait for final UI; avoid depending on intermediate render counts.

## React Compiler and tests

- **Do not assert** on number of renders, `useMemo`/`useCallback` identity, or “memoization” behavior—the compiler changes how optimization happens.
- **Do assert** on **observable output**: DOM, callbacks invoked, props-driven behavior, and error boundaries if applicable.
- If a test **requires** a non-compiled build, isolate it and document why; default path is **same transform pipeline as dev/build**.

## Tailwind CSS

- **Do not** assert on long Tailwind **class strings** on DOM nodes unless the AC explicitly requires a token or variant (brittle and couples tests to markup).
- Prefer **roles, names, and visible text**; for visual regression, use a dedicated tool (e.g. Chromatic) if the team adopts it—not `toHaveClass` spam.
- When testing **conditional styling**, assert **behavior** (e.g. disabled button cannot be clicked) or **state** exposed via `aria-*`, not the exact utility classes.

## Mocking (`vi`)

- Use **`vi.mock()`** for modules; **`vi.spyOn`** for individual exports. Reset between tests with **`vi.clearAllMocks`** / project defaults (`clearMocks`, `restoreMocks` in Vitest config).
- **Timers:** `vi.useFakeTimers()` only when needed; always `vi.useRealTimers()` in `afterEach` if enabled.
- **Network:** prefer **`MSW`** for fetch-level integration in Node/jsdom when tests need stable HTTP; avoid real network I/O in unit tests.

## Conventions

- **File naming:** `*.test.ts` / `*.test.tsx` next to source, or `*.spec.tsx`—one convention per repo.
- **Describe blocks:** name by **behavior** or **component + scenario**, not implementation details.
- **Coverage:** if enforced, exclude `*.config.*`, generated files, and pure re-exports; don’t chase 100% at the cost of meaningful assertions.

## Quality bar for new tests

- One **clear user-observable** outcome per test when testing UI.
- Avoid **flaky** patterns: real network, `Date.now()` without mocking, unordered list assertions without sorting.
- Align names and structure with **story acceptance criteria** so `docs/stories/<slug>-test.md` can cite **test file + case** directly.

## What not to do

- Do not lower TypeScript strictness or ESLint rules only to green tests.
- Do not delete tests without replacing **behavior coverage** or an explicit product decision to drop that behavior.
- Do not run tests on **Node < 24** if the architecture requires Node > 24—fix the environment instead.
