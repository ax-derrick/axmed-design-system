import type { Meta, StoryObj } from "@storybook/react"
import { Flex } from "antd"
import { SearchOutlined, UserOutlined } from "@ant-design/icons"

import AxInput from "."

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof AxInput> = {
  title: "Controls/AxInput",
  component: AxInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Preset size: sm (small), md (middle — default), lg (large)",
    },
    label: {
      control: "text",
      description: "Label displayed above the input",
    },
    hint: {
      control: "text",
      description: "Helper text below the input (neutral)",
    },
    error: {
      control: "text",
      description: "Error message below the input — also sets the error border",
    },
    required: {
      control: "boolean",
      description: "Adds a red asterisk to the label",
    },
    status: {
      control: "select",
      options: ["", "error", "warning"],
      description: "Validation state override (use `error` prop for messages)",
    },
    disabled: {
      control: "boolean",
    },
    allowClear: {
      control: "boolean",
      description: "Show a clear icon when the input has a value",
    },
    placeholder: {
      control: "text",
    },
  },
}

export default meta
type Story = StoryObj<typeof AxInput>

// ---------------------------------------------------------------------------
// Playground — all controls work here
// ---------------------------------------------------------------------------

export const Playground: Story = {
  name: "Playground",
  args: {
    label: "Email address",
    hint: "We will never share your email.",
    placeholder: "you@example.com",
    required: true,
    size: "md",
    allowClear: true,
    disabled: false,
  },
  render: (args) => <AxInput {...args} style={{ width: 320 }} />,
}

// ===========================================================================
// TEMPLATES — production-ready usage patterns
// ===========================================================================

// ---------------------------------------------------------------------------
// Standalone form — no antd Form.Item needed, everything baked in
// ---------------------------------------------------------------------------

export const FormField: Story = {
  name: "Template — Form Fields",
  render: () => (
    <Flex vertical gap={16} style={{ width: 360 }}>
      <AxInput
        label="Email address"
        hint="We will never share your email."
        placeholder="you@example.com"
        required
        allowClear
      />

      <AxInput
        label="Quantity"
        hint="Must be between 1 and 10,000 units"
        placeholder="Enter quantity"
        suffix="units"
        status="warning"
      />

      <AxInput
        label="Product Code"
        error="Product code not found in catalogue"
        defaultValue="AMX-99999"
        allowClear
      />

      <AxInput
        label="Account holder"
        hint="Read-only"
        prefix={<UserOutlined />}
        defaultValue="PharmaCorp Ltd"
        disabled
      />
    </Flex>
  ),
}

// ===========================================================================
// FEATURE DEMOS
// ===========================================================================

// ---------------------------------------------------------------------------
// Sizes — sm, md, lg (all with label so the layout is visible)
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  name: "Feature — Sizes",
  render: () => (
    <Flex vertical gap={16} style={{ width: 320 }}>
      <AxInput size="sm" label="Small" placeholder="sm" hint="size=sm" />
      <AxInput size="md" label="Medium (default)" placeholder="md" hint="size=md" />
      <AxInput size="lg" label="Large" placeholder="lg" hint="size=lg" />
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// States — default, hint, error, warning, disabled, with prefix/suffix
// ---------------------------------------------------------------------------

export const States: Story = {
  name: "Feature — States",
  render: () => (
    <Flex vertical gap={16} style={{ width: 320 }}>
      <AxInput label="Default" placeholder="Default" />

      <AxInput
        label="With hint"
        hint="This is a helpful description."
        placeholder="With hint text"
      />

      <AxInput
        label="Error state"
        error="This field is required"
        defaultValue=""
        placeholder="Required field"
        required
      />

      <AxInput
        label="Warning state"
        hint="Double-check this value before submitting"
        defaultValue="Double check this"
        status="warning"
      />

      <AxInput
        label="Disabled"
        hint="Read-only — not editable"
        defaultValue="PharmaCorp Ltd"
        disabled
      />

      <AxInput
        label="With prefix icon"
        placeholder="Search suppliers..."
        prefix={<SearchOutlined />}
        allowClear
      />

      <AxInput
        label="Currency"
        placeholder="0.00"
        prefix="$"
        suffix="USD"
      />
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}
