# Courtside — V1 Non-Goals

These are deliberate exclusions, not a backlog. Each is out because including it would either dilute the core workflow, demand infrastructure disproportionate to its value, or contradict what Courtside is for.

Listing them is defensive: it lets the team say no quickly, with a reason already written down.

---

## Video, Vision, and Tracking

**Excluded:** automated video analysis · computer vision · player tracking · full-game video hosting

Each is a substantial product on its own, with storage, licensing, and processing costs unrelated to the research workflow. Courtside V1 works with structured statistical data.

## AI-Generated Analysis

**Excluded:** AI-generated scouting reports

The product's value is that *the user's* analysis becomes organized and explainable. A generated report inverts that — the user becomes an editor of something they didn't reason through, and the output is no longer defensible as their own work.

This is the same principle behind excluding unexplained model scores from team-fit analysis: **if a user can't explain why the conclusion is what it is, Courtside has failed at its stated purpose.**

Note the boundary: this excludes AI generating analytical *conclusions*. It does not permanently exclude AI-assisted convenience features, which would need separate approval and are not in V1 either way.

## Unexplained Machine-Learning Scores

**Excluded:** any V1 rating the user cannot decompose into named factors

Team-fit analysis must expose its inputs — position, offensive and defensive role, shooting, playmaking, rebounding, roster needs, role overlap, team strengths and weaknesses. A composite number with no visible derivation is not permitted in V1, regardless of how accurate it might be.

## Financial and Transactional Modeling

**Excluded:** trade machine · salary-cap modeling

These require contract, cap, and league-rule data that is separate from performance data, and they serve a speculative use case rather than an evaluative one. Courtside evaluates players; it does not simulate front-office transactions.

## Live, Betting, and Fantasy

**Excluded:** live scores · betting · fantasy sports

Live scores demand real-time infrastructure the research workflow never touches. Betting and fantasy attract a different audience with different needs and — in betting's case — regulatory obligations. Serving them would pull the product away from scouting.

## Social Features

**Excluded:** social feeds · comments · followers · messaging

Courtside V1 is a private workspace with optional read-only sharing. Social features bring moderation duties, notification systems, abuse handling, and an engagement-driven design pressure that conflicts with a focused analytical tool.

Sharing a report is a distribution mechanism, not a social graph.

## Native Mobile Applications

**Excluded:** iOS and Android native apps

The product is desktop-first because analytical work — reading tables, comparing players, writing reports — happens on a large screen. V1 is a responsive web application that remains usable on mobile for reading and light editing. Native apps would double platform cost for a use case that isn't the primary one.

## Non-NBA Basketball

**Excluded:** NCAA · AAU · high school · international leagues

Each brings a separate data source, differing statistical conventions, and different evaluation norms. V1 does one league properly. This is the most likely candidate for post-V1 expansion, but expanding before the NBA experience is proven would multiply data-integration work against an unvalidated product.

## Other Sports

**Excluded:** any sport other than basketball

Everything in Courtside — the evaluation categories, the fit factors, the statistical vocabulary — is basketball-specific. Generalizing would mean abstracting all of it before knowing whether the basketball version works.

## Enterprise

**Excluded:** enterprise integrations · SSO · team accounts · API access for third parties

V1 serves individual users. Enterprise requirements arrive with procurement, compliance, and support obligations that a pre-launch product cannot absorb.

---

## Reconsidering an Exclusion

An item moves off this list only through an explicit decision recorded in [DECISION_LOG.md](./DECISION_LOG.md), with the reasoning that changed. Nothing here should be quietly reintroduced mid-implementation.
