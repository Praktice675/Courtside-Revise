@AGENTS.md

# Courtside

An NBA scouting and analytics platform. Users research players, compare them, write structured scouting reports with explainable team-fit analysis, save that work privately, and optionally share read-only reports.

**Status:** Phase 0 — documentation complete, no product features implemented. The application is an unmodified Next.js scaffold.

**Stack:** Next.js App Router · TypeScript (strict) · Tailwind CSS · PostgreSQL via Supabase · Vitest · Playwright · GitHub Actions · Vercel · modular monolith.

## Documentation

Read the relevant document before implementing against it.

| Document | Read it when |
|---|---|
| [docs/PRODUCT.md](docs/PRODUCT.md) | You need the vision, users, or the V1 workflow |
| [docs/MVP_SCOPE.md](docs/MVP_SCOPE.md) | You need to know if something is in V1 |
| [docs/USER_FLOWS.md](docs/USER_FLOWS.md) | Building any user-facing flow — includes required loading/empty/error states |
| [docs/NON_GOALS.md](docs/NON_GOALS.md) | Something feels out of scope |
| [docs/SUCCESS_METRICS.md](docs/SUCCESS_METRICS.md) | Deciding what to instrument |
| [docs/DESIGN_PRINCIPLES.md](docs/DESIGN_PRINCIPLES.md) | Building any interface |
| [docs/ENGINEERING_PRINCIPLES.md](docs/ENGINEERING_PRINCIPLES.md) | Writing any code |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Deciding what comes next |
| [docs/DECISION_LOG.md](docs/DECISION_LOG.md) | Wondering why something is the way it is, or about to make a lasting decision |

---

# Permanent Rules

## Before writing code
- **Read the relevant documentation first** — the `docs/` files above, and for framework APIs the guides in `node_modules/next/dist/docs/`. This Next.js version differs from training data.
- **Inspect existing code before editing it.** Match the patterns already present.
- **Propose a plan before significant changes** and get agreement before implementing.

## How to build
- **Vertical slices.** Ship a feature end to end — data, server logic, authorization, UI, tests — before starting the next. No horizontal layer-by-layer builds.
- **Strict TypeScript.** `strict` is enabled and stays enabled.
- **No `any` without explicit written justification** in a comment at the use site. Prefer `unknown` plus narrowing.
- **No unnecessary dependencies.** Every one is a permanent obligation. Justify it against code you'd own instead.
- **No microservices, no premature abstraction.** Write the concrete thing; abstract when the third case makes the shared shape a fact rather than a prediction.
- **Keep sports-data provider logic separate from product logic.** All provider access sits behind an internal boundary; product code uses Courtside domain types only. No provider field names, IDs, or error types in product modules.

## Security
- **Never expose secrets to browser code.** Any value reaching the client is public.
- **Validate all external input** at the trust boundary — forms, route params, query strings, request bodies, and provider responses.
- **Enforce authorization on the server and in the database.** Both layers, independently. Hiding UI is not authorization.

## After changes
- **Run type checking, linting, tests, and the production build.** All four must pass. *(Only `lint` and `build` exist today; Phase 1 adds the rest — see DECISION_LOG D-10.)*
- **Summarize changed files and remaining risks.**
- **Report results honestly.** If something failed or was skipped, say so with the output. Never claim passing work without having seen it pass.

## Boundaries
- **Do not modify unrelated functionality.** Keep diffs to what was asked.
- **Never expand product scope without approval.** Scope lives in `docs/MVP_SCOPE.md`. If something seems missing, raise it — don't build it.
