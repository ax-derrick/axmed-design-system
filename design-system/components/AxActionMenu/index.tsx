"use client"

import React from "react"
import { Dropdown as AntDropdown } from "antd"
import type { DropdownProps as AntDropdownProps, MenuProps } from "antd"
import { MoreOutlined } from "@ant-design/icons"

import AxButton from "../AxButton"
import styles from "./index.module.css"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ActionItem = {
  /** Unique key for the item. */
  key: string
  /** Visible label. */
  label: string
  /** Optional icon before the label. */
  icon?: React.ReactNode
  /** Renders in red with destructive intent. */
  danger?: boolean
  /** Disabled state. */
  disabled?: boolean
  /** Click handler. */
  onClick?: () => void
}

export type ActionDivider = {
  type: "divider"
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type AxActionMenuProps = {
  /** Menu items — action items and optional dividers. */
  items: (ActionItem | ActionDivider)[]

  /**
   * Custom trigger element. Defaults to a "..." (MoreOutlined) icon button.
   * Pass any ReactNode to override.
   */
  trigger?: React.ReactNode

  /**
   * Size of the default trigger button.
   * Ignored when a custom `trigger` is provided.
   */
  size?: "sm" | "md" | "lg"

  /** Menu placement. */
  placement?: AntDropdownProps["placement"]

  /** Disabled state — prevents opening. */
  disabled?: boolean

  /** Additional class name on the dropdown overlay. */
  className?: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const toMenuItems = (items: (ActionItem | ActionDivider)[]): MenuProps["items"] =>
  items.map((item, i) => {
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

const buttonSizeMap: Record<"sm" | "md" | "lg", "small" | "middle" | "large"> = {
  sm: "small",
  md: "middle",
  lg: "large",
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AxActionMenu: React.FC<AxActionMenuProps> = ({
  items,
  trigger,
  size = "md",
  placement = "bottomRight",
  disabled = false,
  className,
}) => {
  const menuItems = toMenuItems(items)

  const overlayClassName = [styles.axActionMenu, className].filter(Boolean).join(" ")

  const defaultTrigger = (
    <AxButton
      variant="text"
      size={buttonSizeMap[size]}
      icon={<MoreOutlined />}
      disabled={disabled}
      aria-label="Actions"
    />
  )

  return (
    <AntDropdown
      menu={{ items: menuItems }}
      placement={placement}
      disabled={disabled}
      trigger={["click"]}
      overlayClassName={overlayClassName}
    >
      {trigger ? (
        <span className={styles.trigger}>{trigger}</span>
      ) : (
        defaultTrigger
      )}
    </AntDropdown>
  )
}

AxActionMenu.displayName = "AxActionMenu"

export default AxActionMenu
