# Courtside — Success Metrics

## Basis

Courtside is pre-launch. There are no users, no analytics, and no baseline.

Metrics are anchored to **completion of the V1 workflow**. Every metric here is derivable from the application's own database using data the product already needs to store. None requires an analytics vendor, and none requires tracking users beyond their own activity.

Two kinds of number are distinguished throughout this document:

- **Business projections** — forecasts of growth or revenue. Still rejected pre-launch. With no baseline they are invented, and invented forecasts get optimized against rather than learned from.
- **Initial beta validation targets** — small, explicitly provisional thresholds that tell us whether the V1 workflow functions for real people. Accepted, and set out below.

The second kind is useful precisely because it is modest and revisable. Ongoing rate-based targets are still set after launch, once real baselines exist.

---

## Initial Beta Validation Targets

These are **initial beta validation targets**, not guaranteed business outcomes and not forecasts. They exist to answer one question: does the V1 workflow function for real users, end to end?

| # | Target | What it validates |
|---|---|---|
| 1 | **At least 10 users register** | The account flow works for people who aren't us. |
| 2 | **At least 5 users return during a later seven-day period** | Saved work brings people back — the product's central premise. |
| 3 | **At least 20 scouting reports created or saved, collectively** | The core artifact is being produced, not just started. |
| 4 | **At least 10 player comparisons saved, collectively** | Comparison is used as research, not skipped. |
| 5 | **At least 5 users create at least one watchlist** | Ongoing tracking is adopted rather than ignored. |

Targets 3 and 4 are collective across all users; targets 1, 2, and 5 count distinct users.

### Conditions on these targets

- **They are initial targets.** They mark a first checkpoint, not a definition of success.
- **They may be revised after observing actual beta usage.** If real behavior shows a threshold was set wrongly — in either direction — it should be changed, and the change recorded.
- **They are not guaranteed business outcomes.** Nothing here is a projection, commitment, or forecast of growth or revenue.
- **They must eventually be measurable from Courtside's own application database.** Each maps to records the product already needs: user rows, session timestamps, report rows, saved-comparison rows, watchlist rows.
- **No external analytics vendor is required to measure them.** If one is ever adopted, it will be for a different reason — not to satisfy these targets.

Instrumentation is scheduled in [ROADMAP.md](./ROADMAP.md) Phase 8. See [DECISION_LOG.md](./DECISION_LOG.md) D-12.

---

## Primary Metric

### Signup → First Saved Report

**The share of registered users who save at least one scouting report.**

This is the single measure that matters most. It answers whether the full loop — search, review, compare, evaluate, save — actually completes for real users. Everything else is diagnostic.

*Measurable from:* user creation timestamps and report creation timestamps.

If this number is low, the product doesn't work, no matter how healthy the rest look.

---

## Workflow Completion Metrics

### Time from First Search to First Saved Report
How long the first full loop takes, measured within a session.

*Why it matters:* the core claim is that Courtside is faster than assembling research manually. A first report that takes an unreasonably long time means the workflow has friction that the loop's shape hides.

*Measurable from:* search event timestamps and report timestamps, per user.

### Workflow Step Drop-Off
The share of users reaching each step: registered → searched → opened a profile → ran a comparison → started a report → saved a report → returned to retrieve it.

*Why it matters:* this localizes failure. Users who search but never open a profile point at search quality; users who start reports but never save them point at the report editor.

*Measurable from:* per-user first-occurrence timestamps for each step.

### Return Retrieval Rate
The share of users with saved work who return in a **later session** and open it.

*Why it matters:* this validates the product's central premise. If users never come back for their saved research, Courtside is a stats site with extra steps and the persistence layer isn't earning its cost.

*Measurable from:* session timestamps against saved-artifact access timestamps.

### Comparison → Report Conversion
The share of saved comparisons that lead to a scouting report on one of the compared players.

*Why it matters:* tests whether the workflow's steps 5 and 6 actually connect, or whether comparison is a separate destination users stop at.

*Measurable from:* comparison and report records sharing a player and user.

---

## Artifact Quality Metrics

### Draft → Final Completion Rate
The share of report drafts that reach finalized status.

*Why it matters:* a low rate means the report format is too demanding, unclear, or too long. Abandoned drafts are the clearest signal that the evaluation structure needs revision.

*Measurable from:* report status transitions.

### Team-Fit Section Usage
The share of finalized reports that include a completed team-fit assessment.

*Why it matters:* team-fit is the most distinctive V1 feature and the most expensive to build. If reports are routinely finalized without it, the explainable-fit thesis needs re-examination before more is invested.

*Measurable from:* presence of team-fit content on finalized reports.

### Reports per Returning User
Reports created per user who has returned at least once.

*Why it matters:* distinguishes a tool people use once from a tool people work in. Sustained multi-report usage is the strongest evidence of product-market fit available pre-revenue.

*Measurable from:* report counts grouped by user.

---

## Distribution Metric

### Share Rate and Share Reach
The share of finalized reports that get shared, and how often shared links are opened.

*Why it matters:* content creators are a primary user group, and sharing is their reason to be here. Shared links are also the only organic acquisition channel V1 has.

*Measurable from:* report sharing state and share-view counts.

---

## Health Metrics

These don't measure success; they detect whether the numbers above can be trusted.

| Metric | Why it's tracked |
|---|---|
| **Save failure rate** | The most damaging failure in the product. Any nonzero sustained rate is a release-blocking bug. |
| **Data-provider error rate** | Provider failures surface as product failures. Must be distinguishable from application bugs. |
| **Search-returns-nothing rate** | Persistently high means search is broken, not that users are querying badly. |
| **Time to interactive on profile and report pages** | These are the workspace. Slowness here compounds across every session. |

---

## What Is Deliberately Not Measured

- **Page views and session duration.** Courtside should make research *faster*. Longer sessions may signal friction, not engagement — optimizing for time-on-site would actively work against the product's purpose.
- **Vanity growth counts.** Registrations without completed workflows measure marketing, not the product.
- **Anything requiring third-party tracking.** No analytics vendor is chosen in V1, and none of the metrics above needs one.
