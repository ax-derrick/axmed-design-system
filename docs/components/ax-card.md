# AxCard

> Content container wrapping antd Card with description, footer, and full-bleed padding control -- ShadCN-inspired aesthetics with border containment and minimal shadow.

## Import

```tsx
import { AxCard } from "axmed-design-system"
import type { AxCardProps } from "axmed-design-system"
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | -- | Card header title. |
| `description` | `ReactNode` | -- | Muted subtitle rendered below the title in the card header. |
| `footer` | `ReactNode` | -- | Footer content separated from the body by a top border. Use for action buttons, timestamps, or metadata. |
| `noPadding` | `boolean` | `false` | Remove body padding for full-bleed content like tables, lists, or images. |
| `extra` | `ReactNode` | -- | Top-right actions area in the header (passed through to antd Card). |
| `children` | `ReactNode` | -- | Card body content. |
| `className` | `string` | -- | Additional CSS class name. |

AxCard also accepts all [antd Card props](https://ant.design/components/card) such as `hoverable`, `bordered`, `cover`, `loading`, and `size`.

## Basic Usage

```tsx
import { AxCard, AxText } from "axmed-design-system"

function BasicCard() {
  return (
    <AxCard
      title="Recent Shipments"
      description="Shipments dispatched in the last 30 days"
    >
      <AxText variant="body-md">
        3 shipments are currently in transit to Nairobi warehouse.
      </AxText>
    </AxCard>
  )
}
```

## Examples

### Card with title and description

```tsx
import { AxCard, AxText } from "axmed-design-system"

function SupplierCard() {
  return (
    <AxCard
      title="PharmaCorp Ltd"
      description="Verified supplier since 2021"
      style={{ maxWidth: 400 }}
    >
      <AxText variant="body-md" color="secondary">
        Specializes in essential medicines and antibiotics. WHO prequalified
        manufacturing facility in Nairobi, Kenya.
      </AxText>
    </AxCard>
  )
}
```

### Card with footer actions

```tsx
import { AxCard, AxText, AxButton } from "axmed-design-system"
import { Flex } from "antd"

function OrderCard() {
  return (
    <AxCard
      title="Order ORD-2024-KE-00142"
      description="Submitted 12 Feb 2025"
      extra={
        <AxText variant="body-sm" color="secondary">
          $24,500.00
        </AxText>
      }
      footer={
        <Flex justify="flex-end" gap={8}>
          <AxButton variant="secondary">
            View Details
          </AxButton>
          <AxButton>Approve</AxButton>
        </Flex>
      }
      style={{ maxWidth: 480 }}
    >
      <AxText variant="body-md">
        Amoxicillin 500mg (5,000 units) and Metformin 850mg (3,000 units)
        from MediGlobal SA. Delivery to Mombasa port expected 28 Feb 2025.
      </AxText>
    </AxCard>
  )
}
```

### noPadding mode wrapping a table

```tsx
import { AxCard, AxTable, AxTag } from "axmed-design-system"

const columns = [
  { key: "sku", title: "SKU", dataIndex: "sku" },
  { key: "name", title: "Medication", dataIndex: "name" },
  { key: "qty", title: "Qty", dataIndex: "qty" },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
    render: (status: string) => (
      <AxTag tone={status === "In Stock" ? "success" : "warning"}>
        {status}
      </AxTag>
    ),
  },
]

const data = [
  { key: "1", sku: "AMX-500", name: "Amoxicillin 500mg", qty: 10000, status: "In Stock" },
  { key: "2", sku: "MET-850", name: "Metformin 850mg", qty: 2500, status: "Low Stock" },
  { key: "3", sku: "IBU-400", name: "Ibuprofen 400mg", qty: 8000, status: "In Stock" },
]

