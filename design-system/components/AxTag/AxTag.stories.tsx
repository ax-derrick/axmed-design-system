import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Flex } from "antd"
import {
  CheckCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined,
  CarOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"

import AxTag from "./index"

const meta: Meta<typeof AxTag> = {
  title: "Design System/AxTag",
  component: AxTag,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: [
        undefined,
        "submitted",
        "processing",
        "in_progress",
        "completed",
        "delivered",
        "cancelled",
        "pending",
        "awarded",
        "confirmed",
        "in_review",
        "not_awarded",
        "withdrawn",
        "rejected",
        "in_transit",
        "shipped",
        "in_stock",
        "low_stock",
        "out_of_stock",
        "expired",
        "approved",
        "needs_refresh",
        "ready",
        "po_submitted",
        "draft",
      ],
      description: "Semantic status key with preset color and dot",
    },
    dot: {
      control: "boolean",
      description: "Show a colored dot indicator",
    },
    pill: {
      control: "boolean",
      description: "Pill-shaped tag with rounded corners",
    },
    color: {
      control: "text",
      description: "Override the tag color (antd color prop)",
    },
    dotColor: {
      control: "color",
      description: "Override the dot color",
    },
    fill: {
      control: "color",
      description: "Solid background color (white text, no border)",
    },
    small: {
      control: "boolean",
      description: "Small badge-style tag (11px font, compact padding)",
    },
  },
}

export default meta
type Story = StoryObj<typeof AxTag>

// -- Basic --

export const Default: Story = {
  args: {
    children: "Default Tag",
  },
}

// -- All Status Presets --

export const OrderStatuses: Story = {
  render: () => (
    <Flex gap={8} wrap="wrap">
      <AxTag status="submitted">Submitted</AxTag>
      <AxTag status="processing">Processing</AxTag>
      <AxTag status="in_progress">In Progress</AxTag>
      <AxTag status="completed">Completed</AxTag>
      <AxTag status="delivered">Delivered</AxTag>
      <AxTag status="cancelled">Cancelled</AxTag>
      <AxTag status="pending">Pending</AxTag>
    </Flex>
  ),
}

export const QuoteStatuses: Story = {
  render: () => (
    <Flex gap={8} wrap="wrap">
      <AxTag status="awarded">Awarded</AxTag>
      <AxTag status="confirmed">Confirmed</AxTag>
      <AxTag status="in_review">In Buyer Review</AxTag>
      <AxTag status="not_awarded">Not Awarded</AxTag>
      <AxTag status="withdrawn">Withdrawn</AxTag>
      <AxTag status="rejected">Rejected</AxTag>
    </Flex>
  ),
}

export const ShipmentStatuses: Story = {
  render: () => (
    <Flex gap={8} wrap="wrap">
      <AxTag status="submitted">Submitted</AxTag>
      <AxTag status="in_transit">In Transit</AxTag>
      <AxTag status="shipped">Shipped</AxTag>
      <AxTag status="delivered">Delivered</AxTag>
    </Flex>
  ),
}

export const StockStatuses: Story = {
  render: () => (
    <Flex gap={8} wrap="wrap">
      <AxTag status="in_stock">In Stock</AxTag>
      <AxTag status="low_stock">Low Stock</AxTag>
      <AxTag status="out_of_stock">Out of Stock</AxTag>
      <AxTag status="expired">Expired</AxTag>
    </Flex>
  ),
}

export const MiscStatuses: Story = {
  render: () => (
    <Flex gap={8} wrap="wrap">
      <AxTag status="approved">Approved</AxTag>
      <AxTag status="rejected">Rejected</AxTag>
      <AxTag status="pending">Pending</AxTag>
      <AxTag status="draft">Draft</AxTag>
      <AxTag status="needs_refresh">Needs Refresh</AxTag>
      <AxTag status="ready">Ready</AxTag>
      <AxTag status="po_submitted">PO Submitted</AxTag>
    </Flex>
  ),
}

// -- Pill Shape --

export const PillShape: Story = {
  render: () => (
    <Flex gap={8} wrap="wrap">
      <AxTag status="delivered" pill>Delivered</AxTag>
      <AxTag status="in_transit" pill>In Transit</AxTag>
      <AxTag status="cancelled" pill>Cancelled</AxTag>
      <AxTag status="pending" pill>Pending</AxTag>
    </Flex>
  ),
}

