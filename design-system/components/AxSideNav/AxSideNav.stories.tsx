import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Avatar, Flex } from "antd"
import {
  AppstoreOutlined,
  FileTextOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  DashboardOutlined,
  BellOutlined,
  UserOutlined,
  InboxOutlined,
  BarChartOutlined,
} from "@ant-design/icons"

import AxSideNav, { type NavGroup, type NavSection, type NavItem, type NavDivider } from "."
import AxBrand from "../AxBrand"
import AxButton from "../AxButton"
import AxText from "../AxText"
import AxTag from "../AxTag"
import AxFilterBar from "../AxFilterBar"
import AxTable from "../AxTable"

// ---------------------------------------------------------------------------
// Shared demo data
// ---------------------------------------------------------------------------

type AnyItem = NavItem | NavDivider | NavGroup | NavSection

const DEMO_ITEMS: AnyItem[] = [
  { type: "section", key: "sec-platform", label: "Platform" },
  { key: "dashboard", label: "Dashboard", icon: <DashboardOutlined /> },
  {
    type: "group",
    key: "orders",
    label: "Orders",
    icon: <ShoppingCartOutlined />,
    defaultOpen: true,
    children: [
      { key: "orders-all", label: "All Orders" },
      { key: "orders-pending", label: "Pending" },
      { key: "orders-completed", label: "Completed" },
    ],
  },
  { key: "suppliers", label: "Suppliers", icon: <TeamOutlined /> },
  { key: "catalogue", label: "Catalogue", icon: <AppstoreOutlined /> },
  { type: "divider", key: "div-1" },
  { type: "section", key: "sec-system", label: "Analytics" },
  { key: "reports", label: "Reports", icon: <BarChartOutlined /> },
  {
    type: "group",
    key: "inbox",
    label: "Inbox",
    icon: <InboxOutlined />,
    children: [
      { key: "inbox-messages", label: "Messages" },
      { key: "inbox-notifications", label: "Notifications" },
    ],
  },
  { type: "divider", key: "div-2" },
  { key: "documents", label: "Documents", icon: <FileTextOutlined /> },
  { key: "settings", label: "Settings", icon: <SettingOutlined /> },
]

/** Map items recursively to attach click handlers */
function withHandlers(items: AnyItem[], onSelect: (key: string) => void): AnyItem[] {
  return items.map((item) => {
    if (item.type === "divider" || item.type === "section") return item
    if (item.type === "group") {
      return {
        ...item,
        children: item.children.map((child) => ({
          ...child,
          onClick: () => onSelect(child.key),
        })),
      }
    }
    return { ...item, onClick: () => onSelect(item.key) }
  })
}

const DemoUser = () => (
  <Flex
    align="center"
    gap={10}
    style={{ padding: "4px", borderRadius: 8, cursor: "pointer", overflow: "hidden" }}
  >
    <Avatar size={32} icon={<UserOutlined />} style={{ background: "var(--primary)", flexShrink: 0 }} />
    <Flex vertical style={{ overflow: "hidden", minWidth: 0 }}>
      <AxText variant="body-sm" weight="medium" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        Ahmed Al-Rashid
      </AxText>
      <AxText variant="body-xs" color="secondary" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        ahmed@axmed.com
      </AxText>
    </Flex>
  </Flex>
)

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof AxSideNav> = {
  title: "Layout/AxSideNav",
  component: AxSideNav,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    collapsed: { control: "boolean" },
    selectedKey: {
      control: "select",
      options: [
        "dashboard", "orders-all", "orders-pending", "orders-completed",
        "suppliers", "catalogue", "reports",
        "inbox-messages", "inbox-notifications",
        "documents", "settings",
      ],
    },
    width: { control: "number" },
    collapsedWidth: { control: "number" },
  },
}

export default meta
type Story = StoryObj<typeof AxSideNav>

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    selectedKey: "orders-all",
    collapsed: false,
    width: 240,
    collapsedWidth: 64,
  },
  render: (args) => {
    const [collapsed, setCollapsed] = useState(args.collapsed ?? false)
    const [selected, setSelected] = useState(args.selectedKey ?? "orders-all")

    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <AxSideNav
          {...args}
          collapsed={collapsed}
          selectedKey={selected}
          onCollapse={setCollapsed}
          logo={<AxBrand variant="wordmark" size="md" />}
          user={<DemoUser />}
          items={withHandlers(DEMO_ITEMS, setSelected)}
        />
        <div style={{ flex: 1, padding: 24, background: "var(--neutral-50)" }}>
          <AxText variant="body-sm" color="secondary">
            Active: <strong style={{ color: "var(--text-primary)" }}>{selected}</strong>
          </AxText>
        </div>
      </div>
    )
  },
}

// ===========================================================================
// TEMPLATES
// ===========================================================================

