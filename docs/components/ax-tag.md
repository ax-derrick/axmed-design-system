# AxTag

> Status label wrapping antd Tag with a five-tone semantic system, dot indicators, pill shapes, and solid fills.

## Import

```tsx
import { AxTag, AxCountryTags } from "axmed-design-system"
import type { AxTagProps, AxTagTone, AxCountryTagsProps } from "axmed-design-system"
```

## Props

### AxTag

| Prop | Type | Default | Description |
|---|---|---|---|
| `tone` | `"success" \| "info" \| "warning" \| "error" \| "neutral"` | `undefined` | Semantic tone mapped to a colour preset and dot colour. Enables the dot indicator by default. |
| `dot` | `boolean` | `true` when `tone` is set (and no `icon` or `fill`) | Show a coloured dot indicator before the label. Automatically hidden when `icon` or `fill` is provided. Pass `false` to suppress manually. |
| `dotColor` | `string` | Derived from `tone` | Custom dot colour. Overrides the preset dot colour from `tone`. |
| `pill` | `boolean` | `false` | Pill-shaped tag with fully rounded corners (`border-radius: 16px`). |
| `fill` | `string` | `undefined` | Solid fill background colour with white text and no border. Pass a hex value or CSS variable. |
| `small` | `boolean` | `false` | Compact variant with `11px` font size and tighter padding. Useful for inline badges. |
| `className` | `string` | `undefined` | Additional CSS class. |
| `children` | `ReactNode` | -- | Tag label content. |
| `icon` | `ReactNode` | `undefined` | Icon rendered before the label (suppresses the dot when set). |
| `style` | `React.CSSProperties` | `undefined` | Inline styles. |
| `...rest` | `AntTagProps` | -- | All standard antd Tag props (`closable`, `onClose`, `bordered`, etc.) are forwarded. |

**Tone mapping:**

| Tone | Use cases | Dot colour |
|---|---|---|
| `success` | Completed, delivered, awarded, in stock | `var(--success)` (green) |
| `info` | Processing, in review, in transit | `var(--cyan-600)` (blue) |
| `warning` | Not awarded, low stock, needs refresh | `var(--warning)` (orange) |
| `error` | Cancelled, rejected, withdrawn | `var(--error)` (red) |
| `neutral` | Pending, draft, expired | `var(--neutral-500)` (grey) |

### AxCountryTags

Renders a row of country tags with flag emojis and an overflow tooltip.

| Prop | Type | Default | Description |
|---|---|---|---|
| `countries` | `string[]` | **required** | Country names or ISO alpha-2 codes (e.g. `"Kenya"`, `"KE"`, `"nigeria"`). |
| `max` | `number` | `3` | Maximum tags shown inline before collapsing to `"+N more"` with a tooltip. |
| `size` | `"sm" \| "md"` | `"sm"` | Size variant. |
| `className` | `string` | `undefined` | Additional CSS class. |

Supported name resolution: `"KE"`, `"Kenya"`, `"kenya"` all resolve to the Kenyan flag. The component supports common African markets (Kenya, Nigeria, Ghana, Tanzania, Uganda, Ethiopia, Rwanda, etc.) plus global countries (US, UK, India, China, Germany, France, etc.).

## Basic Usage

```tsx
import { AxTag } from "axmed-design-system"

function OrderStatus({ status }: { status: string }) {
  const toneMap: Record<string, AxTagTone> = {
    delivered: "success",
    "in transit": "info",
    "pending approval": "warning",
    cancelled: "error",
    draft: "neutral",
  }

  return <AxTag tone={toneMap[status]}>{status}</AxTag>
}
```

## Examples

### All tones

```tsx
import { AxTag } from "axmed-design-system"

function ToneShowcase() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <AxTag tone="success">Awarded</AxTag>
      <AxTag tone="info">In Review</AxTag>
      <AxTag tone="warning">Expiring Soon</AxTag>
      <AxTag tone="error">Rejected</AxTag>
      <AxTag tone="neutral">Draft</AxTag>
    </div>
  )
}
```

### With dots

```tsx
import { AxTag } from "axmed-design-system"

function SupplierStatus() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <AxTag tone="success">Verified Supplier</AxTag>
      <AxTag tone="warning">Pending Verification</AxTag>
      <AxTag tone="neutral" dotColor="var(--primary)">New Application</AxTag>
    </div>
  )
}
```

The dot indicator is enabled automatically when a `tone` is set. Pass `dot={false}` to hide it, or `dotColor` to override the preset colour.

### Pill shape

```tsx
import { AxTag } from "axmed-design-system"

function MedicationCategories() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <AxTag pill tone="info">Antibiotics</AxTag>
      <AxTag pill tone="success">In Stock</AxTag>
      <AxTag pill fill="var(--primary)">Recommended</AxTag>
      <AxTag pill small>Generic</AxTag>
    </div>
  )
}
```

### Closeable tags

```tsx
import { AxTag } from "axmed-design-system"

function ActiveFilters() {
  const [filters, setFilters] = useState([
    "Amoxicillin",
    "Tier 1",
    "Kenya",
    "< $0.10 / unit",
  ])

  const removeFilter = (filter: string) => {
    setFilters((prev) => prev.filter((f) => f !== filter))
  }

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {filters.map((filter) => (
        <AxTag
          key={filter}
          closable
          onClose={() => removeFilter(filter)}
          tone="info"
          pill
        >
          {filter}
        </AxTag>
      ))}
    </div>
  )
}
```

### AxCountryTags with overflow

```tsx
import { AxCountryTags } from "axmed-design-system"

function SupplierMarkets() {
  return (
    <AxCountryTags
      countries={["Kenya", "Nigeria", "Ghana", "Tanzania", "Uganda", "Ethiopia"]}
      max={3}
      size="sm"
    />
  )
  // Renders: 🇰🇪 Kenya  🇳🇬 Nigeria  🇬🇭 Ghana  +3 more
  // Hovering "+3 more" shows tooltip: "Tanzania, Uganda, Ethiopia"
}
```

You can also pass ISO alpha-2 codes:

```tsx
<AxCountryTags countries={["KE", "NG", "GH", "TZ"]} max={2} />
// Renders: 🇰🇪 KE  🇳🇬 NG  +2 more
```

## Related Components

- **[AxBadge](/docs/components/ax-badge.md)** -- For numeric notification counts. Use AxTag for inline status labels, AxBadge for count indicators.
- **[AxTable](/docs/components/ax-table.md)** -- AxTag is frequently used inside table cells to display order or bid statuses.
- **[AxFilterBar](https://ax-derrick.github.io/axmed-design-system/?path=/docs/controls-axfilterbar--docs)** -- Active filters can render as closeable AxTag instances.

## Storybook

- [AxTag](https://ax-derrick.github.io/axmed-design-system/?path=/docs/data-display-axtag--docs)
- [AxTag / Country Tags](https://ax-derrick.github.io/axmed-design-system/?path=/docs/data-display-axtag-country-tags--docs)
