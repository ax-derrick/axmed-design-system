"use client"

import React, { useState } from "react"
import { Tooltip, Popover, Dropdown } from "antd"
import type { MenuProps } from "antd"
import { MenuFoldOutlined, MenuUnfoldOutlined, RightOutlined, EllipsisOutlined } from "@ant-design/icons"

import type { ActionItem, ActionDivider } from "../AxActionMenu"
import styles from "./index.module.css"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type NavItem = {
  type?: never
  /** Unique key — used to match selectedKey */
  key: string
  /** Label shown when expanded */
  label: string
  /** Icon (antd icon or any ReactNode) */
  icon: React.ReactNode
  /** Click handler */
  onClick?: () => void
  /** Disable interaction */
  disabled?: boolean
}

export type NavDivider = {
  type: "divider"
  key: string
}

/**
 * Collapsible group — a parent item with text-only children.
 * Expands/collapses inline when the sidebar is open.
 * Shows a popover flyout when the sidebar is collapsed to icon-only mode.
 */
export type NavGroup = {
  type: "group"
  key: string
  label: string
  icon: React.ReactNode
  children: NavItem[]
  /** Whether the group starts open. Default: false */
  defaultOpen?: boolean
}

/**
 * Static section label — non-interactive, visually groups items.
 * Hidden when sidebar is collapsed.
 */
export type NavSection = {
  type: "section"
  key: string
  label: string
}

export type AxSideNavProps = {
  /** Navigation items — NavItem, NavDivider, NavGroup, NavSection */
  items: (NavItem | NavDivider | NavGroup | NavSection)[]

  /** Key of the currently active item */
  selectedKey?: string

  /** Whether the sidebar is collapsed to icon-only mode */
  collapsed?: boolean

  /** Called when the user toggles collapse */
  onCollapse?: (collapsed: boolean) => void

  /** Logo / brand slot rendered at the top */
  logo?: React.ReactNode

  /** User profile slot pinned to the bottom */
  user?: React.ReactNode

  /**
   * Width when expanded (px).
   * @default 240
   */
  width?: number

  /**
   * Width when collapsed (px).
   * @default 64
   */
  collapsedWidth?: number

  /**
   * Hide the built-in collapse toggle button in the logo area.
   * Use when AxHeader provides the toggle instead.
   * @default false
   */
  hideCollapseButton?: boolean

  /**
   * Profile action menu items shown when clicking the user area.
   * When provided, wraps the `user` slot with a dropdown menu
   * (e.g. My Account, Settings, Log Out).
   */
  userActions?: (ActionItem | ActionDivider)[]

  /**
   * Show a fixed bottom tab bar on mobile (< 768px) instead of the sidebar.
   * The first 4 top-level items appear as tabs; overflow items go behind
   * a "More" menu. The sidebar is hidden on mobile when enabled.
   * @default true
   */
  showMobileNav?: boolean

  className?: string
  style?: React.CSSProperties
}

// ---------------------------------------------------------------------------
// Internal: convert ActionItem[] → antd MenuProps["items"]
// ---------------------------------------------------------------------------

const toMenuItems = (
  actions: (ActionItem | ActionDivider)[],
): MenuProps["items"] =>
  actions.map((item, i) => {
    if ("type" in item && item.type === "divider") {
      return { type: "divider" as const, key: `divider-${i}` }
    }
    const action = item as ActionItem
    return {
      key: action.key,
      label: action.label,
      icon: action.icon,
      danger: action.danger,
      disabled: action.disabled,
      onClick: action.onClick,
    }
  })

// ---------------------------------------------------------------------------
// Internal: Flyout content for a collapsed NavGroup
// ---------------------------------------------------------------------------

