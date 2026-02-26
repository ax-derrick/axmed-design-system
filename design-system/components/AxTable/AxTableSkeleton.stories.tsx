import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Flex } from "antd"

import AxTableSkeleton from "./TableSkeleton"
import AxButton from "../AxButton"
import AxTable from "./index"
import AxText from "../AxText"
import type { AxTableProps } from "./index"

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof AxTableSkeleton> = {
  title: "Data Display/AxTable/Skeleton",
  component: AxTableSkeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    rows: {
      control: { type: "number", min: 1, max: 20 },
      description: "Number of body rows (default: 5)",
    },
    showHeader: {
      control: "boolean",
      description: "Show the header skeleton row",
    },
  },
}

export default meta
type Story = StoryObj<typeof AxTableSkeleton>

// ---------------------------------------------------------------------------
// Playground — all controls work here
// ---------------------------------------------------------------------------

export const Playground: Story = {
  name: "Playground",
  args: {
    rows: 5,
    columns: 5,
    showHeader: true,
  },
}

// ===========================================================================
// TEMPLATES — production-ready usage patterns
// ===========================================================================

// ---------------------------------------------------------------------------
// Loading state toggle — shows skeleton → real table transition
// ---------------------------------------------------------------------------

type MedRow = { key: string; name: string; unit: string; price: string; lead: string; status: string }

const COLUMNS: AxTableProps<MedRow>["columns"] = [
  { key: "name", title: "Medication", dataIndex: "name", render: (v) => <strong>{v}</strong> },
  { key: "unit", title: "Unit", dataIndex: "unit" },
  { key: "price", title: "Unit Price", dataIndex: "price" },
  { key: "lead", title: "Lead Time", dataIndex: "lead" },
  { key: "status", title: "Status", dataIndex: "status" },
]

const DATA: MedRow[] = [
  { key: "1", name: "Amoxicillin 500mg", unit: "Capsule", price: "$1.20", lead: "14 days", status: "In Review" },
  { key: "2", name: "Metformin 850mg", unit: "Tablet", price: "$0.85", lead: "10 days", status: "Awarded" },
  { key: "3", name: "Ibuprofen 400mg", unit: "Tablet", price: "$0.45", lead: "7 days", status: "Submitted" },
  { key: "4", name: "Artemether 20mg", unit: "Tablet", price: "$3.10", lead: "21 days", status: "Pending" },
  { key: "5", name: "Paracetamol 500mg", unit: "Tablet", price: "$0.30", lead: "5 days", status: "Awarded" },
]

const SKELETON_COLS = [
  { flex: 2 },
  { flex: 1 },
  { flex: 1 },
  { flex: 1 },
  { flex: 1 },
]

export const LoadingTransition: Story = {
  name: "Template — Loading Transition",
  render: () => {
    const [loading, setLoading] = useState(true)

    return (
      <Flex vertical gap={16}>
        <Flex gap={8} align="center">
          <AxText variant="body-sm" color="secondary">
            {loading ? "Fetching data..." : "5 medications loaded"}
          </AxText>
          <AxButton
            size="sm"
            variant="secondary"
            onClick={() => setLoading((v) => !v)}
          >
            {loading ? "Simulate load complete" : "Reset to loading"}
          </AxButton>
        </Flex>

        {loading ? (
          <AxTableSkeleton rows={5} columns={SKELETON_COLS} />
        ) : (
          <AxTable columns={COLUMNS} dataSource={DATA} pagination={false} />
        )}
      </Flex>
    )
  },
}

// ===========================================================================
// FEATURE DEMOS
// ===========================================================================

// ---------------------------------------------------------------------------
// Column configs — equal vs custom widths
// ---------------------------------------------------------------------------

export const ColumnConfigs: Story = {
  name: "Feature — Column Configs",
  render: () => (
    <Flex vertical gap={24}>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8 }}>
          5 equal columns (pass a number)
        </AxText>
        <AxTableSkeleton columns={5} rows={3} />
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8 }}>
          Custom flex ratios — 2 : 1 : 1 : 1 : 1
        </AxText>
        <AxTableSkeleton
          rows={3}
          columns={[{ flex: 2 }, { flex: 1 }, { flex: 1 }, { flex: 1 }, { flex: 1 }]}
        />
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8 }}>
          No header
        </AxText>
        <AxTableSkeleton columns={4} rows={4} showHeader={false} />
      </div>
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}
