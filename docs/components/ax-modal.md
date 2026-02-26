# AxModal

> Dialog component wrapping antd Modal with size presets, danger mode for destructive confirmations, and a description subtitle. Default footer auto-generates Cancel + OK buttons using AxButton.

## Import

```tsx
import { AxModal } from "axmed-design-system"
import type { AxModalProps } from "axmed-design-system"
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `description` | `ReactNode` | -- | Muted subtitle rendered below the title. Automatically wires up `aria-describedby`. |
| `danger` | `boolean` | `false` | Makes the OK button red for destructive confirmations (delete, cancel order, withdraw bid). |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Preset width: sm (380px), md (520px), lg (720px). |
| `width` | `number` | -- | Custom width override. Takes precedence over `size`. |
| `title` | `ReactNode` | -- | Modal title rendered in the header. |
| `footer` | `ReactNode \| null` | Auto-generated Cancel + OK | Pass `null` to hide footer entirely. Pass a `ReactNode` to replace the default. When omitted, renders Cancel (secondary) + OK (primary, or danger if `danger=true`) using AxButton. |
| `loading` | `boolean` | `false` | Shows a spinner overlay over the modal body. |
| `okText` | `string` | `"OK"` | Label for the primary action button. |
| `cancelText` | `string` | `"Cancel"` | Label for the cancel button. |
| `okButtonProps` | `ButtonProps` | -- | Props forwarded to the OK AxButton. |
| `cancelButtonProps` | `ButtonProps` | -- | Props forwarded to the Cancel AxButton. |
| `confirmLoading` | `boolean` | `false` | Shows a loading spinner on the OK button while an async action completes. |
| `onOk` | `() => void` | -- | Callback fired when the OK button is clicked. |
| `onCancel` | `() => void` | -- | Callback fired when the Cancel button or close icon is clicked. |
| `centered` | `boolean` | `true` | Centers the modal vertically in the viewport. |
| `rootClassName` | `string` | -- | Additional class name on the root modal wrapper. |
| `children` | `ReactNode` | -- | Modal body content. |

All other [antd Modal props](https://ant.design/components/modal) are forwarded, **except** `classNames` (reserved for internal styling).

## Basic Usage

```tsx
import { useState } from "react"
import { AxModal, AxButton } from "axmed-design-system"

function ConfirmShipment() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <AxButton onClick={() => setOpen(true)}>Confirm Shipment</AxButton>
      <AxModal
        title="Confirm shipment details"
        description="Please review the order before confirming dispatch."
        open={open}
        okText="Confirm"
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <p>Shipment #SHP-2025-0412 is ready for dispatch to Nairobi Warehouse.</p>
      </AxModal>
    </>
  )
}
```

## Examples

### Basic confirmation dialog

```tsx
import { useState } from "react"
import { AxModal, AxButton } from "axmed-design-system"

function ApproveQuotation() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <AxButton onClick={() => setOpen(true)}>Approve Quotation</AxButton>
      <AxModal
        title="Approve this quotation?"
        description="Once approved, a purchase order will be generated and sent to the supplier."
        open={open}
        size="sm"
        okText="Approve"
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <p style={{ color: "var(--text-secondary)", margin: 0 }}>
          Quotation QUO-2025-0187 from PharmaCorp Ltd for $23,500.
        </p>
      </AxModal>
    </>
  )
}
```

### Danger mode (delete confirmation)

```tsx
import { useState } from "react"
import { AxModal, AxButton } from "axmed-design-system"

function CancelOrder() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <AxButton variant="danger" onClick={() => setOpen(true)}>
        Cancel Order
      </AxButton>
      <AxModal
        title="Cancel this order?"
        description="This action cannot be undone. The order will be permanently cancelled and all associated bids will be withdrawn."
        open={open}
        danger
        size="sm"
        okText="Yes, Cancel Order"
        cancelText="Keep Order"
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </>
  )
}
```

### Form modal (with input fields)

```tsx
import { useState } from "react"
import { Flex, Select, Checkbox } from "antd"
import { AxModal, AxButton, AxInput } from "axmed-design-system"

function AddDeliveryAddress() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <AxButton onClick={() => setOpen(true)}>Add Address</AxButton>
      <AxModal
        title="Add delivery address"
        description="This address will be available for all future orders."
        open={open}
        okText="Add Address"
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <Flex vertical gap={16}>
          <AxInput label="Address Name" placeholder="e.g. Main Warehouse" />
          <Flex gap={12}>
            <Select
              placeholder="Select country"
              style={{ flex: 1 }}
              options={[
                { value: "ke", label: "Kenya" },
                { value: "ng", label: "Nigeria" },
                { value: "gh", label: "Ghana" },
              ]}
            />
            <Select
              placeholder="Select city"
              style={{ flex: 1 }}
              options={[]}
            />
          </Flex>
          <AxInput label="Street Address" placeholder="Street address, building, floor..." />
          <Checkbox>Use as default billing address</Checkbox>
        </Flex>
      </AxModal>
    </>
  )
}
```

### Detail view modal (read-only data)

```tsx
import { useState } from "react"
import { Flex } from "antd"
import { AxModal, AxButton, AxText } from "axmed-design-system"

