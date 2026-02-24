"use client"

import React from "react"
import { Tag as AntTag } from "antd"
import type { TagProps as AntTagProps } from "antd"

import styles from "./index.module.css"

// ---------------------------------------------------------------------------
// Status presets — maps semantic status names to antd color + optional dot/icon
// ---------------------------------------------------------------------------

type StatusPreset = {
  color: string
  dotColor?: string
  icon?: React.ReactNode
}

const statusPresets: Record<string, StatusPreset> = {
  // Order statuses
  submitted: { color: "gold", dotColor: "#FA8C16" },
  processing: { color: "processing", dotColor: "#1890FF" },
  in_progress: { color: "processing", dotColor: "#1890FF" },
  completed: { color: "success", dotColor: "#52C41A" },
  delivered: { color: "success", dotColor: "#52C41A" },
  cancelled: { color: "error", dotColor: "#F5222D" },
  pending: { color: "default", dotColor: "#8C8C8C" },

  // Quote / bid statuses
  awarded: { color: "success", dotColor: "#52C41A" },
  confirmed: { color: "success", dotColor: "#52C41A" },
  in_review: { color: "processing", dotColor: "#1890FF" },
  not_awarded: { color: "warning", dotColor: "#FA8C16" },
  withdrawn: { color: "error", dotColor: "#F5222D" },
  rejected: { color: "error", dotColor: "#F5222D" },

  // Shipment statuses
  in_transit: { color: "cyan", dotColor: "#13C2C2" },
  shipped: { color: "cyan", dotColor: "#13C2C2" },

  // Availability / stock
  in_stock: { color: "success", dotColor: "#52C41A" },
  low_stock: { color: "warning", dotColor: "#FA8C16" },
  out_of_stock: { color: "error", dotColor: "#F5222D" },
  expired: { color: "default", dotColor: "#8C8C8C" },

  // Onboarding / documents
  approved: { color: "success", dotColor: "#52C41A" },

  // Bid validity
  needs_refresh: { color: "orange", dotColor: "#FA8C16" },
  ready: { color: "green", dotColor: "#52C41A" },

  // PO statuses
  po_submitted: { color: "magenta", dotColor: "#EB2F96" },

  // Draft
  draft: { color: "default", dotColor: "#8C8C8C" },
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type AxTagProps = {
  /**
   * Semantic status key that maps to a preset color and optional dot color.
   * Examples: "submitted", "in_transit", "awarded", "low_stock", "cancelled"
   * When provided, overrides `color` and enables dot by default.
   */
  status?: string

  /**
   * Show a colored dot indicator before the label.
   * Automatically enabled when `status` is set. Pass `false` to hide it.
   */
  dot?: boolean

  /**
   * Custom dot color. Overrides the preset dot color from `status`.
   */
  dotColor?: string

  /**
   * Pill-shaped tag with rounded corners (border-radius: 16px).
   */
  pill?: boolean

  /**
   * Solid fill background color with white text and no border.
   * Pass a hex/color string. Overrides `color` when set.
   * Example: fill="#52C41A" renders a solid green tag with white text.
   */
  fill?: string

  /**
   * Small tag variant (fontSize: 11px, compact padding).
   * Useful for inline badges like "Be first to bid!" or "+3 more".
   */
  small?: boolean
} & AntTagProps

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AxTag: React.FC<AxTagProps> = ({
  status,
  dot,
  dotColor,
  pill = false,
  fill,
  small = false,
  className,
  children,
  color,
  icon,
  style,
  ...props
}) => {
  const preset = status ? statusPresets[status] : undefined

  // Resolve values: explicit props > preset > defaults
  const resolvedColor = fill ? undefined : (color ?? preset?.color)
  const resolvedDotColor = dotColor ?? preset?.dotColor
  const showDot = dot ?? (status !== undefined && !icon && !fill)
  const resolvedIcon = icon ?? preset?.icon

  const classNames = [
    styles.axTag,
    pill ? styles.pill : "",
    small ? styles.small : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ")

  // When `fill` is set, apply solid background + white text + no border
  const fillStyle: React.CSSProperties | undefined = fill
    ? {
        background: fill,
        color: "#fff",
        border: "none",
        ...style,
      }
    : style

  return (
    <AntTag
      color={resolvedColor}
      icon={resolvedIcon}
      {...props}
      className={classNames}
      style={fillStyle}
    >
      {showDot && resolvedDotColor && (
        <span className={styles.dot} style={{ background: resolvedDotColor }} />
      )}
      {children}
    </AntTag>
  )
}

AxTag.displayName = "AxTag"

export default AxTag
