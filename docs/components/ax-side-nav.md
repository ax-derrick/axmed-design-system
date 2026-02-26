# AxSideNav

> Collapsible sidebar navigation with groups, sections, dividers, user profile slot, mobile bottom tab bar, and flyout popovers in collapsed mode.

## Import

```tsx
import { AxSideNav } from "axmed-design-system"
import type {
  AxSideNavProps,
  NavItem,
  NavDivider,
  NavGroup,
  NavSection,
} from "axmed-design-system"
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `(NavItem \| NavDivider \| NavGroup \| NavSection)[]` | -- (required) | Navigation items. See item types below. |
| `selectedKey` | `string` | -- | Key of the currently active item. Highlights the matching nav item. |
| `collapsed` | `boolean` | `false` | Whether the sidebar is collapsed to icon-only mode. |
| `onCollapse` | `(collapsed: boolean) => void` | -- | Called when the user toggles collapse. When provided, renders a built-in toggle button. |
| `logo` | `ReactNode` | -- | Logo / brand slot rendered at the top of the sidebar. |
| `user` | `ReactNode` | -- | User profile slot pinned to the bottom of the sidebar. |
| `width` | `number` | `240` | Width in pixels when expanded. |
| `collapsedWidth` | `number` | `64` | Width in pixels when collapsed. |
| `hideCollapseButton` | `boolean` | `false` | Hide the built-in collapse toggle button. Use when AxHeader provides the toggle instead. |
| `userActions` | `(ActionItem \| ActionDivider)[]` | -- | Profile action menu items shown when clicking the user area (e.g. My Account, Settings, Log Out). |
| `showMobileNav` | `boolean` | `true` | Show a fixed bottom tab bar on mobile (< 768px) instead of the sidebar. First 4 top-level items appear as tabs; overflow goes behind a "More" menu. |
| `className` | `string` | -- | Additional CSS class name. |
| `style` | `CSSProperties` | -- | Inline styles on the root `<nav>` element. |

### Item types

**NavItem** -- a leaf navigation link:

```ts
type NavItem = {
  key: string       // Unique key, matched against selectedKey
  label: string     // Label shown when expanded
  icon: ReactNode   // Icon (antd icon or any ReactNode)
  onClick?: () => void
  disabled?: boolean
}
```

**NavDivider** -- a horizontal separator:

```ts
type NavDivider = {
  type: "divider"
  key: string
}
```

**NavGroup** -- a collapsible parent with text-only children. Expands/collapses inline when expanded; shows a popover flyout when collapsed:

```ts
type NavGroup = {
  type: "group"
  key: string
  label: string
  icon: ReactNode
  children: NavItem[]
  defaultOpen?: boolean  // default: false
}
```

> Group children are typed as `NavItem[]` so `icon` is required, but it is **not rendered** -- only the label is shown. Pass `null` for children inside a group.

**NavSection** -- a static label for visual grouping. Hidden when sidebar is collapsed:

```ts
type NavSection = {
  type: "section"
  key: string
  label: string
}
```

## Basic Usage

```tsx
import { useState } from "react"
import { AxSideNav } from "axmed-design-system"
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
} from "@ant-design/icons"

function Sidebar() {
  const [selected, setSelected] = useState("dashboard")

  return (
    <AxSideNav
      selectedKey={selected}
      items={[
        {
          key: "dashboard",
          label: "Dashboard",
          icon: <DashboardOutlined />,
          onClick: () => setSelected("dashboard"),
        },
        {
          key: "orders",
          label: "Orders",
          icon: <ShoppingCartOutlined />,
          onClick: () => setSelected("orders"),
        },
        {
          key: "suppliers",
          label: "Suppliers",
          icon: <TeamOutlined />,
          onClick: () => setSelected("suppliers"),
        },
      ]}
    />
  )
}
```

## Examples

### Basic sidebar with items and selection

```tsx
import { useState } from "react"
import { AxSideNav, AxBrand } from "axmed-design-system"
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  SettingOutlined,
} from "@ant-design/icons"

