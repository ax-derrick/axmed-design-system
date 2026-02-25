import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Flex, Input, Divider, Avatar } from "antd"
import {
  UserOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"

import AxDrawer from "."
import AxButton from "../AxButton"
import AxText from "../AxText"
import AxTag from "../AxTag"

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof AxDrawer> = {
  title: "Design System/AxDrawer",
  component: AxDrawer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Preset width: sm (500px), md (600px), lg (640px)",
    },
    loading: {
      control: "boolean",
      description: "Show spinner overlay over the drawer body",
    },
    description: {
      control: "text",
      description: "Muted subtitle below the title",
    },
  },
}

export default meta
type Story = StoryObj<typeof AxDrawer>

// ---------------------------------------------------------------------------
// Playground — all controls work here
// ---------------------------------------------------------------------------

export const Playground: Story = {
  name: "Playground",
  args: {
    title: "Drawer Title",
    description: "This is a description below the title.",
    size: "md",
    loading: false,
    children: "Drawer body content goes here. Toggle the controls to explore.",
  },
  render: (args) => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <AxButton onClick={() => setOpen(true)}>Open Drawer</AxButton>
        <AxDrawer
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={
            <Flex justify="flex-end" gap={8}>
              <AxButton variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </AxButton>
              <AxButton onClick={() => setOpen(false)}>Save</AxButton>
            </Flex>
          }
        >
          <AxText variant="body-md" color="secondary">
            {String(args.children)}
          </AxText>
        </AxDrawer>
      </>
    )
  },
}

// ===========================================================================
// TEMPLATES — real-world drawer patterns from the marketplace
// ===========================================================================

// ---------------------------------------------------------------------------
// Detail View — read-only data panel (sm: 500px)
// BidDetailsModal / PurchaseOrderDrawer pattern
// ---------------------------------------------------------------------------

export const DetailView: Story = {
  name: "Template — Detail View",
  render: () => {
    const [open, setOpen] = useState(false)

    const lineItems = [
      { name: "Amoxicillin 500mg Capsules", qty: "5,000 units", price: "$1.20/unit", total: "$6,000" },
      { name: "Metformin 850mg Tablets", qty: "10,000 units", price: "$0.85/unit", total: "$8,500" },
      { name: "Ibuprofen 400mg Tablets", qty: "20,000 units", price: "$0.45/unit", total: "$9,000" },
    ]

    return (
      <>
        <AxButton variant="secondary" onClick={() => setOpen(true)}>
          View Bid Details
        </AxButton>
        <AxDrawer
          title="Bid #BID-2024-0892"
          description="Submitted by PharmaCorp Ltd · 3 days ago"
          size="sm"
          open={open}
          onClose={() => setOpen(false)}
          footer={
            <Flex justify="flex-end" gap={8}>
              <AxButton variant="secondary" onClick={() => setOpen(false)}>
                Reject
              </AxButton>
              <AxButton onClick={() => setOpen(false)}>Accept Bid</AxButton>
            </Flex>
          }
        >
          <Flex vertical gap={24}>
            {/* Status */}
            <Flex justify="space-between" align="center">
              <AxText variant="body-sm" color="secondary">Status</AxText>
              <AxTag tone="info" dot>In Review</AxTag>
            </Flex>

            <Divider style={{ margin: 0 }} />

            {/* Line items */}
            <Flex vertical gap={12}>
              <AxText variant="body-sm" weight="medium">Line Items</AxText>
              {lineItems.map((item) => (
                <div
                  key={item.name}
                  style={{
                    background: "var(--neutral-50)",
                    borderRadius: 8,
                    padding: "12px 16px",
                  }}
                >
                  <Flex justify="space-between" align="center">
                    <AxText variant="body-sm" weight="medium">{item.name}</AxText>
                    <AxText variant="body-sm" weight="semibold">{item.total}</AxText>
                  </Flex>
                  <AxText variant="body-xs" color="secondary">
                    {item.qty} × {item.price}
                  </AxText>
                </div>
              ))}
            </Flex>

            <Divider style={{ margin: 0 }} />

            {/* Summary */}
            {[
              { label: "Subtotal", value: "$23,500" },
              { label: "Lead Time", value: "14 days" },
              { label: "Valid Until", value: "Dec 31, 2024" },
            ].map((row) => (
              <Flex key={row.label} justify="space-between">
                <AxText variant="body-sm" color="secondary">{row.label}</AxText>
                <AxText variant="body-sm" weight="medium">{row.value}</AxText>
              </Flex>
            ))}
          </Flex>
        </AxDrawer>
      </>
    )
  },
}

