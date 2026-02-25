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
import { AxText } from "../../index"

const meta: Meta<typeof AxTag> = {
  title: "Data Display/AxTag",
  component: AxTag,
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "select",
      options: [undefined, "success", "info", "warning", "error", "neutral"],
      description:
        "Semantic tone. Sets the color palette and enables a dot by default.\n\n" +
        "- `success` → green (completed, delivered, awarded, in stock…)\n" +
        "- `info` → blue (processing, in review, in transit…)\n" +
        "- `warning` → orange (not awarded, low stock, needs refresh…)\n" +
        "- `error` → red (cancelled, rejected, withdrawn…)\n" +
        "- `neutral` → gray (pending, draft, expired…)",
    },
    dot: {
      control: "boolean",
      description: "Show a colored dot indicator (auto-enabled when tone is set)",
    },
    pill: {
      control: "boolean",
      description: "Pill-shaped tag with rounded corners",
    },
    color: {
      control: "text",
      description: "Override with any antd color token or hex value",
    },
    dotColor: {
      control: "color",
      description: "Override the dot color",
    },
    fill: {
      control: "color",
      description: "Solid background color — white text, no border",
    },
    small: {
      control: "boolean",
      description: "Small badge-style tag (11px font, compact padding)",
    },
    variant: {
      control: "select",
      options: ["outlined", "borderless", "filled"],
      description: "Antd tag variant",
    },
    closable: {
      control: "boolean",
      description: "Show close icon",
    },
  },
}

export default meta
type Story = StoryObj<typeof AxTag>

// -- Playground --

export const Playground: Story = {
  name: "Playground",
  args: {
    children: "Default Tag",
    tone: undefined,
    dot: false,
    pill: false,
    small: false,
    closable: false,
  },
}

// -- All Tones --

export const AllTones: Story = {
  name: "Feature — All Tones",
  render: () => (
    <Flex vertical gap={16}>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8, display: "block" }}>success</AxText>
        <Flex gap={8} wrap="wrap">
          <AxTag tone="success">Completed</AxTag>
          <AxTag tone="success">Delivered</AxTag>
          <AxTag tone="success">Awarded</AxTag>
          <AxTag tone="success">In Stock</AxTag>
          <AxTag tone="success">Approved</AxTag>
        </Flex>
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8, display: "block" }}>info</AxText>
        <Flex gap={8} wrap="wrap">
          <AxTag tone="info">Processing</AxTag>
          <AxTag tone="info">In Progress</AxTag>
          <AxTag tone="info">In Review</AxTag>
          <AxTag tone="info">In Transit</AxTag>
          <AxTag tone="info">Submitted</AxTag>
        </Flex>
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8, display: "block" }}>warning</AxText>
        <Flex gap={8} wrap="wrap">
          <AxTag tone="warning">Not Awarded</AxTag>
          <AxTag tone="warning">Low Stock</AxTag>
          <AxTag tone="warning">Needs Refresh</AxTag>
          <AxTag tone="warning">Expiring Soon</AxTag>
        </Flex>
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8, display: "block" }}>error</AxText>
        <Flex gap={8} wrap="wrap">
          <AxTag tone="error">Cancelled</AxTag>
          <AxTag tone="error">Rejected</AxTag>
          <AxTag tone="error">Withdrawn</AxTag>
          <AxTag tone="error">Out of Stock</AxTag>
        </Flex>
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8, display: "block" }}>neutral</AxText>
        <Flex gap={8} wrap="wrap">
          <AxTag tone="neutral">Pending</AxTag>
          <AxTag tone="neutral">Draft</AxTag>
          <AxTag tone="neutral">Expired</AxTag>
        </Flex>
      </div>
    </Flex>
  ),
}

// -- Pill & Icons --

export const PillAndIcons: Story = {
  name: "Feature — Pill & Icons",
  render: () => (
    <Flex vertical gap={16}>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8, display: "block" }}>pill shape</AxText>
        <Flex gap={8} wrap="wrap">
          <AxTag tone="success" pill>Delivered</AxTag>
          <AxTag tone="info" pill>In Transit</AxTag>
          <AxTag tone="warning" pill>Low Stock</AxTag>
          <AxTag tone="error" pill>Cancelled</AxTag>
          <AxTag tone="neutral" pill>Pending</AxTag>
        </Flex>
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8, display: "block" }}>with icon</AxText>
        <Flex gap={8} wrap="wrap">
          <AxTag tone="success" icon={<CheckCircleOutlined />}>Delivered</AxTag>
          <AxTag tone="info" icon={<CarOutlined />}>In Transit</AxTag>
          <AxTag tone="info" icon={<SyncOutlined spin />}>Processing</AxTag>
          <AxTag tone="neutral" icon={<ClockCircleOutlined />}>Pending</AxTag>
          <AxTag tone="error" icon={<CloseCircleOutlined />}>Cancelled</AxTag>
          <AxTag tone="warning" icon={<ExclamationCircleOutlined />}>Not Awarded</AxTag>
        </Flex>
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8, display: "block" }}>without dot</AxText>
        <Flex gap={8} wrap="wrap">
          <AxTag tone="success" dot={false}>Completed</AxTag>
          <AxTag tone="info" dot={false}>In Transit</AxTag>
          <AxTag tone="error" dot={false}>Cancelled</AxTag>
        </Flex>
      </div>
    </Flex>
  ),
}

// -- Variants --

