# Courtside — Product

## Vision

Courtside is an NBA scouting and analytics platform that makes professional-style basketball research accessible to people who don't work for an NBA front office.

It brings player statistics, game logs, comparisons, team information, scouting reports, watchlists, and saved research into one organized workspace.

## The Problem

Detailed NBA analysis today is an act of manual assembly. Someone evaluating a player moves between a statistics site, a game-log page, a spreadsheet they built themselves, a roster page, and a notes app — then tries to hold the conclusion together across all five. Nothing is saved in a form they can return to, and nothing is in a form they can hand to someone else.

The data is public. The *organization* of it is what's missing.

## Value Proposition

**Courtside helps users move from raw NBA data to organized, explainable basketball analysis.**

Two words in that sentence carry the weight:

- **Organized** — research persists. A report written in March is still there in October, with the numbers it was based on.
- **Explainable** — every conclusion Courtside helps produce can be traced to a factor a human can name and argue with. This is why V1 has no unexplained model score (see [NON_GOALS.md](./NON_GOALS.md)).

## Primary Users

| User | What they need from Courtside |
|---|---|
| **NBA content creators** | Defensible material for videos, articles, and threads — plus something shareable and legible to an audience. |
| **Advanced NBA fans** | Depth beyond box scores, without building spreadsheets by hand. |
| **Independent scouts** | A structured, repeatable evaluation format and a private archive of past work. |
| **Basketball analysts** | Fast comparison and trend analysis, with the underlying numbers always visible. |

These users share one trait: they already do this research. Courtside competes with their current manual process, not with their willingness to do the work.

## The V1 Workflow

This eight-step loop is the spine of the product. Every V1 feature exists to serve it, and features that don't serve it are deferred.

1. Create an account or log in
2. Search for an NBA player
3. Open the player profile
4. Review statistics, game logs, and performance trends
5. Compare the player with another NBA player
6. Create a structured scouting report
7. Save the analysis
8. Return later and retrieve it — and optionally share a read-only report

Step 8 is the one that distinguishes Courtside from a statistics website. A stats site answers a question. Courtside is meant to accumulate answers.

## What "Good" Looks Like

A user who has never seen Courtside can go from signup to a saved, shareable scouting report in one session, without opening another tab to look something up.

Success is measured against that loop, not against page views — see [SUCCESS_METRICS.md](./SUCCESS_METRICS.md).

## Related Documents

- [MVP_SCOPE.md](./MVP_SCOPE.md) — what is and isn't in V1
- [USER_FLOWS.md](./USER_FLOWS.md) — each workflow step in detail
- [NON_GOALS.md](./NON_GOALS.md) — what Courtside deliberately is not
- [DESIGN_PRINCIPLES.md](./DESIGN_PRINCIPLES.md) — how it should feel
- [ENGINEERING_PRINCIPLES.md](./ENGINEERING_PRINCIPLES.md) — how it should be built
- [ROADMAP.md](./ROADMAP.md) — build order
- [DECISION_LOG.md](./DECISION_LOG.md) — decisions made, and open questions
