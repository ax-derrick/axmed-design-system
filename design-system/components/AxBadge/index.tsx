"use client"

import React from "react"
import { Badge as AntBadge } from "antd"
import type { BadgeProps as AntBadgeProps } from "antd"

import styles from "./index.module.css"

// ---------------------------------------------------------------------------
// Tone presets — semantic intents mapped to design token colors
// ---------------------------------------------------------------------------

export type AxBadgeTone = "primary" | "success" | "warning" | "error" | "neutral"

const toneColorMap: Record<AxBadgeTone, string> = {
  primary: "var(--primary)",
  success: "var(--success)",
  warning: "var(--orange-500)",
  error: "var(--error)",
  neutral: "var(--neutral-500)",
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type AxBadgeProps = {
  /**
   * Semantic tone mapped to design token colors.
   * - `primary`  → purple  — default nav counts, active items
   * - `success`  → green   — completed, verified
   * - `warning`  → orange  — draft quotes, expiring soon
   * - `error`    → red     — critical alerts, overdue
   * - `neutral`  → gray    — informational counts
   *
   * For inline status labels, use AxTag instead.
   */
  tone?: AxBadgeTone

  /**
   * Size: "sm" (small, 18px) or "md" (default, 22px).
   */
  size?: "sm" | "md"
} & Omit<AntBadgeProps, "size" | "color">

// ---------------------------------------------------------------------------
// Size mapping
// ---------------------------------------------------------------------------

const sizeMap: Record<"sm" | "md", AntBadgeProps["size"]> = {
  sm: "small",
  md: "default",
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AxBadge: React.FC<AxBadgeProps> = ({
  tone = "primary",
  size = "md",
  className,
  classNames: antClassNames,
  ...props
}) => {
  const rootCls = [styles.axBadge, className].filter(Boolean).join(" ")

  return (
    <AntBadge
      color={toneColorMap[tone]}
      size={sizeMap[size]}
      {...props}
      className={rootCls}
      classNames={antClassNames}
    />
  )
}

AxBadge.displayName = "AxBadge"

export default AxBadge
