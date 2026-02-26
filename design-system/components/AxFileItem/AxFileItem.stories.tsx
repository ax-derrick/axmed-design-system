import { useState, useEffect } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Flex } from "antd"

import AxFileItem from "."
import type { AxFileItemStatus } from "."
import AxUploader from "../AxUploader"
import AxText from "../AxText"

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof AxFileItem> = {
  title: "Controls/AxUploader/File Item",
  component: AxFileItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    name: {
      control: "text",
      description: "File name",
    },
    fileSize: {
      control: "number",
      description: "File size in bytes",
    },
    status: {
      control: "select",
      options: ["idle", "uploading", "success", "error"],
      description: "Current file status",
    },
    percent: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Upload progress (0–100)",
    },
    error: {
      control: "text",
      description: "Error message shown when status is error",
    },
    icon: {
      control: false,
      description: "Override the auto-detected file type icon",
    },
    preview: {
      control: "text",
      description: "Image URL for thumbnail preview (replaces icon)",
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Component size preset",
    },
    disabled: {
      control: "boolean",
      description: "Disable all interactions",
    },
  },
}

export default meta
type Story = StoryObj<typeof AxFileItem>

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  name: "Playground",
  args: {
    name: "portfolio-2025.xlsx",
    fileSize: 2_560_000,
    status: "idle",
    percent: 0,
    error: "",
    size: "md",
    disabled: false,
  },
  render: (args) => (
    <div style={{ width: 420 }}>
      <AxFileItem
        {...args}
        onRemove={() => console.log("Remove clicked")}
        onRetry={() => console.log("Retry clicked")}
      />
    </div>
  ),
}

// ===========================================================================
// FEATURE DEMOS
// ===========================================================================

// ---------------------------------------------------------------------------
// All States — idle, uploading, success, error stacked
// ---------------------------------------------------------------------------

