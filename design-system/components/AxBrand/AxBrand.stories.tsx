import type { Meta, StoryObj } from "@storybook/react"
import { Flex } from "antd"

import AxBrand from "."

const meta: Meta<typeof AxBrand> = {
  title: "Foundations/AxBrand",
  component: AxBrand,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["wordmark", "icon"],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    theme: {
      control: "radio",
      options: ["light", "dark"],
    },
  },
}

export default meta
type Story = StoryObj<typeof AxBrand>

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    variant: "wordmark",
    size: "md",
    theme: "light",
  },
}

// ---------------------------------------------------------------------------
// Size — all sizes, both variants
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  name: "Size — All sizes",
  render: () => (
    <Flex vertical gap={32} align="flex-start">
      <Flex align="center" gap={32}>
        <AxBrand size="sm" />
        <AxBrand size="md" />
        <AxBrand size="lg" />
      </Flex>
      <Flex align="center" gap={32}>
        <AxBrand variant="icon" size="sm" />
        <AxBrand variant="icon" size="md" />
        <AxBrand variant="icon" size="lg" />
      </Flex>
    </Flex>
  ),
}

// ---------------------------------------------------------------------------
// Feature — Wordmark vs icon
// ---------------------------------------------------------------------------

export const Variants: Story = {
  name: "Feature — Wordmark vs Icon",
  render: () => (
    <Flex gap={40} align="center">
      <AxBrand variant="wordmark" size="md" />
      <AxBrand variant="icon" size="md" />
    </Flex>
  ),
}

// ---------------------------------------------------------------------------
// Feature — Dark theme
// ---------------------------------------------------------------------------

export const DarkTheme: Story = {
  name: "Feature — Dark theme",
  render: () => (
    <Flex
      gap={40}
      align="center"
      style={{
        background: "var(--primary-600)",
        padding: "24px 32px",
        borderRadius: 12,
      }}
    >
      <AxBrand variant="wordmark" size="md" theme="dark" />
      <AxBrand variant="icon" size="md" theme="dark" />
    </Flex>
  ),
}

// ---------------------------------------------------------------------------
// Pattern — Sidebar logo slot
// ---------------------------------------------------------------------------

export const SidebarLogoSlot: Story = {
  name: "Pattern — Sidebar logo slot",
  render: () => (
    <Flex vertical gap={16}>
      {/* Expanded sidebar */}
      <div
        style={{
          width: 240,
          padding: "14px 16px",
          borderBottom: "1px solid var(--neutral-200)",
          borderRadius: "8px 8px 0 0",
          background: "#fff",
          border: "1px solid var(--neutral-200)",
        }}
      >
        <AxBrand variant="wordmark" size="md" />
      </div>

      {/* Collapsed sidebar */}
      <div
        style={{
          width: 64,
          padding: "14px 16px",
          borderRadius: "8px 8px 0 0",
          background: "#fff",
          border: "1px solid var(--neutral-200)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <AxBrand variant="icon" size="md" />
      </div>
    </Flex>
  ),
}
