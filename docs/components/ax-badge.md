# AxBadge

> Notification count badge wrapping antd Badge with a five-tone semantic colour system and consistent sizing.

## Import

```tsx
import { AxBadge } from "axmed-design-system"
import type { AxBadgeProps, AxBadgeTone } from "axmed-design-system"
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `tone` | `"primary" \| "success" \| "warning" \| "error" \| "neutral"` | `"primary"` | Semantic tone mapped to design token colours. |
| `size` | `"sm" \| "md"` | `"md"` | Badge size: `sm` = 18px, `md` = 22px. |
| `count` | `number` | `undefined` | Number to display in the badge. |
| `overflowCount` | `number` | `99` (antd default) | Maximum count before displaying `{overflowCount}+`. |
| `dot` | `boolean` | `false` | Show a dot indicator instead of a count. |
| `showZero` | `boolean` | `false` | Whether to show the badge when `count` is zero. |
| `className` | `string` | `undefined` | Additional CSS class. |
| `...rest` | `Omit<AntBadgeProps, "size" \| "color">` | -- | All other antd Badge props (`offset`, `title`, `status`, `text`, `children`, etc.) are forwarded. |

**Tone colours:**

| Tone | Colour | Token | Typical use |
|---|---|---|---|
| `primary` | Purple | `var(--primary)` | Nav counts, active items, default |
| `success` | Green | `var(--success)` | Completed items, verified counts |
| `warning` | Orange | `var(--orange-500)` | Draft quotes, expiring items |
| `error` | Red | `var(--error)` | Critical alerts, overdue counts |
| `neutral` | Grey | `var(--neutral-500)` | Informational, read notifications |

## Basic Usage

```tsx
import { AxBadge } from "axmed-design-system"
import { BellOutlined } from "@ant-design/icons"

function NotificationBell() {
  return (
    <AxBadge count={5} tone="error">
      <BellOutlined style={{ fontSize: 20 }} />
    </AxBadge>
  )
}
```

## Examples

### All tones with counts

```tsx
import { AxBadge } from "axmed-design-system"
import { BellOutlined } from "@ant-design/icons"

function ToneShowcase() {
  return (
    <div style={{ display: "flex", gap: 32 }}>
      <AxBadge count={12} tone="primary">
        <BellOutlined style={{ fontSize: 20 }} />
      </AxBadge>
      <AxBadge count={3} tone="success">
        <BellOutlined style={{ fontSize: 20 }} />
      </AxBadge>
      <AxBadge count={7} tone="warning">
        <BellOutlined style={{ fontSize: 20 }} />
      </AxBadge>
      <AxBadge count={24} tone="error">
        <BellOutlined style={{ fontSize: 20 }} />
      </AxBadge>
      <AxBadge count={99} tone="neutral">
        <BellOutlined style={{ fontSize: 20 }} />
      </AxBadge>
    </div>
  )
}
```

### Dot indicator (no count)

```tsx
import { AxBadge } from "axmed-design-system"
import { MailOutlined, BellOutlined, MessageOutlined } from "@ant-design/icons"

function UnreadIndicators() {
  return (
    <div style={{ display: "flex", gap: 32 }}>
      <AxBadge dot tone="error">
        <MailOutlined style={{ fontSize: 20 }} />
      </AxBadge>
      <AxBadge dot tone="primary">
        <BellOutlined style={{ fontSize: 20 }} />
      </AxBadge>
      <AxBadge dot tone="success">
        <MessageOutlined style={{ fontSize: 20 }} />
      </AxBadge>
    </div>
  )
}
```

Use the `dot` variant when you need to signal "something new" without exposing a specific count.

### On navigation items (common pattern)

```tsx
import { AxBadge } from "axmed-design-system"
import {
  ShoppingCartOutlined,
  FileTextOutlined,
  InboxOutlined,
} from "@ant-design/icons"

interface NavItemProps {
  icon: React.ReactNode
  label: string
  count?: number
  tone?: AxBadgeTone
}

function NavItem({ icon, label, count, tone = "primary" }: NavItemProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 16px" }}>
      <AxBadge count={count} tone={tone} size="sm">
        {icon}
      </AxBadge>
      <span>{label}</span>
    </div>
  )
}

function Sidebar() {
  return (
    <nav>
      <NavItem icon={<InboxOutlined />} label="Active RFQs" count={8} tone="primary" />
      <NavItem icon={<FileTextOutlined />} label="Draft Quotes" count={3} tone="warning" />
      <NavItem icon={<ShoppingCartOutlined />} label="Orders" count={2} tone="success" />
    </nav>
  )
}
```

### Sizes comparison

```tsx
import { AxBadge } from "axmed-design-system"
import { InboxOutlined } from "@ant-design/icons"

function SizeComparison() {
  return (
    <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
      <div>
        <AxBadge count={5} tone="primary" size="sm">
          <InboxOutlined style={{ fontSize: 18 }} />
        </AxBadge>
        <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 8 }}>sm (18px)</div>
      </div>
      <div>
        <AxBadge count={5} tone="primary" size="md">
          <InboxOutlined style={{ fontSize: 22 }} />
        </AxBadge>
        <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 8 }}>md (22px)</div>
      </div>
    </div>
  )
}
```

## Related Components

- **[AxTag](/docs/components/ax-tag.md)** -- For inline status labels with text content. Use AxBadge for numeric counts, AxTag for status text.
- **[AxSideNav](https://ax-derrick.github.io/axmed-design-system/?path=/docs/layout-axsidenav--docs)** -- AxBadge is often placed on navigation items to indicate pending actions.
- **[AxButton](https://ax-derrick.github.io/axmed-design-system/?path=/docs/actions-axbutton--docs)** -- Wrap an AxButton with AxBadge to show action counts (e.g. cart items).

## Storybook

- [AxBadge](https://ax-derrick.github.io/axmed-design-system/?path=/docs/data-display-axbadge--docs)
