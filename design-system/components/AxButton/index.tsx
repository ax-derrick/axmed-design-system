"use client"

import React from "react"
import { Button as AntButton } from "antd"
import type { ButtonProps as AntButtonProps } from "antd"

import styles from "./index.module.css"

type AxButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "link" | "text"

export type AxButtonProps = {
  /** Visual variant of the button */
  variant?: AxButtonVariant
} & Omit<AntButtonProps, "type" | "danger" | "ghost" | "variant">

const variantMap: Record<AxButtonVariant, Partial<AntButtonProps>> = {
  primary: { type: "primary" },
  secondary: { type: "default" },
  ghost: { type: "primary", ghost: true },
  danger: { type: "primary", danger: true },
  link: { type: "link" },
  text: { type: "text" },
}

const AxButton: React.FC<AxButtonProps> = ({ variant = "primary", className, ...props }) => {
  const antProps = variantMap[variant]

  return (
    <AntButton
      {...antProps}
      {...props}
      className={`${styles.axButton} ${className ?? ""}`}
    />
  )
}

export default AxButton
