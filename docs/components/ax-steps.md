# AxSteps

> Step indicator component wrapping antd Steps with a simplified size and orientation API. Horizontal steps auto-collapse to vertical on mobile via antd's built-in responsive behaviour.

## Import

```tsx
import { AxSteps } from "axmed-design-system"
import type { AxStepsProps, AxStepsSize } from "axmed-design-system"
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "md"` | `"md"` | Step indicator size. Maps to antd `"small"` / `"default"` internally. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction. Maps to antd `direction`. |
| `items` | `StepItem[]` | -- | Array of step objects. Each item accepts `{ title, description, icon, status, disabled, subTitle }`. |
| `current` | `number` | -- | Zero-based index of the currently active step. |
| `status` | `"wait" \| "process" \| "finish" \| "error"` | -- | Status of the current step. Overrides the automatic status derived from `current`. |
| `onChange` | `(current: number) => void` | -- | Callback when a step is clicked. Makes steps interactive/clickable. |
| `className` | `string` | -- | Additional CSS class name. |
| `style` | `React.CSSProperties` | -- | Inline styles on the root element. |

All other [antd Steps props](https://ant.design/components/steps) are forwarded, **except** `size` and `direction` (replaced by `size` and `orientation`).

### antd Steps items format

```tsx
items={[
  { title: "Step 1", description: "Details about step 1" },
  { title: "Step 2", description: "Details about step 2" },
  { title: "Step 3", description: "Details about step 3" },
]}
```

### Responsive behaviour

When `orientation="horizontal"` (the default), antd's `responsive={true}` is enabled automatically. This collapses the steps to a vertical layout on small screens without any additional configuration.

## Basic Usage

```tsx
import { AxSteps } from "axmed-design-system"

function BidProgress() {
  return (
    <AxSteps
      current={1}
      items={[
        { title: "Select Products" },
        { title: "Review Quantities" },
        { title: "Submit Bid" },
      ]}
    />
  )
}
```

## Examples

### Basic horizontal steps

```tsx
import { AxSteps } from "axmed-design-system"

function SupplierOnboardingProgress() {
  return (
    <AxSteps
      current={2}
      items={[
        { title: "Business Profile" },
        { title: "Commercial Activity" },
        { title: "Quality Assurance" },
        { title: "Operating Standards" },
        { title: "Financial Standards" },
      ]}
    />
  )
}
```

### Vertical timeline

Use `orientation="vertical"` for timeline-style layouts, such as order tracking history.

```tsx
import { AxSteps, AxText } from "axmed-design-system"

function OrderTimeline() {
  return (
    <div
      style={{
        width: 320,
        padding: 24,
        border: "1px solid var(--neutral-200)",
        borderRadius: "var(--radius-lg)",
      }}
    >
      <AxText variant="heading-sm" style={{ marginBottom: 16, display: "block" }}>
        Order Timeline
      </AxText>
      <AxSteps
        orientation="vertical"
        current={3}
        items={[
          { title: "Order Placed", description: "Jan 5, 2025 — 09:30 AM" },
          { title: "Quotation Received", description: "Jan 6, 2025 — 02:15 PM" },
          { title: "Payment Confirmed", description: "Jan 7, 2025 — 10:00 AM" },
          { title: "Shipping Arranged", description: "In progress" },
          { title: "Delivered" },
        ]}
      />
    </div>
  )
}
```

### Order tracking (7-step lifecycle)

A compact view of the full order lifecycle using `size="sm"` and `labelPlacement="vertical"` for a dense horizontal layout.

```tsx
import { AxSteps, AxText } from "axmed-design-system"

function OrderStatusTracker() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 900,
        padding: 24,
        border: "1px solid var(--neutral-200)",
        borderRadius: "var(--radius-lg)",
      }}
    >
      <AxText variant="heading-md" style={{ marginBottom: 20, display: "block" }}>
        Order Status
      </AxText>
      <AxSteps
        current={2}
        size="sm"
        labelPlacement="vertical"
        items={[
          { title: "Submitted", description: "Jan 5, 2025" },
          { title: "Under Quotation", description: "Jan 6, 2025" },
          { title: "Quotation Ready", description: "Jan 8, 2025" },
          { title: "Under Evaluation" },
          { title: "Logistics Arrangement" },
          { title: "Shipping Confirmed" },
          { title: "Completed" },
        ]}
      />
    </div>
  )
}
```

### Interactive wizard with state management

Pair AxSteps with Back/Next buttons to build a multi-step wizard. The `current` prop is driven by component state.

```tsx
import { useState } from "react"
import { Flex } from "antd"
import { AxSteps, AxButton, AxText } from "axmed-design-system"

function SupplierOnboardingWizard() {
  const [current, setCurrent] = useState(0)

  const steps = [
    { title: "Business Profile" },
    { title: "Commercial Activity" },
    { title: "Quality Assurance" },
    { title: "Operating Standards" },
    { title: "Financial Standards" },
  ]

  return (
    <Flex vertical gap={24} style={{ width: "100%", maxWidth: 700 }}>
      <AxSteps current={current} items={steps} />

      <Flex
        justify="center"
        style={{
          padding: 40,
          background: "var(--neutral-50)",
          borderRadius: "var(--radius-md)",
        }}
      >
        <AxText variant="body-md" color="secondary">
          Step {current + 1}: {steps[current].title}
        </AxText>
      </Flex>

      <Flex justify="space-between">
        <AxButton
          variant="ghost"
          onClick={() => setCurrent((s) => Math.max(0, s - 1))}
          disabled={current === 0}
        >
          Back
        </AxButton>
        <AxButton
          onClick={() => setCurrent((s) => Math.min(steps.length - 1, s + 1))}
          disabled={current === steps.length - 1}
        >
          {current === steps.length - 1 ? "Submit" : "Next"}
        </AxButton>
      </Flex>
    </Flex>
  )
}
```

### Size comparison (sm vs md)

```tsx
import { Flex } from "antd"
import { AxSteps, AxText } from "axmed-design-system"

function StepSizes() {
  const items = [
    { title: "Select Products" },
    { title: "Review Quantities" },
    { title: "Submit Bid" },
  ]

  return (
    <Flex vertical gap={32} style={{ width: 600 }}>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8, display: "block" }}>
          Small
        </AxText>
        <AxSteps current={1} items={items} size="sm" />
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8, display: "block" }}>
          Medium (default)
        </AxText>
        <AxSteps current={1} items={items} size="md" />
      </div>
    </Flex>
  )
}
```

## Related Components

- [AxDrawer](./ax-drawer.md) -- pair with AxSteps for multi-step drawer flows (order placement, bid review)
- [AxModal](./ax-modal.md) -- for focused multi-step dialogs (shorter flows that don't need a side panel)
- [AxButton](./ax-button.md) -- used alongside AxSteps for Back / Next navigation controls

## Storybook

[View in Storybook](https://ax-derrick.github.io/axmed-design-system/?path=/docs/navigation-axsteps--docs)
