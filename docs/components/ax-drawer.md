# AxDrawer

> Slide-in panel wrapping antd Drawer with size presets, a description subtitle, and a loading spinner overlay for async content.

## Import

```tsx
import { AxDrawer } from "axmed-design-system"
import type { AxDrawerProps } from "axmed-design-system"
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `description` | `ReactNode` | -- | Muted subtitle rendered below the title. Automatically wires up `aria-describedby`. |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | Preset width: xs (400px), sm (500px), md (600px), lg (640px). |
| `width` | `number` | -- | Custom width override. Takes precedence over `size`. |
| `loading` | `boolean` | `false` | Shows a Spin overlay over the drawer body. Use while fetching data or during async submission. |
| `title` | `ReactNode` | -- | Drawer title rendered in the header. |
| `placement` | `"left" \| "right" \| "top" \| "bottom"` | `"right"` | Which edge the drawer slides in from. |
| `open` | `boolean` | `false` | Whether the drawer is visible. |
| `onClose` | `(e) => void` | -- | Callback when the drawer is closed (via close button, mask click, or escape key). |
| `footer` | `ReactNode` | -- | Footer content rendered at the bottom of the drawer. |
| `rootClassName` | `string` | -- | Additional class name on the root drawer wrapper. |
| `children` | `ReactNode` | -- | Drawer body content. |

All other [antd Drawer props](https://ant.design/components/drawer) are forwarded, **except** `size` (replaced by our preset-based `size` prop that resolves to a numeric value).

### Size guide

| Size | Width | Recommended use |
| --- | --- | --- |
| `xs` | 400px | Quick actions, simple confirmations |
| `sm` | 500px | Detail views, bid summaries |
| `md` | 600px | Forms, multi-step flows |
| `lg` | 640px | Profiles, content-rich side panels |

## Basic Usage

```tsx
import { useState } from "react"
import { Flex } from "antd"
import { AxDrawer, AxButton, AxText } from "axmed-design-system"

function BidDetailDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <AxButton variant="secondary" onClick={() => setOpen(true)}>
        View Bid Details
      </AxButton>
      <AxDrawer
        title="Bid #BID-2025-0892"
        description="Submitted by PharmaCorp Ltd"
        size="sm"
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <Flex justify="flex-end" gap={8}>
            <AxButton variant="secondary" onClick={() => setOpen(false)}>
              Reject
            </AxButton>
            <AxButton onClick={() => setOpen(false)}>Accept Bid</AxButton>
          </Flex>
        }
      >
        <AxText variant="body-md" color="secondary">
          Bid content and line items go here.
        </AxText>
      </AxDrawer>
    </>
  )
}
```

## Examples

### Basic detail drawer

```tsx
import { useState } from "react"
import { Flex, Divider } from "antd"
import { AxDrawer, AxButton, AxText, AxTag } from "axmed-design-system"