// -- With Icons --

export const WithIcons: Story = {
  render: () => (
    <Flex gap={8} wrap="wrap">
      <AxTag status="completed" icon={<CheckCircleOutlined />} color="success">
        Delivered
      </AxTag>
      <AxTag status="in_transit" icon={<CarOutlined />} color="blue">
        In Transit
      </AxTag>
      <AxTag status="processing" icon={<SyncOutlined spin />} color="processing">
        Processing
      </AxTag>
      <AxTag status="pending" icon={<ClockCircleOutlined />} color="default">
        Pending
      </AxTag>
      <AxTag status="cancelled" icon={<CloseCircleOutlined />} color="error">
        Cancelled
      </AxTag>
      <AxTag status="not_awarded" icon={<ExclamationCircleOutlined />} color="warning">
        Not Awarded
      </AxTag>
    </Flex>
  ),
}

// -- Without Dots --

export const WithoutDots: Story = {
  render: () => (
    <Flex gap={8} wrap="wrap">
      <AxTag status="completed" dot={false}>Completed</AxTag>
      <AxTag status="in_transit" dot={false}>In Transit</AxTag>
      <AxTag status="cancelled" dot={false}>Cancelled</AxTag>
    </Flex>
  ),
}

// -- Custom Colors --

export const CustomColors: Story = {
  render: () => (
    <Flex gap={8} wrap="wrap">
      <AxTag color="#392AB0" dotColor="#392AB0" dot>
        Axmed Purple
      </AxTag>
      <AxTag color="#008EF0" dotColor="#008EF0" dot>
        Axmed Blue
      </AxTag>
      <AxTag color="#E73BC1" dotColor="#E73BC1" dot>
        Magenta
      </AxTag>
      <AxTag color="lime" dotColor="#52C41A" dot>
        Custom Lime
      </AxTag>
    </Flex>
  ),
}

// -- Outlined Variant --

export const OutlinedVariant: Story = {
  render: () => (
    <Flex gap={8} wrap="wrap">
      <AxTag status="in_stock" variant="outlined">In Stock</AxTag>
      <AxTag status="low_stock" variant="outlined">Low Stock</AxTag>
      <AxTag status="out_of_stock" variant="outlined">Out of Stock</AxTag>
      <AxTag status="expired" variant="outlined">Expired</AxTag>
    </Flex>
  ),
}

// -- Filled Variant --

export const FilledVariant: Story = {
  render: () => (
    <Flex gap={8} wrap="wrap">
      <AxTag status="completed" variant="filled" dot={false}>Completed</AxTag>
      <AxTag status="in_transit" variant="filled" dot={false}>In Transit</AxTag>
      <AxTag status="cancelled" variant="filled" dot={false}>Cancelled</AxTag>
      <AxTag status="pending" variant="filled" dot={false}>Pending</AxTag>
    </Flex>
  ),
}

// -- Pill + Icons Combined --

export const PillWithIcons: Story = {
  render: () => (
    <Flex gap={8} wrap="wrap">
      <AxTag pill icon={<CheckCircleOutlined />} color="success">
        Approved
      </AxTag>
      <AxTag pill icon={<SyncOutlined spin />} color="processing">
        Syncing
      </AxTag>
      <AxTag pill icon={<ClockCircleOutlined />} color="warning">
        Expiring Soon
      </AxTag>
    </Flex>
  ),
}

// -- Closeable --

export const Closeable: Story = {
  render: () => (
    <Flex gap={8} wrap="wrap">
      <AxTag closable onClose={() => {}}>Kenya</AxTag>
      <AxTag closable onClose={() => {}}>Nigeria</AxTag>
      <AxTag closable onClose={() => {}}>Ghana</AxTag>
      <AxTag closable onClose={() => {}}>Tanzania</AxTag>
    </Flex>
  ),
}

// -- Solid Fill --

