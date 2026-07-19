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

**Decision:** V1 uses named, individually visible factors — position, offensive role, defensive role, shooting, playmaking, rebounding, roster needs, role overlap, team strengths and weaknesses. No unexplained ML score.

**Consequences:** Users can defend conclusions to an audience, which is the point of the product for content creators and scouts. Costs some sophistication and requires explicit factor definitions. Any future composite score must remain decomposable in the interface.

---

## D-04 — Team-fit lives inside the scouting report
**Status:** Decided · Phase 0 *(resolved with product owner)*

**Context:** Team-fit was listed as a required V1 feature but appears nowhere in the eight-step V1 workflow. It could be a standalone feature, a report section, or deferred.

**Decision:** Team-fit is a **section within the scouting report**, not a standalone surface.

**Consequences:** Inherits the report's persistence, sharing, print, and state handling instead of needing its own — materially less surface area. Places the fit assessment where the user is already forming a judgment. Creates a data dependency: reports need team data, so Phase 5 either sequences minimal team data ahead of team-fit or splits it to follow Phase 6.

---

## D-05 — Success metrics anchored to workflow completion
**Status:** Decided · Phase 0 *(resolved with product owner)*

**Context:** Pre-launch, with no users, analytics, or baseline. Numeric targets would be invented.

**Decision:** Metrics are defined against V1 workflow completion and derived from the application's own database. Numeric targets are set post-launch from real baselines.

**Consequences:** Measurable on day one with no analytics vendor and no third-party tracking. No headline growth number to report before launch — accepted, because an invented target gets optimized against rather than learned from. Requires that the necessary timestamps be persisted as features are built.

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

**Decision:** Accept the gap for Phase 0 and close it as the first task of Phase 1. TypeScript `strict` is already enabled in `tsconfig.json` and stays on.

**Consequences:** The verification rule is only partially enforceable until Phase 1 completes — which is exactly why Phase 1 precedes all product work.

---

## D-11 — Genius Sports as a craft reference only
**Status:** Decided · Phase 0

**Context:** Genius Sports was cited as the professionalism benchmark for the product's look and feel.

**Decision:** It is a reference for *level of craft only*. No branding, layout, graphics, language, trademarks, or proprietary visual elements are copied. Courtside develops its own visual identity.

**Consequences:** No legal or ethical exposure from imitation. Requires original design work rather than adaptation of an existing system.

---

## Adding a Decision

Record a decision here when it constrains future work and would be expensive to reverse. Include what was considered and why it was rejected — the reasoning is what makes the entry useful when someone revisits it.

Reversing a decision means a new entry that supersedes the old one. Don't edit history.
