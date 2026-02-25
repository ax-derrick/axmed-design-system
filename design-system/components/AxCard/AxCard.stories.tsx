import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Flex, Divider } from "antd"
import {
  ShoppingCartOutlined,
  FileTextOutlined,
  TruckOutlined,
  TeamOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
  MedicineBoxOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  InboxOutlined,
} from "@ant-design/icons"

import AxCard from "."
import AxButton from "../AxButton"
import AxText from "../AxText"
import AxTag from "../AxTag"
import AxTable from "../AxTable"
import AxEmptyState from "../AxEmptyState"

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof AxCard> = {
  title: "Layout/AxCard",
  component: AxCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    title: {
      control: "text",
      description: "Card header title",
    },
    description: {
      control: "text",
      description: "Muted subtitle below the title",
    },
    hoverable: {
      control: "boolean",
      description: "Elevates shadow on hover (for clickable/navigation cards)",
    },
    noPadding: {
      control: "boolean",
      description: "Remove body padding — use when the card wraps a Table or List",
    },
    size: {
      control: "select",
      options: ["default", "small"],
      description: "Card size — 'small' reduces header and body padding",
    },
  },
}

export default meta
type Story = StoryObj<typeof AxCard>

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  name: "Playground",
  args: {
    title: "Card Title",
    description: "A short description below the title.",
    hoverable: false,
    noPadding: false,
    size: "default",
  },
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <AxCard
        {...args}
        extra={<AxButton variant="link">Action</AxButton>}
        footer={
          <Flex justify="flex-end" gap={8}>
            <AxButton variant="secondary">Cancel</AxButton>
            <AxButton>Save</AxButton>
          </Flex>
        }
      >
        <AxText variant="body-md" color="secondary">
          Toggle the controls on the right to see changes. Try switching
          hoverable, noPadding, size, title, and description.
        </AxText>
      </AxCard>
    </div>
  ),
}

// ===========================================================================
// PATTERN 1 — Stat / Metric Cards
// ===========================================================================

export const StatCards: Story = {
  name: "Pattern — Stat / Metric",
  render: () => {
    const stats = [
      {
        label: "Total Orders",
        value: "142",
        trend: "+12%",
        up: true,
        icon: <ShoppingCartOutlined />,
        iconBg: "var(--cyan-50)",
        iconColor: "var(--cyan-600)",
      },
      {
        label: "Active RFQs",
        value: "38",
        trend: "+5%",
        up: true,
        icon: <FileTextOutlined />,
        iconBg: "var(--primary-50)",
        iconColor: "var(--primary)",
      },
      {
        label: "Shipments",
        value: "24",
        trend: "-3%",
        up: false,
        icon: <TruckOutlined />,
        iconBg: "var(--green-50)",
        iconColor: "var(--green-600)",
      },
      {
        label: "Suppliers",
        value: "91",
        trend: "+8%",
        up: true,
        icon: <TeamOutlined />,
        iconBg: "var(--orange-50)",
        iconColor: "var(--orange-600)",
      },
    ]

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}
      >
        {stats.map((stat) => (
          <AxCard key={stat.label}>
            <Flex align="center" gap={12} style={{ marginBottom: 16 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: stat.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  color: stat.iconColor,
                }}
              >
                {stat.icon}
              </div>
              <AxText variant="body-sm" color="secondary">
                {stat.label}
              </AxText>
            </Flex>

            <AxText variant="heading-xl">{stat.value}</AxText>

            <Flex align="center" gap={4} style={{ marginTop: 4 }}>
              {stat.up ? (
                <ArrowUpOutlined style={{ color: "var(--green-600)", fontSize: 12 }} />
              ) : (
                <ArrowDownOutlined style={{ color: "var(--red-600)", fontSize: 12 }} />
              )}
              <AxText
                variant="body-xs"
                color={stat.up ? "primary" : "secondary"}
                style={{ color: stat.up ? "var(--green-600)" : "var(--red-600)" }}
              >
                {stat.trend} from last month
              </AxText>
            </Flex>
          </AxCard>
        ))}
      </div>
    )
  },
}

