"use client"

import React from "react"
import { ClockCircleOutlined, WarningOutlined } from "@ant-design/icons"

import styles from "./DeadlineCell.module.css"

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type AxDeadlineCellProps = {
  /**
   * The deadline date. Accepts a Date object, ISO string, or any value
   * parseable by `new Date()`.
   */
  deadline: Date | string | number

  /**
   * Days remaining below which the cell turns red (urgent).
   * @default 7
   */
  urgentDays?: number

  /**
   * Days remaining below which the cell turns orange (warning).
   * @default 14
   */
  warningDays?: number

  /** Additional class name */
  className?: string

  style?: React.CSSProperties
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const getDaysUntil = (deadline: Date | string | number): number => {
  const d = deadline instanceof Date ? deadline : new Date(deadline)
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.ceil((d.getTime() - Date.now()) / msPerDay)
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AxDeadlineCell: React.FC<AxDeadlineCellProps> = ({
  deadline,
  urgentDays = 7,
  warningDays = 14,
  className,
  style,
}) => {
  const days = getDaysUntil(deadline)

  const tone =
    days < 0
      ? "overdue"
      : days <= urgentDays
        ? "urgent"
        : days <= warningDays
          ? "warning"
          : "ok"

  const label =
    days < 0
      ? `${Math.abs(days)}d overdue`
      : days === 0
        ? "Due today"
        : `${days}d left`

  const Icon = days < 0 ? WarningOutlined : ClockCircleOutlined
  const cls = [styles.cell, styles[tone], className].filter(Boolean).join(" ")

  return (
    <span className={cls} style={style}>
      <Icon className={styles.icon} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </span>
  )
}

AxDeadlineCell.displayName = "AxDeadlineCell"

export default AxDeadlineCell
