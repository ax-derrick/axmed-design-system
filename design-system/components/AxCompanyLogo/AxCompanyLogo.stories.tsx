import type { Meta, StoryObj } from "@storybook/react"
import { Flex } from "antd"

import AxCompanyLogo from "."
import AxText from "../AxText"

const meta: Meta<typeof AxCompanyLogo> = {
  title: "Data Display/AxCompanyLogo",
  component: AxCompanyLogo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    name: { control: "text" },
    src: { control: "text" },
    size: {
      control: "radio",
      options: ["sm", "md", "lg", "xl"],
    },
    shape: {
      control: "radio",
      options: ["square", "circle"],
    },
  },
}

export default meta
type Story = StoryObj<typeof AxCompanyLogo>

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    name: "PharmaCorp Ltd",
    size: "md",
    shape: "square",
  },
}

// ---------------------------------------------------------------------------
// Size — all sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  name: "Size — All sizes",
  render: () => (
    <Flex align="center" gap={16}>
      <AxCompanyLogo name="PharmaCorp Ltd" size="sm" />
      <AxCompanyLogo name="PharmaCorp Ltd" size="md" />
      <AxCompanyLogo name="PharmaCorp Ltd" size="lg" />
      <AxCompanyLogo name="PharmaCorp Ltd" size="xl" />
    </Flex>
  ),
}

// ---------------------------------------------------------------------------
// Feature — Initials colours (deterministic palette)
// ---------------------------------------------------------------------------

const COMPANIES = [
  "PharmaCorp Ltd",
  "MediGlobal SA",
  "AfriPharma Co",
  "Nordic Health",
  "BioMed Solutions",
  "Global Supplies",
]

export const InitialsColors: Story = {
  name: "Feature — Deterministic colours",
  render: () => (
    <Flex gap={12} wrap="wrap">
      {COMPANIES.map((name) => (
        <Flex key={name} vertical align="center" gap={6}>
          <AxCompanyLogo name={name} size="lg" />
          <AxText variant="body-xs" color="secondary" style={{ maxWidth: 80, textAlign: "center", textWrap: "balance" }}>
            {name}
          </AxText>
        </Flex>
      ))}
    </Flex>
  ),
}

// ---------------------------------------------------------------------------
// Feature — Shape variants
// ---------------------------------------------------------------------------

export const Shapes: Story = {
  name: "Feature — Shape variants",
  render: () => (
    <Flex gap={24} align="center">
      <Flex vertical align="center" gap={8}>
        <AxCompanyLogo name="PharmaCorp Ltd" size="lg" shape="square" />
        <AxText variant="body-xs" color="secondary">Square</AxText>
      </Flex>
      <Flex vertical align="center" gap={8}>
        <AxCompanyLogo name="PharmaCorp Ltd" size="lg" shape="circle" />
        <AxText variant="body-xs" color="secondary">Circle</AxText>
      </Flex>
    </Flex>
  ),
}

// ---------------------------------------------------------------------------
// Pattern — Supplier list row
// ---------------------------------------------------------------------------

export const SupplierListRow: Story = {
  name: "Pattern — Supplier list row",
  render: () => (
    <Flex vertical gap={0} style={{ width: 360, border: "1px solid var(--neutral-200)", borderRadius: 10, overflow: "hidden" }}>
      {COMPANIES.map((name, i) => (
        <Flex
          key={name}
          align="center"
          gap={12}
          style={{
            padding: "12px 16px",
            borderBottom: i < COMPANIES.length - 1 ? "1px solid var(--neutral-100)" : "none",
            background: "#fff",
          }}
        >
          <AxCompanyLogo name={name} size="md" />
          <Flex vertical style={{ minWidth: 0 }}>
            <AxText variant="body-sm" weight="medium" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {name}
            </AxText>
            <AxText variant="body-xs" color="secondary">
              Supplier · Active
            </AxText>
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
}