// ===========================================================================
// PATTERN 2 — Navigation / Selection Cards
// ===========================================================================

export const NavigationCards: Story = {
  name: "Pattern — Navigation Cards",
  render: () => {
    const sections = [
      {
        icon: <ShoppingCartOutlined style={{ fontSize: 28, color: "var(--cyan-600)" }} />,
        title: "Orders",
        description: "Track and manage all purchase orders",
        bg: "var(--cyan-50)",
      },
      {
        icon: <FileTextOutlined style={{ fontSize: 28, color: "var(--primary)" }} />,
        title: "RFQs",
        description: "Create and respond to requests for quotation",
        bg: "var(--primary-50)",
      },
      {
        icon: <TruckOutlined style={{ fontSize: 28, color: "var(--green-600)" }} />,
        title: "Shipments",
        description: "Monitor deliveries and logistics",
        bg: "var(--green-50)",
      },
      {
        icon: <MedicineBoxOutlined style={{ fontSize: 28, color: "var(--orange-600)" }} />,
        title: "Portfolio",
        description: "Manage your medicine catalog",
        bg: "var(--orange-50)",
      },
    ]

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          maxWidth: 800,
        }}
      >
        {sections.map((s) => (
          <AxCard key={s.title} hoverable style={{ cursor: "pointer", textAlign: "center" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                background: s.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
              }}
            >
              {s.icon}
            </div>
            <AxText variant="body-md" weight="semibold" as="div">
              {s.title}
            </AxText>
            <AxText variant="body-xs" color="secondary" style={{ marginTop: 4 }}>
              {s.description}
            </AxText>
          </AxCard>
        ))}
      </div>
    )
  },
}

// ===========================================================================
// PATTERN 2b — Selection Cards (Radio-style)
// ===========================================================================

export const SelectionCards: Story = {
  name: "Pattern — Selectable Cards",
  render: () => {
    const [selected, setSelected] = useState<"buyer" | "supplier">("buyer")

    return (
      <Flex gap={16} style={{ maxWidth: 560 }}>
        {(["buyer", "supplier"] as const).map((role) => {
          const isSelected = selected === role
          return (
            <AxCard
              key={role}
              hoverable
              onClick={() => setSelected(role)}
              style={{
                flex: 1,
                cursor: "pointer",
                borderColor: isSelected ? "var(--primary)" : undefined,
                boxShadow: isSelected
                  ? "0 0 0 2px var(--primary-focus)"
                  : undefined,
              }}
            >
              <Flex align="center" gap={12}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: isSelected ? "var(--primary-50)" : "var(--neutral-100)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    color: isSelected ? "var(--primary)" : "var(--neutral-600)",
                    transition: "all 0.15s ease",
                  }}
                >
                  {role === "buyer" ? <ShoppingCartOutlined /> : <TruckOutlined />}
                </div>
                <div>
                  <AxText variant="body-md" weight="semibold" as="div">
                    {role === "buyer" ? "Buyer" : "Supplier"}
                  </AxText>
                  <AxText variant="body-xs" color="secondary">
                    {role === "buyer"
                      ? "I procure medicines for my facility"
                      : "I supply medicines to buyers"}
                  </AxText>
                </div>
              </Flex>
              {isSelected && (
                <CheckCircleOutlined
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    color: "var(--primary)",
                    fontSize: 16,
                  }}
                />
              )}
            </AxCard>
          )
        })}
      </Flex>
    )
  },
}

// ===========================================================================
// PATTERN 3 — Detail / Entity Card
// ===========================================================================

