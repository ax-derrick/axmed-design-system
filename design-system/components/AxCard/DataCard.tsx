"use client"

import React, { useState } from "react"

import css from "./DataCard.module.css"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AxDataCardField = {
  /** Label displayed on the left */
  label: string
  /** Value displayed on the right */
  value: React.ReactNode
  /** Unique key — falls back to label if omitted */
  key?: React.Key
}

export type AxDataCardProps = {
  /** Primary content rendered in the card header */
  header: React.ReactNode

  /** Label-value fields rendered as rows in the card body */
  fields: AxDataCardField[]

  /**
   * Number of fields visible before the expand toggle appears.
   * @default 2
   */
  previewCount?: number

  /** Whether the overflow section is expanded (controlled mode) */
  expanded?: boolean

  /** Called when the expand toggle is clicked */
  onExpandChange?: (expanded: boolean) => void

  /**
   * Default expanded state (uncontrolled mode).
   * @default false
   */
  defaultExpanded?: boolean

  /** Additional class name */
  className?: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AxDataCard: React.FC<AxDataCardProps> = ({
  header,
  fields,
  previewCount = 2,
  expanded: controlledExpanded,
  onExpandChange,
  defaultExpanded = false,
  className,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)
  const isControlled = controlledExpanded !== undefined
  const isExpanded = isControlled ? controlledExpanded : internalExpanded

  const toggleExpand = () => {
    const next = !isExpanded
    if (!isControlled) setInternalExpanded(next)
    onExpandChange?.(next)
  }

  const previewFields = fields.slice(0, previewCount)
  const overflowFields = fields.slice(previewCount)
  const hasOverflow = overflowFields.length > 0

  const rootCls = [css.dataCard, className].filter(Boolean).join(" ")

  return (
    <div className={rootCls}>
      {/* Header */}
      <div className={css.header}>{header}</div>

      {/* Preview fields — always visible */}
      <div className={css.body}>
        {previewFields.map((field) => (
          <div key={String(field.key ?? field.label)} className={css.row}>
            <span className={css.label}>{field.label}</span>
            <span className={css.value}>{field.value}</span>
          </div>
        ))}
      </div>

      {/* Overflow fields — animated expand/collapse */}
      {hasOverflow && (
        <div
          className={[css.overflow, isExpanded ? css.overflowOpen : ""]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={css.overflowInner}>
            <div className={css.body}>
              {overflowFields.map((field) => (
                <div
                  key={String(field.key ?? field.label)}
                  className={css.row}
                >
                  <span className={css.label}>{field.label}</span>
                  <span className={css.value}>{field.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Expand toggle */}
      {hasOverflow && (
        <button
          className={[css.expandBtn, isExpanded ? css.expandBtnOpen : ""]
            .filter(Boolean)
            .join(" ")}
          onClick={toggleExpand}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Show less" : "Show more"}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <circle cx="3" cy="8" r="1.5" />
            <circle cx="8" cy="8" r="1.5" />
            <circle cx="13" cy="8" r="1.5" />
          </svg>
        </button>
      )}
    </div>
  )
}

AxDataCard.displayName = "AxDataCard"

export default AxDataCard
