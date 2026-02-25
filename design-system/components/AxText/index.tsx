"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { Tooltip } from "antd"

import styles from "./index.module.css"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type HeadingVariant =
  | "heading-4xl"
  | "heading-3xl"
  | "heading-2xl"
  | "heading-xl"
  | "heading-lg"
  | "heading-md"
  | "heading-sm"

type BodyVariant = "body-xl" | "body-lg" | "body-md" | "body-sm" | "body-xs"

type TextVariant = HeadingVariant | BodyVariant

type TextWeight = "regular" | "medium" | "semibold"

type TextColor = "primary" | "secondary" | "link" | "disabled" | "inherit"

type ElementType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "label" | "div"

type EllipsisConfig = {
  /** Number of rows before clamping (default: 1) */
  rows?: number
  /** Tooltip content shown when text is truncated. Pass `true` to use the children text. */
  tooltip?: React.ReactNode
}

export type AxTextProps = {
  /** Text style variant from the design system */
  variant: TextVariant
  /** Font weight — applies to body variants (headings have fixed weights) */
  weight?: TextWeight
  /** Italic style */
  italic?: boolean
  /** Underline decoration */
  underline?: boolean
  /** Use monospace font (Fira Code) */
  mono?: boolean
  /** Text color */
  color?: TextColor
  /** Override the rendered HTML element */
  as?: ElementType
  /** Truncate text with ellipsis. Pass `true` for single-line, or a config object. */
  ellipsis?: boolean | EllipsisConfig
  children: React.ReactNode
  className?: string
} & Omit<React.HTMLAttributes<HTMLElement>, "color">

// ---------------------------------------------------------------------------
// Default element mapping
// ---------------------------------------------------------------------------

const defaultElementMap: Record<TextVariant, ElementType> = {
  "heading-4xl": "h1",
  "heading-3xl": "h2",
  "heading-2xl": "h3",
  "heading-xl": "h4",
  "heading-lg": "h5",
  // heading-md/sm are UI labels (14px/13px semibold), not document headings.
  // Use as="h6" when heading semantics are genuinely needed.
  "heading-md": "p",
  "heading-sm": "p",
  "body-xl": "p",
  "body-lg": "p",
  "body-md": "p",
  "body-sm": "p",
  "body-xs": "p",
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const isHeading = (variant: TextVariant): variant is HeadingVariant =>
  variant.startsWith("heading-")

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AxText = React.forwardRef<HTMLElement, AxTextProps>(
  (
    {
      variant,
      weight = "regular",
      italic = false,
      underline = false,
      mono = false,
      color = "primary",
      as,
      children,
      className,
      ellipsis,
      style,
      ...props
    },
    ref
  ) => {
    const Element = as ?? defaultElementMap[variant]
    const internalRef = useRef<HTMLElement>(null)
    const [isTruncated, setIsTruncated] = useState(false)

    // Parse ellipsis config
    const ellipsisConfig = typeof ellipsis === "object" ? ellipsis : undefined
    const isEllipsis = !!ellipsis
    const rows = ellipsisConfig?.rows ?? 1
    const tooltip = ellipsisConfig?.tooltip
    const isMultiline = rows > 1

    // Merge forwarded ref with internal ref
    const mergedRef = useCallback(
      (node: HTMLElement | null) => {
        internalRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) ref.current = node
      },
      [ref]
    )

    // Detect truncation for tooltip
    useEffect(() => {
      if (!tooltip || !internalRef.current) return

      const el = internalRef.current
      const checkTruncation = () => {
        if (isMultiline) {
          setIsTruncated(el.scrollHeight > el.clientHeight)
        } else {
          setIsTruncated(el.scrollWidth > el.clientWidth)
        }
      }
      checkTruncation()

      const observer = new ResizeObserver(checkTruncation)
      observer.observe(el)
      return () => observer.disconnect()
    }, [tooltip, isMultiline, children])

    const classNames = [
      styles.axText,
      styles[variant],
      // Headings have fixed weights from the design spec — only apply weight to body
      !isHeading(variant) && styles[`weight-${weight}`],
      italic && styles.italic,
      underline && styles.underline,
      mono && styles.mono,
      styles[`color-${color}`],
      isEllipsis && !isMultiline && styles.ellipsis,
      isEllipsis && isMultiline && styles.ellipsisMultiline,
      className,
    ]
      .filter(Boolean)
      .join(" ")

    const mergedStyle =
      isEllipsis && isMultiline ? { ...style, WebkitLineClamp: rows } : style

    const element = (
      <Element
        ref={mergedRef as React.Ref<never>}
        className={classNames}
        style={mergedStyle}
        {...props}
      >
        {children}
      </Element>
    )

    if (tooltip && isTruncated) {
      return <Tooltip title={tooltip}>{element}</Tooltip>
    }

    return element
  }
)

AxText.displayName = "AxText"

export default AxText
