# AxStatCard

> KPI metric card with icon, trend indicator, and action button. Uses antd Skeleton for a loading state that preserves layout.

## Import

```tsx
import { AxStatCard } from "axmed-design-system"
import type { AxStatCardProps } from "axmed-design-system"
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | **required** | Metric label displayed above the value (e.g. `"Active RFQs"`). |
| `value` | `ReactNode` | **required** | Metric value. Rendered with `tabular-nums` for proper number alignment. Can be a formatted string or JSX. |
| `icon` | `ReactNode` | `undefined` | Icon displayed in a tinted container beside the value. Pass an antd icon -- the container handles sizing. |
| `iconColor` | `{ bg: string, fg: string }` | `{ bg: "var(--primary-100)", fg: "var(--primary-600)" }` | Background and foreground colours for the icon container. |
| `trend` | `{ value: number, label?: string }` | `undefined` | Trend indicator. Positive values show a green up arrow, negative shows a red down arrow, zero is neutral grey. |
| `action` | `{ icon: ReactNode, onClick: () => void, label?: string }` | `undefined` | Floating action button in the bottom-right corner. The `label` is used for `aria-label`. |
| `loading` | `boolean` | `false` | Show a skeleton loader instead of content. Preserves the card's dimensions during loading. |
| `size` | `"sm" \| "md"` | `"md"` | Size variant: `"sm"` for compact grids, `"md"` for dashboard KPI cards. |
| `className` | `string` | `undefined` | Additional CSS class. |
| `style` | `React.CSSProperties` | `undefined` | Inline styles. |

**Trend behaviour:**

| `trend.value` | Direction | Colour | Display |
|---|---|---|---|
| `> 0` | Up arrow | `var(--success)` (green) | `+12%` |
| `< 0` | Down arrow | `var(--error)` (red) | `-8%` |
| `0` | No arrow | `var(--text-secondary)` (grey) | `0%` |

## Basic Usage

```tsx
import { AxStatCard } from "axmed-design-system"
import { ShoppingCartOutlined } from "@ant-design/icons"

function OrderCount() {
  return (
    <AxStatCard
      title="Open Orders"
      value={142}
      icon={<ShoppingCartOutlined />}
    />
  )
}
```

## Examples

### Basic stat card

```tsx
import { AxStatCard } from "axmed-design-system"

function SimpleMetric() {
  return (
    <AxStatCard
      title="Total Suppliers"
      value="1,247"
    />
  )
}
```

### With icon and custom colours

```tsx
import { AxStatCard } from "axmed-design-system"
import {
  MedicineBoxOutlined,
  DollarOutlined,
  TeamOutlined,
} from "@ant-design/icons"

function IconVariants() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
      <AxStatCard
        title="Medications Tracked"
        value="3,842"
        icon={<MedicineBoxOutlined />}
        iconColor={{ bg: "var(--cyan-100)", fg: "var(--cyan-700)" }}
      />
      <AxStatCard
        title="Total Procurement Value"
        value="$2.4M"
        icon={<DollarOutlined />}
        iconColor={{ bg: "var(--green-100)", fg: "var(--green-700)" }}
      />
      <AxStatCard
        title="Active Suppliers"
        value="186"
        icon={<TeamOutlined />}
        iconColor={{ bg: "var(--magenta-100)", fg: "var(--magenta-700)" }}
      />
    </div>
  )
}
```

### With trend indicator

```tsx
import { AxStatCard } from "axmed-design-system"
import { FileTextOutlined, ShoppingCartOutlined } from "@ant-design/icons"

function TrendCards() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <AxStatCard
        title="RFQs This Month"
        value={47}
        icon={<FileTextOutlined />}
        trend={{ value: 12, label: "vs last month" }}
      />
      <AxStatCard
        title="Avg. Delivery Time"
        value="4.2 days"
        icon={<ShoppingCartOutlined />}
        iconColor={{ bg: "var(--orange-100)", fg: "var(--orange-700)" }}
        trend={{ value: -8, label: "vs last quarter" }}
      />
    </div>
  )
}
```

### Loading skeleton state

```tsx
import { AxStatCard } from "axmed-design-system"
import { InboxOutlined } from "@ant-design/icons"

function LoadingMetric() {
  const { data, isLoading } = useDashboardStats()

  return (
    <AxStatCard
      title="Available RFQs"
      value={data?.rfqCount ?? 0}
      icon={<InboxOutlined />}
      trend={data?.rfqTrend}
      loading={isLoading}
    />
  )
}
```

When `loading` is `true`, the card renders antd Skeleton placeholders that match the dimensions of the icon, title, and value. This prevents layout shift when data arrives.

### Dashboard KPI grid (4-card layout)

```tsx
import { AxStatCard } from "axmed-design-system"
import {
  InboxOutlined,
  FileTextOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons"

function DashboardKPIs() {
  const stats = [
    {
      title: "Active RFQs",
      value: 23,
      icon: <InboxOutlined />,
      iconColor: { bg: "var(--primary-100)", fg: "var(--primary-600)" },
      trend: { value: 15, label: "vs last month" },
    },
    {
      title: "Pending Quotes",
      value: 8,
      icon: <FileTextOutlined />,
      iconColor: { bg: "var(--orange-100)", fg: "var(--orange-700)" },
      trend: { value: -3, label: "vs last month" },
    },
    {
      title: "Orders In Transit",
      value: 14,
      icon: <ShoppingCartOutlined />,
      iconColor: { bg: "var(--cyan-100)", fg: "var(--cyan-700)" },
      trend: { value: 22, label: "vs last month" },
    },
    {
      title: "Monthly Spend",
      value: "$184K",
      icon: <DollarOutlined />,
      iconColor: { bg: "var(--green-100)", fg: "var(--green-700)" },
      trend: { value: 5, label: "vs budget" },
      action: {
        icon: <ArrowRightOutlined />,
        onClick: () => router.push("/spend"),
        label: "View spend details",
      },
    },
  ]

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 16,
      }}
    >
      {stats.map((stat) => (
        <AxStatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}
```

This pattern uses CSS Grid with `auto-fit` and `minmax` to create a responsive 4-column layout that collapses gracefully on smaller screens. Each card includes an icon, trend, and -- for the spend card -- an action button that navigates to a detail view.

## Related Components

- **[AxCard](https://ax-derrick.github.io/axmed-design-system/?path=/docs/layout-axcard--docs)** -- Generic card container. Use AxStatCard specifically for KPI metrics; use AxCard for general content.
- **[AxTable](/docs/components/ax-table.md)** -- Often displayed below a row of AxStatCard KPIs to show the underlying data.
- **[AxBadge](/docs/components/ax-badge.md)** -- For count indicators on interactive elements. AxStatCard is for displaying static metric values.

## Storybook

- [AxStatCard](https://ax-derrick.github.io/axmed-design-system/?path=/docs/data-display-axstatcard--docs)
