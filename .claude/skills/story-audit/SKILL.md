---
name: story-audit
description: >
  Audits a Storybook story file for completeness, naming conventions,
  control coverage, and real-world data quality. Run before shipping
  a component to confirm its stories are production-ready.
---

# Story Audit Skill

When invoked with `/story-audit`, audit the story file for the component
in context (or the one the user specifies). Check every item below.

## 1. Structure
- [ ] `Playground` story exists and is the FIRST export
- [ ] Playground uses `args` + `render: (args) => <Component {...args} />` so all controls work
- [ ] `tags: ["autodocs"]` present in meta
- [ ] `title` follows the approved category structure:
  - `Foundations/` — Colors, Typography
  - `Layout/` — AxCard
  - `Actions/` — AxButton
  - `Controls/` — AxFilterBar
  - `Data Display/` — AxTable, AxTag
  - `Overlays/` — AxModal, AxDrawer
  - `Feedback/` — AxEmptyState

## 2. Naming Convention
All story `name` fields must use consistent prefixes:
- `"Playground"` — interactive controls story
- `"Template — X"` — real-world usage pattern
- `"Feature — X"` — specific prop/capability demo
- `"Pattern — X"` — domain-specific scenario
- `"Size — X"` — size variant demo
- `"State — X"` — loading/empty/disabled/error states

Flag any stories that don't follow this.

## 3. Controls Coverage
- Are all custom props wired to `argTypes`?
- Do controls have `description` text explaining what the prop does?
- Are enum props using `control: "select"` with `options`?
- Are boolean props using `control: "boolean"`?

## 4. Content Quality
- Is domain-appropriate data used? (pharmaceutical products, not "Lorem ipsum" or "Item 1")
- Are design system components used internally? (AxText, AxButton, AxTag — not raw `<p>`, `<button>`, `<span>`)
- Are CSS variables used for inline styles? (`var(--neutral-50)` not `"#fafafa"`)
- Is the layout parameter appropriate? (`"padded"` for wide components, `"centered"` for modals/narrow)

## 5. Coverage Gaps
Check for missing story types:
- [ ] Empty state (for any component that shows data)
- [ ] Loading state (if the component has async behaviour)
- [ ] Error/destructive state (if applicable)
- [ ] All major size variants covered

## Output format
Return a checklist with ✅ pass / ❌ fail / ⚠️ warning for each item.
End with a short list of actions needed before the stories are shippable.