function ProcurementSidebar() {
  const [selected, setSelected] = useState("dashboard")
  const [collapsed, setCollapsed] = useState(false)

  const items = [
    { key: "dashboard", label: "Dashboard", icon: <DashboardOutlined />, onClick: () => setSelected("dashboard") },
    { key: "orders", label: "Orders", icon: <ShoppingCartOutlined />, onClick: () => setSelected("orders") },
    { key: "suppliers", label: "Suppliers", icon: <TeamOutlined />, onClick: () => setSelected("suppliers") },
    { key: "catalogue", label: "Catalogue", icon: <AppstoreOutlined />, onClick: () => setSelected("catalogue") },
    { key: "reports", label: "Reports", icon: <BarChartOutlined />, onClick: () => setSelected("reports") },
    { key: "settings", label: "Settings", icon: <SettingOutlined />, onClick: () => setSelected("settings") },
  ]

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <AxSideNav
        items={items}
        selectedKey={selected}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        logo={<AxBrand variant={collapsed ? "icon" : "wordmark"} size="md" />}
        showMobileNav={false}
      />
      <main style={{ flex: 1, padding: 24, background: "var(--neutral-50)" }}>
        {/* Page content */}
      </main>
    </div>
  )
}
```

### Groups and sections

```tsx
import { useState } from "react"
import { AxSideNav, AxBrand } from "axmed-design-system"
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  InboxOutlined,
  FileTextOutlined,
  SettingOutlined,
} from "@ant-design/icons"

function GroupedSidebar() {
  const [selected, setSelected] = useState("orders-all")

  const items = [
    { type: "section" as const, key: "sec-platform", label: "Platform" },
    { key: "dashboard", label: "Dashboard", icon: <DashboardOutlined />, onClick: () => setSelected("dashboard") },
    {
      type: "group" as const,
      key: "orders",
      label: "Orders",
      icon: <ShoppingCartOutlined />,
      defaultOpen: true,
      children: [
        { key: "orders-all", label: "All Orders", icon: null, onClick: () => setSelected("orders-all") },
        { key: "orders-pending", label: "Pending Approval", icon: null, onClick: () => setSelected("orders-pending") },
        { key: "orders-completed", label: "Completed", icon: null, onClick: () => setSelected("orders-completed") },
      ],
    },
    { key: "suppliers", label: "Suppliers", icon: <TeamOutlined />, onClick: () => setSelected("suppliers") },
    { key: "catalogue", label: "Catalogue", icon: <AppstoreOutlined />, onClick: () => setSelected("catalogue") },
    { type: "divider" as const, key: "div-1" },
    { type: "section" as const, key: "sec-analytics", label: "Analytics" },
    { key: "reports", label: "Reports", icon: <BarChartOutlined />, onClick: () => setSelected("reports") },
    {
      type: "group" as const,
      key: "inbox",
      label: "Inbox",
      icon: <InboxOutlined />,
      children: [
        { key: "inbox-messages", label: "Messages", icon: null, onClick: () => setSelected("inbox-messages") },
        { key: "inbox-notifications", label: "Notifications", icon: null, onClick: () => setSelected("inbox-notifications") },
      ],
    },
    { type: "divider" as const, key: "div-2" },
    { key: "documents", label: "Documents", icon: <FileTextOutlined />, onClick: () => setSelected("documents") },
    { key: "settings", label: "Settings", icon: <SettingOutlined />, onClick: () => setSelected("settings") },
  ]

  return (
    <AxSideNav
      items={items}
      selectedKey={selected}
      logo={<AxBrand variant="wordmark" size="md" />}
      showMobileNav={false}
    />
  )
}
```

Groups expand/collapse inline when the sidebar is expanded. Section labels provide non-interactive visual grouping and are hidden when the sidebar is collapsed. Dividers render as horizontal rules between groups.

### Collapsed mode with tooltips

```tsx
import { AxSideNav, AxBrand } from "axmed-design-system"
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
} from "@ant-design/icons"

function CollapsedSidebar() {
  return (
    <AxSideNav
      collapsed={true}
      selectedKey="dashboard"
      logo={<AxBrand variant="icon" size="md" />}
      showMobileNav={false}
      items={[
        { key: "dashboard", label: "Dashboard", icon: <DashboardOutlined /> },
        { key: "orders", label: "Orders", icon: <ShoppingCartOutlined /> },
        { key: "suppliers", label: "Suppliers", icon: <TeamOutlined /> },
      ]}
    />
  )
}
```

In collapsed mode, leaf items show a Tooltip on hover with the item label. Group items show a Popover flyout with all child items when clicked.

### With logo and user profile

```tsx
import { useState } from "react"
import { Avatar, Flex } from "antd"
import { AxSideNav, AxBrand, AxText } from "axmed-design-system"
import type { ActionItem, ActionDivider } from "axmed-design-system"
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons"

