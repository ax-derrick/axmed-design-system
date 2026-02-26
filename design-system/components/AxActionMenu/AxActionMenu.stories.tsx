import type { Meta, StoryObj } from "@storybook/react"
import { Flex } from "antd"
import {
  EditOutlined,
  EyeOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  SendOutlined,
  StopOutlined,
  MoreOutlined,
} from "@ant-design/icons"

import AxActionMenu from "."
import type { ActionItem, ActionDivider } from "."
import AxButton from "../AxButton"
import AxText from "../AxText"

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof AxActionMenu> = {
  title: "Actions/AxActionMenu",
  component: AxActionMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Default trigger button size",
    },
    placement: {
      control: "select",
      options: ["bottomLeft", "bottomRight", "topLeft", "topRight"],
      description: "Menu placement relative to trigger",
    },
    disabled: {
      control: "boolean",
      description: "Prevent the menu from opening",
    },
  },
}

export default meta
type Story = StoryObj<typeof AxActionMenu>

// ---------------------------------------------------------------------------
// Shared items
// ---------------------------------------------------------------------------

const basicItems: (ActionItem | ActionDivider)[] = [
  { key: "edit", label: "Edit", icon: <EditOutlined /> },
  { key: "view", label: "View Details", icon: <EyeOutlined /> },
  { key: "duplicate", label: "Duplicate", icon: <CopyOutlined /> },
  { type: "divider" },
  { key: "delete", label: "Delete", icon: <DeleteOutlined />, danger: true },
]

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  name: "Playground",
  args: {
    items: basicItems,
    size: "md",
    placement: "bottomRight",
    disabled: false,
  },
}

// ===========================================================================
// TEMPLATES
// ===========================================================================

// ---------------------------------------------------------------------------
// Table Row Actions — simulated table row with "..." trigger
// ---------------------------------------------------------------------------

