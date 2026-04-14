# Testing guide

> Fill this in for your product. The **`test-story`** skill requires reading this file **before** mapping acceptance criteria to tests or running commands, so expectations stay consistent across contributors and AI sessions.

## Where tests live

- Unit tests: (paths, e.g. `tests/`, `src/**/*.test.ts`)
- Integration / E2E: (paths, tooling)
- Formal QA plans (regression, UAT, etc.): `docs/test-plans/` — produced by **`create-testplan`**; keep automation conventions here and strategy there aligned.

## Commands

- Full suite: (e.g. `npm test`, `pnpm test`, `pytest`, `go test ./...`)
- Single file / pattern: (examples)
- Watch mode (if used):

## Conventions

- Test file naming: (e.g. `*.test.ts`, `test_*.py`)
- Frameworks: (Jest, Vitest, pytest, Go table tests, …)
- Mocking / fixtures: (where they live, libraries to use)
- Coverage: (thresholds or “not enforced”)

## Quality bar for new tests

- Prefer **one obvious assertion per concern**; group related cases in describe blocks / classes.
- Avoid **flaky** patterns: real network, wall-clock sleeps, unordered collections without sorting.
- Align test names and structure with **story acceptance criteria** so `docs/stories/<slug>-test.md` can cite them clearly.

## What not to do

- Do not lower lint or type strictness only to green tests.
- Do not delete tests for passing coverage without replacing behavior checks.
