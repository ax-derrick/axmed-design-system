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
   * Preset widths: "xs" (400px), "sm" (500px), "md" (600px), "lg" (640px).
   * You can still override with `width` for custom sizes.
   */
  size?: "xs" | "sm" | "md" | "lg"

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
  xs: 400,
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
  const descId = React.useId()
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
        <div id={descId} className={styles.description}>{description}</div>
      )}
    </div>
  )

  return (
    <AntDrawer
      title={composedTitle}
      size={resolvedSize}
      placement={placement}
      aria-describedby={description ? descId : undefined}
      {...props}
      rootClassName={rootClassNames}
    >
      <Spin spinning={loading} size="large" aria-busy={loading || undefined}>
        {children}
      </Spin>
    </AntDrawer>
  )
}

AxDrawer.displayName = "AxDrawer"

export default AxDrawer