function SidebarWithProfile() {
  const [collapsed, setCollapsed] = useState(false)

  const userSlot = (
    <Flex align="center" gap={10} style={{ overflow: "hidden" }}>
      <Avatar
        size={32}
        icon={<UserOutlined />}
        style={{ background: "var(--primary)", flexShrink: 0 }}
      />
      <Flex vertical style={{ overflow: "hidden", minWidth: 0 }}>
        <AxText
          variant="body-sm"
          weight="medium"
          ellipsis
        >
          Amina Osei
        </AxText>
        <AxText variant="body-xs" color="secondary" ellipsis>
          amina@axmed.com
        </AxText>
      </Flex>
    </Flex>
  )

  const userActions: (ActionItem | ActionDivider)[] = [
    { key: "account", label: "My Account", icon: <UserOutlined /> },
    { key: "settings", label: "Settings", icon: <SettingOutlined /> },
    { type: "divider" },
    { key: "logout", label: "Log Out", icon: <LogoutOutlined />, danger: true },
  ]

  return (
    <AxSideNav
      collapsed={collapsed}
      onCollapse={setCollapsed}
      selectedKey="dashboard"
      logo={<AxBrand variant={collapsed ? "icon" : "wordmark"} size="md" />}
      user={userSlot}
      userActions={userActions}
      showMobileNav={false}
      items={[
        { key: "dashboard", label: "Dashboard", icon: <DashboardOutlined /> },
        { key: "orders", label: "Orders", icon: <ShoppingCartOutlined /> },
      ]}
    />
  )
}
```

When `userActions` is provided, clicking the user area opens a Dropdown menu. The ellipsis icon appears next to the user info when the sidebar is expanded.

### Full app shell with AxHeader

```tsx
import { useState } from "react"
import { Badge, Flex } from "antd"
import {
  AxSideNav,
  AxHeader,
  AxBrand,
  AxButton,
  AxText,
} from "axmed-design-system"
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  SettingOutlined,
  BellOutlined,
} from "@ant-design/icons"

function AppShell() {
  const [collapsed, setCollapsed] = useState(false)
  const [selected, setSelected] = useState("dashboard")

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <AxSideNav
        items={[
          { key: "dashboard", label: "Dashboard", icon: <DashboardOutlined />, onClick: () => setSelected("dashboard") },
          { key: "orders", label: "Orders", icon: <ShoppingCartOutlined />, onClick: () => setSelected("orders") },
          { key: "suppliers", label: "Suppliers", icon: <TeamOutlined />, onClick: () => setSelected("suppliers") },
          { key: "settings", label: "Settings", icon: <SettingOutlined />, onClick: () => setSelected("settings") },
        ]}
        selectedKey={selected}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        hideCollapseButton
        logo={<AxBrand variant={collapsed ? "icon" : "wordmark"} size="md" />}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <AxHeader
          onSidebarToggle={() => setCollapsed(!collapsed)}
          sidebarCollapsed={collapsed}
          mobileLogo={<AxBrand variant="wordmark" size="md" />}
          right={
            <Flex gap={8} align="center">
              <Badge count={5} size="small">
                <AxButton variant="text" icon={<BellOutlined />} />
              </Badge>
            </Flex>
          }
        />

        <main style={{ flex: 1, overflow: "auto", padding: 24, background: "var(--neutral-50)" }}>
          <AxText variant="heading-lg">
            {selected.charAt(0).toUpperCase() + selected.slice(1)}
          </AxText>
        </main>
      </div>
    </div>
  )
}
```

When using AxHeader for the toggle, pass `hideCollapseButton` to AxSideNav to avoid duplicate toggle buttons. The `mobileLogo` prop on AxHeader replaces the hamburger icon on mobile, since AxSideNav's bottom tab bar handles mobile navigation.

## Related Components

- **AxHeader** -- App header bar. Combine with AxSideNav for a complete app shell layout.
- **AxBrand** -- Logo component used in the `logo` slot.
- **AxActionMenu** -- The `userActions` prop uses the same `ActionItem` / `ActionDivider` types.

## Storybook

[View in Storybook](https://ax-derrick.github.io/axmed-design-system/?path=/docs/layout-axsidenav--docs)