// ---------------------------------------------------------------------------
// Form — input fields with submit action (md: 600px)
// ReviewQuantityModal pattern
// ---------------------------------------------------------------------------

export const FormDrawer: Story = {
  name: "Template — Form",
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <AxButton onClick={() => setOpen(true)}>Review & Submit Bid</AxButton>
        <AxDrawer
          title="Review quantities"
          description="Confirm the quantities you can supply before submitting."
          size="md"
          open={open}
          onClose={() => setOpen(false)}
          footer={
            <Flex justify="space-between">
              <AxButton variant="ghost" onClick={() => setOpen(false)}>
                Back
              </AxButton>
              <AxButton onClick={() => setOpen(false)}>Accept & Continue</AxButton>
            </Flex>
          }
        >
          <Flex vertical gap={16}>
            {[
              { label: "Amoxicillin 500mg", requested: "5,000 units" },
              { label: "Metformin 850mg", requested: "10,000 units" },
              { label: "Ibuprofen 400mg", requested: "20,000 units" },
            ].map((item) => (
              <div key={item.label}>
                <Flex justify="space-between" align="center" style={{ marginBottom: 8 }}>
                  <AxText variant="body-sm" weight="medium">{item.label}</AxText>
                  <AxText variant="body-xs" color="secondary">Requested: {item.requested}</AxText>
                </Flex>
                <Input placeholder="Enter quantity you can supply" suffix="units" />
              </div>
            ))}
            <div>
              <AxText variant="body-sm" weight="medium" style={{ display: "block", marginBottom: 8 }}>
                Notes (optional)
              </AxText>
              <Input.TextArea
                placeholder="Add any notes about availability, lead times, or substitutions..."
                rows={3}
              />
            </div>
          </Flex>
        </AxDrawer>
      </>
    )
  },
}

// ---------------------------------------------------------------------------
// Multi-Step — step navigation with Back/Next (md: 600px)
// ConfirmModal → AddressSelectionDrawer pattern
// ---------------------------------------------------------------------------