export const Variants: Story = {
  name: "Feature — Variants",
  render: () => (
    <Flex vertical gap={16}>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8, display: "block" }}>outlined</AxText>
        <Flex gap={8} wrap="wrap">
          <AxTag tone="success" variant="outlined">In Stock</AxTag>
          <AxTag tone="warning" variant="outlined">Low Stock</AxTag>
          <AxTag tone="error" variant="outlined">Out of Stock</AxTag>
          <AxTag tone="neutral" variant="outlined">Expired</AxTag>
        </Flex>
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8, display: "block" }}>filled</AxText>
        <Flex gap={8} wrap="wrap">
          <AxTag tone="success" variant="filled" dot={false}>Completed</AxTag>
          <AxTag tone="info" variant="filled" dot={false}>In Transit</AxTag>
          <AxTag tone="error" variant="filled" dot={false}>Cancelled</AxTag>
          <AxTag tone="neutral" variant="filled" dot={false}>Pending</AxTag>
        </Flex>
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8, display: "block" }}>solid fill</AxText>
        <Flex gap={8} wrap="wrap">
          <AxTag fill="var(--green-600)">Completed</AxTag>
          <AxTag fill="var(--cyan-600)">In Progress</AxTag>
          <AxTag fill="var(--red-600)">Cancelled</AxTag>
          <AxTag fill="var(--orange-600)">Warning</AxTag>
          <AxTag fill="var(--primary-600)">Axmed Purple</AxTag>
        </Flex>
      </div>
    </Flex>
  ),
}

// -- Closeable --

export const Closeable: Story = {
  name: "Feature — Closeable",
  render: () => (
    <Flex gap={8} wrap="wrap">
      <AxTag closable onClose={() => {}}>Kenya</AxTag>
      <AxTag closable onClose={() => {}}>Nigeria</AxTag>
      <AxTag closable onClose={() => {}}>Ghana</AxTag>
      <AxTag closable onClose={() => {}}>Tanzania</AxTag>
    </Flex>
  ),
}

// -- Small Sizes --

export const SmallSizes: Story = {
  name: "Feature — Small Sizes",
  render: () => (
    <Flex vertical gap={16}>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8, display: "block" }}>badge</AxText>
        <Flex gap={8} wrap="wrap">
          <AxTag small color="orange">Be first to bid!</AxTag>
          <AxTag small tone="info">5 active</AxTag>
          <AxTag small tone="neutral">+3</AxTag>
          <AxTag small fill="var(--green-600)">New</AxTag>
        </Flex>
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8, display: "block" }}>pill</AxText>
        <Flex gap={8} wrap="wrap">
          <AxTag small pill tone="warning">Closing soon</AxTag>
          <AxTag small pill fill="var(--primary)">Featured</AxTag>
          <AxTag small pill tone="success">Verified</AxTag>
        </Flex>
      </div>
    </Flex>
  ),
}

// -- Category Tags --

export const CategoryTags: Story = {
  name: "Pattern — Category Tags",
  render: () => {
    const categoryColors: Record<string, string> = {
      Antibiotics: "var(--cyan-700)",
      Antidiabetics: "var(--primary-500)",
      Analgesics: "var(--orange-600)",
      Antimalarials: "var(--cyan-500)",
      Gastrointestinal: "var(--green-600)",
      Respiratory: "var(--magenta-500)",
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

// -- In Context --

export const InContext: Story = {
  name: "Example — In Context",
  render: () => (
    <Flex vertical gap={16}>
      <Flex gap={16} align="center" style={{ padding: "12px 16px", background: "var(--neutral-50)", borderRadius: 8 }}>
        <div style={{ flex: 1 }}>
          <AxText variant="body-sm" weight="semibold">ORD-2026-003</AxText>
          <AxText variant="body-xs" color="secondary">Insulin Glargine 100IU/ml · Novo Nordisk</AxText>
        </div>
        <AxTag tone="info" pill>In Transit</AxTag>
        <AxText variant="body-sm" weight="semibold" style={{ width: 100, textAlign: "right" }}>$14,820.00</AxText>
      </Flex>

      <Flex gap={16} align="center" style={{ padding: "12px 16px", background: "var(--neutral-50)", borderRadius: 8 }}>
        <div style={{ flex: 1 }}>
          <AxText variant="body-sm" weight="semibold">ORD-2026-001</AxText>
          <AxText variant="body-xs" color="secondary">Amoxicillin 500mg · Cipla Ltd</AxText>
        </div>
        <AxTag tone="success" pill icon={<CheckCircleOutlined />}>Delivered</AxTag>
        <AxText variant="body-sm" weight="semibold" style={{ width: 100, textAlign: "right" }}>$5,400.00</AxText>
      </Flex>

      <Flex gap={16} align="center" style={{ padding: "12px 16px", background: "var(--neutral-50)", borderRadius: 8 }}>
        <div style={{ flex: 1 }}>
          <AxText variant="body-sm" weight="semibold">ORD-2026-005</AxText>
          <AxText variant="body-xs" color="secondary">Paracetamol 500mg · Emzor Pharma</AxText>
        </div>
        <AxTag tone="error" pill>Cancelled</AxTag>
        <AxText variant="body-sm" weight="semibold" style={{ width: 100, textAlign: "right" }}>$2,000.00</AxText>
      </Flex>

      <Flex gap={16} align="center" style={{ padding: "12px 16px", background: "var(--neutral-50)", borderRadius: 8 }}>
        <div style={{ flex: 1 }}>
          <AxText variant="body-sm" weight="semibold">ORD-2026-004</AxText>
          <AxText variant="body-xs" color="secondary">Artemether/Lumefantrine 20/120mg · Sanofi</AxText>
        </div>
        <AxTag tone="neutral" pill>Pending</AxTag>
        <AxText variant="body-sm" weight="semibold" style={{ width: 100, textAlign: "right" }}>$11,470.00</AxText>
      </Flex>
    </Flex>
  ),
}
