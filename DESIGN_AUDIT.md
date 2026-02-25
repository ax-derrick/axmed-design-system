# Axmed Design System — Honest Design Audit
> Applied skills: `/frontend-design`, `/interface-design`, `/baseline-ui`, `/responsive-design`, `/fixing-accessibility`, `/web-design-guidelines`, `/12-principles-of-animation`, `/interaction-design`
> Date: 2026-02-25

---

## Overall Scores

| Dimension | Score | Verdict |
|---|---|---|
| **Taste / Aesthetic Direction** | 5.5 / 10 | Competent but generic |
| **Interface Design** | 6.5 / 10 | Solid patterns, missing depth |
| **Responsiveness** | 4 / 10 | Bare minimum |
| **Baseline UI Quality** | 4.5 / 10 | Good tokens, broken animation layer |
| **Accessibility** | 4 / 10 | No intentional a11y layer |
| **Animation & Motion** | 2 / 10 | Almost entirely absent or wrong |
| **Interaction Design** | 3 / 10 | No active states, no skeletons, wrong easing |
| **API Design** | 7.5 / 10 | Cleanest thing in the system |
| **OVERALL** | **5.1 / 10** | Functional B2B layout kit, not a design system |

---

## 1. Taste & Aesthetic Direction
*Applied: `/frontend-design`*

### What's working

**Figtree is a good call.** It's geometric, humanist, and not Inter. Choosing it over the industry default (Inter, DM Sans, system-ui) signals intentionality. The font injection via Google Fonts `preconnect` is functional. The base weights (450/550/650/700) are calibrated well — most systems don't go above 400/600/700, and the intermediate weights give you tighter control over hierarchy without relying purely on size.

**The color naming is thoughtful.** Having `--text-primary`, `--text-secondary`, `--text-link` as semantic aliases is correct. Having a full `--blue-10` through `--blue-900` palette gives consumers room to work with.

**AxCard's visual language is consistent.** `12px` border-radius, `1px solid var(--neutral-200)` border, `0 1px 3px rgba(0,0,0,0.06)` resting shadow — this is the Linear/Notion school of design and it's appropriate for a B2B healthcare SaaS.

### What's not working

**The brand purple `#261C7A` is a taste risk.** The `/frontend-design` skill flags avoiding "clichéd color schemes (purple gradients on white)," and the `/baseline-ui` skill says "NEVER use purple." `#261C7A` is a deep, almost navy indigo — darker and more restrained than the typical "AI startup purple." It's not as generic as the mid-range purple range, but it still reads as tech-company rather than healthcare. The saving grace is its depth: at this saturation and darkness, it's more in the territory of institutional navy than Silicon Valley purple. Still worth challenging whether it's the right choice for a pharma marketplace.

**AxButton has no custom visual identity whatsoever.** The entire CSS is:

```css
.axButton {
  font-weight: 500;
  transition: all 0.2s ease;
}
```

That's it. The most-used interactive element in the entire system has two declarations — one of which is a baseline-ui violation. No custom hover state. No custom active/pressed state. No focus ring. No letter-spacing adjustment. No distinctive shape. It's the antd default button with a font-weight tweak. In comparison, a button in shadcn/ui has 12+ distinct states defined.

**No atmosphere anywhere.** The `/frontend-design` skill asks: "What makes this UNFORGETTABLE?" The answer for this system right now is: nothing. There are no gradient accents, no brand moments, no micro-details that say "this is Axmed." The AxCard hover state changes shadow opacity. That's the only motion/visual response in the entire system beyond antd defaults. Everything looks like it was built from the antd defaults up rather than from a design direction down.

**`wireframe: true` on the Modal ConfigProvider theme.** This is an antd debug flag intended for wireframing/prototyping. It strips styling from the modal to show a wire-frame aesthetic. It should never be in a production design system config. It's in `.storybook/theme.ts:35`. Either it was forgotten there or there's a misunderstanding of what it does.

**`Alert.colorInfo: "black"`.** This is a direct hack to override antd's info alert color to black. This is not a design decision — this is a workaround for something that should be resolved in the token system. It also means info alerts lose their semantic color meaning.

---

## 2. Interface Design
*Applied: `/interface-design`*

### What's working

**Consistent containment language.** Cards, modals, drawers all use the same `12px border-radius + 1px border + subtle shadow` formula. This is a coherent decision. The "border does the containment, shadow is additive" comment in `AxCard/index.module.css` shows intentional thinking.

