"use client"

import React, { useState } from "react"
import { Tooltip, Popover } from "antd"
import { MenuFoldOutlined, MenuUnfoldOutlined, RightOutlined } from "@ant-design/icons"

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

  className?: string
  style?: React.CSSProperties
}

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
  className,
  style,
}) => {
  const currentWidth = collapsed ? collapsedWidth : width
  const rootCls = [styles.sideNav, collapsed ? styles.collapsed : "", className]
    .filter(Boolean)
    .join(" ")

  const showLogoArea = logo || onCollapse

  return (
    <nav
      className={rootCls}
      style={{ width: currentWidth, minWidth: currentWidth, ...style }}
      aria-label="Main navigation"
    >
      {/* Logo area — includes collapse toggle button */}
      {showLogoArea && (
        <div className={styles.logoArea}>
          {logo && <div className={styles.logoContent}>{logo}</div>}
          {onCollapse && (
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
      {user && <div className={styles.userArea}>{user}</div>}
    </nav>
  )
}

AxSideNav.displayName = "AxSideNav"

export default AxSideNav