function PurchaseOrderDrawer() {
  const [open, setOpen] = useState(false)

  const lineItems = [
    { name: "Amoxicillin 500mg Capsules", qty: "5,000 units", price: "$1.20/unit", total: "$6,000" },
    { name: "Metformin 850mg Tablets", qty: "10,000 units", price: "$0.85/unit", total: "$8,500" },
    { name: "Ibuprofen 400mg Tablets", qty: "20,000 units", price: "$0.45/unit", total: "$9,000" },
  ]

  return (
    <>
      <AxButton variant="secondary" onClick={() => setOpen(true)}>
        View Bid Details
      </AxButton>
      <AxDrawer
        title="Bid #BID-2025-0892"
        description="Submitted by PharmaCorp Ltd · 3 days ago"
        size="sm"
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <Flex justify="flex-end" gap={8}>
            <AxButton variant="secondary" onClick={() => setOpen(false)}>Reject</AxButton>
            <AxButton onClick={() => setOpen(false)}>Accept Bid</AxButton>
          </Flex>
        }
      >
        <Flex vertical gap={24}>
          <Flex justify="space-between" align="center">
            <AxText variant="body-sm" color="secondary">Status</AxText>
            <AxTag tone="info" dot>In Review</AxTag>
          </Flex>

          <Divider style={{ margin: 0 }} />

          <Flex vertical gap={12}>
            <AxText variant="body-sm" weight="medium">Line Items</AxText>
            {lineItems.map((item) => (
              <div
                key={item.name}
                style={{ background: "var(--neutral-50)", borderRadius: 8, padding: "12px 16px" }}
              >
                <Flex justify="space-between" align="center">
                  <AxText variant="body-sm" weight="medium">{item.name}</AxText>
                  <AxText variant="body-sm" weight="semibold">{item.total}</AxText>
                </Flex>
                <AxText variant="body-xs" color="secondary">
                  {item.qty} x {item.price}
                </AxText>
              </div>
            ))}
          </Flex>

          <Divider style={{ margin: 0 }} />

          {[
            { label: "Subtotal", value: "$23,500" },
            { label: "Lead Time", value: "14 days" },
            { label: "Valid Until", value: "Dec 31, 2025" },
          ].map((row) => (
            <Flex key={row.label} justify="space-between">
              <AxText variant="body-sm" color="secondary">{row.label}</AxText>
              <AxText variant="body-sm" weight="medium">{row.value}</AxText>
            </Flex>
          ))}
        </Flex>
      </AxDrawer>
    </>
  )
}
```

### Form drawer with inputs

```tsx
import { useState } from "react"
import { Flex, Input } from "antd"
import { AxDrawer, AxButton, AxText, AxInput } from "axmed-design-system"

function ReviewQuantitiesDrawer() {
  const [open, setOpen] = useState(false)

  const medications = [
    { label: "Amoxicillin 500mg", requested: "5,000 units" },
    { label: "Metformin 850mg", requested: "10,000 units" },
    { label: "Ibuprofen 400mg", requested: "20,000 units" },
  ]

  return (
    <>
      <AxButton onClick={() => setOpen(true)}>Review & Submit Bid</AxButton>
      <AxDrawer
        title="Review quantities"
        description="Confirm the quantities you can supply before submitting."
        size="md"
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <Flex justify="space-between">
            <AxButton variant="ghost" onClick={() => setOpen(false)}>Back</AxButton>
            <AxButton onClick={() => setOpen(false)}>Accept & Continue</AxButton>
          </Flex>
        }
      >
        <Flex vertical gap={16}>
          {medications.map((item) => (
            <div key={item.label}>
              <Flex justify="space-between" align="center" style={{ marginBottom: 4 }}>
                <AxText variant="body-sm" weight="medium">{item.label}</AxText>
                <AxText variant="body-xs" color="secondary">
                  Requested: {item.requested}
                </AxText>
              </Flex>
              <AxInput placeholder="Enter quantity you can supply" suffix="units" />
            </div>
          ))}
          <div>
            <AxText variant="body-sm" weight="medium" style={{ display: "block", marginBottom: 8 }}>
              Notes (optional)
            </AxText>
            <Input.TextArea
              placeholder="Add any notes about availability, lead times, or substitutions..."
              rows={3}
            />
          </div>
        </Flex>
      </AxDrawer>
    </>
  )
}
```

### All sizes

```tsx
import { useState } from "react"
import { Flex } from "antd"
import { AxDrawer, AxButton, AxText } from "axmed-design-system"

function DrawerSizes() {
  const [openSize, setOpenSize] = useState<"xs" | "sm" | "md" | "lg" | null>(null)

  return (
    <Flex gap={8}>
      <AxButton variant="secondary" onClick={() => setOpenSize("xs")}>XS (400px)</AxButton>
      <AxButton variant="secondary" onClick={() => setOpenSize("sm")}>SM (500px)</AxButton>
      <AxButton variant="secondary" onClick={() => setOpenSize("md")}>MD (600px)</AxButton>
      <AxButton variant="secondary" onClick={() => setOpenSize("lg")}>LG (640px)</AxButton>

      {(["xs", "sm", "md", "lg"] as const).map((s) => (
        <AxDrawer
          key={s}
          title={`${s.toUpperCase()} drawer`}
          description={{
            xs: "400px — quick actions, simple confirmations",
            sm: "500px — detail views, bid summaries",
            md: "600px — forms, multi-step flows",
            lg: "640px — profiles, rich side panels",
          }[s]}
          size={s}
          open={openSize === s}
          onClose={() => setOpenSize(null)}
          footer={
            <Flex justify="flex-end">
              <AxButton onClick={() => setOpenSize(null)}>Close</AxButton>
            </Flex>
          }
        >
          <AxText variant="body-md" color="secondary">
            Content for the {s.toUpperCase()} drawer.
          </AxText>
        </AxDrawer>
      ))}
    </Flex>
  )
}
```

### Multi-step drawer (with back/next navigation)

```tsx
import { useState } from "react"
import { Flex } from "antd"
import { AxDrawer, AxButton, AxText } from "axmed-design-system"

