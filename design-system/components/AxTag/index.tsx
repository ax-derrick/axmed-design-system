"use client"

import React from "react"
import { Tag as AntTag } from "antd"
import type { TagProps as AntTagProps } from "antd"

import styles from "./index.module.css"

// ---------------------------------------------------------------------------
// Tone presets — 5 semantic intents mapped to antd color + dot color
// ---------------------------------------------------------------------------

export type AxTagTone = "success" | "info" | "warning" | "error" | "neutral"

type TonePreset = {
  color: string
  dotColor: string
}

const tonePresets: Record<AxTagTone, TonePreset> = {
  success: { color: "success",    dotColor: "var(--success)" },
  info:    { color: "processing", dotColor: "var(--cyan-600)" },
  warning: { color: "warning",    dotColor: "var(--warning)" },
  error:   { color: "error",      dotColor: "var(--error)" },
  neutral: { color: "default",    dotColor: "var(--neutral-500)" },
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type AxTagProps = {
  /**
   * Semantic tone that maps to a color preset and dot color.
   * - `success`  → green  (completed, delivered, awarded, in stock…)
   * - `info`     → blue   (processing, in review, in transit…)
   * - `warning`  → orange (not awarded, low stock, needs refresh…)
   * - `error`    → red    (cancelled, rejected, withdrawn…)
   * - `neutral`  → gray   (pending, draft, expired…)
   * Enables a dot indicator by default. Pass `dot={false}` to suppress it.
   */
  tone?: AxTagTone

  /**
   * Show a colored dot indicator before the label.
   * Automatically enabled when `tone` is set. Pass `false` to hide it.
   */
  dot?: boolean

  /**
   * Custom dot color. Overrides the preset dot color from `tone`.
   */
  dotColor?: string

  /**
   * Pill-shaped tag with rounded corners (border-radius: 16px).
   */
  pill?: boolean

  /**
   * Solid fill background color with white text and no border.
   * Pass a hex/color string or CSS variable.
   * Example: fill="#52C41A" renders a solid green tag with white text.
   */
  fill?: string

  /**
   * Small tag variant (fontSize: 11px, compact padding).
   * Useful for inline badges like "Be first to bid!" or "+3 more".
   */
  small?: boolean
} & AntTagProps

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AxTag: React.FC<AxTagProps> = ({
  tone,
  dot,
  dotColor,
  pill = false,
  fill,
  small = false,
  className,
  children,
  color,
  icon,
  style,
  ...props
}) => {
  const preset = tone ? tonePresets[tone] : undefined

  // Resolve values: explicit props > preset > defaults
  const resolvedColor = fill ? undefined : (color ?? preset?.color)
  const resolvedDotColor = dotColor ?? preset?.dotColor
  const showDot = dot ?? (tone !== undefined && !icon && !fill)
  const resolvedIcon = icon ?? undefined

  const classNames = [
    styles.axTag,
    pill ? styles.pill : "",
    small ? styles.small : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ")

  const fillStyle: React.CSSProperties | undefined = fill
    ? {
        background: fill,
        color: "var(--neutral-0)",
        border: "none",
        ...style,
      }
    : style

  return (
    <AntTag
      color={resolvedColor}
      icon={resolvedIcon}
      {...props}
      className={classNames}
      style={fillStyle}
    >
      {showDot && resolvedDotColor && (
        <span className={styles.dot} style={{ background: resolvedDotColor }} />
      )}
      {children}
    </AntTag>
  )
}

AxTag.displayName = "AxTag"

export default AxTag
