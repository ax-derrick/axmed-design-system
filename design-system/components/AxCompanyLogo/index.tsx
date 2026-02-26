"use client"

import React from "react"
import { Avatar } from "antd"

import styles from "./index.module.css"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AxCompanyLogoSize = "sm" | "md" | "lg" | "xl"

export type AxCompanyLogoProps = {
  /**
   * Company / supplier name — used to derive initials and fallback colour.
   */
  name: string

  /**
   * Optional logo image URL. When provided, renders an image instead of initials.
   */
  src?: string

  /**
   * Size preset.
   * sm: 28px | md: 36px (default) | lg: 48px | xl: 64px
   */
  size?: AxCompanyLogoSize

  /**
   * Shape of the avatar.
   * @default "square"
   */
  shape?: "square" | "circle"

  className?: string
  style?: React.CSSProperties
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const sizeMap: Record<AxCompanyLogoSize, number> = {
  sm: 28,
  md: 36,
  lg: 48,
  xl: 64,
}

const fontSizeMap: Record<AxCompanyLogoSize, string> = {
  sm: "var(--font-size-11)",
  md: "var(--font-size-13)",
  lg: "var(--font-size-16)",
  xl: "var(--font-size-20)",
}

/**
 * Extract up to two initials from a company name.
 * "PharmaCorp Ltd" → "PC"
 * "Axmed"          → "AX"
 */
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return "?"
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

/**
 * Deterministic hue derived from the name string.
 * Returns one of several accessible palette stops.
 */
const PALETTE = [
  { bg: "var(--primary-100)", color: "var(--primary-600)" },
  { bg: "var(--cyan-100)",    color: "var(--cyan-700)" },
  { bg: "var(--green-100)",   color: "var(--green-700)" },
  { bg: "var(--magenta-100)", color: "var(--magenta-700)" },
  { bg: "var(--orange-100)",  color: "var(--orange-700)" },
  { bg: "var(--neutral-100)", color: "var(--neutral-700)" },
]

function hashName(name: string): number {
  let h = 0
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) >>> 0
  }
  return h
}

function getPalette(name: string) {
  return PALETTE[hashName(name) % PALETTE.length]
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AxCompanyLogo: React.FC<AxCompanyLogoProps> = ({
  name,
  src,
  size = "md",
  shape = "square",
  className,
  style,
}) => {
  const px = sizeMap[size]
  const fontSize = fontSizeMap[size]
  const initials = getInitials(name)
  const palette = getPalette(name)
  const borderRadius = shape === "circle" ? "50%" : Math.round(px * 0.22)

  const rootCls = [styles.logo, className].filter(Boolean).join(" ")

  if (src) {
    return (
      <Avatar
        src={src}
        alt={name}
        size={px}
        shape={shape === "circle" ? "circle" : "square"}
        className={rootCls}
        style={{ borderRadius, ...style }}
      />
    )
  }

  return (
    <div
      className={rootCls}
      role="img"
      aria-label={name}
      style={{
        width: px,
        height: px,
        borderRadius,
        background: palette.bg,
        color: palette.color,
        fontSize,
        ...style,
      }}
    >
      {initials}
    </div>
  )
}

AxCompanyLogo.displayName = "AxCompanyLogo"

export default AxCompanyLogo
