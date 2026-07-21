# Courtside — Decision Log

Decisions that shape the product and are expensive to reverse. Each records context, the decision, and consequences.

**Open items are listed as open.** Recording a question as unresolved is more useful than inventing an answer — and per [ENGINEERING_PRINCIPLES.md](./ENGINEERING_PRINCIPLES.md), architecture decisions aren't made before they're needed.

---

## D-01 — Modular monolith over microservices
**Status:** Decided · Phase 0

**Context:** V1 has one team, one database, and an unvalidated product.

**Decision:** Build a single deployable application with clear internal module boundaries. No microservices.

**Consequences:** One deployment, one database, no network failure modes between components. Requires discipline — module boundaries must be enforced by review, since nothing physically prevents crossing them. Extraction of a service later remains possible if evidence ever demands it.

---

## D-02 — Supabase for authentication and database
**Status:** Decided (direction) · Not yet implemented

**Context:** V1 needs authentication, PostgreSQL, and row-level authorization without a dedicated infrastructure effort.

**Decision:** Supabase provides authentication and the PostgreSQL database. Configuration happens in Phase 2, not now.

**Consequences:** Auth flows including password recovery come largely provided. Row-level security is available as the second authorization layer required by our security model. Creates a platform dependency; the tradeoff is accepted for V1 velocity.

---

## D-03 — Explainable factor-based team-fit, not machine learning
**Status:** Decided · Phase 0

**Context:** Team-fit could be a trained model producing a single score, or an explicit factor breakdown.

**Decision:** V1 uses named, individually visible factors — position, offensive role, defensive role, shooting, playmaking, rebounding, roster needs, role overlap, team strengths, team weaknesses. No unexplained ML score.

**Consequences:** Users can defend conclusions to an audience, which is the point of the product for content creators and scouts. Costs some sophistication and requires explicit factor definitions. Any future composite score must remain decomposable in the interface.

---

## D-04 — Team-fit lives inside the scouting report
**Status:** ✅ **Approved** · Phase 0 *(approved by product owner)*

**Context:** Team-fit was listed as a required V1 feature but appears nowhere in the eight-step V1 workflow. It could be a standalone feature, a report section, or deferred.

**Decision:** Team-fit is a **structured section within the scouting report**, not a standalone surface. The approved V1 sequence: open or create a report for a player → select the NBA team being evaluated → complete the explainable team-fit section → save it as part of the report → share it through the same read-only report-sharing workflow.

The assessment evaluates ten visible factors: position, offensive role, defensive role, shooting, playmaking, rebounding, roster needs, role overlap, team strengths, team weaknesses. It must show visible reasoning — never an opaque composite score or unexplained machine-learning prediction (see D-03).

A standalone team-fit dashboard, simulator, or workspace is **outside V1** ([NON_GOALS.md](./NON_GOALS.md)).

**Consequences:** Inherits the report's persistence, sharing, print, and state handling instead of needing its own — materially less surface area, and one sharing model to secure rather than two. Places the fit assessment where the user is already forming a judgment. Creates a data dependency: reports need team data, so Phase 5 either sequences minimal team data ahead of team-fit or splits it to follow Phase 6.

---

## D-05 — Success metrics anchored to workflow completion
**Status:** Decided · Phase 0 *(resolved with product owner)*

**Context:** Pre-launch, with no users, analytics, or baseline. Numeric targets would be invented.

**Decision:** Metrics are defined against V1 workflow completion and derived from the application's own database. Ongoing rate-based targets are set post-launch from real baselines.

**Refined by D-12.** A small set of initial beta validation thresholds has since been approved. D-05's rejection of invented numbers still applies to *business projections* (growth, revenue); it does not apply to modest, explicitly provisional beta thresholds.

**Consequences:** Measurable on day one with no analytics vendor and no third-party tracking. No headline growth number to report before launch — accepted, because an invented forecast gets optimized against rather than learned from. Requires that the necessary timestamps be persisted as features are built.