function ViewSupplier() {
  const [open, setOpen] = useState(false)

  const details = [
    { label: "Supplier", value: "PharmaCorp Ltd" },
    { label: "Unit Price", value: "$2.40 / unit" },
    { label: "Lead Time", value: "14 days" },
    { label: "Remaining Shelf Life", value: "18 months" },
    { label: "Pack Specifications", value: "1000 tabs / bottle" },
  ]

  return (
    <>
      <AxButton variant="secondary" onClick={() => setOpen(true)}>
        View Supplier
      </AxButton>
      <AxModal
        title="Supplier Details"
        open={open}
        footer={
          <Flex gap={8} justify="flex-end">
            <AxButton variant="secondary" onClick={() => setOpen(false)}>
              View Full Profile
            </AxButton>
            <AxButton onClick={() => setOpen(false)}>Got It</AxButton>
          </Flex>
        }
        onCancel={() => setOpen(false)}
      >
        <div
          style={{
            background: "var(--neutral-50)",
            borderRadius: 8,
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {details.map((item) => (
            <Flex key={item.label} justify="space-between">
              <AxText variant="body-sm" color="secondary">{item.label}</AxText>
              <AxText variant="body-sm" weight="medium">{item.value}</AxText>
            </Flex>
          ))}
        </div>
      </AxModal>
    </>
  )
}
```

### All sizes comparison

```tsx
import { useState } from "react"
import { Flex } from "antd"
import { AxModal, AxButton, AxText } from "axmed-design-system"

function ModalSizes() {
  const [openSize, setOpenSize] = useState<"sm" | "md" | "lg" | null>(null)

  return (
    <Flex gap={8}>
      <AxButton variant="secondary" onClick={() => setOpenSize("sm")}>
        Small (380px)
      </AxButton>
      <AxButton variant="secondary" onClick={() => setOpenSize("md")}>
        Medium (520px)
      </AxButton>
      <AxButton variant="secondary" onClick={() => setOpenSize("lg")}>
        Large (720px)
      </AxButton>

      <AxModal
        title="Small modal"
        description="Compact size for simple confirmations."
        open={openSize === "sm"}
        size="sm"
        okText="Confirm"
        onOk={() => setOpenSize(null)}
        onCancel={() => setOpenSize(null)}
      />

      <AxModal
        title="Medium modal"
        description="Standard size for forms and content."
        open={openSize === "md"}
        size="md"
        okText="Save"
        onOk={() => setOpenSize(null)}
        onCancel={() => setOpenSize(null)}
      >
        <AxText variant="body-md" color="secondary">
          The default 520px width works well for most forms and content.
        </AxText>
      </AxModal>

      <AxModal
        title="Large modal"
        description="Wide size for tables, lists, and complex content."
        open={openSize === "lg"}
        size="lg"
        footer={<AxButton onClick={() => setOpenSize(null)}>Close</AxButton>}
        onCancel={() => setOpenSize(null)}
      >
        <AxText variant="body-md" color="secondary">
          Use the 720px width for data-heavy content like bid comparison tables.
        </AxText>
      </AxModal>
    </Flex>
  )
}
```

### Loading / confirmLoading states

```tsx
import { useState } from "react"
import { AxModal, AxButton, AxText } from "axmed-design-system"

function SaveWithLoading() {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleOk = () => {
    setSaving(true)
    // Simulate async operation
    setTimeout(() => {
      setSaving(false)
      setOpen(false)
    }, 2000)
  }

  return (
    <>
      <AxButton onClick={() => setOpen(true)}>Save Changes</AxButton>
      <AxModal
        title="Save changes?"
        description="Your changes will be applied immediately."
        open={open}
        okText="Save"
        confirmLoading={saving}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
      >
        <AxText variant="body-md" color="secondary">
          This will update the medication details across all active orders.
        </AxText>
      </AxModal>
    </>
  )
}
```

## Related Components

- [AxDrawer](./ax-drawer.md) -- slide-in panel for side content, an alternative to modals for detail views and forms
- [AxButton](./ax-button.md) -- used internally for the default footer actions (Cancel + OK)
- [AxEmptyState](./ax-empty-state.md) -- can be placed inside a modal body when no data is available

## Storybook

[View in Storybook](https://ax-derrick.github.io/axmed-design-system/?path=/docs/overlays-axmodal--docs)
