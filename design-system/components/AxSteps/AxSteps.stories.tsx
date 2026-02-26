import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Flex } from "antd"

import AxSteps from "."
import AxButton from "../AxButton"
import AxText from "../AxText"

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof AxSteps> = {
  title: "Navigation/AxSteps",
  component: AxSteps,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Step indicator size",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Layout direction",
    },
    current: {
      control: "number",
      description: "Index of the currently active step (0-based)",
    },
  },
}

export default meta
type Story = StoryObj<typeof AxSteps>

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  name: "Playground",
  args: {
    size: "md",
    orientation: "horizontal",
    current: 1,
    items: [
      { title: "Select Products" },
      { title: "Review Quantities" },
      { title: "Submit Bid" },
    ],
  },
  render: (args) => (
    <div style={{ width: 600 }}>
      <AxSteps {...args} />
    </div>
  ),
}

// ===========================================================================
// TEMPLATES
// ===========================================================================

// ---------------------------------------------------------------------------
// Order Status — 7-step order lifecycle from marketplace
// ---------------------------------------------------------------------------

export const OrderStatus: Story = {
  name: "Template — Order Status",
  render: () => {
    const steps = [
      { title: "Submitted", description: "Jan 5, 2025" },
      { title: "Under Quotation", description: "Jan 6, 2025" },
      { title: "Quotation Ready", description: "Jan 8, 2025" },
      { title: "Under Evaluation" },
      { title: "Logistics Arrangement" },
      { title: "Shipping Confirmed" },
      { title: "Completed" },
    ]

    return (
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          padding: 24,
          background: "var(--neutral-0)",
          border: "1px solid var(--neutral-200)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <AxText variant="heading-md" style={{ marginBottom: 20, display: "block" }}>
          Order Status
        </AxText>
        <AxSteps
          current={2}
          items={steps}
          labelPlacement="vertical"
          size="sm"
        />
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// Onboarding — 5-step supplier onboarding
// ---------------------------------------------------------------------------

export const Onboarding: Story = {
  name: "Template — Onboarding",
  render: () => {
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
  },
  parameters: { controls: { disable: true } },
}

// ===========================================================================
// FEATURE DEMOS
// ===========================================================================

// ---------------------------------------------------------------------------
// Sizes — sm vs md
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  name: "Feature — Sizes",
  render: () => {
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
  },
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// Vertical — timeline-style orientation
// ---------------------------------------------------------------------------

export const Vertical: Story = {
  name: "Feature — Vertical",
  render: () => (
    <div
      style={{
        width: 320,
        padding: 24,
        background: "var(--neutral-0)",
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
  ),
  parameters: { controls: { disable: true } },
}