export const AppShell: Story = {
  name: "Template — App Shell",
  render: () => {
    const [collapsed, setCollapsed] = useState(false)
    const [selected, setSelected] = useState("orders-all")
    const [search, setSearch] = useState("")

    const tableData = [
      { key: "1", order: "ORD-2401", medication: "Amoxicillin 500mg", supplier: "PharmaCorp Ltd", status: "awarded" as const },
      { key: "2", order: "ORD-2402", medication: "Metformin 850mg", supplier: "MediGlobal SA", status: "info" as const },
      { key: "3", order: "ORD-2403", medication: "Ibuprofen 400mg", supplier: "AfriPharma Co", status: "warning" as const },
      { key: "4", order: "ORD-2404", medication: "Paracetamol 500mg", supplier: "PharmaCorp Ltd", status: "neutral" as const },
    ]

    return (
      <div style={{ display: "flex", height: "100vh", minHeight: 600 }}>
        <AxSideNav
          items={withHandlers(DEMO_ITEMS, setSelected)}
          selectedKey={selected}
          collapsed={collapsed}
          onCollapse={setCollapsed}
          logo={<AxBrand variant="wordmark" size="md" />}
          user={<DemoUser />}
        />
        <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "24px 32px 0", borderBottom: "1px solid var(--neutral-200)", background: "#fff" }}>
            <Flex justify="space-between" align="center" style={{ paddingBottom: 20 }}>
              <div>
                <AxText variant="heading-md" weight="semibold">Orders</AxText>
                <AxText variant="body-sm" color="secondary" style={{ display: "block", marginTop: 2 }}>
                  Manage and track all procurement orders
                </AxText>
              </div>
              <Flex gap={8} align="center">
                <AxButton variant="secondary" icon={<BellOutlined />} />
                <AxButton>New Order</AxButton>
              </Flex>
            </Flex>
          </div>
          <div style={{ flex: 1, padding: "24px 32px" }}>
            <AxFilterBar
              search={{ placeholder: "Search orders...", value: search, onChange: (e) => setSearch(e.target.value) }}
              filters={[{ key: "status", placeholder: "Status", options: [{ value: "awarded", label: "Awarded" }, { value: "review", label: "In Review" }] }]}
              style={{ marginBottom: 16 }}
            />
            <AxTable
              columns={[
                { key: "order", title: "Order", dataIndex: "order" },
                { key: "medication", title: "Medication", dataIndex: "medication" },
                { key: "supplier", title: "Supplier", dataIndex: "supplier" },
                {
                  key: "status", title: "Status", dataIndex: "status",
                  render: (tone: "awarded" | "info" | "warning" | "neutral") => (
                    <AxTag tone={tone}>{{ awarded: "Awarded", info: "In Review", warning: "Not Awarded", neutral: "Pending" }[tone]}</AxTag>
                  ),
                },
              ]}
              dataSource={tableData}
              pagination={false}
            />
          </div>
        </div>
      </div>
    )
  },
}

// ===========================================================================
// FEATURE DEMOS
// ===========================================================================

export const Groups: Story = {
  name: "Feature — Groups & Sections",
  render: () => {
    const [selected, setSelected] = useState("orders-all")
    return (
      <Flex gap={0} style={{ height: "100vh" }}>
        {/* Expanded */}
        <AxSideNav
          items={withHandlers(DEMO_ITEMS, setSelected)}
          selectedKey={selected}
          logo={<AxBrand variant="wordmark" size="md" />}
          user={<DemoUser />}
        />
        <div style={{ width: 1, background: "var(--neutral-300)" }} />
        {/* Collapsed — click a group icon to see the flyout */}
        <AxSideNav
          items={withHandlers(DEMO_ITEMS, setSelected)}
          selectedKey={selected}
          collapsed={true}
          logo={<AxBrand variant="icon" size="md" />}
          user={<DemoUser />}
        />
        <div style={{ flex: 1, background: "var(--neutral-50)", padding: 24 }}>
          <AxText variant="body-sm" color="secondary">
            Left: expanded · Right: collapsed (click group icon for flyout)
          </AxText>
          <br />
          <AxText variant="body-sm" color="secondary">
            Active: <strong style={{ color: "var(--text-primary)" }}>{selected}</strong>
          </AxText>
        </div>
      </Flex>
    )
  },
  parameters: { controls: { disable: true } },
}

export const Toggle: Story = {
  name: "Feature — Toggle",
  render: () => {
    const [collapsed, setCollapsed] = useState(false)
    const [selected, setSelected] = useState("dashboard")
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <AxSideNav
          items={withHandlers(DEMO_ITEMS, setSelected)}
          selectedKey={selected}
          collapsed={collapsed}
          onCollapse={setCollapsed}
          logo={<AxBrand variant="wordmark" size="md" />}
          user={<DemoUser />}
        />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--neutral-50)" }}>
          <AxText variant="body-sm" color="secondary">
            Use the collapse icon at the top of the sidebar
          </AxText>
        </div>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
