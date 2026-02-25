---
name: component-checklist
description: >
  Pre-ship checklist for a new design system component. Verifies file
  structure, exports, TypeScript, stories, and Storybook build before
  a component is considered done.
---

# Component Checklist Skill

When invoked with `/component-checklist`, run through every item below
for the component in context (or the one the user specifies). Read the
relevant files before reporting.

## 1. File Structure
- [ ] `design-system/components/<Name>/index.tsx` exists
- [ ] `design-system/components/<Name>/index.module.css` exists
- [ ] `design-system/components/<Name>/<Name>.stories.tsx` exists

## 2. Component File (`index.tsx`)
- [ ] `"use client"` directive on line 1
- [ ] Props type exported (`export type AxXxxProps = ...`)
- [ ] `displayName` set (`AxXxx.displayName = "AxXxx"`)
- [ ] antd passthrough props via `& AntXxxProps` spread
- [ ] No hardcoded hex colours — CSS variables only
- [ ] No inline style objects that belong in CSS Modules

## 3. CSS Module (`index.module.css`)
- [ ] Only CSS custom properties from the token system (`var(--neutral-200)` etc.)
- [ ] `:global(.ant-*)` used for antd class overrides with `!important`
- [ ] No magic numbers — spacing on the 4px grid
- [ ] Hover/focus/disabled states covered if interactive

## 4. Barrel Export (`design-system/index.ts`)
- [ ] Default component exported
- [ ] Props type exported
- [ ] Any additional public types exported (e.g. `AxTagTone`, `AxEmptyStateSize`)

## 5. Stories
- Run `/story-audit` for the full story check.
- Quick check: does `npm run build-storybook` pass with no TypeScript errors?

## 6. Build
- Run `npm run build-storybook` and confirm `✓ built` with no errors.
- If the library is also published: run `npm run build` and confirm dist files generated.

## Output format
Return a ✅/❌ checklist. For any ❌ item, state exactly what file to edit
and what change is needed. Do not mark complete until all items pass.
