# AI Workflow — agent instructions

This repository holds **versioned SDLC skills** (markdown workflows) for AI-assisted product and engineering work. Follow the **phase order** when the user is driving a full flow; otherwise use the skill that matches the request.

## Artifact locations (defaults)

| Artifact | Path |
|----------|------|
| Wishlist | `docs/wishlist.md` |
| PRD | `docs/prd.md` |
| PRD validation | `docs/prd-validation.md` |
| Stories | `docs/stories/*.md` |
| Architecture | `docs/architecture.md` |
| Testing guide | `docs/testing-guide.md` (read before **`test-story`**) |
| Test plans | `docs/test-plans/<slug>.md` (from **`create-testplan`**) |

If the project already uses different paths, follow the repo and say so in chat.

## SDLC phase order

1. **create-wishlist** — interactive wishes → `docs/wishlist.md`
2. **create-prd** — structured PRD → `docs/prd.md`
3. **validate-prd** — review → `docs/prd-validation.md`
4. **create-story** — one file per story under `docs/stories/`
5. **validate-story** — one story at a time → `docs/stories/<slug>-validation.md`
6. **check-story-size** — split / order → `docs/stories/<slug>-sizing.md` (default)
7. **create-testplan** — plan regression, UAT, integration, and other test types → `docs/test-plans/<slug>.md` (when formal QA planning is needed)
8. **implement-story** — code per story using **`docs/architecture.md`**
9. **test-story** — run/add tests, fix story-scope failures → `docs/stories/<slug>-test.md`

## Skill definitions (source of truth)

Each skill is a folder with `SKILL.md`. **Read the matching file** when executing that phase:

| Skill | File |
|-------|------|
| create-wishlist | `skills/create-wishlist/SKILL.md` |
| create-prd | `skills/create-prd/SKILL.md` |
| validate-prd | `skills/validate-prd/SKILL.md` |
| create-story | `skills/create-story/SKILL.md` |
| validate-story | `skills/validate-story/SKILL.md` |
| check-story-size | `skills/check-story-size/SKILL.md` |
| create-testplan | `skills/create-testplan/SKILL.md` |
| implement-story | `skills/implement-story/SKILL.md` |
| test-story | `skills/test-story/SKILL.md` |

Cursor also discovers the same folders under `.cursor/skills/`; Claude Code can load `.claude/skills/`. **After editing `skills/`, run `node scripts/sync-skills.js`** so mirrors stay aligned before you commit.

## Operating rules

- Prefer **small, reviewable** outputs; do not merge conflicting requirements silently.
- **implement-story** must treat **`docs/architecture.md`** as the technical contract; surface conflicts instead of overriding.
- **test-story** must read **`docs/testing-guide.md`** before running tests or adding new ones.
- **test-story** must map **acceptance criteria** to tests or document gaps explicitly.