**AxText is the best component in the system.** 12 scale steps, configurable weights per step, ResizeObserver-based ellipsis detection with tooltip, multiline clamping, color semantics, mono variant — this is the component that shows real craft. The decision to add intermediate heading sizes (heading-4xl through heading-sm) rather than just h1-h6 is correct for a design system that needs to compose at different densities.

**AxTag's tone system is semantically correct.** The five intents (success/info/warning/error/neutral) mapping to appropriate colors is the right model for a B2B data table. The dot indicator is a good detail — small, unobtrusive, adds semantic meaning without needing color alone.

**AxEmptyState's size system is thoughtful.** sm/md/lg mapped to typography scale AND padding AND gap is correct multi-dimensional sizing. Most systems just change font size or just change padding — not both together.

### What's not working

**`--neutral-150` does not exist in the token palette.** `AxFilterBar/index.module.css:8,43` uses `var(--neutral-150)` but `styles/_colors.scss` defines the neutral scale as: 0, 50, 100, 200, 300, 400, 500, 600, 700, 800. There is no `--neutral-150`. This means AxFilterBar's borders are rendering either as `initial` (transparent) or inheriting an unexpected value. This is a live bug.

**`AxTable` border is `var(--neutral-50)`** — neutral-50 is near-white (`#F9FAFB` or similar). On a white background this border is essentially invisible. The table has no visible containment on white page backgrounds. The selected row left accent (`box-shadow: inset 4px 0 0 0 var(--blue-600)`) is well done — but the table itself lacks a defined edge.

**AxDrawer and AxModal have incompatible size semantics.** Both have `sm/md/lg` presets but they map to completely different values:
- Modal: sm=380px, default=520px, lg=720px
- Drawer: sm=500px, md=600px, lg=640px

A "small" drawer is larger than a "large" modal. This will cause confusion and inconsistency in products consuming the library. The drawer's lg (640px) is also smaller than md (600px) — barely a difference, and the naming makes no intuitive sense.

**No loading skeleton component.** For a B2B data-heavy application (tables of tenders, medications, suppliers), a skeleton loader is not optional — it's critical. AxDrawer has a `loading` spinner prop, but that's the only loading state in the system. No `AxSkeleton`, no shimmer utility, nothing.

**No form components.** The antd ConfigProvider theme configures Form, Input, Radio, Checkbox — but none of these are wrapped as Ax components. Consumers have to use raw antd inputs with only the global ConfigProvider theme. If someone uses an antd Input outside the theme context, it loses the design system styling. There's no `AxInput`, `AxSelect`, `AxDatePicker`.

**The title typography in AxCard is hardcoded** at `15px / 600 weight` in the CSS rather than referencing a token or using AxText. This bypasses the typography system entirely. The same for AxModal's `.title` (18px/600) and `.description` (14px/400). These should use AxText or at minimum reference token variables.

---

## 3. Responsiveness
*Applied: `/responsive-design`*

This is the weakest area of the design system.

**There is exactly one responsive media query in the entire component CSS:** `AxFilterBar/index.module.css` at `max-width: 768px`. That's it. Every other component uses fixed values.

**Specific violations:**

- **AxCard**: No responsive props, no min/max-width guidance, no grid utilities
- **AxTable**: Fixed layout that overflows on mobile. No horizontal scroll wrapper. No `tableLayout: "fixed"` recommendation in stories.
- **AxModal size presets** (380/520/720px) have no mobile override — a 720px modal on a 375px screen will be broken.
- **AxDrawer**: The `sm=500px` preset on a 375px screen takes up more than 100% width. No `min(500px, 100vw)` clamping.
- **AxText**: No fluid typography. The scale uses fixed px values. At large sizes like `heading-4xl` (48px), this will be too large on mobile without clamping.
- **Typography token system**: All font sizes are hardcoded px values. No `clamp()`, no `vw`-based sizing, no responsive overrides. `--heading-4xl: 48px` is appropriate on desktop but needs to be ~30–36px on mobile.

**No container queries anywhere.** Modern responsive design (and what the `/responsive-design` skill teaches) uses `@container` to respond to parent dimensions, not screen width. A card in a sidebar behaves differently from the same card in a main content area. Screen-width media queries break this.

**`!important` on all utility classes** (`styles/_margins.scss`, `styles/_paddings.scss`). This is an anti-pattern for a library. Utilities with `!important` override component styles and make debugging CSS specificity impossible.

---

## 4. Baseline UI Quality
*Applied: `/baseline-ui`*

### Motion violations

**`transition: all 0.2s ease` on AxButton** is flagged by the `/baseline-ui` and `/fixing-motion-performance` skills. Issues:

