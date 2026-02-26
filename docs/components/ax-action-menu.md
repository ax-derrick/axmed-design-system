# AxActionMenu

> Dropdown action menu wrapping antd Dropdown with a declarative items API and a sensible default trigger button.

## Import

```tsx
import { AxActionMenu } from "axmed-design-system"
import type { AxActionMenuProps, ActionItem, ActionDivider } from "axmed-design-system"
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `(ActionItem \| ActionDivider)[]` | **(required)** | Menu entries. Each item is an action or a `{ type: "divider" }` separator. |
| `trigger` | `ReactNode` | `MoreOutlined` icon button | Custom trigger element. Pass any ReactNode to override the default three-dot button. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size of the default trigger button. Ignored when a custom `trigger` is provided. |
| `placement` | `"topLeft" \| "topRight" \| "bottomLeft" \| "bottomRight" \| "top" \| "bottom"` | `"bottomRight"` | Menu placement relative to the trigger. |
| `disabled` | `boolean` | `false` | Prevents the menu from opening. |
| `className` | `string` | -- | Additional class name applied to the dropdown overlay. |

### ActionItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | `string` | **(required)** | Unique identifier. |
| `label` | `string` | **(required)** | Visible menu text. |
| `icon` | `ReactNode` | -- | Icon rendered before the label. |
| `danger` | `boolean` | `false` | Renders the item in red with destructive intent. |
| `disabled` | `boolean` | `false` | Disables the item. |
| `onClick` | `() => void` | -- | Click handler. |

### ActionDivider

```ts
{ type: "divider" }
```

## Basic Usage

```tsx
import { AxActionMenu } from "axmed-design-system"

function OrderActions() {
  return (
    <AxActionMenu
      items={[
        { key: "view", label: "View Order" },
        { key: "edit", label: "Edit Order" },
        { key: "duplicate", label: "Duplicate" },
      ]}
    />
  )
}
```

## Examples

### Basic with default trigger

The default trigger renders an AxButton with a three-dot (`MoreOutlined`) icon.

```tsx
import { AxActionMenu } from "axmed-design-system"
import { EditOutlined, CopyOutlined, DownloadOutlined } from "@ant-design/icons"

function ShipmentActions() {
  return (
    <AxActionMenu
      items={[
        { key: "edit", label: "Edit Shipment", icon: <EditOutlined /> },
        { key: "duplicate", label: "Duplicate", icon: <CopyOutlined /> },
        { key: "download", label: "Download BOL", icon: <DownloadOutlined /> },
      ]}
    />
  )
}
```

### Custom button trigger

```tsx
import { AxActionMenu, AxButton } from "axmed-design-system"
import { SettingOutlined } from "@ant-design/icons"

function SettingsMenu() {
  return (
    <AxActionMenu
      trigger={
        <AxButton variant="secondary" icon={<SettingOutlined />}>
          Settings
        </AxButton>
      }
      items={[
        { key: "profile", label: "Account Settings" },
        { key: "notifications", label: "Notification Preferences" },
        { key: "api", label: "API Keys" },
      ]}
    />
  )
}
```

### Danger items and dividers

```tsx
import { AxActionMenu } from "axmed-design-system"
import { EditOutlined, StopOutlined, DeleteOutlined } from "@ant-design/icons"

function SupplierActions() {
  return (
    <AxActionMenu
      items={[
        { key: "edit", label: "Edit Supplier", icon: <EditOutlined /> },
        { key: "suspend", label: "Suspend Supplier", icon: <StopOutlined />, danger: true },
        { type: "divider" },
        {
          key: "delete",
          label: "Delete Supplier",
          icon: <DeleteOutlined />,
          danger: true,
          onClick: () => console.log("Delete confirmed"),
        },
      ]}
    />
  )
}
```

### In a table row

A common pattern is placing an AxActionMenu in the last column of an AxTable as a row-level actions menu.

```tsx
import { AxTable, AxActionMenu } from "axmed-design-system"

const columns = [
  { title: "Product", dataIndex: "name", key: "name" },
  { title: "SKU", dataIndex: "sku", key: "sku" },
  { title: "Stock", dataIndex: "stock", key: "stock" },
  {
    title: "",
    key: "actions",
    width: 48,
    render: (_: unknown, record: { id: string; name: string }) => (
      <AxActionMenu
        size="sm"
        items={[
          { key: "view", label: "View Details", onClick: () => console.log("View", record.id) },
          { key: "edit", label: "Edit Product" },
          { type: "divider" },
          { key: "archive", label: "Archive Product", danger: true },
        ]}
      />
    ),
  },
]

const data = [
  { key: "1", id: "MED-001", name: "Amoxicillin 500mg", sku: "AMX-500", stock: 12400 },
  { key: "2", id: "MED-002", name: "Paracetamol 250mg", sku: "PCT-250", stock: 8300 },
]

function ProductTable() {
  return <AxTable columns={columns} dataSource={data} />
}
```

## Related Components

- [AxButton](./ax-button.md) -- used internally as the default trigger
- [AxTable](https://ax-derrick.github.io/axmed-design-system/?path=/docs/data-display-axtable--docs) -- common pattern: action menu in the last column

## Storybook

[View in Storybook](https://ax-derrick.github.io/axmed-design-system/?path=/docs/actions-axactionmenu--docs)
