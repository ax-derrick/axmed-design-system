"use client"

import React from "react"
import {
  FileExcelOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileImageOutlined,
  FileOutlined,
  CloseOutlined,
  CheckCircleFilled,
  ExclamationCircleFilled,
  ReloadOutlined,
} from "@ant-design/icons"

import styles from "./index.module.css"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AxFileItemStatus = "idle" | "uploading" | "success" | "error"

export type AxFileItemSize = "sm" | "md"

export type AxFileItemProps = {
  /** File name (required). Displayed as the primary label. */
  name: string

  /** File size in bytes. Formatted automatically (e.g. "2.5 MB"). */
  fileSize?: number

  /**
   * Current status of this file item.
   * - `idle`      — file selected, not yet uploading (default)
   * - `uploading` — in progress, shows progress bar
   * - `success`   — upload complete, green checkmark
   * - `error`     — upload failed, red indicator + optional error message
   * @default "idle"
   */
  status?: AxFileItemStatus

  /**
   * Upload progress percentage (0–100).
   * Only rendered when `status="uploading"`.
   */
  percent?: number

  /**
   * Error message displayed below the file name when `status="error"`.
   * Example: "File exceeds 10MB limit"
   */
  error?: string

  /**
   * Override the default file-type icon.
   * By default, the icon is inferred from the file extension in `name`.
   */
  icon?: React.ReactNode

  /**
   * Image preview URL — shown as a thumbnail in the icon box.
   * Pass a `URL.createObjectURL(file)` or data URL for image uploads.
   * When set, replaces the file type icon entirely.
   */
  preview?: string

  /** Called when the user clicks the remove/cancel button. */
  onRemove?: () => void

  /** Called when the user clicks the retry button (only shown on error). */
  onRetry?: () => void

  /**
   * Component size preset.
   * - `sm` — compact: for modals and drawers
   * - `md` — standard (default)
   * @default "md"
   */
  size?: AxFileItemSize

  /** Disable interactions (remove, retry). Reduces opacity. */
  disabled?: boolean

  /** Additional CSS class name. */
  className?: string

  /** Inline styles. */
  style?: React.CSSProperties
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Map file extensions to antd icons. */
const getFileIcon = (fileName: string): React.ReactNode => {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? ""

  const iconMap: Record<string, React.ReactNode> = {
    xlsx: <FileExcelOutlined />,
    xls: <FileExcelOutlined />,
    csv: <FileExcelOutlined />,
    pdf: <FilePdfOutlined />,
    doc: <FileWordOutlined />,
    docx: <FileWordOutlined />,
    jpg: <FileImageOutlined />,
    jpeg: <FileImageOutlined />,
    png: <FileImageOutlined />,
    gif: <FileImageOutlined />,
    svg: <FileImageOutlined />,
    webp: <FileImageOutlined />,
  }

  return iconMap[ext] ?? <FileOutlined />
}

/** Format bytes into human-readable file size. */
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AxFileItem: React.FC<AxFileItemProps> = ({
  name,
  fileSize,
  status = "idle",
  percent = 0,
  error,
  icon,
  preview,
  onRemove,
  onRetry,
  size = "md",
  disabled = false,
  className,
  style,
}) => {
  const resolvedIcon = icon ?? getFileIcon(name)
  const hasPreview = !!preview
  const clampedPercent = Math.max(0, Math.min(100, percent))

  const rootCls = [
    styles.root,
    styles[size],
    styles[status],
    disabled ? styles.disabled : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div
      className={rootCls}
      style={style}
      role="listitem"
      aria-label={`File: ${name}${status === "uploading" ? `, ${clampedPercent}% uploaded` : ""}`}
    >
      {/* ---- Row: icon + content + actions ---- */}
      <div className={styles.row}>
        <div className={[styles.iconBox, hasPreview ? styles.hasPreview : ""].filter(Boolean).join(" ")} aria-hidden="true">
          {hasPreview ? (
            <img
              src={preview}
              alt=""
              className={styles.previewImg}
            />
          ) : (
            resolvedIcon
          )}
        </div>

        <div className={styles.content}>
          <span className={styles.fileName}>{name}</span>
          {fileSize !== undefined && (
            <>
              <span className={styles.separator} aria-hidden="true">
                &middot;
              </span>
              <span className={styles.fileSizeLabel}>
                {formatFileSize(fileSize)}
              </span>
            </>
          )}
        </div>

        <div className={styles.actions}>
          {status === "success" && (
            <CheckCircleFilled
              className={styles.successIcon}
              aria-label="Upload complete"
            />
          )}
          {status === "error" && (
            <ExclamationCircleFilled
              className={styles.errorIcon}
              aria-label="Upload failed"
            />
          )}
          {status === "error" && onRetry && (
            <button
              type="button"
              className={styles.actionBtn}
              onClick={onRetry}
              disabled={disabled}
              aria-label={`Retry upload for ${name}`}
            >
              <ReloadOutlined />
            </button>
          )}
          {onRemove && (
            <button
              type="button"
              className={styles.actionBtn}
              onClick={onRemove}
              disabled={disabled}
              aria-label={`Remove ${name}`}
            >
              <CloseOutlined />
            </button>
          )}
        </div>
      </div>

      {/* ---- Progress bar ---- */}
      {status === "uploading" && (
        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-valuenow={clampedPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={styles.progressFill}
            style={{ transform: `scaleX(${clampedPercent / 100})` }}
          />
        </div>
      )}

      {/* ---- Error message ---- */}
      {status === "error" && error && (
        <span className={styles.errorMessage} role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

AxFileItem.displayName = "AxFileItem"

export default AxFileItem
