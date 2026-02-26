# AxUploader

> Drag-and-drop file upload area wrapping antd Upload.Dragger with built-in file size validation and a clean, branded UI.

## Import

```tsx
import { AxUploader } from "axmed-design-system"
import type { AxUploaderProps } from "axmed-design-system"
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `description` | `string` | `"Drag & drop or choose file to upload"` | Main text inside the dragger area. The substring "choose file" is automatically rendered as a styled link. |
| `hint` | `string` | -- | Hint text below the description for file type and size constraints. |
| `icon` | `ReactNode` | `<CloudUploadOutlined />` | Icon displayed in the dragger area. |
| `maxSizeMB` | `number` | -- | Maximum file size in megabytes. Files exceeding this limit are silently rejected and `onReject` is called. |
| `onReject` | `(file: File, reason: string) => void` | -- | Called when a file is rejected (e.g. exceeds `maxSizeMB`). Use to show a toast or error to the user. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size preset controlling padding and icon sizing. `sm` is compact (for modals), `lg` is full-width. |
| `showFileList` | `boolean` | `false` | Show antd's built-in file list after upload. Usually `false` since consumers render their own list with AxFileItem. |
| `beforeUpload` | `(file, fileList) => boolean \| Promise` | -- | Custom upload validation. Called after `maxSizeMB` check passes. Return `false` to prevent upload. |
| `accept` | `string` | -- | Accepted file types (HTML input accept attribute, e.g. `".xlsx,.csv"`). |
| `multiple` | `boolean` | `false` | Allow selecting multiple files. |
| `className` | `string` | -- | Additional CSS class name. |

All other [antd Upload props](https://ant.design/components/upload) are forwarded, **except** `type` and `children` (set internally by AxUploader).

## Basic Usage

```tsx
import { AxUploader } from "axmed-design-system"

function DocumentUpload() {
  return (
    <AxUploader
      hint="Supports PDF, DOC, and XLSX (max 10MB)"
      maxSizeMB={10}
      accept=".pdf,.doc,.docx,.xlsx"
    />
  )
}
```

## Examples

### Basic upload

```tsx
import { AxUploader } from "axmed-design-system"

function SimpleUpload() {
  return (
    <AxUploader
      description="Drag & drop or choose file to upload"
      hint="Any file up to 25MB"
      maxSizeMB={25}
    />
  )
}
```

### With file type and size restrictions

```tsx
import { message } from "antd"
import { AxUploader } from "axmed-design-system"

function SpreadsheetUpload() {
  return (
    <AxUploader
      description="Drag & drop or choose file to upload"
      hint="Supports .xlsx, .xls, and .csv (max 10MB)"
      accept=".xlsx,.xls,.csv"
      maxSizeMB={10}
      onReject={(file, reason) => {
        message.error(`${file.name}: ${reason}`)
      }}
      beforeUpload={(file) => {
        console.log("File selected:", file.name)
        return false // prevent auto-upload, handle manually
      }}
    />
  )
}
```

### Combined with AxFileItem (upload flow)

A realistic upload pattern where selected files are displayed below the uploader as AxFileItem rows with progress tracking.

```tsx
import { useState, useCallback } from "react"
import { AxUploader, AxFileItem } from "axmed-design-system"
import { message } from "antd"

type FileEntry = {
  uid: string
  name: string
  size: number
  status: "idle" | "uploading" | "success" | "error"
  percent: number
  error?: string
}

function BulkUploadFlow() {
  const [files, setFiles] = useState<FileEntry[]>([])

  const handleBeforeUpload = useCallback((file: File) => {
    const entry: FileEntry = {
      uid: `${Date.now()}-${file.name}`,
      name: file.name,
      size: file.size,
      status: "idle",
      percent: 0,
    }
    setFiles((prev) => [...prev, entry])

    // Simulate upload
    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) => (f.uid === entry.uid ? { ...f, status: "uploading", percent: 40 } : f))
      )
    }, 500)
    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) => (f.uid === entry.uid ? { ...f, percent: 80 } : f))
      )
    }, 1200)
    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) => (f.uid === entry.uid ? { ...f, status: "success", percent: 100 } : f))
      )
    }, 2000)

    return false
  }, [])

  const handleRemove = (uid: string) => {
    setFiles((prev) => prev.filter((f) => f.uid !== uid))
  }

  return (
    <div style={{ maxWidth: 520 }}>
      <AxUploader
        description="Drag & drop or choose file to upload"
        hint="Supports .xlsx, .xls, and .csv (max 10MB)"
        accept=".xlsx,.xls,.csv"
        maxSizeMB={10}
        multiple
        beforeUpload={handleBeforeUpload}
        onReject={(file, reason) => message.error(`${file.name}: ${reason}`)}
      />

      {files.length > 0 && (
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
          {files.map((file) => (
            <AxFileItem
              key={file.uid}
              name={file.name}
              fileSize={file.size}
              status={file.status}
              percent={file.percent}
              error={file.error}
              onRemove={() => handleRemove(file.uid)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
```

### In a modal

```tsx
import { useState } from "react"
import { AxUploader, AxButton, AxModal } from "axmed-design-system"
import { UploadOutlined } from "@ant-design/icons"

function UploadModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <AxButton variant="secondary" icon={<UploadOutlined />} onClick={() => setOpen(true)}>
        Upload Documents
      </AxButton>

      <AxModal
        title="Upload Shipping Documents"
        open={open}
        onCancel={() => setOpen(false)}
        size="md"
      >
        <AxUploader
          size="sm"
          description="Drag & drop or choose file to upload"
          hint="PDF, DOCX, or scanned images (max 5MB each)"
          accept=".pdf,.docx,.jpg,.png"
          maxSizeMB={5}
          multiple
        />
      </AxModal>
    </>
  )
}
```

## Related Components

- [AxFileItem](./ax-file-item.md) -- file row component for displaying uploaded files with status and progress
- [AxModal](https://ax-derrick.github.io/axmed-design-system/?path=/docs/overlays-axmodal--docs) -- commonly hosts compact uploaders via `size="sm"`

## Storybook

[View in Storybook](https://ax-derrick.github.io/axmed-design-system/?path=/docs/controls-axuploader--docs)
