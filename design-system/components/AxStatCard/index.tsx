"use client"

import React from "react"
import { Skeleton } from "antd"

import styles from "./index.module.css"

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type AxStatCardProps = {
  /** Metric label — e.g. "Available RFQs to bid" */
  title: string

  /** Metric value — number or formatted string. Renders with tabular-nums. */
  value: React.ReactNode

  /**
   * Icon displayed in a tinted container beside the value.
   * Pass an antd icon — the container handles sizing.
   */
  icon?: React.ReactNode

  /**
   * Background color for the icon container.
   * Pass a CSS variable or hex value — icon color auto-contrasts.
   * Default: var(--primary-100) bg with var(--primary-600) icon color.
   * Example: iconColor="var(--cyan-100)" or iconColor="#E8F5E9"
   */
  iconColor?: {
    bg: string
    fg: string
  }

  /**
   * Trend indicator — e.g. { value: 12, label: "vs last month" }
   * Positive values show green arrow up, negative show red arrow down, zero is neutral.
   */
  trend?: {
    value: number
    label?: string
  }

  /**
   * Action button rendered as a floating icon circle (bottom-right).
   * Use for quick actions like "Add SKU" or "View all".
   */
  action?: {
    icon: React.ReactNode
    onClick: () => void
    label?: string
  }

  /** Show skeleton loader instead of content. */
  loading?: boolean

  /** Size: "sm" for compact grids, "md" (default) for dashboard KPIs. */
  size?: "sm" | "md"

  /** Additional class name. */
  className?: string

  /** Additional inline styles. */
  style?: React.CSSProperties
}

// ---------------------------------------------------------------------------
// Trend arrow SVG
// ---------------------------------------------------------------------------

const TrendArrow: React.FC<{ direction: "up" | "down" }> = ({ direction }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    style={{
      transform: direction === "down" ? "rotate(180deg)" : undefined,
      transition: "transform var(--duration-base) var(--ease-spring)",
    }}
    aria-hidden="true"
  >
    <path d="M6 2.5L10 7.5H2L6 2.5Z" fill="currentColor" />
  </svg>
)

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AxStatCard: React.FC<AxStatCardProps> = ({
  title,
  value,
  icon,
  iconColor,
  trend,
  action,
  loading = false,
  size = "md",
  className,
  style,
}) => {
  const rootCls = [
    styles.statCard,
    size === "sm" ? styles.sm : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ")

  if (loading) {
    return (
      <div className={rootCls} style={style} aria-busy="true">
        <div className={styles.layout}>
          {icon && (
            <div className={styles.iconContainer}>
              <Skeleton.Avatar active size={size === "sm" ? 40 : 48} shape="square" />
            </div>
          )}
          <div className={styles.content}>
            <Skeleton.Input active size="small" style={{ width: 120, height: 14 }} />
            <Skeleton.Input active size="small" style={{ width: 80, height: 28, marginTop: 4 }} />
          </div>
        </div>
      </div>
    )
  }

  const trendDirection = trend
    ? trend.value > 0
      ? "up"
      : trend.value < 0
        ? "down"
        : "neutral"
    : null

  const trendColor = trendDirection
    ? {
        up: "var(--success)",
        down: "var(--error)",
        neutral: "var(--text-secondary)",
      }[trendDirection]
    : undefined

  return (
    <div className={rootCls} style={style}>
      <div className={styles.layout}>
        {icon && (
          <div
            className={styles.iconContainer}
            aria-hidden="true"
            style={iconColor ? { background: iconColor.bg, color: iconColor.fg } : undefined}
          >
            {icon}
          </div>
        )}
        <div className={styles.content}>
          <span className={styles.title}>{title}</span>
          <span className={styles.value}>{value}</span>
          {trend && (
            <span className={styles.trend} style={{ color: trendColor }}>
              {trendDirection !== "neutral" && (
                <TrendArrow direction={trendDirection as "up" | "down"} />
              )}
              <span>
                {trend.value > 0 ? "+" : ""}
                {trend.value}%
              </span>
              {trend.label && (
                <span className={styles.trendLabel}>{trend.label}</span>
              )}
            </span>
          )}
        </div>
      </div>
      {action && (
        <button
          type="button"
          className={styles.actionButton}
          onClick={action.onClick}
          aria-label={action.label ?? "Action"}
        >
          {action.icon}
        </button>
      )}
    </div>
  )
}

AxStatCard.displayName = "AxStatCard"

export default AxStatCard
