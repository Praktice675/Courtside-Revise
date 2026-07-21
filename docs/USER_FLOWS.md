# Courtside — User Flows

Each flow below is a V1 requirement. **Loading, empty, and error states are listed per flow because they are part of the specification, not polish added later.** An analytical tool that fails silently or ambiguously destroys the user's trust in the numbers.

A general rule across every flow: **never show a plausible-looking empty value where data failed to load.** A blank stat cell and a stat of zero must be visually distinguishable.

---

## 1. Account Access

### 1.1 Registration
1. User opens Courtside unauthenticated and chooses to register.
2. Provides email and password. Password requirements are stated *before* submission, not after rejection.
3. Account is created; email verification is sent if verification is enabled.
4. User lands in an empty workspace with clear next actions.

- **Loading:** submit button enters a pending state and is disabled — double submission must not create duplicate attempts.
- **Empty:** the new workspace is the first empty state a user ever sees. It should orient, not apologize: explain what Courtside does and point to player search.
- **Error:** email already registered · password fails requirements · network failure. Field-level errors sit next to their field. Never reveal whether an email exists in a way that enables account enumeration.

### 1.2 Login
1. User submits email and password.
2. On success, session is established and user goes to their workspace (or the page they originally requested).

- **Loading:** pending state on submit.
- **Error:** invalid credentials (generic message — do not distinguish wrong email from wrong password) · unverified account · rate limited, stated with what to do next.

### 1.3 Logout
1. User logs out from primary navigation.
2. Session is destroyed **server-side**, not merely cleared in the browser.
3. User returns to the public landing state.

- **Error:** if logout fails, say so — a user who believes they logged out but hasn't is a security problem, especially on a shared machine.

### 1.4 Password Recovery
1. User requests recovery with their email.
2. Confirmation message is shown **regardless of whether the account exists** (prevents enumeration).
3. User follows an emailed link to a reset form, sets a new password, and is returned to login.

- **Loading:** pending state on both request and reset.
- **Error:** expired link · already-used link · invalid token. Each must offer a path to request a fresh link rather than dead-ending.

### 1.5 Protected Access
Any unauthenticated attempt to reach a private surface redirects to login and returns the user to their intended destination afterward. Authorization is enforced on the server and in the database — never by hiding UI. See [ENGINEERING_PRINCIPLES.md](./ENGINEERING_PRINCIPLES.md).

---

## 2. Player Search → Profile

1. User enters a player name in search, available from anywhere in the app.
2. Results appear with enough context to disambiguate similar names — team, position, and an indicator of active vs. historical.
3. User selects a player and lands on the player profile.

- **Loading:** results area shows a skeleton, not a spinner that replaces the input. The search field must stay usable and focused while results load.
- **Empty:** no matches — state the query that returned nothing and suggest checking spelling. Zero results is a normal outcome, not an error.
- **Error:** search unavailable (provider or network). Say search is unavailable and that it's not the user's query at fault. Do not render an empty result list, which reads as "no such player."

---

## 3. Player Profile — Statistics, Game Logs, Trends

1. Profile opens with the player's identity and current-season summary.
2. User selects a season — current or historical.
3. Season statistics update.
4. User reviews game logs for the selected season.
5. User reviews performance trends over the selected span.

Requirements:
- The selected season is visible at all times. A user must never misread one season's numbers as another's.
- Game logs are sortable, and their column set is readable without horizontal scrolling on a desktop viewport.
- Trends state their metric and span explicitly. A chart without a labeled axis is not shippable.

- **Loading:** each region (summary, logs, trends) loads independently — a slow trend chart must not block the game log. Skeletons preserve layout to avoid content shift.
- **Empty:** player has no data for the selected season (injury, not in league, pre-debut). Say which — "no games played in this season" is meaningfully different from "data unavailable."
- **Error:** partial failure is the likely case. If trends fail but statistics load, show the statistics and mark the trend region as failed with a retry. Never let one failed region blank the profile.

---

## 4. Player Comparison

1. From a player profile or a comparison entry point, the user adds a second player.
2. User selects the season basis for the comparison.
3. Normalized statistics are displayed side by side.
4. User saves the comparison to their workspace.

Requirements:
- The **normalization basis must be labeled on screen** (e.g. per-36, per-100 possessions). An unlabeled normalized number is a misleading number.
- If the two players' selected seasons differ, that difference must be surfaced prominently.
- Saving requires authentication; an unauthenticated user attempting to save is routed to login and returned to the comparison intact.

