import type { Meta, StoryObj } from "@storybook/react"
import { Flex } from "antd"
import {
  ShoppingOutlined,
  FileSearchOutlined,
  InboxOutlined,
  AppstoreOutlined,
  PlusOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"

import AxStatCard from "."

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof AxStatCard> = {
  title: "Data Display/AxStatCard",
  component: AxStatCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: {
      control: "text",
      description: "Metric label",
    },
    value: {
      control: "text",
      description: "Metric value",
    },
    icon: {
      control: false,
      description: "Icon displayed in the tinted container",
    },
    iconColor: {
      control: "object",
      description: "Icon container colors: { bg, fg }",
    },
    trend: {
      control: "object",
      description: "Trend indicator: { value: number, label?: string }",
    },
    action: {
      control: false,
      description: "Floating action button: { icon, onClick, label }",
    },
    loading: {
      control: "boolean",
      description: "Show skeleton loader",
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Card size preset",
    },
  },
}

export default meta
type Story = StoryObj<typeof AxStatCard>

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  name: "Playground",
  args: {
    title: "Available RFQs",
    value: "142",
    loading: false,
    size: "md",
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <AxStatCard
        {...args}
        icon={<ShoppingOutlined />}
      />
    </div>
  ),
}

// ===========================================================================
// TEMPLATES
// ===========================================================================

// ---------------------------------------------------------------------------
// Dashboard KPIs — seller dashboard metrics grid
// ---------------------------------------------------------------------------

export const DashboardKPIs: Story = {
  name: "Template — Dashboard KPIs",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 16,
        width: "100%",
        maxWidth: 1040,
      }}
    >
      <AxStatCard
        title="Available RFQs to bid"
        value="142"
        icon={<ShoppingOutlined />}
        iconColor={{ bg: "var(--primary-100)", fg: "var(--primary-600)" }}
        trend={{ value: 12, label: "vs last month" }}
      />
      <AxStatCard
        title="Matching RFQs"
        value="38"
        icon={<FileSearchOutlined />}
        iconColor={{ bg: "var(--cyan-100)", fg: "var(--cyan-700)" }}
        trend={{ value: -5, label: "vs last month" }}
      />
      <AxStatCard
        title="Non-matching RFQs"
        value="104"
        icon={<InboxOutlined />}
        iconColor={{ bg: "var(--orange-100)", fg: "var(--orange-600)" }}
      />
      <AxStatCard
        title="Total SKUs in Portfolio"
        value="1,247"
        icon={<AppstoreOutlined />}
        iconColor={{ bg: "var(--green-100)", fg: "var(--green-700)" }}
        action={{
          icon: <PlusOutlined />,
          onClick: () => console.log("Add SKU"),
          label: "Add new SKU",
        }}
      />
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// Buyer Metrics — buyer-side KPIs
// ---------------------------------------------------------------------------

export const BuyerMetrics: Story = {
  name: "Pattern — Buyer Metrics",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 16,
        width: "100%",
        maxWidth: 1040,
      }}
    >
      <AxStatCard
        title="Active Orders"
        value="24"
        icon={<CheckCircleOutlined />}
        iconColor={{ bg: "var(--green-100)", fg: "var(--green-700)" }}
        trend={{ value: 8, label: "this week" }}
      />
      <AxStatCard
        title="Pending Quotes"
        value="7"
        icon={<ClockCircleOutlined />}
        iconColor={{ bg: "var(--orange-100)", fg: "var(--orange-600)" }}
      />
      <AxStatCard
        title="Catalogue Items"
        value="3,891"
        icon={<AppstoreOutlined />}
        iconColor={{ bg: "var(--cyan-100)", fg: "var(--cyan-700)" }}
        trend={{ value: 0, label: "no change" }}
      />
      <AxStatCard
        title="Total Spend"
        value="$284,500"
        icon={<DollarOutlined />}
        iconColor={{ bg: "var(--primary-100)", fg: "var(--primary-600)" }}
        trend={{ value: 15, label: "vs last quarter" }}
      />
    </div>
  ),
  parameters: { controls: { disable: true } },
}

// ===========================================================================
// FEATURE DEMOS
// ===========================================================================

// ---------------------------------------------------------------------------
// With Trend — positive, negative, neutral
// ---------------------------------------------------------------------------

export const WithTrend: Story = {
  name: "Feature — With Trend",
  render: () => (
    <Flex gap={16} wrap="wrap">
      <div style={{ width: 260 }}>
        <AxStatCard
          title="Bids Won"
          value="18"
          icon={<CheckCircleOutlined />}
          trend={{ value: 12, label: "vs last month" }}
        />
      </div>
      <div style={{ width: 260 }}>
        <AxStatCard
          title="Response Time"
          value="4.2h"
          icon={<ClockCircleOutlined />}
          trend={{ value: -8, label: "faster" }}
        />
      </div>
      <div style={{ width: 260 }}>
        <AxStatCard
          title="Win Rate"
          value="67%"
          icon={<FileSearchOutlined />}
          trend={{ value: 0, label: "no change" }}
        />
      </div>
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// Loading — skeleton state
// ---------------------------------------------------------------------------

export const Loading: Story = {
  name: "Feature — Loading",
  render: () => (
    <Flex gap={16} wrap="wrap">
      <div style={{ width: 260 }}>
        <AxStatCard
          title="Available RFQs"
          value="142"
          icon={<ShoppingOutlined />}
          loading
        />
      </div>
      <div style={{ width: 260 }}>
        <AxStatCard
          title="Available RFQs"
          value="142"
          icon={<ShoppingOutlined />}
          trend={{ value: 12, label: "vs last month" }}
        />
      </div>
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// Sizes — sm vs md
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  name: "Feature — Sizes",
  render: () => (
    <Flex gap={16} wrap="wrap" align="start">
      <div style={{ width: 220 }}>
        <AxStatCard
          title="Total SKUs"
          value="1,247"
          icon={<AppstoreOutlined />}
          size="sm"
        />
      </div>
      <div style={{ width: 280 }}>
        <AxStatCard
          title="Total SKUs"
          value="1,247"
          icon={<AppstoreOutlined />}
          size="md"
        />
      </div>
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}