export const MultiStep: Story = {
  name: "Template — Multi-Step",
  render: () => {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState(0)

    const steps = [
      { title: "Confirm order details", description: "Step 1 of 3 — Review your order before proceeding." },
      { title: "Select delivery address", description: "Step 2 of 3 — Choose where to deliver this order." },
      { title: "Review & submit", description: "Step 3 of 3 — Final confirmation before submitting." },
    ]

    const handleOpen = () => {
      setStep(0)
      setOpen(true)
    }

    const handleClose = () => setOpen(false)

    return (
      <>
        <AxButton onClick={handleOpen}>Place Order</AxButton>
        <AxDrawer
          title={steps[step].title}
          description={steps[step].description}
          size="md"
          open={open}
          onClose={handleClose}
          footer={
            <Flex justify="space-between">
              {step > 0 ? (
                <AxButton variant="ghost" onClick={() => setStep((s) => s - 1)}>
                  Back
                </AxButton>
              ) : (
                <AxButton variant="ghost" onClick={handleClose}>
                  Cancel
                </AxButton>
              )}
              {step < steps.length - 1 ? (
                <AxButton onClick={() => setStep((s) => s + 1)}>Next</AxButton>
              ) : (
                <AxButton onClick={handleClose}>Submit Order</AxButton>
              )}
            </Flex>
          }
        >
          {step === 0 && (
            <Flex vertical gap={12}>
              {[
                { label: "Medication", value: "Amoxicillin 500mg — 5,000 units" },
                { label: "Unit Price", value: "$1.20" },
                { label: "Total", value: "$6,000" },
                { label: "Delivery", value: "14 days lead time" },
              ].map((row) => (
                <Flex key={row.label} justify="space-between" style={{ padding: "8px 0", borderBottom: "1px solid var(--neutral-100)" }}>
                  <AxText variant="body-sm" color="secondary">{row.label}</AxText>
                  <AxText variant="body-sm" weight="medium">{row.value}</AxText>
                </Flex>
              ))}
            </Flex>
          )}
          {step === 1 && (
            <Flex vertical gap={8}>
              {[
                { name: "Main Warehouse", address: "Mombasa Rd, Nairobi" },
                { name: "Clinic Branch", address: "Kimathi St, Nairobi" },
                { name: "Distribution Center", address: "Industrial Area, Mombasa" },
              ].map((addr) => (
                <div
                  key={addr.name}
                  style={{
                    padding: "14px 16px",
                    border: "1px solid var(--neutral-200)",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  <AxText variant="body-sm" weight="medium">{addr.name}</AxText>
                  <AxText variant="body-xs" color="secondary">{addr.address}</AxText>
                </div>
              ))}
            </Flex>
          )}
          {step === 2 && (
            <Flex vertical gap={16}>
              <div
                style={{
                  background: "var(--neutral-50)",
                  borderRadius: 8,
                  padding: 16,
                }}
              >
                <Flex vertical gap={8}>
                  {[
                    { label: "Medication", value: "Amoxicillin 500mg — 5,000 units" },
                    { label: "Delivery to", value: "Main Warehouse, Mombasa Rd" },
                    { label: "Total amount", value: "$6,000" },
                  ].map((row) => (
                    <Flex key={row.label} justify="space-between">
                      <AxText variant="body-sm" color="secondary">{row.label}</AxText>
                      <AxText variant="body-sm" weight="medium">{row.value}</AxText>
                    </Flex>
                  ))}
                </Flex>
              </div>
              <AxText variant="body-sm" color="secondary">
                By submitting, you agree to the order terms and conditions.
              </AxText>
            </Flex>
          )}
        </AxDrawer>
      </>
    )
  },
}

// ---------------------------------------------------------------------------
// Profile — wider side panel with rich content (lg: 640px)
// SideProfile pattern
// ---------------------------------------------------------------------------

export const Profile: Story = {
  name: "Template — Profile",
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <AxButton variant="secondary" onClick={() => setOpen(true)}>
          View Supplier Profile
        </AxButton>
        <AxDrawer
          title="PharmaCorp Ltd"
          description="Verified supplier · Nairobi, Kenya"
          size="lg"
          open={open}
          onClose={() => setOpen(false)}
          destroyOnHidden
          footer={
            <Flex justify="flex-end">
              <AxButton onClick={() => setOpen(false)}>Close</AxButton>
            </Flex>
          }
        >
          <Flex vertical gap={24}>
            {/* Identity */}
            <Flex gap={16} align="center">
              <Avatar size={64} icon={<UserOutlined />} style={{ background: "var(--purple-600)" }} />
              <Flex vertical gap={4}>
                <AxText variant="body-lg" weight="semibold">PharmaCorp Ltd</AxText>
                <AxTag tone="success" dot>Verified</AxTag>
              </Flex>
            </Flex>

            <Divider style={{ margin: 0 }} />

            {/* Contact */}
            <Flex vertical gap={12}>
              <AxText variant="body-sm" weight="medium">Contact Information</AxText>
              {[
                { icon: <MailOutlined />, value: "contact@pharmacorp.co.ke" },
                { icon: <PhoneOutlined />, value: "+254 712 345 678" },
                { icon: <EnvironmentOutlined />, value: "Mombasa Rd, Nairobi, Kenya" },
              ].map(({ icon, value }) => (
                <Flex key={value} gap={8} align="center">
                  <span style={{ color: "var(--neutral-400)", fontSize: 14 }}>{icon}</span>
                  <AxText variant="body-sm" color="secondary">{value}</AxText>
                </Flex>
              ))}
            </Flex>

            <Divider style={{ margin: 0 }} />

            {/* Stats */}
            <Flex vertical gap={12}>
              <AxText variant="body-sm" weight="medium">Performance</AxText>
              <Flex gap={12}>
                {[
                  { label: "Orders Fulfilled", value: "142" },
                  { label: "On-Time Rate", value: "96%" },
                  { label: "Avg Lead Time", value: "11 days" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      flex: 1,
                      background: "var(--neutral-50)",
                      borderRadius: 8,
                      padding: "12px 16px",
                      textAlign: "center",
                    }}
                  >
                    <AxText variant="body-lg" weight="semibold">{stat.value}</AxText>
                    <AxText variant="body-xs" color="secondary">{stat.label}</AxText>
                  </div>
                ))}
              </Flex>
            </Flex>

            <Divider style={{ margin: 0 }} />

            {/* Recent bids */}
            <Flex vertical gap={12}>
              <AxText variant="body-sm" weight="medium">Recent Bids</AxText>
              {[
                { name: "Amoxicillin 500mg", tone: "success" as const, label: "Awarded", date: "Dec 10" },
                { name: "Metformin 850mg", tone: "info" as const, label: "In Review", date: "Dec 14" },
                { name: "Ibuprofen 400mg", tone: "neutral" as const, label: "Pending", date: "Dec 18" },
              ].map((bid) => (
                <Flex key={bid.name} justify="space-between" align="center">
                  <Flex gap={8} align="center">
                    <FileTextOutlined style={{ color: "var(--neutral-400)" }} />
                    <AxText variant="body-sm">{bid.name}</AxText>
                  </Flex>
                  <Flex gap={8} align="center">
                    <AxText variant="body-xs" color="secondary">
                      <ClockCircleOutlined style={{ marginRight: 4 }} />
                      {bid.date}
                    </AxText>
                    <AxTag tone={bid.tone} small>{bid.label}</AxTag>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </AxDrawer>
      </>
    )
  },
}

// ===========================================================================
// FEATURE DEMOS
// ===========================================================================

// ---------------------------------------------------------------------------
// Sizes — sm, md, lg side by side
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  name: "Feature — Sizes",
  render: () => {
    const [openSize, setOpenSize] = useState<"sm" | "md" | "lg" | null>(null)

    return (
      <Flex gap={8}>
        <AxButton variant="secondary" onClick={() => setOpenSize("sm")}>
          Small (500px)
        </AxButton>
        <AxButton variant="secondary" onClick={() => setOpenSize("md")}>
          Medium (600px)
        </AxButton>
        <AxButton variant="secondary" onClick={() => setOpenSize("lg")}>
          Large (640px)
        </AxButton>

        {(["sm", "md", "lg"] as const).map((s) => (
          <AxDrawer
            key={s}
            title={`${s.toUpperCase()} drawer`}
            description={{
              sm: "500px — detail views, confirmations",
              md: "600px — forms, multi-step flows",
              lg: "640px — profiles, rich side panels",
            }[s]}
            size={s}
            open={openSize === s}
            onClose={() => setOpenSize(null)}
            footer={
              <Flex justify="flex-end">
                <AxButton onClick={() => setOpenSize(null)}>Close</AxButton>
              </Flex>
            }
          >
            <AxText variant="body-md" color="secondary">
              This is the {s} size ({sizeLabels[s]}) — use it for{" "}
              {sizeUseCase[s]}.
            </AxText>
          </AxDrawer>
        ))}
      </Flex>
    )
  },
}