function InventoryCard() {
  return (
    <AxCard
      title="Warehouse Inventory"
      description="Nairobi Distribution Center"
      noPadding
    >
      <AxTable
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </AxCard>
  )
}
```

### Stat/metric card grid

```tsx
import { AxCard, AxText } from "axmed-design-system"
import {
  ShoppingCartOutlined,
  TeamOutlined,
  DollarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons"

const stats = [
  { icon: <ShoppingCartOutlined />, label: "Active Orders", value: "142", color: "#4738CC" },
  { icon: <TeamOutlined />, label: "Suppliers", value: "38", color: "#0CC4FF" },
  { icon: <DollarOutlined />, label: "Total Spend", value: "$2.4M", color: "#4FE788" },
  { icon: <CheckCircleOutlined />, label: "Fulfillment Rate", value: "96.3%", color: "#E73BC1" },
]

function StatCardGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 16,
      }}
    >
      {stats.map((stat) => (
        <AxCard key={stat.label}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: `${stat.color}14`,
                color: stat.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              {stat.icon}
            </div>
            <div>
              <AxText variant="body-sm" color="secondary">
                {stat.label}
              </AxText>
              <AxText variant="heading-xl">{stat.value}</AxText>
            </div>
          </div>
        </AxCard>
      ))}
    </div>
  )
}
```

### Empty card with AxEmptyState

```tsx
import { AxCard, AxEmptyState, AxButton } from "axmed-design-system"
import { InboxOutlined } from "@ant-design/icons"

function EmptyOrdersCard() {
  return (
    <AxCard
      title="Pending Orders"
      description="Orders awaiting approval"
    >
      <AxEmptyState
        illustration={<InboxOutlined style={{ fontSize: 48 }} />}
        title="No pending orders"
        description="All orders have been reviewed. New orders will appear here when submitted by procurement teams."
        action={
          <AxButton variant="secondary">
            View Order History
          </AxButton>
        }
      />
    </AxCard>
  )
}
```

---

## AxDataCard

> Compact data card with a header and label-value rows. Rows beyond `previewCount` are hidden behind an animated expand/collapse toggle.

### Import

```tsx
import { AxDataCard } from "axmed-design-system"
import type { AxDataCardProps, AxDataCardField } from "axmed-design-system"
```

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `header` | `ReactNode` | -- (required) | Primary content rendered in the card header. |
| `fields` | `AxDataCardField[]` | -- (required) | Label-value fields rendered as rows in the card body. |
| `previewCount` | `number` | `2` | Number of fields visible before the expand toggle appears. |
| `expanded` | `boolean` | -- | Whether the overflow section is expanded (controlled mode). |
| `onExpandChange` | `(expanded: boolean) => void` | -- | Called when the expand toggle is clicked. |
| `defaultExpanded` | `boolean` | `false` | Default expanded state (uncontrolled mode). |
| `className` | `string` | -- | Additional CSS class name. |

**`AxDataCardField`**

| Property | Type | Description |
| --- | --- | --- |
| `label` | `string` | Label displayed on the left. |
| `value` | `ReactNode` | Value displayed on the right. |
| `key` | `React.Key` | Unique key -- falls back to `label` if omitted. |

### Usage

```tsx
import { AxDataCard } from "axmed-design-system"
import type { AxDataCardField } from "axmed-design-system"
import { AxTag } from "axmed-design-system"

const fields: AxDataCardField[] = [
  { label: "Supplier", value: "PharmaCorp Ltd" },
  { label: "Product", value: "Amoxicillin 500mg" },
  { label: "Quantity", value: "10,000 units" },
  { label: "Unit Price", value: "$0.12" },
  { label: "Status", value: <AxTag tone="success">Delivered</AxTag> },
]

function OrderDataCard() {
  return (
    <AxDataCard
      header="ORD-2024-KE-00142"
      fields={fields}
      previewCount={3}
    />
  )
}
```

### Controlled expand

```tsx
import { useState } from "react"
import { AxDataCard } from "axmed-design-system"

function ControlledDataCard() {
  const [expanded, setExpanded] = useState(false)

  return (
    <AxDataCard
      header="Shipment Details"
      fields={[
        { label: "Origin", value: "Mumbai, India" },
        { label: "Destination", value: "Nairobi, Kenya" },
        { label: "Carrier", value: "Maersk Line" },
        { label: "ETA", value: "28 Feb 2025" },
        { label: "Container", value: "MSKU-4921837" },
      ]}
      previewCount={2}
      expanded={expanded}
      onExpandChange={setExpanded}
    />
  )
}
```

---

## Related Components

- **AxTable** -- Commonly placed inside `noPadding` cards for full-bleed data tables.
- **AxStatCard** -- A purpose-built stat card with trend indicators; use instead of AxCard when displaying single metrics.
- **AxEmptyState** -- Pair with AxCard for empty content placeholders.
- **AxButton** -- Use in `footer` or `extra` slots for card actions.
- **AxDataCard** -- Compact label-value card with expand/collapse; exported as a sibling from the same package.

## Storybook

[View in Storybook](https://ax-derrick.github.io/axmed-design-system/?path=/docs/layout-axcard--docs)
