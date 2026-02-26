# AxEmptyState

> Empty state placeholder component using antd Flex for layout. Displays an illustration, title, description, and optional call-to-action with size-responsive padding and typography.

## Import

```tsx
import { AxEmptyState } from "axmed-design-system"
import type { AxEmptyStateProps, AxEmptyStateSize } from "axmed-design-system"
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | **(required)** | Main heading text. |
| `description` | `ReactNode` | -- | Muted description displayed below the title. Max width capped at 400px and centered. |
| `illustration` | `ReactNode` | -- | Image, SVG, or icon node. Wrapped in an `aria-hidden` container automatically. Size it before passing (e.g. `style={{ fontSize: 48 }}` on an antd icon). |
| `action` | `ReactNode` | -- | CTA area rendered below the description. Pass an AxButton or any ReactNode. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Controls padding, typography scale, and gap between elements. |
| `className` | `string` | -- | Additional CSS class name on the root container. |

### Size behaviour

| Size | Padding | Title variant | Body variant | Use case |
| --- | --- | --- | --- | --- |
| `sm` | 24px | `heading-sm` | `body-xs` | Inside tables (via `locale.emptyText`) |
| `md` | 48px | `heading-md` | `body-sm` | Inside cards and drawer bodies |
| `lg` | 80px | `heading-xl` | `body-md` | Full-page zero states |

## Basic Usage

```tsx
import { InboxOutlined } from "@ant-design/icons"
import { AxEmptyState, AxButton } from "axmed-design-system"

function EmptyOrders() {
  return (
    <AxEmptyState
      illustration={<InboxOutlined style={{ fontSize: 48, color: "var(--neutral-300)" }} />}
      title="No orders yet"
      description="Once you publish your first tender, it will appear here for suppliers to bid on."
      action={<AxButton>Create Order</AxButton>}
    />
  )
}
```

## Examples

### Basic empty state

```tsx
import { AxEmptyState } from "axmed-design-system"

function EmptyResults() {
  return (
    <AxEmptyState
      title="No results found"
      description="Try broadening your search or adjusting your filters."
    />
  )
}
```

### With illustration and action button

```tsx
import { FileTextOutlined } from "@ant-design/icons"
import { AxEmptyState, AxButton } from "axmed-design-system"

function EmptyTenders() {
  return (
    <AxEmptyState
      illustration={
        <FileTextOutlined style={{ fontSize: 48, color: "var(--neutral-300)" }} />
      }
      title="No tenders available"
      description="There are no open tenders matching your product categories right now."
      action={<AxButton>Browse All Tenders</AxButton>}
    />
  )
}
```

### Inside a table (sm, via locale.emptyText)

Use `size="sm"` for compact empty states embedded in tables. Pass the component through antd Table's `locale.emptyText` prop.

```tsx
import { InboxOutlined } from "@ant-design/icons"
import { AxTable, AxEmptyState, AxButton } from "axmed-design-system"
import type { ColumnsType } from "antd/es/table"

const columns: ColumnsType<{ name: string; status: string }> = [
  { title: "Medication", dataIndex: "name", key: "name" },
  { title: "Status", dataIndex: "status", key: "status" },
  { title: "Quantity", dataIndex: "qty", key: "qty" },
  { title: "Price", dataIndex: "price", key: "price" },
]

function EmptyMedicationsTable() {
  return (
    <AxTable
      columns={columns}
      dataSource={[]}
      pagination={false}
      locale={{
        emptyText: (
          <AxEmptyState
            size="sm"
            illustration={
              <InboxOutlined style={{ fontSize: 32, color: "var(--neutral-300)" }} />
            }
            title="No medications found"
            description="Try adjusting your filters or search term."
            action={
              <AxButton variant="secondary">
                Clear Filters
              </AxButton>
            }
          />
        ),
      }}
    />
  )
}
```

### Inside a card (md)

The default `size="md"` works well inside card panels with 48px padding.

```tsx
import { FileTextOutlined } from "@ant-design/icons"
import { AxEmptyState, AxButton, AxCard } from "axmed-design-system"

function EmptyOrdersCard() {
  return (
    <AxCard title="Recent Orders" extra={<AxButton>New Order</AxButton>}>
      <AxEmptyState
        size="md"
        illustration={
          <FileTextOutlined style={{ fontSize: 48, color: "var(--neutral-300)" }} />
        }
        title="No recent orders"
        description="Orders you create will appear here."
        action={<AxButton>Create Order</AxButton>}
      />
    </AxCard>
  )
}
```

### Full page (lg, with height constraint)

Use `size="lg"` for full-page zero states. Wrap in a flex container to center vertically.

```tsx
import { Flex } from "antd"
import { InboxOutlined } from "@ant-design/icons"
import { AxEmptyState, AxButton } from "axmed-design-system"

function EmptySupplierDashboard() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--neutral-50)",
        borderRadius: 12,
      }}
    >
      <AxEmptyState
        size="lg"
        illustration={
          <InboxOutlined style={{ fontSize: 80, color: "var(--neutral-200)" }} />
        }
        title="No tenders available"
        description="There are no open tenders matching your profile right now. Check back soon or update your product categories."
        action={
          <Flex gap={8}>
            <AxButton variant="secondary">Update Categories</AxButton>
            <AxButton>Browse All Tenders</AxButton>
          </Flex>
        }
      />
    </div>
  )
}
```

## Related Components

- [AxTable](https://ax-derrick.github.io/axmed-design-system/?path=/docs/data-display-axtable--docs) -- pass AxEmptyState via `locale.emptyText` for empty table states
- [AxCard](https://ax-derrick.github.io/axmed-design-system/?path=/docs/layout-axcard--docs) -- use `size="md"` AxEmptyState inside card bodies
- [AxButton](./ax-button.md) -- used as the CTA in the `action` prop

## Storybook

[View in Storybook](https://ax-derrick.github.io/axmed-design-system/?path=/docs/feedback-axemptystate--docs)
