# AxBrand

> Axmed logo mark and wordmark rendered as inline SVG with size and theme presets -- no antd dependency.

## Import

```tsx
import { AxBrand } from "axmed-design-system"
import type { AxBrandProps, AxBrandSize, AxBrandVariant, AxBrandTheme } from "axmed-design-system"
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"icon"` \| `"wordmark"` | `"wordmark"` | `"icon"` renders the flame mark only. `"wordmark"` renders the flame mark with "Axmed" text. |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Height preset: `sm` = 20px, `md` = 28px, `lg` = 36px. Width scales proportionally. |
| `theme` | `"light"` \| `"dark"` | `"light"` | `"light"` uses navy mark on light backgrounds. `"dark"` uses white mark on dark/navy backgrounds. |
| `className` | `string` | -- | Additional CSS class name. |
| `style` | `CSSProperties` | -- | Inline styles applied to the root `<span>`. |

The component renders as a `<span>` with `aria-label="Axmed"` for accessibility. The inner SVG is marked `aria-hidden="true"`.

## Basic Usage

```tsx
import { AxBrand } from "axmed-design-system"

function AppLogo() {
  return <AxBrand variant="wordmark" size="md" />
}
```

## Examples

### Wordmark vs icon

```tsx
import { AxBrand } from "axmed-design-system"

function BrandVariants() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
      <div>
        <AxBrand variant="wordmark" size="md" />
        <p style={{ marginTop: 8, fontSize: 12, color: "#667085" }}>Wordmark</p>
      </div>
      <div>
        <AxBrand variant="icon" size="md" />
        <p style={{ marginTop: 8, fontSize: 12, color: "#667085" }}>Icon</p>
      </div>
    </div>
  )
}
```

### All sizes

```tsx
import { AxBrand } from "axmed-design-system"

function BrandSizes() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <div style={{ textAlign: "center" }}>
        <AxBrand variant="wordmark" size="sm" />
        <p style={{ marginTop: 8, fontSize: 12, color: "#667085" }}>sm (20px)</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <AxBrand variant="wordmark" size="md" />
        <p style={{ marginTop: 8, fontSize: 12, color: "#667085" }}>md (28px)</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <AxBrand variant="wordmark" size="lg" />
        <p style={{ marginTop: 8, fontSize: 12, color: "#667085" }}>lg (36px)</p>
      </div>
    </div>
  )
}
```

### Dark theme on dark background

```tsx
import { AxBrand } from "axmed-design-system"

function DarkThemeBrand() {
  return (
    <div
      style={{
        background: "#261C7A",
        padding: 32,
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        gap: 32,
      }}
    >
      <AxBrand variant="wordmark" size="lg" theme="dark" />
      <AxBrand variant="icon" size="lg" theme="dark" />
    </div>
  )
}
```

### In sidebar (expanded = wordmark, collapsed = icon)

```tsx
import { useState } from "react"
import { AxBrand, AxSideNav } from "axmed-design-system"
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
} from "@ant-design/icons"

function SidebarWithBrand() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <AxSideNav
      collapsed={collapsed}
      onCollapse={setCollapsed}
      selectedKey="dashboard"
      logo={
        <AxBrand
          variant={collapsed ? "icon" : "wordmark"}
          size="md"
        />
      }
      items={[
        {
          key: "dashboard",
          label: "Dashboard",
          icon: <DashboardOutlined />,
        },
        {
          key: "orders",
          label: "Orders",
          icon: <ShoppingCartOutlined />,
        },
        {
          key: "suppliers",
          label: "Suppliers",
          icon: <TeamOutlined />,
        },
      ]}
    />
  )
}
```

This is the recommended pattern: swap `variant` between `"wordmark"` and `"icon"` based on the sidebar `collapsed` state so the logo adapts fluidly to the available space.

## Related Components

- **AxSideNav** -- Accepts `logo` prop where AxBrand is typically placed.
- **AxHeader** -- Use AxBrand in the `left` or `mobileLogo` slot for app headers.

## Storybook

[View in Storybook](https://ax-derrick.github.io/axmed-design-system/?path=/docs/foundations-axbrand--docs)