1. `all` transitions every CSS property including `width`, `height`, `color`, `opacity`, `border-radius` — most of which you never want to transition. It causes unexpected visual artifacts and performance problems.
2. `ease` is equivalent to `cubic-bezier(0.25, 0.1, 0.25, 1.0)` — a generic easing with no intentionality. For a button, `ease-out` (starts fast, decelerates) feels more physical and responsive.
3. There is no `@media (prefers-reduced-motion: reduce)` anywhere in the design system. Users who have requested reduced motion will still get all transitions. This is both a baseline-ui violation and an accessibility violation.

**Close button transition in AxModal** — `transition: opacity 0.15s ease, background 0.15s ease` is better (specific properties, shorter duration) but still uses `ease`.

**AxCard hover transition** — `transition: box-shadow 0.15s ease, border-color 0.15s ease` — correct approach (specific properties) but again `ease`.

### Typography scale enforcement

The typography system is defined in two places:
1. `design-system/tokens/_typography.scss` — CSS custom properties
2. `design-system/components/AxText/index.module.css` — hardcoded px values

These two systems are **not connected**. AxText uses hardcoded px values, not the CSS custom properties from the token file. If someone changes `--font-size-3xl` in the token file, AxText won't change. The token file is essentially unused by the components.

### Anti-patterns

- **Hardcoded `opacity: 0.7` on AxModal close button.** This likely fails WCAG 1.4.3 contrast requirement for interactive elements.
- **`rgba(0,0,0,0.06)` shadow on AxCard** — the shadow token is defined inline, not as a CSS custom property. Every card instance has this hardcoded.
- **`font-family: "Figtree", sans-serif` repeated in every component CSS file** — should be referenced via the typography token `var(--font-fig-tree)`.

---

## 5. Accessibility
*Applied: `/fixing-accessibility`*

**No custom focus indicators.** The system relies entirely on antd's default focus ring for all interactive elements. For WCAG 2.2 Level AA, focus indicators must have a minimum area of the perimeter of the component and a 3:1 contrast ratio. The system never tests or defines this.

**`prefers-reduced-motion` is not addressed anywhere** in the codebase.

**AxModal close button `opacity: 0.7`** — even if the close button icon has sufficient contrast at full opacity, at 70% it likely fails 4.5:1 (AA) for normal text/icons. `neutral-600` at 70% opacity on white is approximately 3.2:1 — below the 4.5:1 threshold for regular-sized icons.

**Empty states use antd icons as illustrations** — the icon nodes have no `aria-label` or `role="img"`. They're decorative but also not marked as decorative (`aria-hidden`).

**AxFilterBar result count** — `div` with text, no `aria-live` attribute. Screen readers won't announce count changes when filters are applied.

**AxTable disabled rows** use `pointer-events: none` + `opacity: 0.45` but rows are still in the DOM without `aria-disabled="true"`. Keyboard users can still Tab to them.

---

## 6. API Design
*The strongest area of the system*

The component API design is clean. The pattern of wrapping antd and translating semantic props to antd internals is the right approach. Some specific observations:

**Good:**
- `variant` on AxButton is much cleaner than antd's `type + ghost + danger` combination
- AxText's `as` prop for semantic HTML polymorphism is correct
- AxTag's `tone` + `dot` + `fill` composability is well thought out
- AxTable's `rowStates` record approach is elegant for external state management
- All components pass through the full antd API via `...props` spread

**Issues:**
- **AxButton `variant: "ghost"`** maps to `type: "primary", ghost: true` which renders a purple-outline button. But there's no `"secondary-ghost"` (grey outline) variant, which is the more common "ghost" pattern. The naming is misleading.
- **AxDrawer `size: "sm" | "md" | "lg"` vs AxModal `size: "sm" | "default" | "lg"`** — inconsistent naming. One uses "md", the other uses "default". Pick one.
- **AxTable `headerBg`** could be named `headerBackground` for clarity. More importantly, this should reference a token, not accept raw color strings.
- **AxCard `noPadding`** is a boolean prop pattern that accumulates technical debt. Better: `padding?: "default" | "none" | "sm"` for future extensibility.
- **Typography tokens are not exported from the package.** The CSS custom properties only work if `style.css` is imported. There's no JavaScript token export (e.g., `import { tokens } from 'axmed-design-system'`).

---

## Summary: What Needs to Happen

### Critical (will break or embarrass production use)
1. **Fix `--neutral-150` bug** — replace with `--neutral-100` or `--neutral-200` in AxFilterBar
2. **Remove `wireframe: true` from Modal theme** — debug mode in production config
3. **Add `prefers-reduced-motion` media query** to all transitions
4. **Fix AxDrawer size presets** — sm=500px is wider than a Modal's large preset

