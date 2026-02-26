# AxFilterBar

> Composable search, filter, and sort bar wrapping antd Select with semantic HTML (`<search>` landmark) and a live result count.

## Import

```tsx
import { AxFilterBar } from "axmed-design-system"
import type { AxFilterBarProps, FilterConfig, SortConfig } from "axmed-design-system"
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `search` | `{ placeholder?, value?, onChange?, width? } \| false` | -- | Search input configuration. Shown by default; pass `false` to hide the search field entirely. |
| `filters` | `FilterConfig[]` | -- | Array of filter dropdown configurations. |
| `sort` | `SortConfig` | -- | Sort dropdown configuration. |
| `resultCount` | `number \| string` | -- | Result count displayed below the bar. Numbers render as `"N results"`. Strings render as-is (e.g. `"24 medications"`). Uses `aria-live="polite"` for screen readers. |
| `extra` | `ReactNode` | -- | Slot for action buttons, rendered on the far right of the bar. |
| `className` | `string` | -- | Additional CSS class name on the `<search>` container. |

### FilterConfig

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | `string` | **(required)** | Unique key for the filter. |
| `placeholder` | `string` | -- | Placeholder text for the select. |
| `options` | `{ label: string, value: string \| number }[]` | **(required)** | Dropdown options. |
| `multiple` | `boolean` | `false` | Allow multiple selections. |
| `maxTagCount` | `number` | `1` | Max tags shown before "+N more" (only applies when `multiple` is true). |
| `width` | `number \| string` | `160` | Minimum width of the select. |
| `allowClear` | `boolean` | `true` | Allow clearing the selection. |
| `value` | `any` | -- | Controlled value. |
| `onChange` | `(value, option) => void` | -- | Change handler. |

### SortConfig

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `{ label: string, value: string }[]` | **(required)** | Sort options. |
| `value` | `any` | -- | Controlled value. |
| `onChange` | `(value, option) => void` | -- | Change handler. |
| `width` | `number \| string` | `130` | Width of the sort select. |
| `showLabel` | `boolean` | `true` | Show the "Sort by" label prefix. |

## Basic Usage

```tsx
import { AxFilterBar } from "axmed-design-system"

function ProductFilters() {
  return (
    <AxFilterBar
      search={{ placeholder: "Search products..." }}
      resultCount={142}
    />
  )
}
```

## Examples

### Search only

```tsx
import { useState } from "react"
import { AxFilterBar } from "axmed-design-system"

function SearchBar() {
  const [query, setQuery] = useState("")

  return (
    <AxFilterBar
      search={{
        placeholder: "Search medications by name or SKU...",
        value: query,
        onChange: (e) => setQuery(e.target.value),
      }}
      resultCount={query ? "3 results" : "142 medications"}
    />
  )
}
```

### Search with a single filter

```tsx
import { useState } from "react"
import { AxFilterBar } from "axmed-design-system"

function OrderFilters() {
  const [status, setStatus] = useState<string | undefined>()

  return (
    <AxFilterBar
      search={{ placeholder: "Search orders..." }}
      filters={[
        {
          key: "status",
          placeholder: "Status",
          options: [
            { label: "Pending", value: "pending" },
            { label: "Confirmed", value: "confirmed" },
            { label: "Shipped", value: "shipped" },
            { label: "Delivered", value: "delivered" },
            { label: "Cancelled", value: "cancelled" },
          ],
          value: status,
          onChange: (val) => setStatus(val),
        },
      ]}
      resultCount={56}
    />
  )
}
```

### Multiple filters with sort

```tsx
import { useState } from "react"
import { AxFilterBar } from "axmed-design-system"

