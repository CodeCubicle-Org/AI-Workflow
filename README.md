# AI Workflow Workshop

Materials for the **AI Workflow** workshop by [CodeCubicle.ch](https://codecubicle.ch) and [ProAgile.se](https://proagile.se).

This repository is a **portable SDLC playbook**: reusable **skills** (markdown workflows) that guide an AI assistant from early discovery through implementation and verification. The same skill definitions work across **Cursor**, **OpenAI Codex CLI**, **Claude Code**, and **Google Gemini CLI**—each tool loads shared project instructions and, where supported, discovers individual skills on disk.

Canonical skill definitions live under **`skills/<skill-name>/SKILL.md`**. [AGENTS.md](AGENTS.md) is the shared index: phase order, default file paths, operating rules, and links to every skill.

## What is in the repo

| Item | Description |
|------|-------------|
| [AGENTS.md](AGENTS.md) | Root instructions for coding agents: artifact locations, SDLC order, and pointers to each skill. **OpenAI Codex CLI** loads this automatically when you work in the repo (plus optional global rules under `~/.codex/`). |
| [CLAUDE.md](CLAUDE.md) | **Claude Code** entry point; pulls in shared content via `@AGENTS.md` so project rules stay in one place. |
| [GEMINI.md](GEMINI.md) | **Gemini CLI** entry point; includes `@AGENTS.md`. You can also add `AGENTS.md` to `context.fileName` in Gemini settings for tools that only read that filename. |
| [docs/architecture.md](docs/architecture.md) | **Technical contract** for implementers: pinned stack (**React 19.2**, **Vite 7.3.x**, **Vitest** latest, **Tailwind CSS** latest, **React Compiler**, **Node.js > 24** for app/CI/tests), repo layout, NFRs, and boundaries. **`implement-story`** and **`check-story-size`** rely on it. |
| [docs/testing-guide.md](docs/testing-guide.md) | How to run and write tests for that stack (Vitest + Vite `mergeConfig`, RTL, React Compiler–safe assertions, Tailwind-friendly checks). **`test-story`** must read this **before** any test work. It also states that formal **test plans** use a **test-to-feature matrix**, and story **`-test.md`** reports should mirror **TC ↔ feature ↔ AC** when a plan exists. |
| `skills/<name>/SKILL.md` | Source-of-truth instructions per workflow (wishlist → PRD → stories → test planning → code → tests). Edit here first. |
| `.cursor/skills/` · `.claude/skills/` | Mirrored copies of `skills/` so **Cursor** and **Claude Code** can list and invoke skills without custom paths. |
| [scripts/sync-skills.js](scripts/sync-skills.js) | Cross-platform Node script: copies `skills/` into `.cursor/skills` and `.claude/skills`. Run after skill changes, before commit. Requires Node.js **16.7+** (script only; the **application** toolchain in [docs/architecture.md](docs/architecture.md) expects **Node > 24**). |

### Test-to-feature traceability

Planning and execution stay aligned when:

1. **`create-testplan`** (one story per file) copies the story’s **summary** and **acceptance criteria**, derives **feature bullets (F1, F2, …)**, and fills a **required matrix**: each test case **TC-*** maps to a **feature id** and an **AC number**. Detail sections under test types may only reference **TC-ids** from that matrix—no orphan tests.
2. **`test-story`** maps results back: in **`docs/stories/<slug>-test.md`**, coverage tables include **AC #**, **feature (F#)**, optional **plan TC-id**, and evidence (test file / name). If **`docs/test-plans/<slug>.md`** exists for the story, use its matrix as the checklist.

See the skills **`create-testplan`** and **`test-story`** for full rules and templates.

### Generated and maintained docs (typical paths)

Skills write or update these unless your team standardizes different locations:

| Area | Typical path |
|------|----------------|
| Wishes | `docs/wishlist.md` |
| Product requirements | `docs/prd.md` |
| PRD review | `docs/prd-validation.md` |
| Backlog items | `docs/stories/*.md` |
| Story reviews / sizing / test reports | `docs/stories/<slug>-validation.md`, `-sizing.md`, `-test.md` |
| QA strategy (per story, matrix **TC ↔ feature ↔ AC**) | `docs/test-plans/<slug>.md` |

## SDLC phases (skills)

Use the sequence below for an end-to-end run, or open a single skill when that is all you need.

| Step | Skill | What it does |
|------|--------|----------------|
| 1 | `create-wishlist` | Interactive capture of stakeholder wishes → structured `docs/wishlist.md`. |
| 2 | `create-prd` | Builds a traceable PRD with quality gates → `docs/prd.md`. |
| 3 | `validate-prd` | Structured PRD review → `docs/prd-validation.md` (verdict and fixes). |
| 4 | `create-story` | Splits work into one markdown file per story under `docs/stories/`. |
| 5 | `validate-story` | Reviews a single story for clarity and testability. |
| 6 | `check-story-size` | Decides if a story should be split and suggests execution order. |
| 7 | `create-testplan` | **One story at a time:** writes `docs/test-plans/<slug>.md` with **mandatory test-to-feature traceability**—features **F***, acceptance criteria, and a **TC-*** matrix (regression, UAT, integration, **contract testing**, etc.). Every planned test links to **feature + AC**; wider release scope only if explicitly requested. |
| 8 | `implement-story` | Implements one story in code, following **`docs/architecture.md`**. |
| 9 | `test-story` | Reads **`docs/testing-guide.md`** first; runs or adds tests; writes **`docs/stories/<slug>-test.md`** with **AC / feature / TC-id** coverage aligned to the story (and to **`docs/test-plans/`** when present). |

## How to use the skills

### Cursor

Skills are read from **`.cursor/skills/<skill-name>/SKILL.md`**. In Agent chat, run **`/<skill-name>`** (e.g. `/create-prd`) or attach the skill with **`@`**. See [Cursor: Skills](https://cursor.com/docs/context/skills).

### OpenAI Codex CLI

Codex merges **[AGENTS.md](AGENTS.md)** into context for the repo. For step-by-step behavior, open or reference **`skills/<skill-name>/SKILL.md`** for that phase. See [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md/).

### Claude Code

**[CLAUDE.md](CLAUDE.md)** loads first; skills also live under **`.claude/skills/`**. See [Claude Code: memory](https://code.claude.com/docs/en/memory).

### Google Gemini CLI

**[GEMINI.md](GEMINI.md)** at the repo root supplies project context; see [GEMINI.md context files](https://google-gemini.github.io/gemini-cli/docs/cli/gemini-md.html).

## Maintaining the skill files

1. Edit **`skills/<skill-name>/SKILL.md`**.
2. From the repository root: **`node scripts/sync-skills.js`**
3. Commit **`skills/`** together with **`.cursor/skills/`** and **`.claude/skills/`** so clones stay consistent.

---

*(c) by CodeCubicle.ch & ProAgile.se, 2026 — AI Workflow workshop*
