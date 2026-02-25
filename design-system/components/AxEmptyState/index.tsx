"use client"

import React from "react"
import { Flex } from "antd"

import AxText from "../AxText"
import css from "./index.module.css"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AxEmptyStateSize = "sm" | "md" | "lg"

export type AxEmptyStateProps = {
  /** Main heading */
  title: string
  /** Muted description below the title */
  description?: React.ReactNode
  /**
   * Illustration — any SVG, icon, or image node.
   * Size it before passing (e.g. style={{ fontSize: 48 }} on an antd icon).
   */
  illustration?: React.ReactNode
  /**
   * Action area — pass an AxButton or any ReactNode.
   * Rendered below the description.
   */
  action?: React.ReactNode
  /**
   * Controls padding and typography scale.
   * - sm: inside tables and compact cards (heading-sm, body-xs, 24px padding)
   * - md: card panels and drawer bodies (heading-md, body-sm, 48px padding)
   * - lg: full-page zero-states (heading-xl, body-md, 80px padding)
   */
  size?: AxEmptyStateSize
  /** Additional class name */
  className?: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const titleVariant = {
  sm: "heading-sm",
  md: "heading-md",
  lg: "heading-xl",
} as const

const descVariant = {
  sm: "body-xs",
  md: "body-sm",
  lg: "body-md",
} as const

const gapMap = {
  sm: 8,
  md: 12,
  lg: 20,
} as const

const AxEmptyState: React.FC<AxEmptyStateProps> = ({
  title,
  description,
  illustration,
  action,
  size = "md",
  className,
}) => {
  return (
    <Flex
      vertical
      align="center"
      justify="center"
      gap={gapMap[size]}
      className={[css.root, css[size], className ?? ""].filter(Boolean).join(" ")}
    >
      {illustration && (
        <div className={css.illustration}>{illustration}</div>
      )}

      <Flex vertical align="center" gap={4}>
        <AxText
          variant={titleVariant[size]}
          weight="semibold"
          as="div"
          style={{ textAlign: "center" }}
        >
          {title}
        </AxText>

        {description && (
          <AxText
            variant={descVariant[size]}
            color="secondary"
            as="div"
            style={{ textAlign: "center", maxWidth: 400 }}
          >
            {description}
          </AxText>
        )}
      </Flex>

      {action && <div className={css.action}>{action}</div>}
    </Flex>
  )
}

AxEmptyState.displayName = "AxEmptyState"

export default AxEmptyState