function PlaceOrderDrawer() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)

  const steps = [
    { title: "Confirm order details", description: "Step 1 of 3 — Review your order." },
    { title: "Select delivery address", description: "Step 2 of 3 — Choose destination." },
    { title: "Review & submit", description: "Step 3 of 3 — Final confirmation." },
  ]

  const handleOpen = () => { setStep(0); setOpen(true) }
  const handleClose = () => setOpen(false)

  return (
    <>
      <AxButton onClick={handleOpen}>Place Order</AxButton>
      <AxDrawer
        title={steps[step].title}
        description={steps[step].description}
        size="md"
        open={open}
        onClose={handleClose}
        footer={
          <Flex justify="space-between">
            {step > 0 ? (
              <AxButton variant="ghost" onClick={() => setStep((s) => s - 1)}>Back</AxButton>
            ) : (
              <AxButton variant="ghost" onClick={handleClose}>Cancel</AxButton>
            )}
            {step < steps.length - 1 ? (
              <AxButton onClick={() => setStep((s) => s + 1)}>Next</AxButton>
            ) : (
              <AxButton onClick={handleClose}>Submit Order</AxButton>
            )}
          </Flex>
        }
      >
        <AxText variant="body-md" color="secondary">
          Content for step {step + 1}: {steps[step].title}
        </AxText>
      </AxDrawer>
    </>
  )
}
```

### Loading state

```tsx
import { useState } from "react"
import { Flex } from "antd"
import { AxDrawer, AxButton, AxText } from "axmed-design-system"

function LoadingDrawer() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleOpen = () => {
    setOpen(true)
    setLoading(true)
    // Simulate fetching data
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <>
      <AxButton variant="secondary" onClick={handleOpen}>
        View Purchase Order
      </AxButton>
      <AxDrawer
        title="Purchase Order #PO-2025-0044"
        description="Loading order details..."
        size="sm"
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
        footer={
          <Flex justify="flex-end">
            <AxButton onClick={() => setOpen(false)}>Close</AxButton>
          </Flex>
        }
      >
        <Flex vertical gap={12}>
          {[
            { label: "Supplier", value: "PharmaCorp Ltd" },
            { label: "Total Value", value: "$23,500" },
            { label: "Status", value: "Confirmed" },
            { label: "Expected Delivery", value: "Jan 15, 2025" },
          ].map((row) => (
            <Flex
              key={row.label}
              justify="space-between"
              style={{ padding: "8px 0", borderBottom: "1px solid var(--neutral-100)" }}
            >
              <AxText variant="body-sm" color="secondary">{row.label}</AxText>
              <AxText variant="body-sm" weight="medium">{row.value}</AxText>
            </Flex>
          ))}
        </Flex>
      </AxDrawer>
    </>
  )
}
```

## Related Components

- [AxModal](./ax-modal.md) -- centered dialog for confirmations and focused interactions; use AxDrawer instead when showing supplementary content that doesn't block the main workflow
- [AxButton](./ax-button.md) -- typically used in drawer footers for Save / Cancel actions
- [AxSteps](./ax-steps.md) -- pair with AxDrawer for multi-step flows (onboarding, order placement)

## Storybook

[View in Storybook](https://ax-derrick.github.io/axmed-design-system/?path=/docs/overlays-axdrawer--docs)