### High Priority (notable user-facing quality gaps)
5. **Define custom focus rings** — at minimum a visible `:focus-visible` state
6. **AxButton needs real CSS** — hover/active/focus states, not just font-weight
7. **Replace `transition: all` with specific properties** across the system
8. **Unify AxModal and AxDrawer size naming** (use sm/md/lg consistently)
9. **Make AxText reference typography tokens** instead of hardcoded px values

### Medium Priority (quality debt)
10. **Add AxSkeleton** — loading states for data components
11. **Add `aria-live` to AxFilterBar result count**
12. **Add `aria-disabled` to AxTable disabled rows**
13. **Close button contrast fix** — remove or reduce `opacity: 0.7`
14. **Connect typography token file to AxText** (currently disconnected)
15. **Define shadow tokens as CSS custom properties** — not inline values

### Nice to Have
16. **Container queries in AxCard and AxFilterBar** — replace screen-width media queries
17. **Fluid typography** — `clamp()` for heading sizes at extreme breakpoints
18. **JS token exports** — make tokens importable as JavaScript values
19. **Wrap AxInput, AxSelect** — close the gap between styled/unstyled components
20. **Reconsider brand color** — or at least develop a secondary accent to differentiate

---
---

# Comparison: Axmed vs BaseUI vs Radix vs shadcn/ui

> Note: This comparison is across different design philosophies — styled vs unstyled vs copy-paste. These systems are not direct competitors; they represent different points on the "styled ↔ headless" spectrum.

---

## Philosophy Overview

| | Axmed | BaseUI (MUI) | Radix UI | shadcn/ui |
|---|---|---|---|---|
| **Model** | Styled wrapper | Unstyled primitives | Unstyled primitives | Copy-paste |
| **Styles** | CSS Modules + antd | Bring your own | Bring your own | Tailwind CSS |
| **Base layer** | Ant Design | None | None (own) | Radix UI |
| **Distribution** | npm package | npm package | npm package | CLI copy |
| **Ownership** | You consume it | You consume it | You consume it | You own the code |
| **Dark mode** | No | Framework-dependent | Framework-dependent | Built-in |
| **TypeScript** | Yes | Yes | Yes | Yes |
| **React** | 19 | 18+ | 18+ | 18+ |

---

## Accessibility

| | Axmed | BaseUI | Radix | shadcn |
|---|---|---|---|---|
| **Focus management** | antd defaults | Full WAI-ARIA | Full WAI-ARIA | Full (via Radix) |
| **Keyboard navigation** | antd defaults | Native | Native | Native (via Radix) |
| **Screen reader** | antd defaults | Full | Full | Full (via Radix) |
| **`prefers-reduced-motion`** | **No** | Yes | Yes | Yes (via Radix) |
| **WCAG 2.2 compliant** | Partial (antd) | AA | AA | AA |
| **aria-live regions** | No | Yes | Yes | Yes |
| **Focus trap (modal)** | antd | Full | Full (FocusTrap primitive) | Full |

**Verdict:** Axmed relies entirely on antd's a11y — which is decent but not excellent. Radix is the gold standard here; its reason for existing is solving the accessibility problem. BaseUI is comparable to Radix. shadcn inherits Radix's a11y. Axmed has the weakest a11y story.

---

## Design Taste & Visual Quality

| | Axmed | BaseUI | Radix | shadcn |
|---|---|---|---|---|
| **Default aesthetic** | Generic SaaS purple | None (unstyled) | None (unstyled) | Clean minimal (slate/zinc) |
| **Typography system** | 12 steps, Figtree | None (your font) | None (your font) | 14-step scale, Inter/system |
| **Motion defaults** | `transition: all 0.2s` | None | None | Tailwind `transition` |
| **Dark mode** | No | Flexible | Flexible | Built-in (CSS vars) |
| **Distinctive? Yes/No** | **No** | N/A (unstyled) | N/A (unstyled) | **Yes** |
| **"AI slop" risk** | High | N/A | N/A | Low-medium |
| **Brand customization** | antd ConfigProvider | Unlimited | Unlimited | CSS variable overrides |

