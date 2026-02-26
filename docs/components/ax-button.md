# AxButton

> Semantic button component wrapping antd Button with a variant-based API that replaces antd's `type`, `danger`, and `ghost` props with a single `variant` prop.

## Import

```tsx
import { AxButton } from "axmed-design-system"
import type { AxButtonProps } from "axmed-design-system"
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"primary" \| "secondary" \| "ghost" \| "danger" \| "link" \| "text"` | `"primary"` | Visual style of the button. Maps internally to antd's `type`, `danger`, and `ghost` props. |
| `size` | `"small" \| "middle" \| "large"` | `"middle"` | Button size. Passed through to antd directly (does not use the `"sm"/"md"/"lg"` convention). |
| `icon` | `ReactNode` | -- | Icon element rendered inside the button. |
| `iconPlacement` | `"start" \| "end"` | `"start"` | Position of the icon relative to the label text. |
| `loading` | `boolean` | `false` | Shows a spinner and disables interactions. |
| `disabled` | `boolean` | `false` | Disables the button. |
| `block` | `boolean` | `false` | Makes the button span the full width of its container. |
| `shape` | `"default" \| "circle" \| "round"` | `"default"` | Button shape. |
| `className` | `string` | -- | Additional CSS class name. |
| `onClick` | `(e: MouseEvent) => void` | -- | Click handler. |

All other [antd Button props](https://ant.design/components/button) are forwarded, **except** `type`, `danger`, and `ghost` (these are controlled by `variant`).

### Variant mapping

| Variant | antd equivalent |
| --- | --- |
| `primary` | `type="primary"` |
| `secondary` | `type="default"` |
| `ghost` | `type="primary" ghost` |
| `danger` | `type="primary" danger` |
| `link` | `type="link"` |
| `text` | `type="text"` |

## Basic Usage

```tsx
import { AxButton } from "axmed-design-system"

function SubmitOrder() {
  return (
    <AxButton variant="primary" onClick={() => console.log("Order submitted")}>
      Submit Order
    </AxButton>
  )
}
```

## Examples

### All variants side by side

```tsx
import { AxButton } from "axmed-design-system"

function ButtonVariants() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
      <AxButton variant="primary">Approve Shipment</AxButton>
      <AxButton variant="secondary">View Details</AxButton>
      <AxButton variant="ghost">Export Report</AxButton>
      <AxButton variant="danger">Reject Order</AxButton>
      <AxButton variant="link">View Supplier</AxButton>
      <AxButton variant="text">Cancel</AxButton>
    </div>
  )
}
```

### With icons

```tsx
import { AxButton } from "axmed-design-system"
import { SearchOutlined, DownloadOutlined, PlusOutlined } from "@ant-design/icons"

function ButtonsWithIcons() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      {/* Icon on the left (default) */}
      <AxButton variant="primary" icon={<PlusOutlined />}>
        New Purchase Order
      </AxButton>

      {/* Icon on the right */}
      <AxButton variant="secondary" icon={<DownloadOutlined />} iconPlacement="end">
        Download Invoice
      </AxButton>

      {/* Icon only (circle shape) */}
      <AxButton variant="secondary" icon={<SearchOutlined />} shape="circle" />
    </div>
  )
}
```

### Loading state

```tsx
import { useState } from "react"
import { AxButton } from "axmed-design-system"

function SubmitWithLoading() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    await fetch("/api/orders", { method: "POST" })
    setLoading(false)
  }

  return (
    <AxButton variant="primary" loading={loading} onClick={handleSubmit}>
      {loading ? "Processing..." : "Place Order"}
    </AxButton>
  )
}
```

### Full width button

```tsx
import { AxButton } from "axmed-design-system"

function FullWidthActions() {
  return (
    <div style={{ maxWidth: 400 }}>
      <AxButton variant="primary" block>
        Confirm Delivery
      </AxButton>
      <AxButton variant="secondary" block style={{ marginTop: 8 }}>
        Cancel
      </AxButton>
    </div>
  )
}
```

### Sizes

```tsx
import { AxButton } from "axmed-design-system"

function ButtonSizes() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <AxButton size="small">Small</AxButton>
      <AxButton size="middle">Middle</AxButton>
      <AxButton size="large">Large</AxButton>
    </div>
  )
}
```

## Related Components

- [AxActionMenu](./ax-action-menu.md) -- uses AxButton internally as its default trigger
- [AxEmptyState](https://ax-derrick.github.io/axmed-design-system/?path=/docs/feedback-axemptystate--docs) -- accepts AxButton as a CTA via its `action` prop

## Storybook

[View in Storybook](https://ax-derrick.github.io/axmed-design-system/?path=/docs/actions-axbutton--docs)
