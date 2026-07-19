# Courtside — Roadmap

Phases are ordered by dependency, not by date. Each phase ends with something demonstrable; each is built as vertical slices per [ENGINEERING_PRINCIPLES.md](./ENGINEERING_PRINCIPLES.md).

No dates are given. The order is the commitment.

---

## Phase 0 — Documentation Foundation ✅ *(current)*

Product definition, scope, flows, non-goals, metrics, design and engineering principles, roadmap, decision log, and permanent working rules in `CLAUDE.md`.

**Exit:** the team can answer "is this in V1?" without a meeting.

**Explicitly excluded:** no dependencies, no Supabase, no migrations, no data provider, no product features, no changes to the generated landing page.

---

## Phase 1 — Engineering Foundation

The prerequisite for everything else. Nothing product-facing ships until the verification loop exists.

- Add a `typecheck` script (strict mode is already enabled and stays on)
- Install and configure Vitest
- Install and configure Playwright
- GitHub Actions running typecheck, lint, test, and build on every push
- Establish the module directory structure for the modular monolith

**Exit:** the CLAUDE.md rule "run type checking, linting, tests, and the production build" is fully enforceable and enforced by CI.

**Open dependency:** none. This phase can start immediately.

---

## Phase 2 — Accounts and Workspace

- Supabase project setup and connection
- Registration, login, logout, password recovery
- Session handling and protected routes
- Row-level security establishing private-workspace ownership from day one
- Empty workspace shell

**Exit:** a user can register, log in, see their private workspace, recover a password, and log out. Authorization is enforced at both server and database layers.

**Why here:** every saved artifact needs an owner. Building persistence before ownership means retrofitting authorization onto existing data — the pattern that produces breaches.

---

## Phase 3 — Player Research

**Blocked on:** NBA data provider selection ([DECISION_LOG.md](./DECISION_LOG.md) D-06). This decision must be made before the phase starts.

- Provider integration behind the internal boundary interface
- Courtside domain types for players, seasons, statistics, and game logs
- Player search
- Player profiles
- Season selection (current and historical)
- Season statistics and game logs
- Performance trends

**Exit:** workflow steps 2–4 complete. A user can find any NBA player and review their statistics, logs, and trends across seasons.

**Highest-risk phase.** Provider integration is the largest unknown in V1 — data quality, coverage, historical depth, and rate limits all surface here.

---

## Phase 4 — Comparisons

- Two-player comparison
- Season basis selection
- Statistical normalization, with basis labeled on screen
- Saved comparisons

**Exit:** workflow step 5 complete, and the first user-owned artifact persists and is retrievable.

---

## Phase 5 — Scouting Reports *(including team-fit)*

The centerpiece. Largest phase in V1.

- Report creation tied to player and season
- Defined evaluation categories
- Strengths, concerns, role projection, overall conclusion
- Draft saving with unambiguous save state
- Finalization with completeness validation
- Retrieval from workspace
- **Team-fit section:** team selection and factor-by-factor explainable assessment (position, offensive role, defensive role, shooting, playmaking, rebounding, roster needs, role overlap, team strengths and weaknesses)

**Exit:** workflow steps 6–8 complete. A user can write, save, finalize, and retrieve a structured report with an explainable team-fit assessment.

**Note:** team-fit requires team data. Either sequence minimal team data ahead of it or split team-fit to follow Phase 6 — a judgment call for whoever plans this phase.

---

## Phase 6 — Watchlists and Team Pages

- Create watchlists; add and remove players; notes; retrieval
- Team overview, current roster, relevant team context

**Exit:** the workspace supports ongoing tracking, and team-fit reasoning is verifiable against real roster and team data.

---

## Phase 7 — Sharing and Print

- Read-only share links for finalized reports
- Opt-in public report state, revocable, private by default
- Printable report page
- Access-control verification: a shared link exposes that report and nothing else

**Exit:** V1 definition of done met in full ([MVP_SCOPE.md](./MVP_SCOPE.md)).

---

## Phase 8 — Pre-Launch Hardening

- End-to-end coverage of the complete V1 workflow
- Accessibility audit against [DESIGN_PRINCIPLES.md](./DESIGN_PRINCIPLES.md)
- Loading, empty, and error state review across every flow
- Performance pass on profile and report pages
- Metric instrumentation ([SUCCESS_METRICS.md](./SUCCESS_METRICS.md))
- Vercel production deployment

**Exit:** V1 ready for real users.

---

## Post-V1 Candidates

Not commitments. Ordered by likelihood, to be reconsidered against real usage data.

1. **Multi-player comparison (3+)** — natural extension once two-player is proven
2. **Courtside-computed advanced metrics** — beyond raw provider statistics
3. **Watchlist sharing** — reuses the report sharing model
4. **Richer team context** — schedules, standings, team-level trends
5. **Custom report categories** — only after the fixed set is validated, given the comparability cost
6. **Additional leagues** — the largest expansion, and only after the NBA experience is proven

Everything in [NON_GOALS.md](./NON_GOALS.md) remains excluded and does not enter this list without a recorded decision.
