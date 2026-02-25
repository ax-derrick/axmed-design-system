"use client"

import React from "react"
import { Modal as AntModal } from "antd"
import type { ModalProps as AntModalProps } from "antd"

import styles from "./index.module.css"

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type AxModalProps = {
  /**
   * Short description rendered below the title in muted text.
   */
  description?: React.ReactNode

  /**
   * Danger mode — makes the primary action button red.
   * Use for destructive confirmations (delete, cancel order, withdraw bid).
   */
  danger?: boolean

  /**
   * Preset sizes: "sm" (380px), "md" (520px), "lg" (720px).
   * You can still override with `width` for custom sizes.
   */
  size?: "sm" | "md" | "lg"
} & Omit<AntModalProps, "classNames">

// ---------------------------------------------------------------------------
// Size presets
// ---------------------------------------------------------------------------

const sizeWidths: Record<NonNullable<AxModalProps["size"]>, number> = {
  sm: 380,
  md: 520,
  lg: 720,
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AxModal: React.FC<AxModalProps> = ({
  description,
  danger = false,
  size = "md",
  width,
  title,
  rootClassName,
  children,
  centered = true,
  ...props
}) => {
  const resolvedWidth = width ?? sizeWidths[size]

  const rootClassNames = [
    styles.axModal,
    danger ? styles.danger : "",
    rootClassName ?? "",
  ]
    .filter(Boolean)
    .join(" ")

  // Compose title + description into a single header block
  const composedTitle = (
    <div>
      <div className={styles.title}>{title}</div>
      {description && (
        <div className={styles.description}>{description}</div>
      )}
    </div>
  )

  return (
    <AntModal
      title={composedTitle}
      width={resolvedWidth}
      centered={centered}
      {...props}
      rootClassName={rootClassNames}
    >
      {children}
    </AntModal>
  )
}

AxModal.displayName = "AxModal"

export default AxModal
