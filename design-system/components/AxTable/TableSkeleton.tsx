"use client"

import React from "react"
import { Skeleton } from "antd"

import styles from "./TableSkeleton.module.css"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SkeletonColumnConfig = {
  /** Flex ratio for the column (default: 1) */
  flex?: number
  /** Fixed width — overrides flex when set */
  width?: string | number
}

export type AxTableSkeletonProps = {
  /** Number of body rows to render (default: 5) */
  rows?: number
  /**
   * Column structure.
   * - number: N equal-width columns
   * - SkeletonColumnConfig[]: per-column flex/width control
   */
  columns?: number | SkeletonColumnConfig[]
  /** Render a header skeleton row (default: true) */
  showHeader?: boolean
  /** Additional class name for the root element */
  className?: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const WIDTHS = [88, 72, 94, 62, 80, 76, 90, 58, 84, 68]

/** Deterministic width variation — no randomness between renders */
const bodyWidth = (row: number, col: number): string =>
  `${WIDTHS[(row * 3 + col) % WIDTHS.length]}%`

const headerWidth = (col: number): string =>
  `${[55, 45, 60, 40, 50][col % 5]}%`

const normaliseCols = (columns: AxTableSkeletonProps["columns"]): SkeletonColumnConfig[] => {
  if (!columns) return Array.from({ length: 5 }, () => ({ flex: 1 }))
  if (typeof columns === "number") return Array.from({ length: columns }, () => ({ flex: 1 }))
  return columns
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AxTableSkeleton: React.FC<AxTableSkeletonProps> = ({
  rows = 5,
  columns,
  showHeader = true,
  className,
}) => {
  const cols = normaliseCols(columns)
  const rootCls = [styles.skeleton, className].filter(Boolean).join(" ")

  return (
    <div className={rootCls} aria-busy="true" aria-label="Loading table data">
      {showHeader && (
        <div className={styles.headerRow}>
          {cols.map((col, i) => (
            <div
              key={i}
              className={styles.cell}
              style={{ flex: col.flex ?? 1, ...(col.width ? { maxWidth: col.width, flex: "none", width: col.width } : {}) }}
            >
              <Skeleton.Input active size="small" style={{ width: headerWidth(i), height: 12, minWidth: 0 }} />
            </div>
          ))}
        </div>
      )}

      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className={styles.bodyRow}>
          {cols.map((col, colIdx) => (
            <div
              key={colIdx}
              className={styles.cell}
              style={{ flex: col.flex ?? 1, ...(col.width ? { maxWidth: col.width, flex: "none", width: col.width } : {}) }}
            >
              <Skeleton.Input active size="small" style={{ width: bodyWidth(rowIdx, colIdx), height: 12, minWidth: 0 }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

AxTableSkeleton.displayName = "AxTableSkeleton"

export default AxTableSkeleton
