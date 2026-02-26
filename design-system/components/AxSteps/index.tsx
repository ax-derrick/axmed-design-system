"use client"

import React from "react"
import { Steps as AntSteps } from "antd"
import type { StepsProps as AntStepsProps } from "antd"

import styles from "./index.module.css"

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type AxStepsSize = "sm" | "md"

export type AxStepsProps = {
  /**
   * Size: "sm" (compact) or "md" (standard, default).
   */
  size?: AxStepsSize

  /**
   * Layout direction: "horizontal" (default) or "vertical" (timeline-style).
   * Horizontal steps auto-collapse to vertical on small screens.
   */
  orientation?: "horizontal" | "vertical"
} & Omit<AntStepsProps, "size" | "direction">

// ---------------------------------------------------------------------------
// Size mapping
// ---------------------------------------------------------------------------

const sizeMap: Record<AxStepsSize, AntStepsProps["size"]> = {
  sm: "small",
  md: "default",
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AxSteps: React.FC<AxStepsProps> = ({
  size = "md",
  orientation = "horizontal",
  className,
  ...props
}) => {
  const rootCls = [
    styles.axSteps,
    styles[size],
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <AntSteps
      size={sizeMap[size]}
      direction={orientation}
      responsive={orientation === "horizontal"}
      {...props}
      className={rootCls}
    />
  )
}

AxSteps.displayName = "AxSteps"

export default AxSteps
