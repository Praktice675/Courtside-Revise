# Courtside — Design Principles

## Target Feel

Courtside should read as a mature professional sports-intelligence platform: **professional, modern, premium, data-focused, trustworthy, efficient, polished, responsive.**

Trustworthy is the load-bearing word. Users publish conclusions drawn from this tool and attach their name to them. An interface that looks careless makes its numbers look careless.

## Reference Boundary

Genius Sports is a reference for *the expected level of professionalism only*.

**Do not copy** their branding, layouts, graphics, language, trademarks, or proprietary visual elements. The instruction is to match a standard of craft, not to imitate a company. Courtside needs its own visual identity.

---

## Core Principles

### 1. Information Hierarchy
Every screen answers "what is this, and what matters most here?" before showing detail. A player profile leads with player identity and the season in view — never a wall of undifferentiated numbers.

Hierarchy is built with size, weight, and spacing before color. Color is a limited resource, reserved for meaning.

### 2. Typography Does the Work
- One typeface family, used with intent across a restrained scale. Consistency reads as premium; variety reads as unfinished.
- **Tabular figures for all statistics.** Numbers in a column must align on the decimal. This is non-negotiable in a product built on tables.
- Body text is sized for sustained reading — reports are written and read at length.
- Never below the readable minimum to fit more in. If content doesn't fit, the layout is wrong.

### 3. Consistent Spacing
A single spacing scale, used everywhere. Related things are near each other; unrelated things are not. Generous whitespace is what separates a dense professional tool from a cramped one — density comes from information, not from removing space.

### 4. Readable Tables
Tables are the primary interface, not a fallback.

- Numeric columns right-aligned; text columns left-aligned.
- Column headers persist when scrolling long game logs.
- Row scanning is supported without heavy borders — subtle separation over grid lines.
- Sorting state is always visible.
- No horizontal scrolling for core columns at desktop width. If columns don't fit, the column set needs editing.

### 5. Restrained, Useful Charts
A chart earns its place by showing something a table cannot — a trend over time, a distribution, a shape.

- Every axis labeled. Every unit stated.
- No decorative gradients, 3D effects, or animation that delays comprehension.
- Never truncate an axis in a way that exaggerates a difference. Misleading charts are a trust failure, not a style choice.
- If a chart and a table would communicate equally well, use the table.

### 6. Efficient Analytical Workflows
Users perform the same operations repeatedly. Optimize for the tenth use, not the first.

- Common paths are short. Searching a player from anywhere is one action.
- Context is preserved — changing seasons should not lose scroll position or reset the view.
- Destructive actions are recoverable or confirmed. Losing a report is unacceptable.

### 7. Accessible Contrast
- Meet WCAG AA contrast minimums for all text, including secondary text and data labels.
- **Never encode meaning in color alone.** Positive and negative indicators need a shape, symbol, or label — a red/green-only differential fails for a substantial share of users, and this product is full of differentials.
- Full keyboard navigability. Visible focus states, never removed.
- Semantic table markup so screen readers can navigate data structurally.

### 8. Consistent Navigation
Navigation is in the same place, with the same behavior, on every authenticated screen. Users should always know where they are, how they got there, and how to get back to their workspace.

### 9. Loading, Empty, and Error States Are Designed
Each is specified per flow in [USER_FLOWS.md](./USER_FLOWS.md). Design rules:

- **Loading:** skeletons that preserve final layout — no content shift when data arrives. Regions load independently; one slow region never blocks the page.
- **Empty:** explain what belongs here and offer the action that fills it. An empty workspace is a first impression, not a dead end.
- **Error:** say what failed, whether it's the user's doing, and what to do next. Never present failure as emptiness — a failed report list rendering as "no reports" tells the user their work is gone.

A missing value and a zero must never look alike.

### 10. Desktop-First, Responsive
Analytical work happens on large screens: wide tables, side-by-side comparison, writing next to data. Design there first.

Mobile is fully supported for reading, reviewing, and light editing. It is an adaptation — tables may become scrollable or restructured — but it is never broken or an afterthought. Shared reports especially are opened on phones.

---

## Applied Standards

**Data presentation**
- The season in view is always visible where statistics appear.
- Normalization basis is labeled wherever normalized numbers appear.
- Data provenance and recency are discoverable.

**Team-fit presentation**
- Factors are shown individually with their reasoning.
- No composite score without visible decomposition — this is a product constraint expressed in design ([NON_GOALS.md](./NON_GOALS.md)).

**Print**
- The printable report is a designed artifact: no navigation chrome, no clipped tables or charts, typography set for paper.
