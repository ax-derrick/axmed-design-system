import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Flex } from "antd"

import AxUploader from "."
import AxFileItem from "../AxFileItem"
import AxButton from "../AxButton"
import AxText from "../AxText"
import AxModal from "../AxModal"

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof AxUploader> = {
  title: "Controls/AxUploader",
  component: AxUploader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    description: {
      control: "text",
      description: "Main text inside the drop zone",
    },
    hint: {
      control: "text",
      description: "Helper text below the description",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Drop zone size preset",
    },
    maxSizeMB: {
      control: "number",
      description: "Max file size in MB",
    },
    accept: {
      control: "text",
      description: "Accepted file types (MIME or extensions)",
    },
    disabled: {
      control: "boolean",
      description: "Disable the upload zone",
    },
  },
}

export default meta
type Story = StoryObj<typeof AxUploader>

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  name: "Playground",
  args: {
    description: "Drag & drop or choose file to upload",
    hint: "Supports .xlsx, .xls and .csv (max 10MB)",
    size: "md",
    maxSizeMB: 10,
    accept: ".xlsx,.xls,.csv",
    disabled: false,
  },
  render: (args) => (
    <div style={{ width: 420 }}>
      <AxUploader
        {...args}
        beforeUpload={(file) => {
          console.log("File selected:", file.name)
          return false
        }}
      />
    </div>
  ),
}

// ===========================================================================
// TEMPLATES
// ===========================================================================

// ---------------------------------------------------------------------------
// Portfolio Upload — full flow inside a modal
// ---------------------------------------------------------------------------

export const PortfolioUpload: Story = {
  name: "Template — Portfolio Upload",
  render: () => {
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState<File | null>(null)

    return (
      <>
        <AxButton onClick={() => setOpen(true)}>Upload Portfolio</AxButton>
        <AxModal
          title="Upload Your Portfolio"
          description="Upload a CSV or Excel file with your product catalog."
          open={open}
          onCancel={() => {
            setOpen(false)
            setFile(null)
          }}
          footer={
            <Flex justify="flex-end" gap={8}>
              <AxButton
                variant="secondary"
                onClick={() => {
                  setOpen(false)
                  setFile(null)
                }}
              >
                Cancel
              </AxButton>
              <AxButton disabled={!file} onClick={() => console.log("Upload:", file?.name)}>
                Continue
              </AxButton>
            </Flex>
          }
        >
          <Flex vertical gap={16}>
            {!file ? (
              <AxUploader
                hint="Supports .xlsx, .xls and .csv files (max 10MB)"
                accept=".xlsx,.xls,.csv"
                maxSizeMB={10}
                size="sm"
                beforeUpload={(f) => {
                  setFile(f as unknown as File)
                  return false
                }}
              />
            ) : (
              <AxFileItem
                name={file.name}
                fileSize={file.size}
                status="success"
                onRemove={() => setFile(null)}
              />
            )}
            <Flex
              gap={8}
              align="flex-start"
              style={{
                padding: "10px 12px",
                background: "var(--orange-50)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--orange-200)",
              }}
            >
              <AxText variant="body-xs" color="secondary">
                Inaccurate information may negatively impact your match rate with buyer requests.
              </AxText>
            </Flex>
          </Flex>
        </AxModal>
      </>
    )
  },
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// Document Upload — compliance documents
// ---------------------------------------------------------------------------

export const DocumentUpload: Story = {
  name: "Template — Document Upload",
  render: () => {
    const [files, setFiles] = useState<{ name: string; size: number }[]>([])

    return (
      <Flex vertical gap={16} style={{ width: 420 }}>
        <AxText variant="heading-sm">Compliance Documents</AxText>
        <AxText variant="body-sm" color="secondary">
          Upload your GMP certificate, WHO prequalification, or other regulatory documents.
        </AxText>
        <AxUploader
          description="Drag & drop or choose file to upload"
          hint="Supports .pdf, .jpg, .png (max 5MB)"
          accept=".pdf,.jpg,.jpeg,.png"
          maxSizeMB={5}
          multiple
          beforeUpload={(file) => {
            setFiles((prev) => [...prev, { name: file.name, size: file.size }])
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
                  status="success"
                  onRemove={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
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

// ===========================================================================
// FEATURE DEMOS
// ===========================================================================

// ---------------------------------------------------------------------------
// Sizes — sm, md, lg side by side
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  name: "Feature — Sizes",
  render: () => (
    <Flex vertical gap={24} style={{ width: 420 }}>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8, display: "block" }}>
          Small — for inside modals
        </AxText>
        <AxUploader size="sm" hint="max 10MB" />
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8, display: "block" }}>
          Medium (default)
        </AxText>
        <AxUploader size="md" hint="max 10MB" />
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8, display: "block" }}>
          Large — full-width page uploader
        </AxText>
        <AxUploader size="lg" hint="max 10MB" />
      </div>
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// File Validation — maxSizeMB and accept restrictions
// ---------------------------------------------------------------------------

export const FileValidation: Story = {
  name: "Feature — File Validation",
  render: () => {
    const [log, setLog] = useState<string[]>([])

    return (
      <Flex vertical gap={16} style={{ width: 420 }}>
        <AxUploader
          hint="Only .csv and .xlsx accepted — max 2MB"
          accept=".csv,.xlsx"
          maxSizeMB={2}
          beforeUpload={(file) => {
            setLog((prev) => [
              `${file.name} (${(file.size / 1024).toFixed(1)} KB) — accepted`,
              ...prev,
            ].slice(0, 5))
            return false
          }}
        />
        {log.length > 0 && (
          <Flex vertical gap={4}>
            <AxText variant="body-xs" color="secondary">Upload log:</AxText>
            {log.map((entry, i) => (
              <AxText key={i} variant="body-xs" color={i === 0 ? "primary" : "secondary"}>
                {entry}
              </AxText>
            ))}
          </Flex>
        )}
      </Flex>
    )
  },
  parameters: { controls: { disable: true } },
}
