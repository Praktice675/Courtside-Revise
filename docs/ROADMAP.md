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

**This phase is deliberately split into seven small, independently reviewable tasks.** Treating it as one large "set up the tooling" change produces an unreviewable diff, couples unrelated decisions, and makes partial failure hard to diagnose. Each task below has its own exit condition and can be reviewed on its own.

**Applies to every task in this phase:** do not create empty module directories or speculative architecture folders. Structure is introduced when a real feature needs it, per [ENGINEERING_PRINCIPLES.md](./ENGINEERING_PRINCIPLES.md) (avoid premature abstraction).

No calendar estimates are given for these tasks.

### Task 1.1 — Runtime and package-management standards

- **Objective:** remove ambiguity about which Node.js version and package manager the project uses, so local and CI behavior match.
- **Deliverables:** a pinned Node.js version recorded in the repository; a single declared package manager; contributor documentation stating both.
- **Dependencies:** none.
- **Acceptance criteria:** a fresh clone installs and builds using the documented runtime and package manager, with no lockfile churn.
- **Non-goals:** changing the existing dependency set; adding a monorepo tool; containerizing development.
- **Risks:** a pinned version drifting out of support; the build warning about multiple detected lockfiles indicating an unresolved ambiguity.
- **Exit condition:** runtime and package manager are pinned and documented, and a clean install reproduces them.

### Task 1.2 — Type-check command

- **Objective:** make type checking a first-class, independently runnable step.
- **Deliverables:** a `typecheck` script that runs the TypeScript compiler in no-emit mode across the project.
- **Dependencies:** 1.1.
- **Acceptance criteria:** the command runs, passes on the current codebase, and fails on a deliberately introduced type error.
- **Non-goals:** loosening compiler options; `strict` is already enabled and stays on.
- **Risks:** the script diverging from what the Next.js build checks, giving false confidence.
- **Exit condition:** `typecheck` passes locally and is ready for CI to consume.

### Task 1.3 — Unit-test setup

- **Objective:** enable fast, isolated testing of analytical logic — the numbers users publish.
- **Deliverables:** Vitest installed and configured; a test script; one meaningful example test proving the harness works.
- **Dependencies:** 1.1, 1.2.
- **Acceptance criteria:** the suite runs, the example test passes, and a deliberately broken assertion fails the run with a non-zero exit code.
- **Non-goals:** a coverage threshold; testing framework internals; writing product tests before product code exists.
- **Risks:** configuration drift between Vitest and the Next.js/TypeScript path setup; a placeholder test that asserts nothing and hides a broken harness.
- **Exit condition:** unit tests run locally and fail correctly when code is wrong.

### Task 1.4 — End-to-end test setup

- **Objective:** make it possible to verify the V1 workflow through a real browser.
- **Deliverables:** Playwright installed and configured; an E2E script; one smoke test against the running application.
- **Dependencies:** 1.1, 1.3.
- **Acceptance criteria:** the smoke test passes locally against a running app, and fails if the app is not serving.
- **Non-goals:** covering V1 flows that do not exist yet; cross-browser matrices; visual regression testing.
- **Risks:** slow or flaky E2E runs eroding trust in CI; browser binaries inflating CI time.
- **Exit condition:** a single E2E smoke test runs reliably and is ready for CI.

### Task 1.5 — Continuous-integration setup

- **Objective:** enforce the verification rule automatically rather than by memory.
- **Deliverables:** a GitHub Actions workflow running typecheck, lint, unit tests, E2E tests, and the production build on every push and pull request.
- **Dependencies:** 1.1 – 1.4.
- **Acceptance criteria:** the workflow passes on a clean branch and fails when any single step is deliberately broken.
- **Non-goals:** deployment automation (Phase 8); required-reviewer policy; release tagging.
- **Risks:** long runtimes discouraging use; secrets accidentally exposed in workflow logs.
- **Exit condition:** CI runs all five checks on every push and blocks on failure.

### Task 1.6 — Environment-variable validation

- **Objective:** fail fast and legibly on missing or malformed configuration, and keep server-only secrets off the client.
- **Deliverables:** a validated, typed accessor for environment variables; an explicit separation between server-only and client-exposed values; a documented `.env.example`.
- **Dependencies:** 1.1, 1.2.
- **Acceptance criteria:** the app refuses to start with a clear message when a required variable is missing; a server-only secret cannot be imported into client code without an obvious error.
- **Non-goals:** adding real credentials; configuring Supabase or a data provider; committing any secret value.
- **Risks:** a secret leaking into the client bundle through a mis-scoped variable — the highest-severity failure in this phase.
- **Exit condition:** configuration is validated at startup and the server/client boundary is enforced by code, not convention.

### Task 1.7 — Local, preview/staging, and production environment strategy

- **Objective:** define how the three environments differ and how changes travel between them.
- **Deliverables:** written strategy covering environment purposes, configuration sources per environment, and the promotion path; documentation of which environment uses which data source.
- **Dependencies:** 1.5, 1.6.
- **Acceptance criteria:** a contributor can determine, from the documentation alone, where a given change runs first and what configuration it uses.
- **Non-goals:** provisioning environments; creating Vercel projects; connecting Supabase or a provider — this task produces the strategy, not the infrastructure.
- **Risks:** preview environments touching production data; environment-specific behavior that only appears after deployment.
- **Exit condition:** the strategy is documented and agreed, ready to apply when services are provisioned in Phase 2 and Phase 8.

### Phase exit

**Exit:** the CLAUDE.md rule "run type checking, linting, tests, and the production build" is fully enforceable and enforced by CI, configuration is validated, and the environment strategy is written down.

**Open dependency:** none. Task 1.1 can start immediately.

---

## Phase 2 — Accounts and Workspace

- Supabase project setup and connection
- Registration, login, logout, password recovery
- Session handling and protected routes
- Row-level security establishing private-workspace ownership from day one
- Empty workspace shell

**Exit:** a user can register, log in, see their private workspace, recover a password, and log out. Authorization is enforced at both server and database layers.

**Why here:** every *private user-owned* artifact needs an owner before the first row exists. Reports, watchlists, saved comparisons, notes, and sharing permissions all wait on this phase, because retrofitting authorization onto stored private data is the pattern that produces breaches.

**What this does not block:** public sports data. Provider adapters, canonical basketball entities, ingestion, and mapping to Courtside domain types may be designed or built independently of authentication — none of it is user-owned. Phase 3's provider work can therefore begin in parallel with this phase once the provider is chosen (D-06), provided public reference data stays separated from private user records. See [ENGINEERING_PRINCIPLES.md](./ENGINEERING_PRINCIPLES.md) → *Ordering: authentication before private persistence*.

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
- **Team-fit section** *(within the report, not a standalone surface — D-04)*: team selection and factor-by-factor explainable assessment (position, offensive role, defensive role, shooting, playmaking, rebounding, roster needs, role overlap, team strengths, team weaknesses)

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
- Metric instrumentation ([SUCCESS_METRICS.md](./SUCCESS_METRICS.md)), sufficient to measure the initial beta validation targets from the application's own database
- Environment strategy from Task 1.7 applied to real preview and production environments
- Vercel production deployment

**Exit:** V1 ready for real users, with the initial beta validation targets measurable — see [SUCCESS_METRICS.md](./SUCCESS_METRICS.md) → *Initial Beta Validation Targets*. Those targets are the first post-launch checkpoint; they are provisional and revisable once real usage is observed.

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
