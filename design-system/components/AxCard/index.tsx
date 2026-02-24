"use client"

import React from "react"
import { Card as AntCard } from "antd"
import type { CardProps as AntCardProps } from "antd"

import css from "./index.module.css"

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type AxCardProps = {
  /**
   * Muted subtitle rendered below the title in the card header.
   */
  description?: React.ReactNode

  /**
   * Custom footer rendered inside the card, below the body.
   * Separated from the body by a top border.
   * Use for action buttons, timestamps, or metadata.
   */
  footer?: React.ReactNode

  /**
   * Remove body padding — use when the card contains a full-bleed
   * element like a Table, List, or image. Inner content controls its own spacing.
   */
  noPadding?: boolean
} & AntCardProps

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AxCard: React.FC<AxCardProps> = ({
  description,
  footer,
  noPadding = false,
  title,
  children,
  className,
  ...props
}) => {
  // Compose title + description into one header block (same pattern as AxModal)
  const composedTitle =
    title !== undefined || description !== undefined ? (
      <div>
        {title !== undefined && (
          <div className={css.cardTitle}>{title}</div>
        )}
        {description && (
          <div className={css.description}>{description}</div>
        )}
      </div>
    ) : undefined

  const rootClass = [
    css.axCard,
    noPadding ? css.noPadding : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <AntCard
      title={composedTitle}
      {...props}
      className={rootClass}
    >
      {children}
      {footer && <div className={css.footer}>{footer}</div>}
    </AntCard>
  )
}

AxCard.displayName = "AxCard"

export default AxCard