export const AllStates: Story = {
  name: "Feature — All States",
  render: () => (
    <Flex vertical gap={12} style={{ width: 420 }}>
      <AxFileItem
        name="report-q4.xlsx"
        fileSize={1_200_000}
        status="idle"
        onRemove={() => {}}
      />
      <AxFileItem
        name="pricing-list.csv"
        fileSize={800_000}
        status="uploading"
        percent={45}
        onRemove={() => {}}
      />
      <AxFileItem
        name="gmp-certificate.pdf"
        fileSize={3_500_000}
        status="success"
        onRemove={() => {}}
      />
      <AxFileItem
        name="batch-records.docx"
        fileSize={15_000_000}
        status="error"
        error="File exceeds 10MB limit"
        onRemove={() => {}}
        onRetry={() => {}}
      />
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// Progress — uploading at various percentages
// ---------------------------------------------------------------------------

export const Progress: Story = {
  name: "Feature — Progress",
  render: () => (
    <Flex vertical gap={12} style={{ width: 420 }}>
      {[0, 25, 50, 75, 100].map((p) => (
        <AxFileItem
          key={p}
          name={`upload-${p}pct.xlsx`}
          fileSize={2_000_000}
          status="uploading"
          percent={p}
          onRemove={() => {}}
        />
      ))}
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// Image Preview — thumbnail instead of file icon
// ---------------------------------------------------------------------------

export const ImagePreview: Story = {
  name: "Feature — Image Preview",
  render: () => (
    <Flex vertical gap={12} style={{ width: 420 }}>
      <AxFileItem
        name="product-photo.jpg"
        fileSize={1_800_000}
        status="success"
        preview="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop"
        onRemove={() => {}}
      />
      <AxFileItem
        name="gmp-facility.png"
        fileSize={3_200_000}
        status="uploading"
        percent={65}
        preview="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=80&h=80&fit=crop"
        onRemove={() => {}}
      />
      <AxFileItem
        name="warehouse-layout.jpg"
        fileSize={12_500_000}
        status="error"
        error="File exceeds 10MB limit"
        preview="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=80&h=80&fit=crop"
        onRemove={() => {}}
        onRetry={() => {}}
      />
      <AxFileItem
        name="batch-report.pdf"
        fileSize={900_000}
        status="idle"
        onRemove={() => {}}
      />
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// Sizes — sm vs md
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  name: "Size — sm vs md",
  render: () => (
    <Flex vertical gap={24} style={{ width: 420 }}>
      <div>
        <AxText variant="body-sm" color="secondary" style={{ marginBottom: 8, display: "block" }}>
          Small — for modals and drawers
        </AxText>
        <AxFileItem
          name="portfolio.xlsx"
          fileSize={2_500_000}
          status="uploading"
          percent={60}
          size="sm"
          onRemove={() => {}}
        />
      </div>
      <div>
        <AxText variant="body-sm" color="secondary" style={{ marginBottom: 8, display: "block" }}>
          Medium (default)
        </AxText>
        <AxFileItem
          name="portfolio.xlsx"
          fileSize={2_500_000}
          status="uploading"
          percent={60}
          size="md"
          onRemove={() => {}}
        />
      </div>
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}

// ===========================================================================
// TEMPLATES
// ===========================================================================

// ---------------------------------------------------------------------------
// Upload Flow — AxUploader + AxFileItem with simulated progress
// ---------------------------------------------------------------------------

export const UploadFlow: Story = {
  name: "Template — Upload Flow",
  render: () => {
    const [file, setFile] = useState<{ name: string; size: number } | null>(null)
    const [status, setStatus] = useState<AxFileItemStatus>("idle")
    const [percent, setPercent] = useState(0)

    useEffect(() => {
      if (status !== "uploading") return
      const interval = setInterval(() => {
        setPercent((p) => {
          if (p >= 100) {
            clearInterval(interval)
            setStatus("success")
            return 100
          }
          return p + 10
        })
      }, 300)
      return () => clearInterval(interval)
    }, [status])

    return (
      <Flex vertical gap={16} style={{ width: 420 }}>
        <AxUploader
          hint="Supports .xlsx, .xls and .csv (max 10MB)"
          accept=".xlsx,.xls,.csv"
          maxSizeMB={10}
          size="sm"
          beforeUpload={(f) => {
            setFile({ name: f.name, size: f.size })
            setStatus("uploading")
            setPercent(0)
            return false
          }}
        />
        {file && (
          <AxFileItem
            name={file.name}
            fileSize={file.size}
            status={status}
            percent={percent}
            onRemove={() => {
              setFile(null)
              setStatus("idle")
              setPercent(0)
            }}
          />
        )}
      </Flex>
    )
  },
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// Document List — compliance documents
// ---------------------------------------------------------------------------

export const DocumentList: Story = {
  name: "Template — Document List",
  render: () => (
    <Flex vertical gap={12} style={{ width: 420 }}>
      <AxText variant="heading-sm">Compliance Documents</AxText>
      <div role="list">
        <Flex vertical gap={8}>
          <AxFileItem
            name="gmp-certificate-2025.pdf"
            fileSize={3_200_000}
            status="success"
            onRemove={() => {}}
          />
          <AxFileItem
            name="who-prequal-letter.pdf"
            fileSize={1_800_000}
            status="success"
            onRemove={() => {}}
          />
          <AxFileItem
            name="iso-13485-audit.pdf"
            fileSize={5_400_000}
            status="uploading"
            percent={67}
            onRemove={() => {}}
          />
          <AxFileItem
            name="batch-release-form.docx"
            fileSize={900_000}
            status="idle"
            onRemove={() => {}}
          />
        </Flex>
      </div>
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}

// ===========================================================================
// PATTERNS
// ===========================================================================

// ---------------------------------------------------------------------------
// Multi-File Upload — AxUploader + growing list with mixed statuses
// ---------------------------------------------------------------------------

export const MultiFileUpload: Story = {
  name: "Pattern — Multi-File Upload",
  render: () => {
    type FileEntry = {
      name: string
      size: number
      status: AxFileItemStatus
      percent: number
      error?: string
    }

    const [files, setFiles] = useState<FileEntry[]>([
      {
        name: "amoxicillin-pricing.xlsx",
        size: 2_100_000,
        status: "success",
        percent: 100,
      },
      {
        name: "metformin-catalog.csv",
        size: 800_000,
        status: "error",
        percent: 45,
        error: "Network timeout — please retry",
      },
    ])

    return (
      <Flex vertical gap={16} style={{ width: 420 }}>
        <AxUploader
          description="Drag & drop or choose file to upload"
          hint="Supports .xlsx, .xls, .csv, .pdf (max 10MB)"
          accept=".xlsx,.xls,.csv,.pdf"
          multiple
          maxSizeMB={10}
          beforeUpload={(f) => {
            setFiles((prev) => [
              ...prev,
              {
                name: f.name,
                size: f.size,
                status: "uploading" as const,
                percent: 30,
              },
            ])
            return false
          }}
        />
        {files.length > 0 && (
          <div role="list">
            <Flex vertical gap={8}>
              {files.map((f, i) => (
                <AxFileItem
                  key={`${f.name}-${i}`}
                  name={f.name}
                  fileSize={f.size}
                  status={f.status}
                  percent={f.percent}
                  error={f.error}
                  onRemove={() =>
                    setFiles((prev) => prev.filter((_, j) => j !== i))
                  }
                  onRetry={
                    f.status === "error"
                      ? () => {
                          setFiles((prev) =>
                            prev.map((file, j) =>
                              j === i
                                ? {
                                    ...file,
                                    status: "uploading" as const,
                                    percent: 0,
                                    error: undefined,
                                  }
                                : file
                            )
                          )
                        }
                      : undefined
                  }
                />
              ))}
            </Flex>
          </div>
        )}
      </Flex>
    )
  },
  parameters: { controls: { disable: true } },
}
