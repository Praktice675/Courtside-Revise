# Courtside — V1 Scope

Scope is defined against the eight-step workflow in [PRODUCT.md](./PRODUCT.md). A feature is in V1 if the workflow cannot complete without it.

## Definition of Done for V1

> A new user can register, search for a player, review that player's statistics and game logs, compare them against another player, produce a structured scouting report including an explainable team-fit assessment, save it, return in a later session to retrieve it, and share a read-only version.

If that sentence is true end to end, V1 ships. If it isn't, V1 doesn't — regardless of what else has been built.

---

## Accounts

| Feature | Status | Rationale |
|---|---|---|
| Registration | **In V1** | Step 1 of the workflow. |
| Login | **In V1** | Step 1. |
| Logout | **In V1** | Required wherever there are accounts. |
| Password recovery | **In V1** | Without it, a locked-out user loses their entire archive — which is the product's core value. |
| Private saved workspace | **In V1** | Saved research is private by default. Steps 7–8 depend on it. |
| Social / OAuth login | Deferred | Email auth completes the flow. Additional providers add surface without unlocking anything. |
| Teams, orgs, seats | Deferred | V1 is a single-user workspace. |

## Player Research

| Feature | Status | Rationale |
|---|---|---|
| Player search | **In V1** | Step 2 — the entry point to everything. |
| Player profiles | **In V1** | Step 3. |
| Season selection (current + historical) | **In V1** | Evaluation is meaningless pinned to one season. Historical depth is provider-dependent and unresolved — see [DECISION_LOG.md](./DECISION_LOG.md) D-08. |
| Season statistics | **In V1** | Step 4. |
| Game logs | **In V1** | Step 4. Game-by-game data is what separates this from a summary page. |
| Performance trends | **In V1** | Step 4. Restrained charting only — see [DESIGN_PRINCIPLES.md](./DESIGN_PRINCIPLES.md). |
| Advanced/derived metric suite | Deferred | V1 presents provider statistics. Courtside-computed metrics are a later phase. |
| Shot charts, play-type splits | Deferred | High data cost, not required by the loop. |

## Player Comparisons

| Feature | Status | Rationale |
|---|---|---|
| Compare at least two players | **In V1** | Step 5. Two is the requirement; the interface should not preclude more later. |
| Season selection for comparison | **In V1** | Comparing across mismatched seasons is misleading. |
| Normalized statistics | **In V1** | Raw totals mislead across differing minutes and pace. Normalization basis must be stated on screen. |
| Save comparisons | **In V1** | Comparisons are research artifacts, not throwaway views. |
| Multi-player (3+) comparison | Deferred | Two satisfies the workflow. |

## Scouting Reports

The centerpiece of V1. This is where research becomes an artifact.

| Feature | Status | Rationale |
|---|---|---|
| Create a report for a player | **In V1** | Step 6. |
| Evaluate defined basketball categories | **In V1** | Categories are fixed and defined by Courtside — that's what makes reports comparable to each other. |
| Record strengths | **In V1** | Step 6. |
| Record concerns | **In V1** | Step 6. |
| Role projection | **In V1** | Step 6. |
| Overall conclusion | **In V1** | Step 6. |
| Save drafts | **In V1** | Reports are written over multiple sittings. Losing a draft is unacceptable. |
| Finalize reports | **In V1** | The draft/final distinction gates sharing — only a finalized report should be shareable. |
| Retrieve reports later | **In V1** | Step 8. The reason the product exists. |
| **Team-fit analysis** | **In V1 — as a section within the report** | See below. |
| User-defined custom categories | Deferred | Breaks comparability between reports. Revisit once the fixed set is proven. |

### Team-Fit Analysis — scoped inside the report

Team-fit is **a section of the scouting report**, not a standalone feature or separate page. Inside a report, the user selects a team and gets a factor-based fit assessment that saves, shares, and prints with the report itself.

This scoping is deliberate. As a standalone surface, team-fit would need its own persistence, navigation, and empty/loading/error states. Nested in the report, it inherits all of that — and it sits where the user is already forming a judgment, which is where a fit assessment is actually useful.

Factors must be understandable and individually visible:

position · offensive role · defensive role · shooting · playmaking · rebounding · roster needs · role overlap · team strengths and weaknesses

**Constraint:** no unexplained machine-learning score in V1. If the interface shows a fit rating, the user must be able to see which factors produced it. A number a user cannot interrogate is a number they cannot defend to their audience — which defeats the point.

## Watchlists

| Feature | Status | Rationale |
|---|---|---|
| Create watchlists | **In V1** | The mechanism for tracking players across sessions. |
| Add and remove players | **In V1** | Core operation. |
| Save notes | **In V1** | Where informal observation lives before it becomes a report. |
| Retrieve watchlists later | **In V1** | Same persistence guarantee as reports. |
| Sharing watchlists | Deferred | V1 sharing is limited to reports, keeping one sharing model to secure rather than two. |

## Team Pages

| Feature | Status | Rationale |
|---|---|---|
| Team overview | **In V1** | Team-fit analysis is not credible without a viewable team. |
| Current roster | **In V1** | Roster needs and role overlap are team-fit factors; the user must be able to check the reasoning. |
| Relevant team context | **In V1** | Team-level statistics sufficient to support fit factors. Scope limited to what team-fit consumes. |
| Team schedules, standings | Deferred | Not consumed by the workflow. |

## Report Sharing

| Feature | Status | Rationale |
|---|---|---|
| Read-only link | **In V1** | Step 8. Content creators need to show work, not just have it. |
| Optional public report state | **In V1** | Opt-in per report. Default is private — see [DECISION_LOG.md](./DECISION_LOG.md) D-07. |
| Printable report page | **In V1** | Scouting reports get printed and turned into PDFs. Print styling is a feature, not an afterthought. |
| Link expiry, revocation, passwords | Deferred | Revocation via un-sharing is sufficient for V1. |
| Collaborative editing | Deferred | Sharing is read-only by definition in V1. |

---

## Everything Else

See [NON_GOALS.md](./NON_GOALS.md). Items listed there are excluded from V1 and are not deferred-but-planned — they are deliberate exclusions with stated reasons.

## Scope Changes

V1 scope does not expand without explicit approval. Adding a feature here means either extending the timeline or cutting something else; both are decisions for the product owner, not the implementer.
