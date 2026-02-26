# AxFileItem

> File row display component for showing uploaded files with status indicators, progress bars, and action buttons. Custom implementation (no antd wrapper).

## Import

```tsx
import { AxFileItem } from "axmed-design-system"
import type { AxFileItemProps, AxFileItemStatus } from "axmed-design-system"
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | **(required)** | File name. Displayed as the primary label. Also used to auto-detect the file type icon. |
| `fileSize` | `number` | -- | File size in bytes. Automatically formatted (e.g. `2.5 MB`). |
| `status` | `"idle" \| "uploading" \| "success" \| "error"` | `"idle"` | Current status. Controls which indicators and actions are shown. |
| `percent` | `number` | `0` | Upload progress percentage (0--100). Only rendered when `status="uploading"`. |
| `error` | `string` | -- | Error message displayed below the file name when `status="error"`. |
| `icon` | `ReactNode` | auto-detected | Override the default file-type icon. By default, the icon is inferred from the file extension. |
| `preview` | `string` | -- | Image preview URL shown as a thumbnail. Pass `URL.createObjectURL(file)` for image uploads. Replaces the file type icon. |
| `onRemove` | `() => void` | -- | Called when the user clicks the remove/cancel button. Button is hidden when not provided. |
| `onRetry` | `() => void` | -- | Called when the user clicks the retry button. Only shown when `status="error"`. |
| `size` | `"sm" \| "md"` | `"md"` | Component size. `sm` is compact for use inside modals and drawers. |
| `disabled` | `boolean` | `false` | Disables interactions (remove, retry) and reduces opacity. |
| `className` | `string` | -- | Additional CSS class name. |
| `style` | `CSSProperties` | -- | Inline styles on the root element. |

### Auto-detected file type icons

The icon is automatically selected based on the file extension in `name`:

| Extensions | Icon |
| --- | --- |
| `.xlsx`, `.xls`, `.csv` | FileExcelOutlined |
| `.pdf` | FilePdfOutlined |
| `.doc`, `.docx` | FileWordOutlined |
| `.jpg`, `.jpeg`, `.png`, `.gif`, `.svg`, `.webp` | FileImageOutlined |
| All others | FileOutlined |

## Basic Usage

```tsx
import { AxFileItem } from "axmed-design-system"

function UploadedFile() {
  return (
    <AxFileItem
      name="purchase-order-2026-001.pdf"
      fileSize={2_450_000}
      status="success"
      onRemove={() => console.log("Remove file")}
    />
  )
}
```

## Examples

### All states

```tsx
import { AxFileItem } from "axmed-design-system"

function FileItemStates() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 480 }}>
      <AxFileItem
        name="supplier-catalog-2026.xlsx"
        fileSize={1_280_000}
        status="idle"
        onRemove={() => {}}
      />
      <AxFileItem
        name="shipment-manifest-KE-0042.pdf"
        fileSize={3_750_000}
        status="uploading"
        percent={65}
        onRemove={() => {}}
      />
      <AxFileItem
        name="quality-certificate-batch-A12.pdf"
        fileSize={890_000}
        status="success"
        onRemove={() => {}}
      />
      <AxFileItem
        name="invoice-INV-2026-0187.xlsx"
        fileSize={15_200_000}
        status="error"
        error="File exceeds 10MB limit"
        onRemove={() => {}}
        onRetry={() => console.log("Retry upload")}
      />
    </div>
  )
}
```

### With image preview

When uploading images, pass a preview URL to show a thumbnail instead of the file type icon.

```tsx
import { useState } from "react"
import { AxFileItem } from "axmed-design-system"

function ImageFileItems() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 480 }}>
      <AxFileItem
        name="product-photo-front.jpg"
        fileSize={4_200_000}
        status="success"
        preview="https://picsum.photos/seed/med1/80/80"
        onRemove={() => {}}
      />
      <AxFileItem
        name="certificate-scan.png"
        fileSize={2_100_000}
        status="success"
        preview="https://picsum.photos/seed/cert/80/80"
        onRemove={() => {}}
      />
    </div>
  )
}
```

### Upload progress flow

Simulates the lifecycle of a file moving through idle, uploading, and success states.

```tsx
import { useState, useEffect } from "react"
import { AxFileItem } from "axmed-design-system"

type FileStatus = "idle" | "uploading" | "success" | "error"

function UploadProgressDemo() {
  const [status, setStatus] = useState<FileStatus>("idle")
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    // Simulate upload on mount
    const start = setTimeout(() => setStatus("uploading"), 500)

    const intervals = [
      setTimeout(() => setPercent(25), 1000),
      setTimeout(() => setPercent(50), 1500),
      setTimeout(() => setPercent(75), 2000),
      setTimeout(() => setPercent(100), 2500),
      setTimeout(() => setStatus("success"), 2700),
    ]

    return () => {
      clearTimeout(start)
      intervals.forEach(clearTimeout)
    }
  }, [])

  return (
    <div style={{ maxWidth: 480 }}>
      <AxFileItem
        name="medication-inventory-Q1-2026.xlsx"
        fileSize={5_340_000}
        status={status}
        percent={percent}
        onRemove={() => setStatus("idle")}
      />
    </div>
  )
}
```

### Document list with mixed statuses

A realistic scenario showing a list of uploaded documents with varying statuses.

```tsx
import { AxFileItem } from "axmed-design-system"

const documents = [
  {
    id: "1",
    name: "purchase-order-PO-2026-0042.pdf",
    size: 1_560_000,
    status: "success" as const,
  },
  {
    id: "2",
    name: "gmp-certificate-supplier-A.pdf",
    size: 2_340_000,
    status: "success" as const,
  },
  {
    id: "3",
    name: "cold-chain-temperature-log.xlsx",
    size: 890_000,
    status: "uploading" as const,
    percent: 42,
  },
  {
    id: "4",
    name: "bill-of-lading-SHIP-KE-0187.pdf",
    size: 22_500_000,
    status: "error" as const,
    error: "File exceeds 10MB limit. Please compress and retry.",
  },
  {
    id: "5",
    name: "customs-declaration-form.docx",
    size: 456_000,
    status: "idle" as const,
  },
]

function DocumentList() {
  return (
    <div
      role="list"
      style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 520 }}
    >
      {documents.map((doc) => (
        <AxFileItem
          key={doc.id}
          name={doc.name}
          fileSize={doc.size}
          status={doc.status}
          percent={"percent" in doc ? doc.percent : undefined}
          error={"error" in doc ? doc.error : undefined}
          onRemove={() => console.log("Remove", doc.id)}
          onRetry={doc.status === "error" ? () => console.log("Retry", doc.id) : undefined}
        />
      ))}
    </div>
  )
}
```

## Related Components

- [AxUploader](./ax-uploader.md) -- drag-and-drop upload area that pairs with AxFileItem for displaying selected files
- [AxTable](https://ax-derrick.github.io/axmed-design-system/?path=/docs/data-display-axtable--docs) -- for document management views with richer column layouts

## Storybook

[View in Storybook](https://ax-derrick.github.io/axmed-design-system/?path=/docs/controls-axuploader-file-item--docs)
