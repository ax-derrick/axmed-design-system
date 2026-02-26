"use client"

import React from "react"
import { Input as AntInput } from "antd"
import type { InputProps as AntInputProps } from "antd"

import styles from "./index.module.css"

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type AxInputSize = "sm" | "md" | "lg"

export type AxInputProps = {
  /**
   * Preset sizes: "sm" (small), "md" (middle — default), "lg" (large).
   * Consistent with AxButton, AxModal, AxDrawer size APIs.
   */
  size?: AxInputSize

  /** Label displayed above the input. */
  label?: string

  /** Helper text displayed below the input (neutral). */
  hint?: string

  /**
   * Error message displayed below the input in red.
   * Also automatically sets `status="error"` on the input.
   */
  error?: string

  /**
   * Whether the field is required.
   * Adds a red asterisk to the label — does NOT add HTML native validation.
   */
  required?: boolean
} & Omit<AntInputProps, "size" | "required">

// ---------------------------------------------------------------------------
// Size map
// ---------------------------------------------------------------------------

const sizeMap: Record<AxInputSize, AntInputProps["size"]> = {
  sm: "small",
  md: "middle",
  lg: "large",
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AxInput: React.FC<AxInputProps> = ({
  size = "md",
  className,
  label,
  hint,
  error,
  required,
  id,
  status,
  ...props
}) => {
  const autoId = React.useId()
  const inputId = id ?? autoId
  const helpId = (error || hint) ? `${inputId}-help` : undefined

  const inputCls = [styles.axInput, className].filter(Boolean).join(" ")
  const resolvedStatus = error ? "error" : status

  const inputEl = (
    <AntInput
      id={inputId}
      size={sizeMap[size]}
      className={inputCls}
      status={resolvedStatus}
      aria-required={required || undefined}
      aria-invalid={error ? true : undefined}
      aria-describedby={helpId}
      {...props}
    />
  )

  // No label/hint/error — render bare input for backward compatibility
  if (!label && !hint && !error) {
    return inputEl
  }

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden="true">
              {" "}*
            </span>
          )}
        </label>
      )}

      {inputEl}

      {(error || hint) && (
        <span id={helpId} className={error ? styles.errorText : styles.hint}>
          {error ?? hint}
        </span>
      )}
    </div>
  )
}

AxInput.displayName = "AxInput"

export default AxInput
