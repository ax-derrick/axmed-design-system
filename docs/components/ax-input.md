# AxInput

> Text input wrapping antd Input with a composable label, hint, and error layout and a consistent `sm | md | lg` size API.

## Import

```tsx
import { AxInput } from "axmed-design-system"
import type { AxInputProps } from "axmed-design-system"
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Input size. Maps internally to antd `small`, `middle`, `large`. |
| `label` | `string` | -- | Label displayed above the input. Automatically linked via `htmlFor`. |
| `hint` | `string` | -- | Helper text displayed below the input (neutral color). |
| `error` | `string` | -- | Error message displayed below the input in red. Also sets `status="error"` and `aria-invalid`. |
| `required` | `boolean` | `false` | Adds a red asterisk to the label. Does not add HTML native validation. |
| `id` | `string` | auto-generated | Input element ID. Auto-generated with `useId()` if not provided. |
| `status` | `"error" \| "warning"` | -- | antd status styling. Overridden by `error` prop when present. |
| `className` | `string` | -- | Additional CSS class name. |

All other [antd Input props](https://ant.design/components/input) are forwarded, **except** `size` and `required` (remapped by AxInput).

## Basic Usage

```tsx
import { AxInput } from "axmed-design-system"

function MedicationForm() {
  return (
    <AxInput
      label="Product Name"
      placeholder="e.g. Amoxicillin 500mg"
    />
  )
}
```

## Examples

### With label and hint

```tsx
import { AxInput } from "axmed-design-system"

function BatchInput() {
  return (
    <AxInput
      label="Batch Number"
      hint="Found on the outer packaging label"
      placeholder="e.g. BN-2026-04-0012"
    />
  )
}
```

### Error state

```tsx
import { useState } from "react"
import { AxInput } from "axmed-design-system"

function ValidatedInput() {
  const [value, setValue] = useState("")
  const error = value.length > 0 && value.length < 3
    ? "Product name must be at least 3 characters"
    : undefined

  return (
    <AxInput
      label="Product Name"
      required
      value={value}
      onChange={(e) => setValue(e.target.value)}
      error={error}
      placeholder="Enter product name"
    />
  )
}
```

### Required field

```tsx
import { AxInput } from "axmed-design-system"

function SupplierForm() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
      <AxInput label="Company Name" required placeholder="e.g. PharmaCo Ltd." />
      <AxInput label="Contact Email" required placeholder="procurement@example.com" />
      <AxInput label="Phone Number" placeholder="+254 700 000 000" hint="Optional" />
    </div>
  )
}
```

### With prefix and suffix icons

```tsx
import { AxInput } from "axmed-design-system"
import { MailOutlined, InfoCircleOutlined } from "@ant-design/icons"
import { Tooltip } from "antd"

function EmailInput() {
  return (
    <AxInput
      label="Email Address"
      prefix={<MailOutlined style={{ color: "var(--text-secondary)" }} />}
      suffix={
        <Tooltip title="We'll send order confirmations to this address">
          <InfoCircleOutlined style={{ color: "var(--text-secondary)" }} />
        </Tooltip>
      }
      placeholder="procurement@hospital.org"
    />
  )
}
```

### AxSearchInput with debounced search

```tsx
import { useState } from "react"
import { AxSearchInput } from "axmed-design-system"

function MedicationSearch() {
  const [results, setResults] = useState<string[]>([])

  const handleSearch = async (query: string) => {
    if (!query) {
      setResults([])
      return
    }
    const res = await fetch(`/api/medications?q=${encodeURIComponent(query)}`)
    const data = await res.json()
    setResults(data.items)
  }

  return (
    <div>
      <AxSearchInput
        placeholder="Search medications..."
        onSearch={handleSearch}
        debounce={400}
        size="md"
      />
      <p style={{ marginTop: 8, color: "var(--text-secondary)" }}>
        {results.length} results
      </p>
    </div>
  )
}
```

---

## AxSearchInput

> Pre-configured search input with a search icon, debounced `onSearch` callback, and `allowClear`.

### Import

```tsx
import { AxSearchInput } from "axmed-design-system"
import type { AxSearchInputProps } from "axmed-design-system"
```

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onSearch` | `(value: string) => void` | -- | Called with the current value after the debounce delay. |
| `debounce` | `number` | `300` | Debounce delay in milliseconds before `onSearch` fires. |
| `allowClear` | `boolean` | `true` | Shows a clear button when the input has a value. |
| `placeholder` | `string` | `"Search..."` | Placeholder text. |

Inherits all [AxInput props](#props) except `prefix` and `type` (set internally to a search icon).

## Related Components

- [AxFilterBar](./ax-filter-bar.md) -- uses AxSearchInput internally for the search slot
- [AxInputOTP](./ax-input-otp.md) -- OTP/PIN variant with the same label/hint/error layout

## Storybook

- [AxInput docs](https://ax-derrick.github.io/axmed-design-system/?path=/docs/controls-axinput--docs)
- [AxSearchInput docs](https://ax-derrick.github.io/axmed-design-system/?path=/docs/controls-axinput-search--docs)