---

## D-06 — NBA data provider — **OPEN**
**Status:** 🔴 Open · Must resolve before Phase 3

**Context:** Player search, profiles, statistics, game logs, trends, comparisons, team pages, and team-fit all depend on a data source. None is chosen. The brief excludes connecting one during Phase 0.

**This is the largest open risk in V1.** Nearly every feature depends on it, and provider characteristics — coverage, historical depth, licensing, rate limits, cost, redistribution terms — will constrain the product.

**Mitigation already decided:** all provider access sits behind an internal boundary interface, with Courtside-owned domain types on the product side ([ENGINEERING_PRINCIPLES.md](./ENGINEERING_PRINCIPLES.md)). Switching providers should be a mapping change, not a rewrite.

**To resolve:** evaluate coverage of required statistics, historical season depth, game-log granularity, team and roster data, licensing terms for a shared/public product, rate limits, and cost.

---

## D-07 — Private by default; sharing is opt-in per report
**Status:** Decided · Phase 0

**Context:** The requirements specify both a "private saved workspace" and an "optional public report state" — which needed reconciling before the authorization model is built.

**Decision:** All user data is private by default. Sharing is an explicit, revocable, per-report action available only on **finalized** reports. A shared link exposes that report and nothing else — never the author's other reports, watchlists, or account details.

**Consequences:** No ambiguity in the authorization model. Requires a report-level sharing state and access checks that are independent of workspace ownership. Revocation must take effect immediately.

---

## D-08 — Historical season depth — **OPEN**
**Status:** 🟡 Open · Resolve with D-06

**Context:** V1 requires "current and historical season selection," but no depth is specified. Ten seasons and full league history are very different products in data cost and interface design.

**Blocked on:** provider selection (D-06) — available depth may decide this.

**Consequences of deferring:** season selection UI must not assume a small fixed range. Design should tolerate a wide season list.

---

## D-09 — Desktop-first, responsive web; no native apps
**Status:** Decided · Phase 0

**Context:** Analytical work — wide tables, side-by-side comparison, writing alongside data — favors large screens, but shared reports are frequently opened on phones.

**Decision:** Design desktop-first. Ship a fully responsive web application. No native mobile apps in V1.

**Consequences:** One platform to build and maintain. Mobile is a genuine adaptation, not a broken fallback — particularly for shared and printed reports. Some interactions must be redesigned rather than merely reflowed at small widths.

---

## D-10 — Verification tooling gap in Phase 0
**Status:** Acknowledged · Resolves in Phase 1

**Context:** The technical direction names Vitest, Playwright, and GitHub Actions, and the working rules require running type checking, linting, tests, and the production build after changes. Only `lint` and `build` scripts currently exist, and installing dependencies is out of scope for Phase 0.

**Decision:** Accept the gap for Phase 0 and close it in Phase 1, which is split into seven separately reviewable tasks (runtime and package-management standards, type-check command, unit-test setup, E2E test setup, CI setup, environment-variable validation, environment strategy). TypeScript `strict` is already enabled in `tsconfig.json` and stays on.

**Consequences:** The verification rule is only partially enforceable until Phase 1 completes — which is exactly why Phase 1 precedes all product work. Splitting the phase keeps each change reviewable in isolation and lets partial progress be verified; the cost is more individual steps to sequence.

---

## D-11 — Genius Sports as a craft reference only
**Status:** Decided · Phase 0

**Context:** Genius Sports was cited as the professionalism benchmark for the product's look and feel.

**Decision:** It is a reference for *level of craft only*. No branding, layout, graphics, language, trademarks, or proprietary visual elements are copied. Courtside develops its own visual identity.

**Consequences:** No legal or ethical exposure from imitation. Requires original design work rather than adaptation of an existing system.

---

## D-12 — Initial beta validation targets adopted
**Status:** ✅ Approved · Phase 0