export const SolidFill: Story = {
  name: "Solid Fill (Custom Background)",
  render: () => (
    <Flex gap={8} wrap="wrap">
      <AxTag fill="#52C41A">Completed</AxTag>
      <AxTag fill="#1890FF">In Progress</AxTag>
      <AxTag fill="#F5222D">Cancelled</AxTag>
      <AxTag fill="#FA8C16">Warning</AxTag>
      <AxTag fill="#392AB0">Axmed Purple</AxTag>
      <AxTag fill="#EB2F96">PO Submitted</AxTag>
    </Flex>
  ),
}

// -- Solid Fill: Category Tags --

export const CategoryTags: Story = {
  name: "Solid Fill — Categories",
  render: () => {
    const categoryColors: Record<string, string> = {
      Antibiotics: "#2F54EB",
      Antidiabetics: "#722ED1",
      Analgesics: "#FA8C16",
      Antimalarials: "#13C2C2",
      Gastrointestinal: "#52C41A",
      Respiratory: "#EB2F96",
    }

    return (
      <Flex gap={8} wrap="wrap">
        {Object.entries(categoryColors).map(([name, color]) => (
          <AxTag key={name} fill={color}>{name}</AxTag>
        ))}
      </Flex>
    )
  },
}

// -- Solid Fill: Order Status Tags --

export const OrderStatusFilled: Story = {
  name: "Solid Fill — Order Statuses",
  render: () => {
    const statusColors: Record<string, string> = {
      Submitted: "#1890FF",
      "In Progress": "#FA8C16",
      Completed: "#52C41A",
      Cancelled: "#F5222D",
    }

    return (
      <Flex gap={8} wrap="wrap">
        {Object.entries(statusColors).map(([label, color]) => (
          <AxTag key={label} fill={color}>{label}</AxTag>
        ))}
      </Flex>
    )
  },
}

// -- Small Badge Tags --

export const SmallBadges: Story = {
  name: "Small Badges",
  render: () => (
    <Flex gap={8} wrap="wrap">
      <AxTag small color="orange">Be first to bid!</AxTag>
      <AxTag small color="purple">5 active</AxTag>
      <AxTag small color="processing">Current</AxTag>
      <AxTag small>+3</AxTag>
      <AxTag small fill="#52C41A">New</AxTag>
    </Flex>
  ),
}

// -- Small + Pill Combo --

export const SmallPill: Story = {
  name: "Small Pill Badges",
  render: () => (
    <Flex gap={8} wrap="wrap">
      <AxTag small pill color="orange">Closing soon</AxTag>
      <AxTag small pill fill="#392AB0">Featured</AxTag>
      <AxTag small pill color="success">Verified</AxTag>
    </Flex>
  ),
}

// -- Real-world Usage: Order Table Row --

export const InContext: Story = {
  name: "In Context — Order Row",
  render: () => (
    <Flex vertical gap={16}>
      <Flex gap={16} align="center" style={{ padding: "12px 16px", background: "#FAFAFA", borderRadius: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 550 }}>ORD-2026-003</div>
          <div style={{ fontSize: 12, color: "#475467" }}>Insulin Glargine 100IU/ml · Novo Nordisk</div>
        </div>
        <AxTag status="in_transit" pill>In Transit</AxTag>
        <div style={{ fontWeight: 550, width: 100, textAlign: "right" }}>$14,820.00</div>
      </Flex>

      <Flex gap={16} align="center" style={{ padding: "12px 16px", background: "#FAFAFA", borderRadius: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 550 }}>ORD-2026-001</div>
          <div style={{ fontSize: 12, color: "#475467" }}>Amoxicillin 500mg · Cipla Ltd</div>
        </div>
        <AxTag status="delivered" pill icon={<CheckCircleOutlined />}>Delivered</AxTag>
        <div style={{ fontWeight: 550, width: 100, textAlign: "right" }}>$5,400.00</div>
      </Flex>

      <Flex gap={16} align="center" style={{ padding: "12px 16px", background: "#FAFAFA", borderRadius: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 550 }}>ORD-2026-005</div>
          <div style={{ fontSize: 12, color: "#475467" }}>Paracetamol 500mg · Emzor Pharma</div>
        </div>
        <AxTag status="cancelled" pill>Cancelled</AxTag>
        <div style={{ fontWeight: 550, width: 100, textAlign: "right" }}>$2,000.00</div>
      </Flex>
    </Flex>
  ),
}
