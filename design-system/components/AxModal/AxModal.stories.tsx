import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Input, Form, Select, Upload, DatePicker, Checkbox, Flex, Alert } from "antd"
import {
  CheckCircleFilled,
  UploadOutlined,
} from "@ant-design/icons"

import AxModal from "."
import AxButton from "../AxButton"
import AxText from "../AxText"
import AxTag from "../AxTag"

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof AxModal> = {
  title: "Overlays/AxModal",
  component: AxModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Preset width: sm (380px), md (520px), lg (720px)",
    },
    danger: {
      control: "boolean",
      description: "Makes the primary action button red for destructive actions",
    },
    description: {
      control: "text",
      description: "Muted subtitle below the title",
    },
    centered: {
      control: "boolean",
      description: "Center the modal vertically (default: true)",
    },
  },
}

export default meta
type Story = StoryObj<typeof AxModal>

// ---------------------------------------------------------------------------
// Playground — all controls work here
// ---------------------------------------------------------------------------

export const Playground: Story = {
  name: "Playground",
  args: {
    title: "Modal Title",
    description: "This is a description below the title.",
    size: "md",
    danger: false,
    centered: true,
    okText: "Confirm",
    cancelText: "Cancel",
    children: "Modal body content goes here. Toggle the controls on the right to see changes.",
  },
  render: (args) => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <AxButton onClick={() => setOpen(true)}>Open Modal</AxButton>
        <AxModal
          {...args}
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        >
          <AxText variant="body-md" color="secondary">
            {args.children}
          </AxText>
        </AxModal>
      </>
    )
  },
}

// ===========================================================================
// TEMPLATES — reusable modal patterns
// ===========================================================================

// ---------------------------------------------------------------------------
// Confirmation — destructive actions (cancel order, delete, withdraw, discard)
// ---------------------------------------------------------------------------

export const Confirmation: Story = {
  name: "Template — Confirmation",

  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <AxButton variant="danger" onClick={() => setOpen(true)}>
          Cancel Order
        </AxButton>
        <AxModal
          title="Cancel this order?"
          description="This action cannot be undone. The order will be permanently cancelled and all associated bids will be withdrawn."
          open={open}
          danger
          size="sm"
          okText="Yes, Cancel Order"
          cancelText="Keep Order"
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        >
          <Alert
            type="warning"
            showIcon
            message="2 suppliers have already submitted bids for this order."
            style={{ borderRadius: 8 }}
          />
        </AxModal>
      </>
    )
  }
}

// ---------------------------------------------------------------------------
// Success — feedback after an action (order submitted, upload complete, etc.)
// ---------------------------------------------------------------------------

export const Success: Story = {
  name: "Template — Success",
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <AxButton onClick={() => setOpen(true)}>Submit Order</AxButton>
        <AxModal
          title="Order submitted successfully"
          description="Your order has been received and is being reviewed by our team."
          open={open}
          size="sm"
          footer={
            <AxButton onClick={() => setOpen(false)} style={{ width: "100%" }}>
              View Your Orders
            </AxButton>
          }
          onCancel={() => setOpen(false)}
        >
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <CheckCircleFilled style={{ fontSize: 48, color: "var(--green-600)" }} />
          </div>
        </AxModal>
      </>
    )
  },
}

// ---------------------------------------------------------------------------
// Form — input fields, selects, checkboxes (add address, edit profile, etc.)
// ---------------------------------------------------------------------------

export const FormModal: Story = {
  name: "Template — Form",
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <AxButton onClick={() => setOpen(true)}>Add Address</AxButton>
        <AxModal
          title="Add delivery address"
          description="This address will be available for all future orders."
          open={open}
          okText="Add Address"
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        >
          <Form layout="vertical">
            <Form.Item label="Address Name">
              <Input placeholder="e.g. Main Warehouse" />
            </Form.Item>
            <Flex gap={12}>
              <Form.Item label="Country" style={{ flex: 1 }}>
                <Select
                  placeholder="Select country"
                  options={[
                    { value: "ke", label: "Kenya" },
                    { value: "ng", label: "Nigeria" },
                    { value: "gh", label: "Ghana" },
                    { value: "tz", label: "Tanzania" },
                  ]}
                />
              </Form.Item>
              <Form.Item label="City" style={{ flex: 1 }}>
                <Select placeholder="Select city" options={[]} />
              </Form.Item>
            </Flex>
            <Form.Item label="Address Line" style={{ marginBottom: 8 }}>
              <Input placeholder="Street address, building, floor..." />
            </Form.Item>
            <Checkbox>Use as billing address</Checkbox>
          </Form>
        </AxModal>
      </>
    )
  },
}

// ---------------------------------------------------------------------------
// Detail View — read-only data display (supplier info, pack specs, etc.)
// ---------------------------------------------------------------------------

