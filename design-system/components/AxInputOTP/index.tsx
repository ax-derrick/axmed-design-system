"use client"

import React from "react"
import { Input } from "antd"
import type { OTPProps } from "antd/es/input/OTP"

import styles from "./index.module.css"

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type AxInputOTPSize = "sm" | "md" | "lg"

export type AxInputOTPProps = {
  /**
   * Number of individual digit/character slots.
   * @default 6
   */
  length?: number

  /**
   * Preset sizes: "sm", "md" (default), "lg".
   * Consistent with the rest of the Axmed input API.
   */
  size?: AxInputOTPSize

  /**
   * Mask the value — useful for PINs and sensitive codes.
   * Pass `true` for the default bullet (•), or a custom string character.
   */
  masked?: boolean | string

  /** Label displayed above the OTP input. */
  label?: string

  /** Helper text displayed below the OTP input (neutral). */
  hint?: string

  /**
   * Error message displayed below the OTP input in red.
   * Also sets `aria-invalid` on the input group.
   */
  error?: string

  /**
   * Whether the field is required.
   * Adds a red asterisk to the label.
   */
  required?: boolean
} & Omit<OTPProps, "size" | "mask" | "length">

// ---------------------------------------------------------------------------
// Size map
// ---------------------------------------------------------------------------

const sizeMap: Record<AxInputOTPSize, OTPProps["size"]> = {
  sm: "small",
  md: "middle",
  lg: "large",
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AxInputOTP: React.FC<AxInputOTPProps> = ({
  length = 6,
  size = "md",
  masked,
  label,
  hint,
  error,
  required,
  rootClassName,
  ...props
}) => {
  const autoId = React.useId()
  const helpId = (error || hint) ? `${autoId}-help` : undefined
  const rootCls = [
    styles.axInputOTP,
    error ? styles.hasError : "",
    rootClassName,
  ].filter(Boolean).join(" ")

  const otpEl = (
    <Input.OTP
      length={length}
      size={sizeMap[size]}
      mask={masked}
      rootClassName={rootCls}
      aria-invalid={error ? true : undefined}
      aria-describedby={helpId}
      {...props}
    />
  )

  // No label/hint/error — render bare OTP for backward compatibility
  if (!label && !hint && !error) {
    return otpEl
  }

  return (
    <div className={styles.wrapper} role="group" aria-label={label}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden="true">
              {" "}*
            </span>
          )}
        </label>
      )}

      {otpEl}

      {(error || hint) && (
        <span id={helpId} className={error ? styles.errorText : styles.hint}>
          {error ?? hint}
        </span>
      )}
    </div>
  )
}

AxInputOTP.displayName = "AxInputOTP"

export default AxInputOTP
