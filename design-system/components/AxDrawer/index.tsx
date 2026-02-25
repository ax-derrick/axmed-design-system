"use client"

import React from "react"
import { Drawer as AntDrawer, Spin } from "antd"
import type { DrawerProps as AntDrawerProps } from "antd"

import styles from "./index.module.css"

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type AxDrawerProps = {
  /**
   * Short description rendered below the title in muted text.
   * Same pattern as AxModal and AxCard.
   */
  description?: React.ReactNode

  /**
   * Preset widths: "sm" (500px), "md" (600px), "lg" (640px).
   * You can still override with `width` for custom sizes.
   */
  size?: "sm" | "md" | "lg"

  /**
   * Show a loading spinner over the drawer body.
   * Use while fetching data or during async submission.
   */
  loading?: boolean
} & Omit<AntDrawerProps, "size">

// ---------------------------------------------------------------------------
// Size presets
// ---------------------------------------------------------------------------

const sizeWidths: Record<NonNullable<AxDrawerProps["size"]>, number> = {
  sm: 500,
  md: 600,
  lg: 640,
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AxDrawer: React.FC<AxDrawerProps> = ({
  description,
  size = "md",
  loading = false,
  width,
  title,
  rootClassName,
  children,
  placement = "right",
  ...props
}) => {
  // antd v6 deprecated `width` in favour of `size` (accepts numbers too)
  const resolvedSize = width ?? sizeWidths[size]

  const rootClassNames = [
    styles.axDrawer,
    rootClassName ?? "",
  ]
    .filter(Boolean)
    .join(" ")

  const composedTitle = (
    <div>
      <div className={styles.title}>{title}</div>
      {description && (
        <div className={styles.description}>{description}</div>
      )}
    </div>
  )

  return (
    <AntDrawer
      title={composedTitle}
      size={resolvedSize}
      placement={placement}
      {...props}
      rootClassName={rootClassNames}
    >
      <Spin spinning={loading} size="large">
        {children}
      </Spin>
    </AntDrawer>
  )
}

AxDrawer.displayName = "AxDrawer"

export default AxDrawer