export const DetailCard: Story = {
  name: "Pattern — Detail / Entity",
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <AxCard
        title="PharmaCorp Ltd"
        description="Amoxicillin 500mg · Cipla Ltd"
        extra={<AxTag status="awarded">Awarded</AxTag>}
        footer={
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={6}>
              <ClockCircleOutlined style={{ color: "var(--text-secondary)", fontSize: 12 }} />
              <AxText variant="body-xs" color="secondary">Expires in 14 days</AxText>
            </Flex>
            <Flex gap={8}>
              <AxButton variant="secondary">View Profile</AxButton>
              <AxButton>Accept Quote</AxButton>
            </Flex>
          </Flex>
        }
      >
        <Flex vertical gap={12}>
          {[
            { label: "Unit Price", value: "$2.40 / unit" },
            { label: "Lead Time", value: "14 days" },
            { label: "Shelf Life", value: "18 months" },
            { label: "Pack Size", value: "1000 tabs / bottle" },
            { label: "MOQ", value: "500 units" },
          ].map(({ label, value }) => (
            <Flex key={label} justify="space-between">
              <AxText variant="body-sm" color="secondary">{label}</AxText>
              <AxText variant="body-sm" weight="medium">{value}</AxText>
            </Flex>
          ))}
        </Flex>
      </AxCard>
    </div>
  ),
}

// ===========================================================================
// PATTERN 3b — Entity Card Grid (user / document cards)
// ===========================================================================

export const EntityCardGrid: Story = {
  name: "Pattern — Entity Grid",
  render: () => {
    const users = [
      { name: "Amina Hassan", role: "Procurement Manager", email: "amina@axmed.co", status: "active" },
      { name: "David Okonkwo", role: "Finance Officer", email: "david@axmed.co", status: "pending" },
      { name: "Fatima Al-Zahra", role: "Logistics Lead", email: "fatima@axmed.co", status: "active" },
    ]

    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {users.map((user) => (
          <AxCard
            key={user.email}
            footer={
              <Flex justify="space-between" align="center">
                <AxTag status={user.status === "active" ? "confirmed" : "pending"}>
                  {user.status === "active" ? "Active" : "Pending"}
                </AxTag>
                <AxButton variant="ghost" size="small">Manage</AxButton>
              </Flex>
            }
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "var(--primary-300)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
                fontSize: "var(--font-size-16)",
                fontWeight: "var(--font-weight-semibold)",
                color: "var(--primary)",
                fontFamily: "var(--font-family-sans)",
              }}
            >
              {user.name.charAt(0)}
            </div>
            <AxText variant="body-md" weight="semibold" as="div">{user.name}</AxText>
            <AxText variant="body-xs" color="secondary">{user.role}</AxText>
            <AxText variant="body-xs" color="secondary" style={{ marginTop: 4 }}>
              {user.email}
            </AxText>
          </AxCard>
        ))}
      </div>
    )
  },
}

// ===========================================================================
// PATTERN 4 — Content Panel (table / list wrapper)
// ===========================================================================

const recentOrders = [
  { key: "1", id: "ORD-2026-003", item: "Insulin Glargine 100IU/ml", supplier: "Novo Nordisk", amount: "$14,820", status: "in_transit" },
  { key: "2", id: "ORD-2026-002", item: "Metformin 850mg", supplier: "Novartis", amount: "$4,250", status: "delivered" },
  { key: "3", id: "ORD-2026-001", item: "Amoxicillin 500mg", supplier: "Cipla Ltd", amount: "$5,400", status: "processing" },
  { key: "4", id: "ORD-2026-000", item: "Artemether 20mg", supplier: "Sanofi", amount: "$9,300", status: "cancelled" },
]

