import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Avatar, Badge, Dropdown, Flex, Space } from "antd"
import {
  AppstoreOutlined,
  BellOutlined,
  DashboardOutlined,
  FileTextOutlined,
  InboxOutlined,
  QuestionCircleOutlined,
  RobotOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons"

import AxHeader from "."
import type { HeaderNavItem } from "."
import AxBrand from "../AxBrand"
import AxButton from "../AxButton"
import AxText from "../AxText"
import AxSideNav from "../AxSideNav"
import type { NavItem, NavDivider, NavGroup, NavSection } from "../AxSideNav"
import type { ActionItem, ActionDivider } from "../AxActionMenu"

// ---------------------------------------------------------------------------
// Shared demo data
// ---------------------------------------------------------------------------

type AnyItem = NavItem | NavDivider | NavGroup | NavSection

const SIDEBAR_ITEMS: AnyItem[] = [
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
  { type: "section", key: "sec-analytics", label: "Analytics" },
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
    style={{ padding: 4, borderRadius: 8, cursor: "pointer", overflow: "hidden" }}
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

const USER_ACTIONS: (ActionItem | ActionDivider)[] = [
  { key: "account", label: "My Account", icon: <UserOutlined /> },
  { key: "settings", label: "Settings", icon: <SettingOutlined /> },
  { type: "divider" },
  { key: "logout", label: "Log Out", icon: <LogoutOutlined />, danger: true },
]

const MARKETPLACE_NAV: HeaderNavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: <DashboardOutlined /> },
  { key: "catalogue", label: "Catalogue", icon: <AppstoreOutlined /> },
  { key: "orders", label: "My Orders", icon: <ShoppingCartOutlined />, badge: 3 },
]

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof AxHeader> = {
  title: "Layout/AxHeader",
  component: AxHeader,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "branded"],
    },
    sticky: { control: "boolean" },
    height: { control: "number" },
    bordered: { control: "boolean" },
    sidebarCollapsed: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof AxHeader>

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    variant: "default",
    sticky: true,
    height: 56,
    bordered: true,
    sidebarCollapsed: false,
  },
  render: (args) => {
    const [collapsed, setCollapsed] = useState(args.sidebarCollapsed ?? false)

    return (
      <AxHeader
        {...args}
        sidebarCollapsed={collapsed}
        onSidebarToggle={() => setCollapsed(!collapsed)}
        left={<AxBrand variant="wordmark" size="md" />}
        right={
          <Space size="middle">
            <AxButton variant="ghost" icon={<QuestionCircleOutlined />} />
            <Badge count={2} size="small">
              <AxButton variant="secondary" icon={<BellOutlined />} />
            </Badge>
            <Avatar size={32} icon={<UserOutlined />} style={{ background: "var(--primary)", cursor: "pointer" }} />
          </Space>
        }
      />
    )
  },
}

// ===========================================================================
// TEMPLATES
// ===========================================================================

// ---------------------------------------------------------------------------
// Dashboard Header — white bg, sidebar toggle, right-side actions
// ---------------------------------------------------------------------------

export const DashboardHeader: Story = {
  name: "Template — Dashboard Header",
  render: () => {
    const [collapsed, setCollapsed] = useState(false)

    return (
      <div style={{ background: "var(--neutral-50)", minHeight: 300 }}>
        <AxHeader
          onSidebarToggle={() => setCollapsed(!collapsed)}
          sidebarCollapsed={collapsed}
          right={
            <Space size="middle">
              <AxButton variant="text" icon={<RobotOutlined />}>
                Ask Axmed AI
              </AxButton>
              <Badge count={3} size="small">
                <AxButton variant="secondary" icon={<ShoppingCartOutlined />}>
                  Draft Orders
                </AxButton>
              </Badge>
              <Dropdown
                menu={{
                  items: [
                    { key: "account", label: "My Account", icon: <UserOutlined /> },
                    { key: "settings", label: "Settings", icon: <SettingOutlined /> },
                    { type: "divider" },
                    { key: "logout", label: "Log Out", icon: <LogoutOutlined />, danger: true },
                  ],
                }}
                trigger={["click"]}
              >
                <Flex align="center" gap={8} style={{ cursor: "pointer" }}>
                  <Avatar size={32} icon={<UserOutlined />} style={{ background: "var(--primary)" }} />
                  <AxText variant="body-sm" weight="medium">Ahmed</AxText>
                </Flex>
              </Dropdown>
            </Space>
          }
        />
        <div style={{ padding: "var(--space-6)" }}>
          <AxText variant="body-sm" color="secondary">
            Sidebar is {collapsed ? "collapsed" : "expanded"}. Toggle using the icon on the left.
          </AxText>
        </div>
      </div>
    )
  },
}

// ---------------------------------------------------------------------------
// Marketplace Header — branded navy, horizontal nav, profile dropdown
// ---------------------------------------------------------------------------

