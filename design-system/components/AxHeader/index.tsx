"use client"

import React from "react"
import { Badge, Dropdown } from "antd"
import type { MenuProps } from "antd"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
} from "@ant-design/icons"

import styles from "./index.module.css"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type HeaderNavItem = {
  /** Unique key — used to match selectedKey */
  key: string
  /** Visible label text */
  label: React.ReactNode
  /** Optional icon rendered before the label */
  icon?: React.ReactNode
  /** Click handler */
  onClick?: () => void
  /** Badge count shown on the item */
  badge?: number
  /** Disable interaction */
  disabled?: boolean
}

export type AxHeaderProps = {
  /**
   * Left slot — logo, breadcrumbs, or any ReactNode.
   * Renders after the sidebar toggle (if present).
   */
  left?: React.ReactNode

  /**
   * Center slot — custom content that overrides `navItems`.
   * Hidden on mobile (< 768px).
   */
  center?: React.ReactNode

  /**
   * Right slot — action buttons, badges, profile dropdown.
   */
  right?: React.ReactNode

  /**
   * Convenience: horizontal nav items rendered in the center zone.
   * Ignored when `center` is provided.
   */
  navItems?: HeaderNavItem[]

  /** Key of the currently active nav item. */
  selectedKey?: string

  /**
   * Callback when sidebar toggle is clicked.
   * When provided, renders a toggle button on the far left.
   */
  onSidebarToggle?: () => void

  /**
   * Whether the companion sidebar is collapsed.
   * Controls which toggle icon is shown (fold vs unfold).
   */
  sidebarCollapsed?: boolean

  /**
   * Visual variant:
   * - `"default"` — white background, bottom border (dashboard)
   * - `"branded"` — navy background, white text (marketplace)
   * @default "default"
   */
  variant?: "default" | "branded"

  /**
   * Use sticky positioning.
   * @default true
   */
  sticky?: boolean

  /**
   * Header height in pixels.
   * @default 56
   */
  height?: number

  /**
   * Show a bottom border.
   * Defaults to `true` for "default" variant, `false` for "branded".
   */
  bordered?: boolean

  /**
   * Logo shown on mobile in place of the sidebar toggle.
   * Use when the sidebar is replaced by bottom navigation on mobile
   * and the hamburger toggle is no longer needed.
   */
  mobileLogo?: React.ReactNode

  /** Additional class name */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AxHeader: React.FC<AxHeaderProps> = ({
  left,
  center,
  right,
  navItems,
  selectedKey,
  onSidebarToggle,
  sidebarCollapsed = false,
  variant = "default",
  sticky = true,
  height = 56,
  bordered,
  mobileLogo,
  className,
  style,
}) => {
  const showBorder = bordered ?? variant === "default"

  const rootCls = [
    styles.header,
    styles[variant],
    sticky ? styles.sticky : "",
    showBorder ? styles.bordered : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ")

  // Mobile nav menu — shown on mobile when navItems are provided
  const hasNavItems = navItems && navItems.length > 0 && !center
  const mobileNavMenuItems: MenuProps["items"] = hasNavItems
    ? navItems.map((item) => ({
        key: item.key,
        label: item.label,
        icon: item.icon,
        disabled: item.disabled,
        onClick: item.onClick,
      }))
    : undefined

  // Build center content: explicit `center` slot wins, else render navItems
  const centerContent =
    center ??
    (navItems && navItems.length > 0 ? (
      <nav className={styles.nav} aria-label="Header navigation">
        <ul className={styles.navList}>
          {navItems.map((item) => {
            const isActive = item.key === selectedKey
            const itemCls = [
              styles.navItem,
              isActive ? styles.navItemActive : "",
              item.disabled ? styles.navItemDisabled : "",
            ]
              .filter(Boolean)
              .join(" ")

            return (
              <li key={item.key}>
                <button
                  className={itemCls}
                  onClick={item.disabled ? undefined : item.onClick}
                  disabled={item.disabled}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.icon && (
                    <span className={styles.navItemIcon}>{item.icon}</span>
                  )}
                  <span className={styles.navItemLabel}>{item.label}</span>
                  {item.badge != null && item.badge > 0 && (
                    <Badge count={item.badge} size="small" />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    ) : null)

  return (
    <header
      className={rootCls}
      style={{ height, ...style }}
      role="banner"
    >
      {/* Left zone */}
      <div className={styles.left}>
        {onSidebarToggle && (
          <button
            className={`${styles.toggleBtn} ${styles.desktopOnly}`}
            onClick={onSidebarToggle}
            aria-label={
              sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            {sidebarCollapsed ? (
              <MenuUnfoldOutlined />
            ) : (
              <MenuFoldOutlined />
            )}
          </button>
        )}
        {/* Mobile: show logo when sidebar uses bottom nav, else show hamburger */}
        {mobileLogo ? (
          <div className={styles.mobileOnly}>{mobileLogo}</div>
        ) : (
          onSidebarToggle && (
            <button
              className={`${styles.toggleBtn} ${styles.mobileOnly}`}
              onClick={onSidebarToggle}
              aria-label="Toggle navigation menu"
            >
              <MenuOutlined />
            </button>
          )
        )}
        {left}
      </div>

      {/* Center zone — hidden on mobile */}
      {centerContent && (
        <div className={styles.center}>{centerContent}</div>
      )}

      {/* Mobile nav menu — replaces center nav on small screens */}
      {mobileNavMenuItems && (
        <Dropdown
          menu={{
            items: mobileNavMenuItems,
            selectedKeys: selectedKey ? [selectedKey] : [],
          }}
          trigger={["click"]}
          placement="bottomLeft"
          overlayClassName={styles.mobileNavMenu}
        >
          <button
            className={styles.mobileNavBtn}
            aria-label="Navigation menu"
          >
            <MenuOutlined />
          </button>
        </Dropdown>
      )}

      {/* Right zone */}
      {right && <div className={styles.right}>{right}</div>}
    </header>
  )
}

AxHeader.displayName = "AxHeader"

export default AxHeader