export const TableRowActions: Story = {
  name: "Template — Table Row Actions",
  render: () => {
    const rows = [
      { name: "Amoxicillin 500mg", status: "In Review", price: "$1.20/unit" },
      { name: "Metformin 850mg", status: "Awarded", price: "$0.85/unit" },
      { name: "Ibuprofen 400mg", status: "Draft", price: "$0.45/unit" },
    ]

    return (
      <div
        style={{
          border: "1px solid var(--neutral-200)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          width: 560,
        }}
      >
        {/* Header */}
        <Flex
          style={{
            padding: "10px 16px",
            background: "var(--neutral-50)",
            borderBottom: "1px solid var(--neutral-200)",
          }}
        >
          <AxText variant="body-xs" weight="medium" color="secondary" style={{ flex: 2 }}>
            Product
          </AxText>
          <AxText variant="body-xs" weight="medium" color="secondary" style={{ flex: 1 }}>
            Status
          </AxText>
          <AxText variant="body-xs" weight="medium" color="secondary" style={{ flex: 1 }}>
            Price
          </AxText>
          <span style={{ width: 40 }} />
        </Flex>

        {/* Rows */}
        {rows.map((row) => (
          <Flex
            key={row.name}
            align="center"
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid var(--neutral-100)",
            }}
          >
            <AxText variant="body-sm" weight="medium" style={{ flex: 2 }}>
              {row.name}
            </AxText>
            <AxText variant="body-sm" color="secondary" style={{ flex: 1 }}>
              {row.status}
            </AxText>
            <AxText variant="body-sm" style={{ flex: 1, fontVariantNumeric: "tabular-nums" }}>
              {row.price}
            </AxText>
            <AxActionMenu
              items={[
                { key: "edit", label: "Edit Bid", icon: <EditOutlined />, onClick: () => console.log("Edit", row.name) },
                { key: "view", label: "View Details", icon: <EyeOutlined /> },
                { key: "duplicate", label: "Duplicate", icon: <CopyOutlined /> },
                { type: "divider" },
                { key: "withdraw", label: "Withdraw", icon: <StopOutlined />, danger: true },
              ]}
              size="sm"
            />
          </Flex>
        ))}
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// Portfolio Actions — export actions dropdown
// ---------------------------------------------------------------------------

export const PortfolioActions: Story = {
  name: "Template — Portfolio Actions",
  render: () => (
    <Flex gap={12} align="center">
      <AxButton>Add Product</AxButton>
      <AxActionMenu
        trigger={
          <AxButton variant="secondary" icon={<DownloadOutlined />}>
            Export
          </AxButton>
        }
        items={[
          { key: "csv", label: "Export as CSV", icon: <FileExcelOutlined /> },
          { key: "pdf", label: "Export as PDF", icon: <FilePdfOutlined /> },
          { type: "divider" },
          { key: "template", label: "Download Template", icon: <DownloadOutlined /> },
        ]}
      />
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}

// ===========================================================================
// FEATURE DEMOS
// ===========================================================================

// ---------------------------------------------------------------------------
// Custom Trigger — using AxButton as trigger
// ---------------------------------------------------------------------------

export const CustomTrigger: Story = {
  name: "Feature — Custom Trigger",
  render: () => (
    <Flex gap={24} align="center">
      {/* Default "..." trigger */}
      <Flex vertical align="center" gap={8}>
        <AxActionMenu items={basicItems} />
        <AxText variant="body-xs" color="secondary">Default</AxText>
      </Flex>

      {/* Button trigger */}
      <Flex vertical align="center" gap={8}>
        <AxActionMenu
          trigger={<AxButton variant="secondary" size="sm">Actions</AxButton>}
          items={basicItems}
        />
        <AxText variant="body-xs" color="secondary">Button</AxText>
      </Flex>

      {/* Icon + text trigger */}
      <Flex vertical align="center" gap={8}>
        <AxActionMenu
          trigger={
            <AxButton variant="secondary" size="sm" icon={<MoreOutlined />}>
              More
            </AxButton>
          }
          items={basicItems}
        />
        <AxText variant="body-xs" color="secondary">Icon + Text</AxText>
      </Flex>
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// With Dividers & Danger — grouped items
// ---------------------------------------------------------------------------

export const DividersAndDanger: Story = {
  name: "Feature — Dividers & Danger",
  render: () => (
    <AxActionMenu
      items={[
        { key: "edit", label: "Edit Bid", icon: <EditOutlined /> },
        { key: "view", label: "View Quote", icon: <EyeOutlined /> },
        { key: "send", label: "Send to Buyer", icon: <SendOutlined /> },
        { type: "divider" },
        { key: "duplicate", label: "Duplicate", icon: <CopyOutlined />, disabled: true },
        { type: "divider" },
        { key: "withdraw", label: "Withdraw Bid", icon: <StopOutlined />, danger: true },
        { key: "delete", label: "Delete", icon: <DeleteOutlined />, danger: true },
      ]}
    />
  ),
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// Bid Actions — contextual tender actions
// ---------------------------------------------------------------------------

export const BidActions: Story = {
  name: "Pattern — Bid Actions",
  render: () => (
    <Flex
      gap={12}
      align="center"
      style={{
        padding: "12px 16px",
        background: "var(--neutral-0)",
        border: "1px solid var(--neutral-200)",
        borderRadius: "var(--radius-md)",
        width: 400,
      }}
    >
      <Flex vertical flex={1} gap={2}>
        <AxText variant="body-sm" weight="medium">
          Amoxicillin 500mg — Tender #TND-2024-0892
        </AxText>
        <AxText variant="body-xs" color="secondary">
          Deadline: Dec 31, 2024
        </AxText>
      </Flex>
      <AxButton size="sm">Submit Bid</AxButton>
      <AxActionMenu
        size="sm"
        items={[
          { key: "edit", label: "Edit Draft", icon: <EditOutlined /> },
          { key: "view", label: "View Tender", icon: <EyeOutlined /> },
          { type: "divider" },
          { key: "withdraw", label: "Withdraw", icon: <StopOutlined />, danger: true },
        ]}
      />
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}