**Verdict:** This is the wrong axis to compare Axmed vs Radix/BaseUI (they're unstyled). But vs shadcn: shadcn's default aesthetic is more opinionated and distinctive despite also using a neutral palette. shadcn's buttons have deliberate ring/ring-offset focus styles, carefully crafted `data-state` transitions, and composable variants via CVA. Axmed's buttons are `font-weight: 500`. The gap here is significant.

---

## Component Completeness

| Component | Axmed | BaseUI | Radix | shadcn |
|---|---|---|---|---|
| Button | ✅ | ✅ | ❌ | ✅ |
| Typography | ✅ | ✅ | ❌ | ✅ |
| Table | ✅ | ✅ | ❌ | ✅ |
| Tag / Badge | ✅ | ✅ | ❌ | ✅ |
| Card | ✅ | ✅ | ❌ | ✅ |
| Modal / Dialog | ✅ | ✅ | ✅ | ✅ |
| Drawer / Sheet | ✅ | ✅ | ❌ | ✅ |
| Empty State | ✅ | ❌ | ❌ | ❌ |
| Filter Bar | ✅ | ❌ | ❌ | ❌ |
| Input / Form | **❌** | ✅ | ❌ | ✅ |
| Select | **❌** | ✅ | ✅ | ✅ |
| Checkbox | **❌** | ✅ | ✅ | ✅ |
| Tooltip | **❌** | ✅ | ✅ | ✅ |
| Dropdown Menu | **❌** | ✅ | ✅ | ✅ |
| Tabs | **❌** | ✅ | ✅ | ✅ |
| Breadcrumb | **❌** | ✅ | ❌ | ✅ |
| Toast / Alert | **❌** | ✅ | ❌ | ✅ |
| Skeleton | **❌** | ✅ | ❌ | ✅ |
| Popover | **❌** | ✅ | ✅ | ✅ |
| Navigation | **❌** | ✅ | ❌ | ✅ |
| **Total** | **9 / 20** | **18 / 20** | **9 / 20** | **19 / 20** |

Axmed has domain-specific components (AxFilterBar, AxEmptyState) that others don't. But it's missing the entire form/input layer — arguably the most critical part of a B2B SaaS design system.

---

## Responsiveness

| | Axmed | BaseUI | Radix | shadcn |
|---|---|---|---|---|
| **Breakpoint system** | 1 media query | CSS Grid/Flexbox | None (unstyled) | Tailwind responsive |
| **Fluid typography** | No | No | N/A | No (px-based) |
| **Container queries** | No | No | N/A | No |
| **Mobile-first** | No | User-defined | N/A | Yes (Tailwind default) |
| **Responsive props** | No | Limited | N/A | Via Tailwind classes |
| **Modal mobile behavior** | Broken at sm sizes | Responsive | N/A | Full-screen at mobile |

**Verdict:** shadcn wins here because Tailwind makes responsive variants trivial (`md:w-[520px]`). BaseUI and Radix punt on this since they're unstyled. Axmed has the most broken story — fixed pixel modal widths with no mobile override is a real production problem.

---

## Developer Experience

| | Axmed | BaseUI | Radix | shadcn |
|---|---|---|---|---|
| **Import overhead** | `import {AxButton}` + peer antd | `import {useButton}` | `import * as Dialog` | Source file in your repo |
| **Bundle size** | antd (large peer) | Very small | Very small | Only what you use |
| **TypeScript** | Good | Excellent | Excellent | Good |
| **Storybook docs** | ✅ Comprehensive | External | External | External |
| **API predictability** | Good | Hook-first (learning curve) | Compound components | Standard React |
| **Upgrade path** | npm update | npm update | npm update | Manual copy/merge |
| **Source access** | npm (closed) | npm (open) | npm (open) | Full (it's your code) |

**The shadcn model is genuinely different:** you own the components. When you need to deviate from a pattern, you just edit the file in your project. With Axmed (or any npm design system), you're blocked when antd doesn't support something, or you need to fork the library.

---

## Honest Summary Table

| Criterion | Axmed | BaseUI | Radix | shadcn |
|---|---|---|---|---|
| Visual quality out-of-box | Medium | None | None | High |
| Domain fit (B2B SaaS) | Good | Flexible | Flexible | Good |
| Accessibility | Medium | Excellent | Excellent | Excellent |
| Responsiveness | Poor | Good | Flexible | Good |
| Component count | Low | High | Medium | High |
| Customizability | Medium (antd bound) | Unlimited | Unlimited | Unlimited |
| Learning curve | Low | Medium | Medium | Low |
| Production readiness | Medium | High | High | High |
| Maintenance burden | Medium (antd dep) | Low | Low | **High (you own it)** |

---

## The Real Question

Axmed's design system is **purpose-built for one app** (the marketplace) and distributed as a package. This creates a tension:

- **If it's only for internal use:** the antd dependency is fine, the opinionated token system is a feature, and the small component count is acceptable because it only covers what the app needs.
- **If it's meant to be a general design system:** it needs accessibility, responsiveness, dark mode, form components, and a more distinctive aesthetic.

**The honest comparison is:** Axmed is at the "we extracted our app's components into a library" stage. Radix/BaseUI/shadcn are at the "we thought deeply about the problem of building component systems" stage. The gap isn't about code quality — the code is clean. The gap is about what problems the system is designed to solve.

The three things that would move Axmed from "internal extracted library" to "real design system":
1. **Accessibility as a first-class concern** (not antd's problem, yours)
2. **Form components** (Input, Select, DatePicker, Checkbox, Radio) — without these it's not a design system, it's a layout kit
3. **Mobile-first responsive behavior** on Modals, Drawers, and Cards

---
---

# Part 2: Animation, Interaction & Motion Audit
> Applied skills: `/12-principles-of-animation`, `/interaction-design`, `/baseline-ui`

---

## `/12-principles-of-animation` — File:Line Findings

Running Disney's 12 principles (adapted for web) across all component CSS.

```
AxButton/index.module.css:3 - [physics-active-state] No :active { transform: scale(0.98) } defined. Button has zero pressed-state feedback.
AxButton/index.module.css:3 - [easing-entrance-ease-out] Uses generic `ease` — entrances require `ease-out` (arrive fast, settle gently).
AxButton/index.module.css:3 - [timing-consistent] `transition: all` animates every CSS property. Width, height, color, padding — none of which should transition on a button.

AxCard/index.module.css:50 - [easing-entrance-ease-out] Hover transition uses generic `ease`, not `ease-out`.
AxCard/index.module.css:49 - [physics-active-state] Hoverable card has no :active state. Clicking feels disconnected — no tactile feedback.

AxModal/index.module.css:77 - [easing-entrance-ease-out] Close button hover uses `ease`. Should be `ease-out` for the hover-in state.
AxModal/index.module.css — [easing-entrance-ease-out] Modal entrance animation is not defined by the design system. Antd's default varies and is not guaranteed to use ease-out.
AxModal/index.module.css — [easing-exit-ease-in] No exit animation defined. Modals should build momentum before departure (ease-in on exit).

AxDrawer/index.module.css — [easing-entrance-ease-out] Same as modal: entrance/exit animations are not owned by the design system.

SYSTEM-WIDE — [physics-active-state] Zero :active states defined across the entire system. Every interactive element (buttons, hoverable cards, tags) is missing pressed-state transforms.
SYSTEM-WIDE — No @media (prefers-reduced-motion) anywhere. All transitions fire unconditionally.
```

### Summary Table

| Rule | Violations | Severity |
|---|---|---|
| `physics-active-state` | 3+ (Button, Card, all interactives) | HIGH |
| `easing-entrance-ease-out` | 4 (Button, Card, Modal, Drawer) | MEDIUM |
| `easing-exit-ease-in` | 2 (Modal, Drawer) | MEDIUM |
| `timing-consistent` | 1 (`transition: all` on Button) | HIGH |
| `prefers-reduced-motion` | System-wide | HIGH |
| `staging-dim-background` | PASS (Modal overlay: `rgba(0,0,0,0.5)`) | — |

**Score: 3/10 for animation.** The system has almost no intentional motion. What exists uses wrong easing and is missing the most fundamental feedback: the pressed state.

---

## `/baseline-ui` — Full Constraint Violations

Running the complete baseline-ui ruleset against the codebase.

### Animation Violations

| Rule | File | Violation |
|---|---|---|
| MUST animate only compositor props (transform, opacity) | `AxButton/index.module.css:3` | `transition: all` — animates width, height, color, padding, border-radius, everything |
| SHOULD avoid animating paint properties | `AxCard/index.module.css:50` | `box-shadow` and `border-color` are paint ops, not compositor. Causes repaint on every frame during hover. |
| SHOULD avoid animating paint properties | `AxModal/index.module.css:77` | `background` transition on close button is a paint property. (Acceptable at this size but noted.) |
| NEVER exceed 200ms for interaction feedback | `AxButton/index.module.css:3` | `0.2s = 200ms` — borderline PASS |
| SHOULD respect `prefers-reduced-motion` | All files | Missing entirely. Every transition fires regardless of user OS preference. |

### Component / Interaction Violations

| Rule | Verdict | Notes |
|---|---|---|
| MUST use structural skeletons for loading states | FAIL | Only AxDrawer has a loading spinner. AxTable, AxCard, AxFilterBar — no skeleton, no shimmer, nothing. |
| MUST use AlertDialog for destructive actions | FAIL | AxModal `danger` prop is just a red button. No `role="alertdialog"`, no `aria-describedby` required description pattern. |
| MUST add `aria-label` to icon-only buttons | FAIL | AxModal/AxDrawer close buttons (`<CloseOutlined>`) have no `aria-label`. Antd injects one in some versions but the design system doesn't own or test it. |
| NEVER rebuild keyboard/focus behavior by hand | PASS | Defers entirely to antd. |
| MUST show errors next to where the action happens | N/A | No form components in system. |
| NEVER block paste in inputs | N/A | No input components. |

### Design Violations

| Rule | Verdict | File |
|---|---|---|
| NEVER use purple | **FAIL** | `.storybook/theme.ts:8` — `colorPrimary: "#261C7A"`. The baseline-ui skill explicitly states "NEVER use purple or multicolor gradients." `#261C7A` is a deep indigo/navy — less generic than mid-range purples, but still in purple-family territory. |
| NEVER use gradients unless requested | PASS | No gradients found. |
| NEVER use glow effects as primary affordances | PASS | No glow effects. |
| MUST give empty states one clear next action | PARTIAL | AxEmptyState `action` prop is optional. Stories without actions exist. The component should require at least one action for non-table contexts. |
| SHOULD limit accent color to one per view | FAIL | Primary indigo (#261C7A) and link blue (#008EF0) compete as accents. Checkboxes use blue, buttons use indigo, links use blue — two accent colors with no clear hierarchy. |
| SHOULD use existing tokens before introducing new values | FAIL | Inline shadows (`0 1px 3px rgba(0,0,0,0.06)`) repeated across AxCard, AxModal. These are not tokens. |

### Typography Violations

| Rule | Verdict | Notes |
|---|---|---|
| MUST use `text-balance` for headings | FAIL | AxText headings have no `text-wrap: balance`. Long heading strings will break at awkward widths. |
| MUST use `text-pretty` for body/paragraphs | FAIL | No `text-wrap: pretty` on body text. Orphaned words at line ends. |
| MUST use `tabular-nums` for data | FAIL | AxTable has no `font-variant-numeric: tabular-nums`. Numeric columns (prices, quantities) will have inconsistent column widths as values change. |
| NEVER modify letter-spacing unless requested | PASS | No `letter-spacing` manipulations found. |

---

## `/interaction-design` — Audit Against Core Principles

### 1. Purposeful Motion

The `/interaction-design` skill defines four purposes for motion: Feedback, Orientation, Focus, Continuity.

**Feedback (confirm actions occurred):**
- AxButton: antd 6 removed the ripple effect. There is no visual confirmation that a button was clicked — no scale, no color flash, no ripple, nothing. For a primary action button this is a significant UX gap.
- Hoverable AxCard: shadow elevation on hover is correct (communicates "clickable"). But no click feedback.
- AxTable row selection: instant color switch with no transition — disorienting at fast click speeds.

**Orientation (show where elements come from/go to):**
- AxModal: no defined entrance direction (should slide up from bottom or fade+scale from center). Antd's default may be a simple fade — no spatial orientation.
- AxDrawer: slides in from right (antd default) — this one is fine by default.
- AxFilterBar select dropdowns: antd default slide-down — acceptable.

**Focus (direct attention to changes):**
- AxFilterBar result count changes silently with no `aria-live` and no micro-animation. When a user applies a filter, there's no visual cue that the count updated.
- AxTable row state changes (selected/disabled): instant, no transition.

**Continuity (maintain context during transitions):**
- Nothing. No shared element transitions, no layout animations, no context-preserving motions.

### 2. Timing Audit

Per the `/interaction-design` timing table:

| Interaction | Should Be | Actual | Status |
|---|---|---|---|
| Button hover/click | 100–150ms | 200ms (`0.2s`) | Slow — reduce to 150ms |
| Card hover | 100–150ms | 150ms | PASS |
| Modal close button hover | 100–150ms | 150ms | PASS |
| Modal entrance | 300–500ms | antd default (~300ms) | Unowned |
| Drawer entrance | 300–500ms | antd default (~300ms) | Unowned |
| Row selection | 100–150ms | 0ms (instant) | No transition at all |
| Filter result count update | 100–150ms | 0ms (instant) | No transition at all |

### 3. Missing Interaction Patterns

The `/interaction-design` skill identifies these as required for a polished UI. Current status:

| Pattern | Present | Notes |
|---|---|---|
| Loading states (skeletons) | No | Critical for AxTable, AxCard, AxFilterBar |
| State transitions with feedback | No | Row selection, filter application |
| Hover/focus states | Partial | AxCard hover yes, AxButton hover unstyled |
| Active/pressed states | No | Zero `:active` states in the entire system |
| Error feedback (shake, highlight) | No | No form components, so N/A for now |
| Toast/notification system | No | Missing component entirely |
| Progress indicators | No | No AxProgress component |

### 4. Easing: What the System Actually Uses vs What It Should

The `/interaction-design` skill defines four named curves:

```css
--ease-out:    cubic-bezier(0.16, 1, 0.3, 1);    /* Decelerate - entering */
--ease-in:     cubic-bezier(0.55, 0, 1, 0.45);   /* Accelerate - exiting */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);   /* Moving between states */
--spring:      cubic-bezier(0.34, 1.56, 0.64, 1); /* Overshoot - playful */
```

What Axmed uses: **`ease`** everywhere. This maps to `cubic-bezier(0.25, 0.1, 0.25, 1.0)` — a symmetric, generic curve that neither enters nor exits with intent. It's the CSS default. Using it is a non-decision.

---

## Animation Score: 2/10

This is the harshest score in the audit. Not because the system is broken — but because animation is treated as an afterthought layered onto antd defaults rather than as a first-class design decision. The specific issues:

1. **No pressed/active states on any interactive element.** This is the single most impactful missing piece. Every tap on mobile, every click on desktop — no physical acknowledgment.
2. **`transition: all`** on the most-used component. This is a baseline-ui violation, a 12-principles violation, and a performance problem.
3. **Wrong easing everywhere.** Generic `ease` vs intentional `ease-out` for entrances. The difference is noticeable — `ease-out` feels responsive and confident, `ease` feels mechanical.
4. **No `prefers-reduced-motion` support.** This affects users with vestibular disorders and is a WCAG 2.3 requirement.
5. **Entrance/exit animations are not owned by the design system.** Modal, Drawer, Dropdown — the system takes antd's defaults and calls it done. For a design system, motion should be as intentional as color.
6. **Zero loading states.** A B2B data app without skeleton screens is a significant quality gap.

---

## Revised Overall Scores

| Dimension | Previous | Revised | Change |
|---|---|---|---|
| Taste / Aesthetic | 5.5 | 5.5 | — |
| Interface Design | 6.5 | 6.5 | — |
| Responsiveness | 4 | 4 | — |
| Baseline UI Quality | 6 | **4.5** | ↓ — animation violations are more numerous than first assessed |
| Accessibility | 4.5 | **4** | ↓ — AlertDialog pattern missing, aria-label on close buttons |
| **Animation & Motion** | _not assessed_ | **2** | New |
| **Interaction Design** | _not assessed_ | **3** | New |
| API Design | 7.5 | 7.5 | — |
| **OVERALL** | 5.7 | **5.1** | ↓ |

---

## Consolidated Action List (All Skills Combined)

### Critical — Fix Before Shipping
1. ~~**`--neutral-150` bug`**~~ — **NOT a bug.** `--neutral-150: #F0F0F0` is defined at `styles/_colors.scss:27`. AxFilterBar borders are fine.
2. **`wireframe: true`** in Modal ConfigProvider — debug flag in production
3. **`transition: all`** on AxButton → replace with specific properties
4. **No `prefers-reduced-motion`** — add to globals.scss or each component
5. **No `:active` states** — add `transform: scale(0.98)` to all interactive elements

### High Priority — Noticeable Quality Gap
6. **Wrong easing** — replace all `ease` with `ease-out` for hover-in, `ease-in` for hover-out
7. **No skeletons** — AxTable, AxCard, AxFilterBar need loading states
8. **AxButton needs real CSS** — hover color, active scale, focus ring
9. **`tabular-nums` on AxTable** — numeric data columns need consistent width
10. **`text-balance` on AxText headings** — prevents awkward line breaks
11. **AlertDialog pattern for `danger` modal** — add `role="alertdialog"` and description
12. **`aria-label` on close buttons** — AxModal and AxDrawer close icons

### Medium Priority — Polish
13. **Define motion tokens** as CSS custom properties (--duration-fast, --ease-out, etc.)
14. **Unify Modal/Drawer size naming** — `sm/md/lg` consistently, not `sm/default/lg`
15. **Shadow tokens** — not inline `rgba()` values in every component
16. **Box-shadow hover animation** on AxCard → prefer `filter: drop-shadow` (compositor) over `box-shadow` (paint)
17. **Entrance/exit animations** for Modal and Drawer owned by the design system
18. **Row selection transition** in AxTable — `background-color 100ms ease-out`
19. **Connect typography tokens** — AxText should reference `var(--font-size-*)` not hardcoded px
20. **Two accent colors competing** — clarify primary/secondary accent hierarchy
