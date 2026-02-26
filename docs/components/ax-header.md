# AxHeader

> App header bar with sidebar toggle, horizontal nav items, left/center/right slot layout, and branded (navy) variant -- uses antd Badge and Dropdown internally.

## Import

```tsx
import { AxHeader } from "axmed-design-system"
import type { AxHeaderProps, HeaderNavItem } from "axmed-design-system"
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `left` | `ReactNode` | -- | Left slot rendered after the sidebar toggle. Use for logos, breadcrumbs, or page context. |
| `center` | `ReactNode` | -- | Center slot. Overrides `navItems` when provided. Hidden on mobile (< 768px). |
| `right` | `ReactNode` | -- | Right slot for action buttons, badges, or profile dropdowns. |
| `navItems` | `HeaderNavItem[]` | -- | Horizontal nav items rendered in the center zone. Ignored when `center` is provided. |
| `selectedKey` | `string` | -- | Key of the currently active nav item. |
| `onSidebarToggle` | `() => void` | -- | Callback when sidebar toggle is clicked. When provided, renders a toggle button on the far left. |
| `sidebarCollapsed` | `boolean` | `false` | Controls which toggle icon is shown: fold (expanded) or unfold (collapsed). |
| `variant` | `"default"` \| `"branded"` | `"default"` | `"default"` renders a white background with bottom border. `"branded"` renders a navy background with white text. |
| `sticky` | `boolean` | `true` | Use sticky positioning so the header stays visible on scroll. |
| `height` | `number` | `56` | Header height in pixels. |
| `bordered` | `boolean` | `true` for default, `false` for branded | Show a bottom border. |
| `mobileLogo` | `ReactNode` | -- | Logo shown on mobile in place of the sidebar toggle. Use when the sidebar is replaced by bottom navigation on mobile. |
| `className` | `string` | -- | Additional CSS class name. |
| `style` | `CSSProperties` | -- | Inline styles on the root `<header>` element. |

### HeaderNavItem

```ts
type HeaderNavItem = {
  key: string          // Unique key, matched against selectedKey
  label: ReactNode     // Visible label text
  icon?: ReactNode     // Optional icon rendered before the label
  onClick?: () => void
  badge?: number       // Badge count shown on the item
  disabled?: boolean
}
```

## Basic Usage

```tsx
import { AxHeader } from "axmed-design-system"

function AppHeader() {
  return (
    <AxHeader
      onSidebarToggle={() => console.log("toggle sidebar")}
      sidebarCollapsed={false}
    />
  )
}
```

## Examples

### Default header with sidebar toggle

```tsx
import { useState } from "react"
import { AxHeader, AxBrand, AxText } from "axmed-design-system"

function HeaderWithToggle() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <AxHeader
      onSidebarToggle={() => setCollapsed(!collapsed)}
      sidebarCollapsed={collapsed}
      left={
        <AxText variant="heading-md">
          Order Management
        </AxText>
      }
    />
  )
}
```

The toggle button shows `MenuFoldOutlined` when the sidebar is expanded and `MenuUnfoldOutlined` when collapsed. On mobile, a `MenuOutlined` hamburger icon is shown instead, unless `mobileLogo` is provided.

### Branded (navy) header with nav items

```tsx
import { useState } from "react"
import { AxHeader, AxBrand } from "axmed-design-system"
import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
} from "@ant-design/icons"

