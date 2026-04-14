---
name: create-testplan
description: >-
  Produces a structured test plan for a chosen scope (release, feature, sprint)
  covering common test types such as regression, UAT, integration, black-box,
  smoke, performance, security, accessibility, and contract testing. Use when the
  user asks for a test plan, QA strategy, UAT plan, regression suite outline, or
  how to validate a change before release.
---

# Create test plan

## Goal

Produce a **written test plan** that teams can execute or automate, aligned to **PRD / stories** and to **`docs/testing-guide.md`** (tooling and conventions) where it exists.

## Inputs

- **Scope:** release version, milestone, epic, or list of story ids (`S-*`) — ask if missing.
- **`docs/prd.md`** and **`docs/stories/*.md`** (as applicable) for traceability.
- **`docs/testing-guide.md`** — respect commands, directories, and quality bar; extend the plan where the guide is silent.
- **`docs/architecture.md`** — environments, integrations, NFRs, and risk hotspots.

## Output

- **Primary:** `docs/test-plans/<slug>.md`  
  Use a **kebab-case slug** (e.g. `release-2-3`, `sprint-42-payment-flow`, `feature-export-csv`).

Create **`docs/test-plans/`** if it does not exist.

## Test types catalog (pick what fits the scope)

Include only types that add value for this scope; list **N/A** with one-line rationale for consciously omitted types.

| Type | Typical purpose |
|------|------------------|
| **Unit** | Fast feedback on isolated logic; usually owned by devs (often overlaps **`test-story`**). |
| **Integration** | Interfaces between modules, services, DB, queues, third-party APIs. |
| **System / E2E** | Full user journeys through the deployed stack (or realistic test env). |
| **Regression** | Ensure existing behavior still works after changes; suite selection strategy. |
| **Smoke / sanity** | Minimal post-deploy checks before deeper testing. |
| **Black-box / functional** | Behavior vs requirements/ACs without knowledge of internals. |
| **White-box / structural** | Coverage of paths, branches, or code-level risks (when justified). |
| **UAT** | Business or user validation against agreed acceptance; roles, scenarios, sign-off. |
| **API / contract** | Schemas, consumer-driven contracts, backward compatibility. |
| **Performance / load / stress** | Latency, throughput, capacity under load (tie to NFRs). |
| **Security** | AuthZ/authN, OWASP-style checks, secrets, dependency scanning scope (not a full pentest unless requested). |
| **Accessibility** | WCAG-oriented checks, keyboard, screen reader critical paths. |
| **Exploratory / charter-based** | Time-boxed sessions with missions and notes template. |
| **Compatibility** | Browsers, OS, devices, or versions matrix. |
| **Data / migration** | Migration scripts, rollback, data integrity after changes. |
| **Resilience / failover** (if relevant) | Degraded modes, retries, idempotency. |

## Document template (`docs/test-plans/<slug>.md`)

```markdown
# Test plan: [title]

## Meta
- Scope:
- Owner / author:
- Last updated:
- Related: PRD version, story ids (S-…), build / release id

## Objectives and out of scope
- …

## References
- docs/prd.md — sections / FR ids
- docs/stories/ — …
- docs/testing-guide.md — …
- docs/architecture.md — environments, integrations

## Test types in scope
(For each selected type: objective, owner, tooling, where results are recorded.)

### [Type name]
- Objective:
- Scope / boundaries:
- Entry criteria:
- Exit criteria:
- Environments / data:
- Traceability: FR-… / S-… / AC …

## Schedule and dependencies
- …

## Risks and mitigations
- …

## Deliverables
- e.g. executed checklist, automation PR links, UAT sign-off table
```

## Process

1. **Confirm scope and stakeholders** — who approves UAT, who runs security/perf (if any).
2. **Read** `docs/testing-guide.md` and relevant stories/PRD sections.
3. **Select test types** from the catalog; justify omissions for this scope.
4. **Traceability** — each major block maps to FR ids and/or story ACs where possible.
5. **Write** `docs/test-plans/<slug>.md` using the template; keep tables/lists scannable.
6. **Summarize in chat** — chosen types, slug path, open decisions (data, env, tools).

## Quality bar

- **Exit criteria** are observable (not “testing complete”).
- **Regression** strategy says what is **always** run vs **risk-based** subset.
- **UAT** names **scenarios**, **participants**, and **sign-off** mechanism if applicable.

## Handoff

- **Implementation:** **`implement-story`** (plans inform what must be observable and testable).
- **Automated / dev tests:** **`test-story`** per story; link this plan in the story **Notes** if useful.
- **Manual / UAT / perf / security runs:** execute outside the agent or with explicit human ownership as named in the plan.
