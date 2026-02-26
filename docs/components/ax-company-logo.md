# AxCompanyLogo

> Company avatar wrapping antd Avatar with deterministic colour-coded initials fallback when no image is provided.

## Import

```tsx
import { AxCompanyLogo } from "axmed-design-system"
import type { AxCompanyLogoProps, AxCompanyLogoSize } from "axmed-design-system"
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | **required** | Company or supplier name. Used to derive initials and a deterministic fallback colour. |
| `src` | `string` | `undefined` | Logo image URL. When provided, renders an `<img>` via antd Avatar instead of initials. |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Size preset: `sm` = 28px, `md` = 36px, `lg` = 48px, `xl` = 64px. |
| `shape` | `"square" \| "circle"` | `"square"` | Shape of the avatar. Square uses a proportional border-radius (~22% of size). |
| `className` | `string` | `undefined` | Additional CSS class. |
| `style` | `React.CSSProperties` | `undefined` | Inline styles. |

**Initials logic:**

| Input | Output |
|---|---|
| `"PharmaCorp Ltd"` | `PL` |
| `"Axmed"` | `AX` |
| `"MediSource Kenya"` | `MK` |
| `"GenRx"` | `GE` |

Single-word names use the first two characters. Multi-word names use the first character of the first two words.

**Colour palette:** The background and text colour are deterministically selected from a six-colour palette based on a hash of the `name` string. The palette uses design token pairs for accessible contrast:

| Palette | Background | Text |
|---|---|---|
| Purple | `var(--primary-100)` | `var(--primary-600)` |
| Cyan | `var(--cyan-100)` | `var(--cyan-700)` |
| Green | `var(--green-100)` | `var(--green-700)` |
| Magenta | `var(--magenta-100)` | `var(--magenta-700)` |
| Orange | `var(--orange-100)` | `var(--orange-700)` |
| Neutral | `var(--neutral-100)` | `var(--neutral-700)` |

## Basic Usage

```tsx
import { AxCompanyLogo } from "axmed-design-system"

function SupplierAvatar() {
  return <AxCompanyLogo name="PharmaCorp Ltd" size="md" />
}
```

## Examples

### With image

```tsx
import { AxCompanyLogo } from "axmed-design-system"

function VerifiedSupplier() {
  return (
    <AxCompanyLogo
      name="MediSource Kenya"
      src="https://example.com/logos/medisource.png"
      size="lg"
    />
  )
}
```

When the image fails to load, the component automatically falls back to the initials view.

### Initials fallback

```tsx
import { AxCompanyLogo } from "axmed-design-system"

function SupplierLogos() {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <AxCompanyLogo name="PharmaCorp Ltd" />
      <AxCompanyLogo name="MediSource Kenya" />
      <AxCompanyLogo name="GenRx Tanzania" />
      <AxCompanyLogo name="Axmed" />
      <AxCompanyLogo name="NovaPharma" />
    </div>
  )
}
```

Each logo gets a unique, deterministic colour based on the company name -- the same name always produces the same colour.

### All sizes

```tsx
import { AxCompanyLogo } from "axmed-design-system"

function SizeComparison() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <AxCompanyLogo name="PharmaCorp" size="sm" />  {/* 28px */}
      <AxCompanyLogo name="PharmaCorp" size="md" />  {/* 36px */}
      <AxCompanyLogo name="PharmaCorp" size="lg" />  {/* 48px */}
      <AxCompanyLogo name="PharmaCorp" size="xl" />  {/* 64px */}
    </div>
  )
}
```

### In a supplier list row (common pattern)

```tsx
import { AxCompanyLogo, AxTag } from "axmed-design-system"

interface Supplier {
  name: string
  logo?: string
  location: string
  status: "verified" | "pending" | "suspended"
}

function SupplierRow({ supplier }: { supplier: Supplier }) {
  const toneMap = {
    verified: "success" as const,
    pending: "warning" as const,
    suspended: "error" as const,
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0" }}>
      <AxCompanyLogo name={supplier.name} src={supplier.logo} size="md" />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{supplier.name}</div>
        <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{supplier.location}</div>
      </div>
      <AxTag tone={toneMap[supplier.status]} pill small>
        {supplier.status}
      </AxTag>
    </div>
  )
}

// Usage:
<SupplierRow
  supplier={{
    name: "MediSource Kenya",
    location: "Nairobi, Kenya",
    status: "verified",
  }}
/>
```

## Related Components

- **[AxTable](/docs/components/ax-table.md)** -- AxCompanyLogo is commonly used in the first column of supplier and bid tables.
- **[AxTag](/docs/components/ax-tag.md)** -- Pair with AxCompanyLogo in list rows to show supplier verification status.
- **[AxSideNav](https://ax-derrick.github.io/axmed-design-system/?path=/docs/layout-axsidenav--docs)** -- The navigation can include an AxCompanyLogo for the logged-in organisation.

## Storybook

- [AxCompanyLogo](https://ax-derrick.github.io/axmed-design-system/?path=/docs/data-display-axcompanylogo--docs)