const sizeLabels = { sm: "500px", md: "600px", lg: "640px" }
const sizeUseCase = {
  sm: "detail views and simple confirmations",
  md: "forms and multi-step flows",
  lg: "profiles and content-rich side panels",
}

// ---------------------------------------------------------------------------
// Loading — spinner overlay during async fetch
// ---------------------------------------------------------------------------

export const Loading: Story = {
  name: "Feature — Loading",
  render: () => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleOpen = () => {
      setOpen(true)
      setLoading(true)
      setTimeout(() => setLoading(false), 2000)
    }

    return (
      <>
        <AxButton variant="secondary" onClick={handleOpen}>
          View Purchase Order
        </AxButton>
        <AxDrawer
          title="Purchase Order #PO-2024-0044"
          description="Loading order details..."
          size="sm"
          open={open}
          loading={loading}
          onClose={() => setOpen(false)}
          footer={
            <Flex justify="flex-end">
              <AxButton onClick={() => setOpen(false)}>Close</AxButton>
            </Flex>
          }
        >
          <Flex vertical gap={12}>
            {[
              { label: "Supplier", value: "PharmaCorp Ltd" },
              { label: "Total Value", value: "$23,500" },
              { label: "Status", value: "Confirmed" },
              { label: "Expected Delivery", value: "Jan 15, 2025" },
            ].map((row) => (
              <Flex key={row.label} justify="space-between" style={{ padding: "8px 0", borderBottom: "1px solid var(--neutral-100)" }}>
                <AxText variant="body-sm" color="secondary">{row.label}</AxText>
                <AxText variant="body-sm" weight="medium">{row.value}</AxText>
              </Flex>
            ))}
          </Flex>
        </AxDrawer>
      </>
    )
  },
}