function BrandedHeader() {
  const [selected, setSelected] = useState("marketplace")

  return (
    <AxHeader
      variant="branded"
      left={<AxBrand variant="wordmark" size="md" theme="dark" />}
      selectedKey={selected}
      navItems={[
        {
          key: "marketplace",
          label: "Marketplace",
          icon: <AppstoreOutlined />,
          onClick: () => setSelected("marketplace"),
        },
        {
          key: "orders",
          label: "Orders",
          icon: <ShoppingCartOutlined />,
          onClick: () => setSelected("orders"),
          badge: 3,
        },
        {
          key: "tenders",
          label: "Tenders",
          icon: <FileTextOutlined />,
          onClick: () => setSelected("tenders"),
        },
      ]}
    />
  )
}
```

Nav items with a `badge` count render an antd `Badge` next to the label. On mobile (< 768px), the center nav is hidden and replaced by a dropdown menu accessible via a hamburger icon.

### Right-side actions (notification bell, profile dropdown)

```tsx
import { Avatar, Badge, Dropdown, Flex } from "antd"
import { AxHeader, AxButton, AxText } from "axmed-design-system"
import {
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons"

function HeaderWithActions() {
  const profileMenu = {
    items: [
      { key: "account", label: "My Account", icon: <UserOutlined /> },
      { key: "settings", label: "Settings", icon: <SettingOutlined /> },
      { type: "divider" as const },
      { key: "logout", label: "Log Out", icon: <LogoutOutlined />, danger: true },
    ],
  }

  return (
    <AxHeader
      left={
        <AxText variant="heading-md">
          Procurement Dashboard
        </AxText>
      }
      right={
        <Flex gap={8} align="center">
          <Badge count={7} size="small">
            <AxButton variant="text" icon={<BellOutlined />} />
          </Badge>
          <Dropdown menu={profileMenu} trigger={["click"]} placement="bottomRight">
            <Avatar
              size={32}
              icon={<UserOutlined />}
              style={{ background: "var(--primary)", cursor: "pointer" }}
            />
          </Dropdown>
        </Flex>
      }
    />
  )
}
```

### Combined with AxSideNav (app shell pattern)

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
  AppstoreOutlined,
  SettingOutlined,
  BellOutlined,
  RobotOutlined,
} from "@ant-design/icons"

function FullAppShell() {
  const [collapsed, setCollapsed] = useState(false)
  const [selected, setSelected] = useState("dashboard")

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: <DashboardOutlined />, onClick: () => setSelected("dashboard") },
    { key: "orders", label: "Orders", icon: <ShoppingCartOutlined />, onClick: () => setSelected("orders") },
    { key: "suppliers", label: "Suppliers", icon: <TeamOutlined />, onClick: () => setSelected("suppliers") },
    { key: "catalogue", label: "Catalogue", icon: <AppstoreOutlined />, onClick: () => setSelected("catalogue") },
    { type: "divider" as const, key: "div-1" },
    { key: "settings", label: "Settings", icon: <SettingOutlined />, onClick: () => setSelected("settings") },
  ]

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar -- hideCollapseButton because AxHeader owns the toggle */}
      <AxSideNav
        items={navItems}
        selectedKey={selected}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        hideCollapseButton
        logo={<AxBrand variant={collapsed ? "icon" : "wordmark"} size="md" />}
      />

      {/* Main content area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header -- drives sidebar toggle + shows mobile logo */}
        <AxHeader
          onSidebarToggle={() => setCollapsed(!collapsed)}
          sidebarCollapsed={collapsed}
          mobileLogo={<AxBrand variant="wordmark" size="md" />}
          right={
            <Flex gap={8} align="center">
              <AxButton variant="text" icon={<RobotOutlined />}>
                Ask Axmed AI
              </AxButton>
              <Badge count={3} size="small">
                <AxButton variant="secondary" icon={<ShoppingCartOutlined />}>
                  Draft Orders
                </AxButton>
              </Badge>
            </Flex>
          }
        />

        {/* Page content */}
        <main
          style={{
            flex: 1,
            overflow: "auto",
            padding: "24px 32px",
            paddingBottom: 80,
            background: "var(--neutral-50)",
          }}
        >
          <AxText variant="heading-lg">
            {selected.charAt(0).toUpperCase() + selected.slice(1)}
          </AxText>
          <AxText variant="body-md" color="secondary" style={{ marginTop: 4 }}>
            Manage your pharmaceutical supply chain operations.
          </AxText>
        </main>
      </div>
    </div>
  )
}
```

Key wiring details for the app shell pattern:

- Pass `hideCollapseButton` to AxSideNav so only AxHeader has the toggle.
- Pass `onSidebarToggle` and `sidebarCollapsed` to AxHeader to render the correct fold/unfold icon.
- Use `mobileLogo` on AxHeader to replace the hamburger on mobile, since AxSideNav's built-in bottom tab bar handles mobile navigation.
- Add extra `paddingBottom` on the main content area to account for the fixed mobile bottom nav.

## Related Components

- **AxSideNav** -- Collapsible sidebar navigation. Combine with AxHeader for a complete app shell.
- **AxBrand** -- Use in the `left` slot or `mobileLogo` for consistent branding.
- **AxButton** -- Use in the `right` slot for header actions.
- **AxBadge** -- Use for notification counts on header action buttons.

## Storybook

[View in Storybook](https://ax-derrick.github.io/axmed-design-system/?path=/docs/layout-axheader--docs)
