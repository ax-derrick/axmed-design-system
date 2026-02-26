# AxTable

> Data table wrapping antd Table with semantic row states, mobile card view, and specialised cell components for deadlines and pricing.

## Import

```tsx
import {
  AxTable,
  AxTableSkeleton,
  AxDeadlineCell,
  AxPriceCell,
} from "axmed-design-system"
import type {
  AxTableProps,
  AxTableRowState,
  AxTableSkeletonProps,
  SkeletonColumnConfig,
  AxDeadlineCellProps,
  AxPriceCellProps,
} from "axmed-design-system"
```

## Props

### AxTable

| Prop | Type | Default | Description |
|---|---|---|---|
| `rowStates` | `Record<string \| number, "selected" \| "disabled">` | `undefined` | Visual state per row key. `selected` adds a highlighted background with accent border; `disabled` reduces opacity and blocks pointer events. |
| `headerBg` | `string` | `"var(--neutral-50)"` | Background colour for the table header row. |
| `mobileLayout` | `"scroll" \| "cards"` | `"cards"` | Layout on viewports below 576px. `"cards"` renders each row as a stacked card; `"scroll"` keeps the table with horizontal scrolling. |
| `className` | `string` | `undefined` | Additional CSS class for the root element. |
| `rowClassName` | `string \| ((record, index, indent) => string)` | `undefined` | Class name applied to each body row. Merged with row-state classes. |
| `...rest` | `AntTableProps<RecordType>` | -- | All standard antd Table props (`columns`, `dataSource`, `pagination`, `rowKey`, `scroll`, `onChange`, etc.) are forwarded. |

### AxTableSkeleton

A placeholder loading state that mirrors the table layout before data arrives.

| Prop | Type | Default | Description |
|---|---|---|---|
| `rows` | `number` | `5` | Number of skeleton body rows. |
| `columns` | `number \| SkeletonColumnConfig[]` | `5` | Column count or per-column width/flex configuration. |
| `showHeader` | `boolean` | `true` | Whether to render a header skeleton row. |
| `className` | `string` | `undefined` | Additional CSS class for the root element. |

**SkeletonColumnConfig:**

| Property | Type | Default | Description |
|---|---|---|---|
| `flex` | `number` | `1` | Flex ratio for the column width. |
| `width` | `string \| number` | `undefined` | Fixed width -- overrides flex when set. |

### AxDeadlineCell

A cell renderer that displays a countdown label with automatic colour coding based on urgency.

| Prop | Type | Default | Description |
|---|---|---|---|
| `deadline` | `Date \| string \| number` | **required** | The deadline date. Accepts a Date object, ISO string, or timestamp. |
| `urgentDays` | `number` | `7` | Days remaining below which the cell turns red (urgent). |
| `warningDays` | `number` | `14` | Days remaining below which the cell turns orange (warning). |
| `className` | `string` | `undefined` | Additional CSS class. |
| `style` | `React.CSSProperties` | `undefined` | Inline styles. |

**Tone thresholds (automatic):**

| Tone | Condition | Colour | Label format |
|---|---|---|---|
| `ok` | > `warningDays` | Green | `"12d left"` |
| `warning` | <= `warningDays` | Orange | `"10d left"` |
| `urgent` | <= `urgentDays` | Red | `"3d left"` or `"Due today"` (when exactly 0) |
| `overdue` | < 0 days | Red + warning icon | `"5d overdue"` |

### AxPriceCell

A cell renderer that formats currency values with optional tier labels and compact notation.

| Prop | Type | Default | Description |
|---|---|---|---|
| `amount` | `number` | **required** | The numeric amount to format. |
| `currency` | `string` | `"USD"` | ISO 4217 currency code. |
| `locale` | `string` | `"en-US"` | BCP 47 locale for number formatting. |
| `tier` | `string` | `undefined` | Label rendered below the price (e.g. `"Tier 1"`, `"Best Price"`). |
| `tierHighlighted` | `boolean` | `false` | Whether the tier label is visually highlighted (e.g. lowest bid). |
| `compact` | `boolean` | `false` | Use compact notation for large numbers (e.g. `$1.2M`). |
| `unit` | `string` | `undefined` | Per-unit label appended after the price (e.g. `"/ unit"`, `"/ pack"`). |
| `className` | `string` | `undefined` | Additional CSS class. |
| `style` | `React.CSSProperties` | `undefined` | Inline styles. |

## Basic Usage

```tsx
import { AxTable } from "axmed-design-system"
import type { ColumnsType } from "antd/es/table"

interface Medication {
  key: string
  name: string
  dosage: string
  supplier: string
  unitPrice: number
}

const columns: ColumnsType<Medication> = [
  { title: "Medication", dataIndex: "name", key: "name" },
  { title: "Dosage", dataIndex: "dosage", key: "dosage" },
  { title: "Supplier", dataIndex: "supplier", key: "supplier" },
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
    key: "unitPrice",
    render: (price) => `$${price.toFixed(2)}`,
  },
]

const data: Medication[] = [
  { key: "1", name: "Amoxicillin", dosage: "500mg", supplier: "PharmaCorp Ltd", unitPrice: 0.12 },
  { key: "2", name: "Metformin", dosage: "850mg", supplier: "MediSource Kenya", unitPrice: 0.08 },
  { key: "3", name: "Ibuprofen", dosage: "400mg", supplier: "GenRx Tanzania", unitPrice: 0.05 },
]

function MedicationTable() {
  return <AxTable columns={columns} dataSource={data} pagination={false} />
}
```

