"use client"

import React from "react"

import styles from "./PriceCell.module.css"

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type AxPriceCellProps = {
  /** The numeric amount to format */
  amount: number

  /**
   * ISO 4217 currency code.
   * @default "USD"
   */
  currency?: string

  /**
   * BCP 47 locale used for number formatting.
   * @default "en-US"
   */
  locale?: string

  /**
   * Optional tier or label rendered below the price (e.g. "Tier 1", "Best Price").
   * Use to surface pricing context in competitive bid tables.
   */
  tier?: string

  /**
   * Whether the tier label should be highlighted (e.g. lowest bid).
   * @default false
   */
  tierHighlighted?: boolean

  /**
   * Use compact notation for large numbers (e.g. $1.2M instead of $1,200,000).
   * @default false
   */
  compact?: boolean

  /** Per-unit label appended after the price (e.g. "/ unit", "/ pack") */
  unit?: string

  className?: string
  style?: React.CSSProperties
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const formatPrice = (
  amount: number,
  currency: string,
  locale: string,
  compact: boolean,
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation: compact ? "compact" : "standard",
    minimumFractionDigits: compact ? 0 : 2,
    maximumFractionDigits: compact ? 1 : 2,
  }).format(amount)
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AxPriceCell: React.FC<AxPriceCellProps> = ({
  amount,
  currency = "USD",
  locale = "en-US",
  tier,
  tierHighlighted = false,
  compact = false,
  unit,
  className,
  style,
}) => {
  const formatted = formatPrice(amount, currency, locale, compact)
  const cls = [styles.cell, className].filter(Boolean).join(" ")

  return (
    <div className={cls} style={style}>
      <span className={styles.amount}>
        {formatted}
        {unit && <span className={styles.unit}>{unit}</span>}
      </span>
      {tier && (
        <span className={[styles.tier, tierHighlighted ? styles.tierHighlighted : ""].filter(Boolean).join(" ")}>
          {tier}
        </span>
      )}
    </div>
  )
}

AxPriceCell.displayName = "AxPriceCell"

export default AxPriceCell