const GroupFlyout: React.FC<{
  item: NavGroup
  selectedKey?: string
  onClose: () => void
}> = ({ item, selectedKey, onClose }) => (
  <div className={styles.flyout}>
    <div className={styles.flyoutTitle}>{item.label}</div>
    <ul className={styles.flyoutList} role="list">
      {item.children.map((child) => {
        const isActive = child.key === selectedKey
        return (
          <li key={child.key} role="listitem">
            <button
              className={[
                styles.flyoutItem,
                isActive ? styles.active : "",
                child.disabled ? styles.disabled : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => {
                if (!child.disabled) {
                  child.onClick?.()
                  onClose()
                }
              }}
              disabled={child.disabled}
              aria-current={isActive ? "page" : undefined}
            >
              {child.label}
            </button>
          </li>
        )
      })}
    </ul>
  </div>
)

// ---------------------------------------------------------------------------
// Internal: NavGroup item
// ---------------------------------------------------------------------------

const GroupItem: React.FC<{
  item: NavGroup
  selectedKey?: string
  collapsed?: boolean
}> = ({ item, selectedKey, collapsed }) => {
  const [open, setOpen] = useState(item.defaultOpen ?? false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const hasActiveChild = item.children.some((c) => c.key === selectedKey)

  const headerCls = [
    styles.navItem,
    styles.groupHeader,
    collapsed && hasActiveChild ? styles.active : "",
  ]
    .filter(Boolean)
    .join(" ")

  const headerBtn = (
    <button
      className={headerCls}
      onClick={collapsed ? undefined : () => setOpen((o) => !o)}
      aria-expanded={collapsed ? undefined : open}
      aria-label={collapsed ? item.label : undefined}
    >
      <span className={styles.icon}>{item.icon}</span>
      <span className={styles.label} aria-hidden={collapsed || undefined}>
        {item.label}
      </span>
      <span
        className={[styles.chevron, open && !collapsed ? styles.chevronOpen : ""]
          .filter(Boolean)
          .join(" ")}
        aria-hidden="true"
      >
        <RightOutlined />
      </span>
    </button>
  )

  return (
    <li role="listitem">
      {collapsed ? (
        <Popover
          open={popoverOpen}
          onOpenChange={setPopoverOpen}
          placement="rightTop"
          trigger="click"
          arrow={false}
          content={
            <GroupFlyout
              item={item}
              selectedKey={selectedKey}
              onClose={() => setPopoverOpen(false)}
            />
          }
          overlayInnerStyle={{ padding: 0, borderRadius: 8 }}
        >
          {headerBtn}
        </Popover>
      ) : (
        headerBtn
      )}

      {/* Collapsible children — only rendered when sidebar is expanded */}
      {!collapsed && (
        <div
          className={[styles.groupChildren, open ? styles.groupChildrenOpen : ""]
            .filter(Boolean)
            .join(" ")}
          aria-hidden={!open || undefined}
        >
          <div className={styles.groupChildrenInner}>
          <ul className={styles.groupChildrenList} role="list">
            {item.children.map((child) => {
              const isActive = child.key === selectedKey
              return (
                <li key={child.key} role="listitem">
                  <button
                    className={[
                      styles.childItem,
                      isActive ? styles.active : "",
                      child.disabled ? styles.disabled : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={child.disabled ? undefined : child.onClick}
                    disabled={child.disabled}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {child.label}
                  </button>
                </li>
              )
            })}
          </ul>
          </div>
        </div>
      )}
    </li>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const AxSideNav: React.FC<AxSideNavProps> = ({
  items,
  selectedKey,
  collapsed = false,
  onCollapse,
  logo,
  user,
  width = 240,
  collapsedWidth = 64,
  hideCollapseButton = false,
  userActions,
  showMobileNav = true,
  className,
  style,
}) => {
  const currentWidth = collapsed ? collapsedWidth : width
  const rootCls = [
    styles.sideNav,
    collapsed ? styles.collapsed : "",
    showMobileNav ? styles.withMobileNav : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const showCollapseBtn = onCollapse && !hideCollapseButton
  const showLogoArea = logo || showCollapseBtn

  // -----------------------------------------------------------------------
  // Mobile bottom nav — extract top-level items for tab bar
  // -----------------------------------------------------------------------

  const MAX_BOTTOM_TABS = 4
  const flatItems = items.filter(
    (item): item is NavItem | NavGroup =>
      !item.type || item.type === "group",
  )
  const bottomTabs = flatItems.slice(0, MAX_BOTTOM_TABS)
  const overflowItems = flatItems.slice(MAX_BOTTOM_TABS)
  const hasOverflow = overflowItems.length > 0

  const isItemActive = (item: NavItem | NavGroup): boolean => {
    if (item.type === "group") {
      return item.children.some((c) => c.key === selectedKey)
    }
    return item.key === selectedKey
  }

  const getItemOnClick = (item: NavItem | NavGroup): (() => void) | undefined => {
    if (item.type === "group") {
      return item.children.find((c) => !c.disabled)?.onClick
    }
    return item.onClick
  }

  const overflowMenuItems: MenuProps["items"] = hasOverflow
    ? overflowItems.map((item) => {
        if (item.type === "group") {
          return {
            key: item.key,
            label: item.label,
            icon: item.icon,
            children: item.children.map((child) => ({
              key: child.key,
              label: child.label,
              onClick: child.onClick,
              disabled: child.disabled,
            })),
          }
        }
        return {
          key: item.key,
          label: item.label,
          icon: item.icon,
          onClick: item.onClick,
          disabled: item.disabled,
        }
      })
    : undefined

  const isOverflowActive = overflowItems.some((item) => isItemActive(item))
  const hasBottomNavItems = showMobileNav && bottomTabs.length > 0

  return (
    <>
    <nav
      className={rootCls}
      style={{ width: currentWidth, minWidth: currentWidth, ...style }}
      aria-label="Main navigation"
    >
      {/* Logo area — includes collapse toggle button */}
      {showLogoArea && (
        <div className={styles.logoArea}>
          {logo && (
            <div
              className={[
                styles.logoContent,
                hideCollapseButton ? styles.logoContentVisible : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {logo}
            </div>
          )}
          {showCollapseBtn && (
            <button
              className={styles.collapseBtn}
              onClick={() => onCollapse(!collapsed)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
          )}
        </div>
      )}

      {/* Nav items */}
      <ul className={styles.navItems} role="list">
        {items.map((item) => {
          // Divider
          if (item.type === "divider") {
            return <li key={item.key} role="separator" className={styles.divider} />
          }

          // Section label — hidden when collapsed
          if (item.type === "section") {
            if (collapsed) return null
            return (
              <li key={item.key} role="presentation" className={styles.sectionLabel}>
                {item.label}
              </li>
            )
          }

          // Collapsible group
          if (item.type === "group") {
            return (
              <GroupItem
                key={item.key}
                item={item}
                selectedKey={selectedKey}
                collapsed={collapsed}
              />
            )
          }

          // Leaf NavItem
          const isActive = item.key === selectedKey
          const itemCls = [
            styles.navItem,
            isActive ? styles.active : "",
            item.disabled ? styles.disabled : "",
          ]
            .filter(Boolean)
            .join(" ")

          const btn = (
            <button
              key={item.key}
              className={itemCls}
              onClick={item.disabled ? undefined : item.onClick}
              disabled={item.disabled}
              aria-current={isActive ? "page" : undefined}
              aria-label={collapsed ? item.label : undefined}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label} aria-hidden={collapsed || undefined}>
                {item.label}
              </span>
            </button>
          )

          return (
            <li key={item.key} role="listitem">
              {collapsed ? (
                <Tooltip title={item.label} placement="right" mouseEnterDelay={0.2}>
                  {btn}
                </Tooltip>
              ) : (
                btn
              )}
            </li>
          )
        })}
      </ul>

      {/* User profile slot */}
      {user && (
        <div className={styles.userArea}>
          {userActions && userActions.length > 0 ? (
            <Dropdown
              menu={{ items: toMenuItems(userActions) }}
              trigger={["click"]}
              placement="topRight"
              overlayClassName={styles.userMenu}
            >
              <div className={styles.userTrigger}>
                <div className={styles.userTriggerContent}>{user}</div>
                {!collapsed && (
                  <span className={styles.userTriggerIcon}>
                    <EllipsisOutlined />
                  </span>
                )}
              </div>
            </Dropdown>
          ) : (
            user
          )}
        </div>
      )}
    </nav>

    {/* Mobile bottom nav — fixed bar at bottom of viewport */}
    {hasBottomNavItems && (
      <nav className={styles.bottomNav} aria-label="Main navigation">
        {bottomTabs.map((item) => {
          const active = isItemActive(item)
          return (
            <button
              key={item.key}
              className={[
                styles.bottomNavItem,
                active ? styles.bottomNavItemActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={getItemOnClick(item)}
              aria-current={active ? "page" : undefined}
            >
              <span className={styles.bottomNavIcon}>{item.icon}</span>
              <span className={styles.bottomNavLabel}>{item.label}</span>
            </button>
          )
        })}
        {hasOverflow && (
          <Dropdown
            menu={{
              items: overflowMenuItems,
              selectedKeys: selectedKey ? [selectedKey] : [],
            }}
            trigger={["click"]}
            placement="topRight"
            overlayClassName={styles.moreMenu}
          >
            <button
              className={[
                styles.bottomNavItem,
                isOverflowActive ? styles.bottomNavItemActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-label="More navigation options"
            >
              <span className={styles.bottomNavIcon}>
                <EllipsisOutlined />
              </span>
              <span className={styles.bottomNavLabel}>More</span>
            </button>
          </Dropdown>
        )}
      </nav>
    )}
    </>
  )
}

AxSideNav.displayName = "AxSideNav"

export default AxSideNav