export const MarketplaceHeader: Story = {
  name: "Template — Marketplace Header",
  render: () => {
    const [active, setActive] = useState("dashboard")

    const navItems: HeaderNavItem[] = MARKETPLACE_NAV.map((item) => ({
      ...item,
      onClick: () => setActive(item.key),
    }))

    return (
      <div style={{ background: "var(--neutral-50)", minHeight: 300 }}>
        <AxHeader
          variant="branded"
          left={<AxBrand variant="wordmark" size="md" theme="dark" />}
          navItems={navItems}
          selectedKey={active}
          right={
            <Space size="middle">
              <AxButton
                variant="text"
                icon={<QuestionCircleOutlined />}
                style={{ color: "rgba(255,255,255,0.8)" }}
              />
              <Badge count={5} size="small">
                <AxButton
                  variant="text"
                  icon={<ShoppingCartOutlined />}
                  style={{ color: "rgba(255,255,255,0.8)" }}
                />
              </Badge>
              <Dropdown
                menu={{
                  items: [
                    { key: "org", label: "PharmaCorp Ltd", disabled: true },
                    { type: "divider" },
                    { key: "account", label: "My Account", icon: <UserOutlined /> },
                    { key: "org-settings", label: "Organization", icon: <SettingOutlined /> },
                    { type: "divider" },
                    { key: "logout", label: "Log Out", icon: <LogoutOutlined />, danger: true },
                  ],
                }}
                trigger={["click"]}
              >
                <Avatar
                  size={32}
                  icon={<UserOutlined />}
                  style={{ background: "var(--primary-200)", cursor: "pointer" }}
                />
              </Dropdown>
            </Space>
          }
        />
        <div style={{ padding: "var(--space-6)" }}>
          <AxText variant="body-sm" color="secondary">
            Active: <strong style={{ color: "var(--text-primary)" }}>{active}</strong>
          </AxText>
        </div>
      </div>
    )
  },
}

// ---------------------------------------------------------------------------
// App Shell — AxHeader + AxSideNav composed in a full layout
// ---------------------------------------------------------------------------

export const AppShell: Story = {
  name: "Template — App Shell",
  render: () => {
    const [collapsed, setCollapsed] = useState(false)
    const [selected, setSelected] = useState("orders-all")

    return (
      <div style={{ display: "flex", height: "100vh" }}>
        {/* Sidebar */}
        <AxSideNav
          items={withHandlers(SIDEBAR_ITEMS, setSelected)}
          selectedKey={selected}
          collapsed={collapsed}
          onCollapse={setCollapsed}
          hideCollapseButton
          logo={<AxBrand variant={collapsed ? "icon" : "wordmark"} size="md" />}
          user={<DemoUser />}
          userActions={USER_ACTIONS}
        />

        {/* Main area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Header */}
          <AxHeader
            onSidebarToggle={() => setCollapsed(!collapsed)}
            sidebarCollapsed={collapsed}
            right={
              <Space size="middle">
                <AxButton variant="text" icon={<RobotOutlined />}>
                  Ask Axmed AI
                </AxButton>
                <Badge count={3} size="small">
                  <AxButton variant="secondary" icon={<ShoppingCartOutlined />}>
                    Draft Orders
                  </AxButton>
                </Badge>
              </Space>
            }
          />

          {/* Page content */}
          <main style={{ flex: 1, overflow: "auto", padding: "var(--space-8)", background: "var(--neutral-50)" }}>
            <Flex vertical gap={16}>
              <div>
                <AxText variant="heading-lg" weight="semibold">Orders</AxText>
                <AxText variant="body-sm" color="secondary" style={{ display: "block", marginTop: 2 }}>
                  Manage and track all procurement orders
                </AxText>
              </div>
              <div
                style={{
                  background: "var(--neutral-0)",
                  border: "1px solid var(--neutral-200)",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--space-10)",
                  textAlign: "center",
                }}
              >
                <AxText variant="body-md" color="secondary">
                  Page content area — sidebar and header work together via shared collapse state.
                </AxText>
              </div>
            </Flex>
          </main>
        </div>
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ===========================================================================
// FEATURES
// ===========================================================================

// ---------------------------------------------------------------------------
// Nav Items — horizontal navigation with active state, badges, disabled
// ---------------------------------------------------------------------------

export const NavItems: Story = {
  name: "Feature — Nav Items",
  render: () => {
    const [active, setActive] = useState("dashboard")

    const items: HeaderNavItem[] = [
      { key: "dashboard", label: "Dashboard", icon: <DashboardOutlined />, onClick: () => setActive("dashboard") },
      { key: "catalogue", label: "Catalogue", icon: <AppstoreOutlined />, onClick: () => setActive("catalogue") },
      { key: "orders", label: "My Orders", icon: <ShoppingCartOutlined />, badge: 3, onClick: () => setActive("orders") },
      { key: "reports", label: "Reports", icon: <BarChartOutlined />, disabled: true },
    ]

    return (
      <div style={{ background: "var(--neutral-50)", minHeight: 200 }}>
        <AxHeader
          left={<AxBrand variant="wordmark" size="md" />}
          navItems={items}
          selectedKey={active}
        />
        <div style={{ padding: "var(--space-6)" }}>
          <AxText variant="body-sm" color="secondary">
            Active: <strong style={{ color: "var(--text-primary)" }}>{active}</strong>
          </AxText>
        </div>
      </div>
    )
  },
}

// ---------------------------------------------------------------------------
// Sidebar Toggle — interactive fold/unfold demo
// ---------------------------------------------------------------------------

export const SidebarToggle: Story = {
  name: "Feature — Sidebar Toggle",
  render: () => {
    const [collapsed, setCollapsed] = useState(false)

    return (
      <div style={{ background: "var(--neutral-50)", minHeight: 200 }}>
        <AxHeader
          onSidebarToggle={() => setCollapsed(!collapsed)}
          sidebarCollapsed={collapsed}
          left={<AxBrand variant="wordmark" size="md" />}
          right={
            <AxButton variant="secondary" icon={<BellOutlined />} />
          }
        />
        <div style={{ padding: "var(--space-6)" }}>
          <AxText variant="body-sm" color="secondary">
            Sidebar is <strong style={{ color: "var(--text-primary)" }}>{collapsed ? "collapsed" : "expanded"}</strong>.
            Click the toggle icon to change. On desktop it shows fold/unfold, on mobile it shows a hamburger.
          </AxText>
        </div>
      </div>
    )
  },
}
