"use client"

import React from "react"
import { Upload } from "antd"
import type { UploadProps as AntUploadProps } from "antd"
import { CloudUploadOutlined } from "@ant-design/icons"

import styles from "./index.module.css"

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type AxUploaderSize = "sm" | "md" | "lg"

export type AxUploaderProps = {
  /**
   * Main text inside the dragger area.
   * Default: "Drag & drop or choose file to upload"
   */
  description?: string

  /**
   * Hint text below the description — file type and size constraints.
   * Example: "Supports .xlsx, .xls and .csv (max 10MB)"
   */
  hint?: string

  /**
   * Icon displayed in the dragger area.
   * Default: CloudUploadOutlined
   */
  icon?: React.ReactNode

  /**
   * Maximum file size in megabytes.
   * Files exceeding this limit are rejected and `onReject` is called.
   */
  maxSizeMB?: number

  /**
   * Called when a file is rejected (e.g. exceeds `maxSizeMB`).
   * Use to show a toast or error message to the user.
   */
  onReject?: (file: File, reason: string) => void

  /**
   * Size preset — controls padding and icon sizing.
   * sm: compact (inside modals), md: standard (default), lg: full-width page.
   */
  size?: AxUploaderSize

  /**
   * Show the built-in file list after upload.
   * Default: false — consumers handle the file-selected state themselves.
   */
  showFileList?: boolean
} & Omit<AntUploadProps, "type" | "children">

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Parses description to wrap "choose file" in a styled span. */
const renderDescription = (text: string) => {
  const marker = "choose file"
  const idx = text.toLowerCase().indexOf(marker)
  if (idx === -1) return text

  return (
    <>
      {text.slice(0, idx)}
      <span className={styles.chooseLink}>{text.slice(idx, idx + marker.length)}</span>
      {text.slice(idx + marker.length)}
    </>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const { Dragger } = Upload

const AxUploader: React.FC<AxUploaderProps> = ({
  description = "Drag & drop or choose file to upload",
  hint,
  icon,
  maxSizeMB,
  onReject,
  size = "md",
  showFileList = false,
  beforeUpload,
  className,
  ...props
}) => {
  const handleBeforeUpload: AntUploadProps["beforeUpload"] = (file, fileList) => {
    if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      onReject?.(file as File, `File exceeds ${maxSizeMB}MB limit`)
      return Upload.LIST_IGNORE
    }
    if (beforeUpload) {
      return beforeUpload(file, fileList)
    }
    return false
  }

  const rootCls = [
    styles.axUploader,
    styles[size],
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={rootCls}>
      <Dragger
        beforeUpload={handleBeforeUpload}
        showUploadList={showFileList}
        {...props}
      >
        <div className={styles.content}>
          <div className={styles.iconWrapper} aria-hidden="true">
            {icon ?? <CloudUploadOutlined />}
          </div>
          <div className={styles.description}>
            {renderDescription(description)}
          </div>
          {hint && (
            <div className={styles.hint}>{hint}</div>
          )}
        </div>
      </Dragger>
    </div>
  )
}

AxUploader.displayName = "AxUploader"

export default AxUploader
