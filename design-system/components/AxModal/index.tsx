"use client"

import React from "react"
import { Modal as AntModal } from "antd"
import type { ModalProps as AntModalProps } from "antd"

import AxButton from "../AxButton"
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
  footer,
  rootClassName,
  children,
  centered = true,
  loading,
  okText = "OK",
  cancelText = "Cancel",
  okButtonProps,
  cancelButtonProps,
  confirmLoading,
  onOk,
  onCancel,
  ...props
}) => {
  const descId = React.useId()
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
        <div id={descId} className={styles.description}>{description}</div>
      )}
    </div>
  )

  // Build footer with AxButton instead of antd's default Button.
  // When footer is explicitly null, no footer is rendered.
  // When footer is a ReactNode, it's used as-is (consumer controls the buttons).
  // Otherwise we render AxButton-based OK/Cancel matching the standard API.
  const resolvedFooter =
    footer !== undefined
      ? footer
      : (
          <>
            <AxButton
              variant="secondary"
              onClick={onCancel as React.MouseEventHandler<HTMLButtonElement>}
              {...(cancelButtonProps as Omit<typeof cancelButtonProps, "type" | "danger" | "ghost" | "variant">)}
            >
              {cancelText}
            </AxButton>
            <AxButton
              variant={danger ? "danger" : "primary"}
              loading={confirmLoading}
              onClick={onOk as React.MouseEventHandler<HTMLButtonElement>}
              {...(okButtonProps as Omit<typeof okButtonProps, "type" | "danger" | "ghost" | "variant">)}
            >
              {okText}
            </AxButton>
          </>
        )

  return (
    <AntModal
      title={composedTitle}
      width={resolvedWidth}
      centered={centered}
      loading={loading}
      footer={resolvedFooter}
      aria-describedby={description ? descId : undefined}
      onCancel={onCancel}
      transitionName="ax-modal"
      maskTransitionName="ax-modal-mask"
      {...props}
      rootClassName={rootClassNames}
    >
      {children}
    </AntModal>
  )
}

AxModal.displayName = "AxModal"

export default AxModal