function InventoryFilters() {
  const [category, setCategory] = useState<string[]>([])
  const [warehouse, setWarehouse] = useState<string | undefined>()
  const [sortBy, setSortBy] = useState("name-asc")

  return (
    <AxFilterBar
      search={{ placeholder: "Search inventory..." }}
      filters={[
        {
          key: "category",
          placeholder: "Category",
          multiple: true,
          options: [
            { label: "Antibiotics", value: "antibiotics" },
            { label: "Analgesics", value: "analgesics" },
            { label: "Vaccines", value: "vaccines" },
            { label: "Surgical Supplies", value: "surgical" },
          ],
          value: category,
          onChange: (val) => setCategory(val),
        },
        {
          key: "warehouse",
          placeholder: "Warehouse",
          options: [
            { label: "Nairobi Central", value: "nbo" },
            { label: "Mombasa Port", value: "msa" },
            { label: "Kisumu Depot", value: "ksm" },
          ],
          value: warehouse,
          onChange: (val) => setWarehouse(val),
        },
      ]}
      sort={{
        options: [
          { label: "Name A-Z", value: "name-asc" },
          { label: "Name Z-A", value: "name-desc" },
          { label: "Stock: Low to High", value: "stock-asc" },
          { label: "Stock: High to Low", value: "stock-desc" },
          { label: "Expiry Date", value: "expiry" },
        ],
        value: sortBy,
        onChange: (val) => setSortBy(val),
      }}
      resultCount="1,247 items"
    />
  )
}
```

### With action buttons (extra slot)

```tsx
import { AxFilterBar, AxButton } from "axmed-design-system"
import { PlusOutlined, DownloadOutlined } from "@ant-design/icons"

function FilterBarWithActions() {
  return (
    <AxFilterBar
      search={{ placeholder: "Search suppliers..." }}
      filters={[
        {
          key: "region",
          placeholder: "Region",
          options: [
            { label: "East Africa", value: "ea" },
            { label: "West Africa", value: "wa" },
            { label: "Southern Africa", value: "sa" },
            { label: "Global", value: "global" },
          ],
        },
      ]}
      resultCount={38}
      extra={
        <div style={{ display: "flex", gap: 8 }}>
          <AxButton variant="secondary" icon={<DownloadOutlined />}>
            Export
          </AxButton>
          <AxButton variant="primary" icon={<PlusOutlined />}>
            Add Supplier
          </AxButton>
        </div>
      }
    />
  )
}
```

### Connected to AxTable

```tsx
import { useState, useMemo } from "react"
import { AxFilterBar, AxTable } from "axmed-design-system"

type Medication = {
  key: string
  name: string
  category: string
  stock: number
  price: number
}

const allData: Medication[] = [
  { key: "1", name: "Amoxicillin 500mg", category: "antibiotics", stock: 12400, price: 0.15 },
  { key: "2", name: "Paracetamol 500mg", category: "analgesics", stock: 45000, price: 0.03 },
  { key: "3", name: "Metformin 850mg", category: "antidiabetics", stock: 8700, price: 0.08 },
  { key: "4", name: "Ibuprofen 400mg", category: "analgesics", stock: 22000, price: 0.05 },
]

const columns = [
  { title: "Medication", dataIndex: "name", key: "name" },
  { title: "Category", dataIndex: "category", key: "category" },
  { title: "Stock", dataIndex: "stock", key: "stock" },
  { title: "Unit Price", dataIndex: "price", key: "price", render: (v: number) => `$${v.toFixed(2)}` },
]

function MedicationList() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<string | undefined>()

  const filtered = useMemo(() => {
    return allData.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = !category || item.category === category
      return matchesSearch && matchesCategory
    })
  }, [search, category])

  return (
    <>
      <AxFilterBar
        search={{
          placeholder: "Search medications...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
        }}
        filters={[
          {
            key: "category",
            placeholder: "Category",
            options: [
              { label: "Antibiotics", value: "antibiotics" },
              { label: "Analgesics", value: "analgesics" },
              { label: "Antidiabetics", value: "antidiabetics" },
            ],
            value: category,
            onChange: (val) => setCategory(val),
          },
        ]}
        resultCount={`${filtered.length} medications`}
      />
      <AxTable columns={columns} dataSource={filtered} style={{ marginTop: 16 }} />
    </>
  )
}
```

## Related Components

- [AxSearchInput](./ax-input.md#axsearchinput) -- the search input used internally
- [AxTable](https://ax-derrick.github.io/axmed-design-system/?path=/docs/data-display-axtable--docs) -- commonly paired for filterable data tables
- [AxButton](./ax-button.md) -- used in the `extra` slot for action buttons

## Storybook

[View in Storybook](https://ax-derrick.github.io/axmed-design-system/?path=/docs/controls-axfilterbar--docs)