export const DetailView: Story = {
  name: "Template — Detail View",
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <AxButton variant="secondary" onClick={() => setOpen(true)}>
          View Supplier
        </AxButton>
        <AxModal
          title="Supplier Details"
          open={open}
          footer={
            <Flex gap={8} justify="flex-end">
              <AxButton variant="secondary" onClick={() => setOpen(false)}>
                View Full Profile
              </AxButton>
              <AxButton onClick={() => setOpen(false)}>Got It</AxButton>
            </Flex>
          }
          onCancel={() => setOpen(false)}
        >
          <div
            style={{
              background: "var(--neutral-50)",
              borderRadius: 8,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {[
              { label: "Supplier", value: "PharmaCorp Ltd" },
              { label: "Unit Price", value: "$2.40 / unit" },
              { label: "Lead Time", value: "14 days" },
              { label: "Remaining Shelf Life", value: "18 months" },
              { label: "Pack Specifications", value: "1000 tabs / bottle" },
            ].map((item) => (
              <Flex key={item.label} justify="space-between">
                <AxText variant="body-sm" color="secondary">{item.label}</AxText>
                <AxText variant="body-sm" weight="medium">{item.value}</AxText>
              </Flex>
            ))}
          </div>
        </AxModal>
      </>
    )
  },
}

// ---------------------------------------------------------------------------
// File Upload — drag-and-drop upload with optional form fields
// ---------------------------------------------------------------------------

export const FileUpload: Story = {
  name: "Template — File Upload",
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <AxButton onClick={() => setOpen(true)}>Upload Document</AxButton>
        <AxModal
          title="Upload compliance document"
          description="Upload your GMP certificate or regulatory document for verification."
          open={open}
          okText="Save"
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        >
          <Form layout="vertical">
            <Flex gap={12}>
              <Form.Item label="Date Issued" style={{ flex: 1 }}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Expiry Date" style={{ flex: 1 }}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Flex>
            <Form.Item label="Document" style={{ marginBottom: 0 }}>
              <Upload.Dragger
                name="file"
                accept=".pdf"
                maxCount={1}
                beforeUpload={() => false}
              >
                <p style={{ marginBottom: 4 }}>
                  <UploadOutlined style={{ fontSize: 24, color: "var(--neutral-600)" }} />
                </p>
                <AxText variant="body-sm">Click or drag PDF to upload</AxText>
                <AxText variant="body-xs" color="secondary">
                  PDF only, max 10MB
                </AxText>
              </Upload.Dragger>
            </Form.Item>
          </Form>
        </AxModal>
      </>
    )
  },
}

// ===========================================================================
// FEATURE DEMOS
// ===========================================================================

// ---------------------------------------------------------------------------
// Sizes — sm, default, lg side by side
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  name: "Feature — Sizes",
  render: () => {
    const [openSize, setOpenSize] = useState<"sm" | "md" | "lg" | null>(null)

    return (
      <Flex gap={8}>
        <AxButton variant="secondary" onClick={() => setOpenSize("sm")}>
          Small (380px)
        </AxButton>
        <AxButton variant="secondary" onClick={() => setOpenSize("md")}>
          Medium (520px)
        </AxButton>
        <AxButton variant="secondary" onClick={() => setOpenSize("lg")}>
          Large (720px)
        </AxButton>

        <AxModal
          title="Small modal"
          description="Compact size for simple confirmations."
          open={openSize === "sm"}
          size="sm"
          danger
          okText="Delete"
          onOk={() => setOpenSize(null)}
          onCancel={() => setOpenSize(null)}
        />

        <AxModal
          title="Medium modal"
          description="Standard size for forms and content."
          open={openSize === "md"}
          size="md"
          okText="Save"
          onOk={() => setOpenSize(null)}
          onCancel={() => setOpenSize(null)}
        >
          <AxText variant="body-md" color="secondary">
            This is the default 520px width, suitable for most forms and content.
          </AxText>
        </AxModal>

        <AxModal
          title="Large modal"
          description="Wide size for tables, lists, and complex content."
          open={openSize === "lg"}
          size="lg"
          footer={
            <AxButton onClick={() => setOpenSize(null)}>Close</AxButton>
          }
          onCancel={() => setOpenSize(null)}
        >
          <Flex vertical gap={8}>
            {[
              { name: "Amoxicillin 500mg", tone: "success" as const, label: "Awarded", price: "$1.20" },
              { name: "Metformin 850mg", tone: "info" as const, label: "In Review", price: "$0.85" },
              { name: "Ibuprofen 400mg", tone: "info" as const, label: "Submitted", price: "$0.45" },
              { name: "Artemether 20mg", tone: "warning" as const, label: "Not Awarded", price: "$3.10" },
            ].map((med) => (
              <Flex
                key={med.name}
                justify="space-between"
                align="center"
                style={{
                  padding: "12px 16px",
                  background: "var(--neutral-50)",
                  borderRadius: 8,
                }}
              >
                <AxText variant="body-sm" weight="medium">{med.name}</AxText>
                <Flex gap={12} align="center">
                  <AxText variant="body-sm" weight="medium">{med.price}</AxText>
                  <AxTag tone={med.tone}>
                    {med.label}
                  </AxTag>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </AxModal>
      </Flex>
    )
  },
}

// ---------------------------------------------------------------------------
// Loading — confirmLoading with async action
// ---------------------------------------------------------------------------

export const Loading: Story = {
  name: "Feature — Loading",
  render: () => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleOk = () => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setOpen(false)
      }, 2000)
    }

    return (
      <>
        <AxButton onClick={() => setOpen(true)}>Save Changes</AxButton>
        <AxModal
          title="Save changes?"
          description="Your changes will be applied immediately."
          open={open}
          okText="Save"
          confirmLoading={loading}
          onOk={handleOk}
          onCancel={() => setOpen(false)}
        >
          <AxText variant="body-md" color="secondary">
            This will update the medication details across all active orders.
          </AxText>
        </AxModal>
      </>
    )
  },
}
