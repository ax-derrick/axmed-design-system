---
name: design-review
description: >
  Reviews a component or story file for visual quality, design taste,
  and consistency with the Axmed design system. Invoke when you want a
  critical eye on spacing, typography, color, shadows, states, and
  overall polish — not just whether the code compiles.
---

# Design Review Skill

When invoked with `/design-review`, critically evaluate the component or
file in context (or the one the user points to). Go through every section
below and call out issues, then suggest concrete fixes.

## 1. Typography
- Are AxText variants used correctly? (`body-sm` for captions, `heading-md` for card titles, etc.)
- Is weight used sparingly? `semibold` for headings only, `medium` for emphasis, `regular` for body.
- Is colour semantic? `color="secondary"` for muted text, never hardcoded hex in JSX.
- Is line-height/leading appropriate for the context?

## 2. Spacing & Layout
- Is padding consistent with the 4px grid? (4, 8, 12, 16, 20, 24, 32, 48...)
- Are gaps between elements appropriate for their relationship (tight siblings vs. loose sections)?
- Does content breathe? Look for over-crowded or over-spaced layouts.
- Are Flex/Grid used correctly, or are there magic pixel hacks?

## 3. Colour
- Are CSS custom properties used everywhere? (`var(--neutral-200)`, `var(--blue-600)`, etc.)
- Are hardcoded hex values present? Flag them.
- Does the colour hierarchy make sense? Primary actions in brand purple, destructive in red, success in green.
- Is there appropriate contrast for text on coloured backgrounds?

## 4. Borders & Shadows
- Borders: `1px solid var(--neutral-200)` for containers, `var(--neutral-100)` for internal dividers.
- Shadows: single-layer subtle (`0 1px 3px rgba(0,0,0,0.06)`). Flag heavy or decorative shadows.
- Border radius: 12px for cards/modals, 8px for inputs/tags, 4px for small badges.

## 5. Interactive States
- Hover: does it give feedback? (border colour shift, shadow lift, background tint)
- Focus: keyboard-accessible focus ring present?
- Disabled: opacity 0.45, pointer-events none, no hover effects.
- Loading: spinner or skeleton shown, not blank.
- Empty: AxEmptyState used, not a blank container or raw "No data" string.

## 6. Responsiveness
- Does the layout break at narrow widths (< 640px)?
- Are fixed pixel widths used where flex/% would work better?
- Do tables have `scroll={{ x: ... }}` for overflow?
- Do modals/drawers stack properly on mobile?

## 7. Taste & Polish
- Does it look like it belongs in the same family as ShadCN / Linear / Vercel?
- Is there anything that feels "antd-default" that we haven't overridden?
- Are icons sized consistently (16px inline, 20px standalone, 24px+ illustrative)?
- Is there anything that would make a designer wince?

## Output format
Report findings as a short bulleted list grouped by section. Flag 🔴 critical
issues, 🟡 minor improvements, ✅ things done well. End with a prioritised
list of the top 3 changes to make first.