**Context:** D-05 established that metrics are anchored to workflow completion and that numeric targets would be set post-launch. The product owner has since approved a small set of initial thresholds for the beta period, which requires reconciling with D-05.

**Decision:** Adopt five initial beta validation targets — 10 registrations, 5 users returning in a later seven-day period, 20 scouting reports created or saved collectively, 10 saved comparisons collectively, and 5 users with at least one watchlist ([SUCCESS_METRICS.md](./SUCCESS_METRICS.md)).

D-05 is **refined, not reversed**. The distinction now stated: *business projections* (growth and revenue forecasts) remain rejected pre-launch, while *initial beta validation thresholds* are accepted because they are modest, explicitly provisional, and answer whether the workflow functions at all.

**Consequences:** Gives the beta a concrete checkpoint instead of an open-ended observation period. All five are measurable from Courtside's own database — user rows, session timestamps, report rows, saved-comparison rows, watchlist rows — so no external analytics vendor is required. The targets are revisable after observing real usage and are not guaranteed outcomes. Phase 8 instrumentation must cover them.

---

## D-13 — Authentication precedes private persistence, not all persistence
**Status:** ✅ Approved · Phase 0

**Context:** The roadmap previously implied that all persistence and data modeling waited on authentication. That over-applies a real security rule and would needlessly serialize provider work — the largest unknown in V1.

**Decision:** Authentication, authorization, and ownership rules must be established before Courtside stores **private user-owned artifacts**: scouting reports, watchlists, saved comparisons, private notes, and sharing permissions.

Public NBA provider data, canonical basketball entities, provider adapters, and sports-data ingestion may be designed or implemented independently, provided they are not mixed with private user-owned records.

**Consequences:** Provider integration can proceed in parallel with account work, de-risking the schedule. Requires a maintained separation: public reference data and private user artifacts stay in distinct tables with distinct access paths, and references point from private records to public entities, never the reverse. The security guarantee is unchanged — no private artifact is ever stored before ownership exists. Full statement in [ENGINEERING_PRINCIPLES.md](./ENGINEERING_PRINCIPLES.md).

---

## D-14 — Runtime and package-manager standards
**Status:** ✅ Approved · Phase 1 (Task 1.1)

**Context:** The repository declared no Node.js version and no package manager. A new engineer had no signal for which runtime or tool to use, and the README carried create-next-app boilerplate advertising yarn, pnpm, and bun. This is the ambiguity [ROADMAP.md](./ROADMAP.md) Task 1.1 exists to close.

**Decision:** Standardize on **Node.js 24 LTS**, pinned to `24.18.0` in `.nvmrc`, and **npm 11** as the sole package manager, with `packageManager: npm@11.16.0` (the npm bundled with Node 24.18.0). `package.json` declares `engines` of Node `>=24.0.0 <25.0.0` and npm `>=11.0.0 <12.0.0`.

Considered and rejected: **Node 20** — EOL as of April 2026, invalid despite satisfying Next's `>=20.9.0` floor. **Pinning to the locally installed patch** (24.12.0 / 11.6.2) — would encode a stale version rather than the current supported LTS patch. **A version-manager dependency** — unnecessary; `.nvmrc` is a plain file.

Node 24 is the current Active LTS (EOL April 2028) and the default runtime on Vercel, Courtside's deployment target.

**Consequences:** A fresh clone can reproduce the runtime via `nvm use` and install deterministically with `npm ci`. npm is the only supported package manager; other lockfiles are not committed. The exact `.nvmrc` pin requires periodic patch bumps as the Node 24 line advances — those bumps touch only `.nvmrc` (and `packageManager` when npm advances within 11.x), since `engines` expresses ranges. No dependencies were changed and `package-lock.json` is unmodified.

---

## Adding a Decision

Record a decision here when it constrains future work and would be expensive to reverse. Include what was considered and why it was rejected — the reasoning is what makes the entry useful when someone revisits it.

Reversing a decision means a new entry that supersedes the old one. Don't edit history.