const orderColumns = [
  {
    title: "Order ID",
    dataIndex: "id",
    key: "id",
    render: (id: string) => <AxText variant="body-sm" weight="medium">{id}</AxText>,
  },
  {
    title: "Item",
    dataIndex: "item",
    key: "item",
    render: (item: string, record: typeof recentOrders[0]) => (
      <div>
        <AxText variant="body-sm">{item}</AxText>
        <AxText variant="body-xs" color="secondary">{record.supplier}</AxText>
      </div>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    align: "right" as const,
    render: (amount: string) => <AxText variant="body-sm" weight="medium">{amount}</AxText>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <AxTag status={status}>
        {status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
      </AxTag>
    ),
  },
]

export const ContentPanel: Story = {
  name: "Pattern — Content Panel",
  render: () => (
    <AxCard
      title="Recent Orders"
      extra={<AxButton variant="link">See all</AxButton>}
      noPadding
    >
      <AxTable
        dataSource={recentOrders}
        columns={orderColumns}
        pagination={false}
        size="small"
      />
    </AxCard>
  ),
}

// ===========================================================================
// PATTERN 4b — Dashboard with multiple panels
// ===========================================================================

export const DashboardLayout: Story = {
  name: "Pattern — Dashboard Layout",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 24, background: "var(--neutral-50)", minHeight: "100vh" }}>
      {/* Stat row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {[
          { label: "Total Orders", value: "142", icon: <ShoppingCartOutlined />, color: "var(--cyan-600)", bg: "var(--cyan-50)" },
          { label: "Active RFQs", value: "38", icon: <FileTextOutlined />, color: "var(--primary)", bg: "var(--primary-50)" },
          { label: "Total Spend", value: "$284K", icon: <DollarOutlined />, color: "var(--green-600)", bg: "var(--green-50)" },
          { label: "Shipments", value: "24", icon: <TruckOutlined />, color: "var(--orange-600)", bg: "var(--orange-50)" },
        ].map((s) => (
          <AxCard key={s.label}>
            <Flex align="center" gap={12} style={{ marginBottom: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: s.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: s.color,
                  fontSize: 16,
                }}
              >
                {s.icon}
              </div>
              <AxText variant="body-xs" color="secondary">{s.label}</AxText>
            </Flex>
            <AxText variant="heading-lg">{s.value}</AxText>
          </AxCard>
        ))}
      </div>

      {/* Orders table panel */}
      <AxCard
        title="Recent Orders"
        description="Last 30 days"
        extra={<AxButton variant="link">View all orders</AxButton>}
        noPadding
      >
        <AxTable
          dataSource={recentOrders}
          columns={orderColumns}
          pagination={false}
          size="small"
        />
      </AxCard>
    </div>
  ),
}

// ===========================================================================
// Sizes
// ===========================================================================

export const Sizes: Story = {
  name: "Feature — Sizes",
  render: () => (
    <Flex gap={24} align="flex-start">
      <div style={{ flex: 1 }}>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8 }}>default</AxText>
        <AxCard
          title="Order Summary"
          description="Review before submitting"
          extra={<AxButton variant="link">Edit</AxButton>}
          footer={
            <Flex justify="flex-end" gap={8}>
              <AxButton variant="secondary">Cancel</AxButton>
              <AxButton>Submit</AxButton>
            </Flex>
          }
        >
          <AxText variant="body-sm" color="secondary">Card body content.</AxText>
        </AxCard>
      </div>

      <div style={{ flex: 1 }}>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8 }}>small</AxText>
        <AxCard
          size="small"
          title="Order Summary"
          description="Review before submitting"
          extra={<AxButton variant="link">Edit</AxButton>}
          footer={
            <Flex justify="flex-end" gap={8}>
              <AxButton variant="secondary" size="small">Cancel</AxButton>
              <AxButton size="small">Submit</AxButton>
            </Flex>
          }
        >
          <AxText variant="body-sm" color="secondary">Card body content.</AxText>
        </AxCard>
      </div>
    </Flex>
  ),
}

// ---------------------------------------------------------------------------
// Empty state inside a card panel
// ---------------------------------------------------------------------------

export const EmptyPanel: Story = {
  name: "Pattern — Empty Card Panel",
  render: () => (
    <div style={{ width: 480 }}>
      <AxCard
        title="Recent Orders"
        extra={<AxButton size="small">New Order</AxButton>}
      >
        <AxEmptyState
          size="md"
          illustration={
            <span style={{ fontSize: 48, color: "var(--neutral-300)" }}>
              <InboxOutlined />
            </span>
          }
          title="No orders yet"
          description="Orders you create will appear here once submitted."
          action={<AxButton>Create Order</AxButton>}
        />
      </AxCard>
    </div>
  ),
}