## Examples

### With row selection and states

```tsx
import { AxTable } from "axmed-design-system"

function OrdersTable() {
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])

  // Build row states from selection + business logic
  const rowStates: Record<string, "selected" | "disabled"> = {}
  selectedKeys.forEach((key) => {
    rowStates[key as string] = "selected"
  })
  // Disable cancelled orders
  orders
    .filter((o) => o.status === "cancelled")
    .forEach((o) => {
      rowStates[o.key] = "disabled"
    })

  return (
    <AxTable
      columns={orderColumns}
      dataSource={orders}
      rowStates={rowStates}
      rowSelection={{
        selectedRowKeys: selectedKeys,
        onChange: setSelectedKeys,
      }}
    />
  )
}
```

### With pagination and sorting

```tsx
import { AxTable } from "axmed-design-system"
import type { ColumnsType } from "antd/es/table"

interface Bid {
  key: string
  rfqNumber: string
  supplier: string
  totalValue: number
  submittedAt: string
}

const columns: ColumnsType<Bid> = [
  { title: "RFQ #", dataIndex: "rfqNumber", sorter: (a, b) => a.rfqNumber.localeCompare(b.rfqNumber) },
  { title: "Supplier", dataIndex: "supplier" },
  {
    title: "Total Value",
    dataIndex: "totalValue",
    sorter: (a, b) => a.totalValue - b.totalValue,
    render: (val) => `$${val.toLocaleString()}`,
  },
  { title: "Submitted", dataIndex: "submittedAt", sorter: (a, b) => a.submittedAt.localeCompare(b.submittedAt) },
]

function BidsTable() {
  return (
    <AxTable
      columns={columns}
      dataSource={bids}
      pagination={{ pageSize: 20, showSizeChanger: true }}
    />
  )
}
```

### Mobile card view

```tsx
import { AxTable } from "axmed-design-system"

function SupplierTable() {
  return (
    <AxTable
      columns={supplierColumns}
      dataSource={suppliers}
      mobileLayout="cards"
      pagination={{ pageSize: 10 }}
    />
  )
}
```

When the viewport is below 576px, each row renders as a stacked card. The first column becomes the card header. Body columns display as label/value pairs, with overflow columns behind an expand toggle.

### Loading state (AxTableSkeleton to AxTable transition)

```tsx
import { AxTable, AxTableSkeleton } from "axmed-design-system"

function InventoryPage() {
  const { data, isLoading } = useInventory()

  if (isLoading) {
    return (
      <AxTableSkeleton
        rows={8}
        columns={[
          { flex: 2 },           // Product name (wider)
          { flex: 1 },           // SKU
          { flex: 1 },           // Stock level
          { width: 120 },        // Price (fixed width)
          { width: 100 },        // Status
        ]}
      />
    )
  }

  return <AxTable columns={inventoryColumns} dataSource={data} />
}
```

### With DeadlineCell and PriceCell in columns

```tsx
import { AxTable, AxDeadlineCell, AxPriceCell } from "axmed-design-system"
import type { ColumnsType } from "antd/es/table"

interface RFQLine {
  key: string
  medication: string
  quantity: number
  deadline: string
  bestBid: number
  tier: string
}

const columns: ColumnsType<RFQLine> = [
  { title: "Medication", dataIndex: "medication" },
  {
    title: "Quantity",
    dataIndex: "quantity",
    render: (qty) => qty.toLocaleString(),
  },
  {
    title: "Deadline",
    dataIndex: "deadline",
    render: (date) => <AxDeadlineCell deadline={date} urgentDays={5} />,
  },
  {
    title: "Best Bid",
    key: "bestBid",
    render: (_, record) => (
      <AxPriceCell
        amount={record.bestBid}
        currency="USD"
        tier={record.tier}
        tierHighlighted={record.tier === "Tier 1"}
        unit="/ unit"
      />
    ),
  },
]

const data: RFQLine[] = [
  { key: "1", medication: "Amoxicillin 500mg", quantity: 50000, deadline: "2026-03-05", bestBid: 0.12, tier: "Tier 1" },
  { key: "2", medication: "Metformin 850mg", quantity: 100000, deadline: "2026-03-20", bestBid: 0.08, tier: "Tier 2" },
  { key: "3", medication: "Paracetamol 500mg", quantity: 200000, deadline: "2026-02-27", bestBid: 0.03, tier: "Tier 1" },
]

function RFQTable() {
  return <AxTable columns={columns} dataSource={data} pagination={false} />
}
```

### Compact price notation for high-value orders

```tsx
<AxPriceCell amount={1250000} currency="USD" compact />
// Renders: $1.2M
```

## Related Components

- **[AxFilterBar](/docs/components/ax-filter-bar.md)** -- Often placed above AxTable to provide search, filters, and sort controls.
- **[AxTag](/docs/components/ax-tag.md)** -- Used inside table cells for status labels (e.g. "Awarded", "Pending").
- **[AxEmptyState](https://ax-derrick.github.io/axmed-design-system/?path=/docs/feedback-axemptystate--docs)** -- Displayed when the table has no data.
- **[AxCompanyLogo](/docs/components/ax-company-logo.md)** -- Renders supplier avatars inside table rows.

## Storybook

- [AxTable](https://ax-derrick.github.io/axmed-design-system/?path=/docs/data-display-axtable--docs)
- [AxTable / Skeleton](https://ax-derrick.github.io/axmed-design-system/?path=/docs/data-display-axtable-skeleton--docs)
