import type { Meta, StoryObj } from "@storybook/react"
import { Flex, Avatar } from "antd"
import {
  ShoppingCartOutlined,
  FileTextOutlined,
  BellOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons"

import AxBadge from "."
import AxText from "../AxText"

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof AxBadge> = {
  title: "Data Display/AxBadge",
  component: AxBadge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    tone: {
      control: "select",
      options: ["primary", "success", "warning", "error", "neutral"],
      description: "Semantic color preset",
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Badge size",
    },
    count: {
      control: "number",
      description: "Number to display inside the badge",
    },
    dot: {
      control: "boolean",
      description: "Show a dot indicator instead of a count",
    },
    showZero: {
      control: "boolean",
      description: "Show the badge when count is zero",
    },
    overflowCount: {
      control: "number",
      description: "Max count to show before displaying +",
    },
  },
}

export default meta
type Story = StoryObj<typeof AxBadge>

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  name: "Playground",
  args: {
    tone: "primary",
    size: "md",
    count: 5,
    dot: false,
    showZero: false,
    overflowCount: 99,
  },
  render: (args) => (
    <AxBadge {...args}>
      <Avatar shape="square" size="large" icon={<BellOutlined />} />
    </AxBadge>
  ),
}

// ===========================================================================
// FEATURE DEMOS
// ===========================================================================

// ---------------------------------------------------------------------------
// All Tones — count badges on icons
// ---------------------------------------------------------------------------

export const AllTones: Story = {
  name: "Feature — All Tones",
  render: () => (
    <Flex gap={32} align="center">
      {(
        [
          { tone: "primary", count: 12, label: "Primary" },
          { tone: "success", count: 8, label: "Success" },
          { tone: "warning", count: 3, label: "Warning" },
          { tone: "error", count: 5, label: "Error" },
          { tone: "neutral", count: 24, label: "Neutral" },
        ] as const
      ).map(({ tone, count, label }) => (
        <Flex key={tone} vertical align="center" gap={8}>
          <AxBadge tone={tone} count={count}>
            <Avatar
              shape="square"
              size="large"
              icon={<BellOutlined />}
              style={{ background: "var(--neutral-200)" }}
            />
          </AxBadge>
          <AxText variant="body-xs" color="secondary">
            {label}
          </AxText>
        </Flex>
      ))}
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// Dot Indicator — notification dots on nav icons
// ---------------------------------------------------------------------------

export const DotIndicator: Story = {
  name: "Feature — Dot Indicator",
  render: () => (
    <Flex gap={32} align="center">
      {(
        [
          { tone: "error", icon: <BellOutlined />, label: "Alerts" },
          { tone: "primary", icon: <MailOutlined />, label: "Messages" },
          { tone: "success", icon: <UserOutlined />, label: "Profile" },
          { tone: "warning", icon: <FileTextOutlined />, label: "Documents" },
        ] as const
      ).map(({ tone, icon, label }) => (
        <Flex key={tone} vertical align="center" gap={8}>
          <AxBadge tone={tone} dot>
            <span style={{ fontSize: 24, color: "var(--neutral-600)" }}>{icon}</span>
          </AxBadge>
          <AxText variant="body-xs" color="secondary">
            {label}
          </AxText>
        </Flex>
      ))}
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}

// ===========================================================================
// PATTERNS — marketplace-specific usage
// ===========================================================================

// ---------------------------------------------------------------------------
// Nav Badges — seller navigation with real counts
// ---------------------------------------------------------------------------

export const NavBadges: Story = {
  name: "Pattern — Nav Badges",
  render: () => {
    const navItems = [
      { icon: <ShoppingCartOutlined />, label: "Cart", count: 3, tone: "primary" as const },
      { icon: <FileTextOutlined />, label: "Draft Bids", count: 7, tone: "warning" as const },
      { icon: <BellOutlined />, label: "Notifications", count: 0, tone: "error" as const, dot: true },
      { icon: <MailOutlined />, label: "Messages", count: 12, tone: "primary" as const },
    ]

    return (
      <Flex
        gap={24}
        align="center"
        style={{
          padding: "12px 24px",
          background: "var(--neutral-0)",
          border: "1px solid var(--neutral-200)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        {navItems.map((item) => (
          <Flex
            key={item.label}
            vertical
            align="center"
            gap={4}
            style={{ cursor: "pointer", minWidth: 56 }}
          >
            <AxBadge
              tone={item.tone}
              count={item.dot ? undefined : item.count}
              dot={item.dot}
              size="sm"
            >
              <span style={{ fontSize: 22, color: "var(--neutral-600)" }}>{item.icon}</span>
            </AxBadge>
            <AxText variant="body-xs" color="secondary">
              {item.label}
            </AxText>
          </Flex>
        ))}
      </Flex>
    )
  },
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// Sizes — sm vs md comparison
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  name: "Feature — Sizes",
  render: () => (
    <Flex gap={40} align="center">
      <Flex vertical align="center" gap={8}>
        <AxBadge tone="primary" count={42} size="sm">
          <Avatar shape="square" size="large" icon={<BellOutlined />} style={{ background: "var(--neutral-200)" }} />
        </AxBadge>
        <AxText variant="body-xs" color="secondary">Small</AxText>
      </Flex>
      <Flex vertical align="center" gap={8}>
        <AxBadge tone="primary" count={42} size="md">
          <Avatar shape="square" size="large" icon={<BellOutlined />} style={{ background: "var(--neutral-200)" }} />
        </AxBadge>
        <AxText variant="body-xs" color="secondary">Medium (default)</AxText>
      </Flex>
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}
