# AxText

> Semantic typography component with fluid heading sizes, weight/color variants, ellipsis truncation with tooltip support, and monospace mode. Uses antd Tooltip internally for truncation tooltips.

## Import

```tsx
import { AxText } from "axmed-design-system"
import type { AxTextProps } from "axmed-design-system"
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"heading-4xl"` \| `"heading-3xl"` \| `"heading-2xl"` \| `"heading-xl"` \| `"heading-lg"` \| `"heading-md"` \| `"heading-sm"` \| `"body-xl"` \| `"body-lg"` \| `"body-md"` \| `"body-sm"` \| `"body-xs"` | -- (required) | Text style variant from the design system type scale. |
| `weight` | `"regular"` \| `"medium"` \| `"semibold"` | `"regular"` | Font weight. Only applies to body variants; headings have fixed weights. |
| `italic` | `boolean` | `false` | Apply italic style. |
| `underline` | `boolean` | `false` | Apply underline decoration. |
| `mono` | `boolean` | `false` | Use monospace font (Fira Code). Useful for SKUs, prices, and code snippets. |
| `color` | `"primary"` \| `"secondary"` \| `"link"` \| `"disabled"` \| `"inherit"` | `"primary"` | Semantic text color mapped to CSS custom properties. |
| `as` | `"h1"` \| `"h2"` \| `"h3"` \| `"h4"` \| `"h5"` \| `"h6"` \| `"p"` \| `"span"` \| `"label"` \| `"div"` | Auto-mapped from variant | Override the rendered HTML element. |
| `ellipsis` | `boolean` \| `{ rows?: number, tooltip?: ReactNode }` | -- | Truncate text with ellipsis. Pass `true` for single-line, or a config object for multi-line clamping and tooltip. |
| `children` | `ReactNode` | -- | Text content. |
| `className` | `string` | -- | Additional CSS class name. |

The component also accepts all standard HTML attributes (e.g. `style`, `id`, `onClick`).

### Auto element mapping

| Variant | Default element |
| --- | --- |
| `heading-4xl` | `<h1>` |
| `heading-3xl` | `<h2>` |
| `heading-2xl` | `<h3>` |
| `heading-xl` | `<h4>` |
| `heading-lg` | `<h5>` |
| `heading-md` | `<p>` |
| `heading-sm` | `<p>` |
| `body-*` | `<p>` |

`heading-md` and `heading-sm` render as `<p>` by default because they are UI labels (14px/13px semibold), not document headings. Use `as="h6"` when heading semantics are genuinely needed.

## Basic Usage

```tsx
import { AxText } from "axmed-design-system"

function PageHeader() {
  return (
    <div>
      <AxText variant="heading-xl">Order Summary</AxText>
      <AxText variant="body-md" color="secondary">
        Review your procurement order details before submitting.
      </AxText>
    </div>
  )
}
```

## Examples

### All heading sizes

```tsx
import { AxText } from "axmed-design-system"

function HeadingScale() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <AxText variant="heading-4xl">Pharmaceutical Procurement</AxText>
      <AxText variant="heading-3xl">Pharmaceutical Procurement</AxText>
      <AxText variant="heading-2xl">Pharmaceutical Procurement</AxText>
      <AxText variant="heading-xl">Pharmaceutical Procurement</AxText>
      <AxText variant="heading-lg">Pharmaceutical Procurement</AxText>
      <AxText variant="heading-md">Pharmaceutical Procurement</AxText>
      <AxText variant="heading-sm">Pharmaceutical Procurement</AxText>
    </div>
  )
}
```

Headings use fluid font sizes via `clamp()` -- they scale smoothly between 375px and 1280px viewport widths. `text-wrap: balance` is applied to all heading variants for even line distribution.

### Body text with weights

```tsx
import { AxText } from "axmed-design-system"

function BodyWeights() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <AxText variant="body-lg" weight="regular">
        Amoxicillin 500mg capsules -- 10,000 units in stock across 3 warehouses.
      </AxText>
      <AxText variant="body-lg" weight="medium">
        Amoxicillin 500mg capsules -- 10,000 units in stock across 3 warehouses.
      </AxText>
      <AxText variant="body-lg" weight="semibold">
        Amoxicillin 500mg capsules -- 10,000 units in stock across 3 warehouses.
      </AxText>
      <AxText variant="body-sm" weight="regular" underline>
        View full inventory report
      </AxText>
    </div>
  )
}
```

### Colors

```tsx
import { AxText } from "axmed-design-system"

function TextColors() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <AxText variant="body-lg" color="primary">
        Primary text -- #262626 (default for body copy)
      </AxText>
      <AxText variant="body-lg" color="secondary">
        Secondary text -- #667085 (descriptions, metadata)
      </AxText>
      <AxText variant="body-lg" color="link">
        Link text -- #007094 (WCAG AA compliant, 6.2:1 contrast)
      </AxText>
      <AxText variant="body-lg" color="disabled">
        Disabled text -- #98A2B3 (inactive labels)
      </AxText>
    </div>
  )
}
```

### Ellipsis with multi-line truncation

```tsx
import { AxText } from "axmed-design-system"

function TruncatedDescriptions() {
  const description =
    "Axmed brings just, verifiable, and wide pharmaceutical access to every region. " +
    "Our platform expedites the full procurement cycle -- from publishing tenders and " +
    "analyzing bids to organizing shipments, warehousing stock, and executing payments."

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      {/* Single-line truncation */}
      <AxText variant="body-md" ellipsis>
        Amoxicillin 500mg Capsules, 100 units per blister pack, WHO prequalified
      </AxText>

      {/* Multi-line clamping (2 rows) */}
      <AxText variant="body-md" ellipsis={{ rows: 2 }}>
        {description}
      </AxText>

      {/* With tooltip on hover when truncated */}
      <AxText
        variant="body-md"
        ellipsis={{
          rows: 3,
          tooltip: description,
        }}
      >
        {description}
      </AxText>
    </div>
  )
}
```

The tooltip only appears when the text is actually truncated. AxText uses a `ResizeObserver` internally to detect truncation state, so the tooltip stays responsive to container resizing.

### Mono variant for code and identifiers

```tsx
import { AxText } from "axmed-design-system"

function OrderIdentifiers() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <AxText variant="body-md" mono>
        ORD-2024-KE-00142
      </AxText>
      <AxText variant="body-sm" mono>
        SKU-AMX-500MG-CAP
      </AxText>
      <AxText variant="body-md" mono weight="semibold">
        Total: $12,450.00
      </AxText>
      <AxText variant="body-xs" mono color="secondary">
        const unitPrice = calculatePrice(quantity, discount)
      </AxText>
    </div>
  )
}
```

The `mono` prop switches the font family to Fira Code. For aligned number columns, note that `font-variant-numeric: tabular-nums` is applied per-component (e.g. AxTable, AxStatCard, AxBadge) rather than by AxText itself.

## Related Components

- **AxButton** -- Uses AxText-aligned sizing for label text.
- **AxCard** -- Pair with AxText for card titles and descriptions.
- **AxEmptyState** -- Uses AxText internally for empty state messaging.
- **AxStatCard** -- Uses AxText for metric values and labels.

## Storybook

[View in Storybook](https://ax-derrick.github.io/axmed-design-system/?path=/docs/foundations-typography--docs)
