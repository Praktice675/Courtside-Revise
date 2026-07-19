# Courtside — Engineering Principles

## Architecture: Modular Monolith

One deployable application, internally organized into modules with clear boundaries.

Modules communicate through explicit interfaces rather than reaching into each other's internals. Expected V1 modules follow the product's shape: accounts, players, comparisons, reports (including team-fit), watchlists, teams, sharing.

**No microservices.** V1 has one team, one database, and an unvalidated product. Distributed architecture would add deployment complexity, network failure modes, and data-consistency problems in exchange for scaling properties nothing yet needs. Well-drawn module boundaries preserve the option to extract a service later — if evidence ever demands one.

## Build in Vertical Slices

A feature ships end to end — data access, server logic, authorization, interface, tests — before the next one starts.

Building horizontal layers (all schema, then all APIs, then all UI) delays the moment anything is provably working and hides integration problems until they're expensive. A thin complete slice beats a thick incomplete layer.

## Separate Provider Logic from Product Logic

**This is the most important structural rule in the codebase.**

All NBA data-provider access lives behind an internal interface owned by Courtside. Product code depends on Courtside's own domain types — never on a vendor's response shape.

Why it matters:
- No provider is chosen yet ([DECISION_LOG.md](./DECISION_LOG.md) D-06), and nearly every V1 feature depends on one.
- Sports data providers change schemas, change pricing, impose rate limits, and get replaced.
- A vendor's JSON shape leaking into report rendering means switching providers becomes a rewrite instead of a swap.

Concretely: no provider field names, no provider IDs, and no provider error types in product modules. Mapping happens at the boundary, once.

## TypeScript

- **Strict mode stays on.** It is already enabled in `tsconfig.json` and must not be weakened.
- **No `any` without explicit written justification** in a comment at the use site. `unknown` plus narrowing is almost always the correct alternative.
- Types describe the domain, not the transport. A `Player` is a Courtside concept.
- Prefer types that make invalid states unrepresentable — a report is a draft or final, never ambiguously both.

## Security

### Never expose secrets to browser code
API keys, database credentials, and provider tokens are server-side only. Any value reaching the client is public, regardless of how it's named. Assume every client-visible string is readable by anyone.

### Validate all external input
Everything crossing a trust boundary is validated at that boundary: form submissions, route parameters, query strings, request bodies, and **provider responses**. A provider that changes its schema or returns an error payload must not propagate malformed data into the product.

### Enforce authorization on the server and in the database
Two independent layers, both required:

1. **Server** — every request that reads or writes user data verifies the caller is permitted.
2. **Database** — row-level policies enforce ownership independently, so a missing server check cannot become a data breach.

Hiding UI is not authorization. A user's workspace is private by default; sharing is an explicit, revocable, per-report grant. Shared report access must expose only that report — never the author's other work or account details.

## Dependencies

Add a dependency only when it solves a real problem better than a small amount of code you'd own. Every dependency is a permanent obligation: security patches, breaking changes, bundle size, and abandonment risk.

Before adding one, ask whether the platform already provides it, whether a fraction of it is being used, and what happens if it goes unmaintained.

## Avoid Premature Abstraction

Write the concrete thing. Abstract when the third case arrives and the shared shape is a fact rather than a prediction.

Speculative generality — configuration for needs that haven't appeared, interfaces with one implementer, layers that only forward calls — costs more to read and rework than the duplication it was meant to prevent.

The provider boundary above is the exception, and deliberately so: it exists because the provider is *known* to be unchosen and changeable.

## Verification After Changes

Every change runs, and passes:

1. Type checking
2. Linting
3. Tests
4. The production build

**Current gap:** only `lint` and `build` scripts exist today. A `typecheck` script, Vitest, Playwright, and CI are not yet installed — that's Phase 1 of the [roadmap](./ROADMAP.md). Until then this rule is partially enforceable, which is precisely why Phase 1 comes first.

A change is not "done" because it looks right. It is done when the checks pass and the behavior has been observed. Report failures honestly — a passing claim that isn't true is worse than a known failure.

## Testing Approach

- **Unit tests** for analytical logic: normalization, trend computation, team-fit factor derivation. These produce numbers users will publish; they must be correct.
- **Integration tests** for authorization. Every "user A cannot read user B's data" rule needs a test that fails loudly if it regresses.
- **End-to-end tests** for the V1 workflow: register → search → profile → compare → report → save → retrieve → share.
- **Provider boundary tests** against recorded fixtures, so the suite doesn't depend on a live third-party service.

## Working Practices

- **Read the relevant documentation before implementing.** This includes `docs/` and, for framework APIs, the guides in `node_modules/next/dist/docs/` — this Next.js version differs from training data (see `AGENTS.md`).
- **Inspect existing code before editing it.** Match the patterns already present.
- **Propose a plan before significant changes**, and get agreement before writing code.
- **Don't modify unrelated functionality.** Unrequested changes bundled into a diff make review harder and regressions likelier.
- **Summarize changed files and remaining risks** when work is complete.
- **Never expand product scope without approval.** Scope belongs to [MVP_SCOPE.md](./MVP_SCOPE.md), not to the implementation.