- **Loading:** comparison renders progressively as each player's data arrives.
- **Empty:** only one player selected — prompt for the second rather than showing a broken half-comparison. No saved comparisons yet — explain what saving does.
- **Error:** one player's data fails — identify *which* player failed. A comparison silently missing one side is worse than no comparison at all.

---

## 5. Scouting Report

### 5.1 Create and Draft
1. User starts a report from a player profile or from their workspace.
2. Report opens as a **draft**, associated with that player and a season.
3. User completes: defined basketball categories, strengths, concerns, role projection, overall conclusion.
4. User completes the **team-fit section**, which is part of the report rather than a separate surface:
   1. From within the open report, the user selects the NBA team being evaluated.
   2. The section presents each factor individually: position, offensive role, defensive role, shooting, playmaking, rebounding, roster needs, role overlap, team strengths, team weaknesses.
   3. The user records their assessment against those factors, with the reasoning visible.
   4. The assessment saves as part of the scouting report — it has no separate save action or storage.
   5. It is shared and printed through the same read-only report workflow (§8) — there is no separate team-fit share.
5. Draft is saved — explicitly by the user, and the save state is always visible.

Requirements:
- **Draft safety is non-negotiable.** The user must never be uncertain whether their writing is saved. Show saved/unsaved state persistently, and warn before navigating away with unsaved changes.
- Team-fit factors are individually visible with their reasoning. No opaque composite score, no unexplained machine-learning prediction.
- Supporting statistics stay visible while writing — the point is analysis grounded in data, not a blank text box.

- **Loading:** the report shell and any already-entered content appear before the supporting statistics finish loading. A user must be able to keep writing while data loads.
- **Empty:** a new report shows its category structure, so the user can see the shape of the work ahead.
- **Error:** **save failure is the most damaging error in the product.** It must be loud, must not discard the user's input, and must offer retry. Under no circumstances should a failed save be reported as success.

### 5.2 Finalize
1. User finalizes a completed draft.
2. Incomplete required sections are identified before finalizing.
3. Report becomes final and is eligible for sharing.

- **Error:** finalization blocked by incomplete sections — list exactly which, with links to them.

### 5.3 Retrieve
1. User opens their workspace and sees saved reports.
2. Reports are identifiable by player, team-fit target, season, status (draft/final), and date.
3. User opens a report to read or continue editing.

- **Loading:** list skeleton.
- **Empty:** no reports yet — explain what a report is and offer to start one from player search.
- **Error:** list fails to load — retry. Never present a failed load as an empty archive; a user seeing "no reports" when they have twenty will assume their work is gone.

---

## 6. Watchlists

1. User creates a watchlist with a name.
2. User adds players — from search, a profile, or the watchlist itself.
3. User attaches notes to the watchlist or to individual players.
4. User removes players.
5. User returns in a later session and retrieves the watchlist.

- **Loading:** skeleton for the list; add/remove actions show pending state on the affected row only.
- **Empty:** no watchlists yet, and separately, a watchlist with no players — different messages for different situations.
- **Error:** add/remove failure must revert the optimistic UI change and say so. A player who appears added but wasn't is a silent data-loss bug.

---

## 7. Team Pages

1. User opens a team from a roster link, search, or the report team-fit section.
2. Team overview shows identity and relevant team context.
3. Current roster is listed; each player links to their profile.

- **Loading:** overview and roster load independently.
- **Empty:** roster unavailable for the selected context — state it plainly.
- **Error:** team data failure — retry, with the rest of the page intact.

---

## 8. Report Sharing

1. From a **finalized** report, the user enables sharing.
2. A read-only link is generated; the report's public state is opt-in and reversible.
3. Anyone with the link views a read-only report — no editing controls, no workspace access.
4. Either party can print the report to paper or PDF.

Requirements:
- **Default is private.** Sharing is an explicit, per-report action, and the current sharing state is unambiguous on screen.
- Disabling sharing revokes access immediately.
- The shared view exposes only the report and its supporting content — never the author's other reports, watchlists, or account details.
- The printable page is a designed output: readable typography, no navigation chrome, no clipped tables or charts.

- **Loading:** link generation shows pending state.
- **Empty:** a shared report is by definition complete; if its supporting data is unavailable, the written analysis must still render — the user's words are the artifact.
- **Error:** invalid, revoked, or non-existent link — a clear "this report isn't available" page that leaks nothing about whether it ever existed. Link generation failure must not leave the report in an ambiguous half-shared state.
