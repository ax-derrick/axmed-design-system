import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Flex, Tooltip, Badge } from "antd"
import {
  CheckCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined,
  CarOutlined,
  InfoCircleOutlined,
  EyeOutlined,
  EditOutlined,
  InboxOutlined,
} from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"

import AxTable from "./index"
import type { AxTableRowState } from "./index"
import AxText from "../AxText"
import AxButton from "../AxButton"
import AxTag from "../AxTag"
import type { AxTagTone } from "../AxTag"
import AxEmptyState from "../AxEmptyState"
import AxCountryTags from "../AxTag/CountryTags"

// ---------------------------------------------------------------------------
// Sample data — pharmaceutical domain
// ---------------------------------------------------------------------------

interface Medication {
  key: string
  name: string
  genericName: string
  dosage: string
  form: "Tablet" | "Capsule" | "Injection" | "Syrup" | "Inhaler"
  manufacturer: string
  batchNumber: string
  expiryDate: string
  unitPrice: number
  quantity: number
  status: "In Stock" | "Low Stock" | "Out of Stock" | "Expired"
  countries: string[]
  category: string
}

const sampleData: Medication[] = [
  { key: "1", name: "Amoxicillin", genericName: "Amoxicillin Trihydrate", dosage: "500mg", form: "Capsule", manufacturer: "Cipla Ltd", batchNumber: "AMX-2025-001", expiryDate: "2027-03-15", unitPrice: 0.45, quantity: 12000, status: "In Stock", countries: ["Kenya", "Nigeria", "Ghana", "Tanzania", "Uganda"], category: "Antibiotics" },
  { key: "2", name: "Metformin", genericName: "Metformin Hydrochloride", dosage: "850mg", form: "Tablet", manufacturer: "Novartis", batchNumber: "MET-2025-014", expiryDate: "2027-06-20", unitPrice: 0.32, quantity: 8500, status: "In Stock", countries: ["Kenya", "South Africa"], category: "Antidiabetics" },
  { key: "3", name: "Ibuprofen", genericName: "Ibuprofen", dosage: "400mg", form: "Tablet", manufacturer: "GSK", batchNumber: "IBU-2025-007", expiryDate: "2026-11-30", unitPrice: 0.18, quantity: 350, status: "Low Stock", countries: ["Nigeria", "Ghana", "Senegal"], category: "Analgesics" },
  { key: "4", name: "Artemether/Lumefantrine", genericName: "Artemether + Lumefantrine", dosage: "20/120mg", form: "Tablet", manufacturer: "Sanofi", batchNumber: "ART-2025-003", expiryDate: "2027-01-10", unitPrice: 1.85, quantity: 6200, status: "In Stock", countries: ["Kenya", "Nigeria", "Tanzania", "Mozambique", "DRC", "Uganda"], category: "Antimalarials" },
  { key: "5", name: "Paracetamol", genericName: "Acetaminophen", dosage: "500mg", form: "Tablet", manufacturer: "Emzor Pharma", batchNumber: "PAR-2025-022", expiryDate: "2026-08-05", unitPrice: 0.08, quantity: 25000, status: "In Stock", countries: ["Nigeria"], category: "Analgesics" },
  { key: "6", name: "Azithromycin", genericName: "Azithromycin Dihydrate", dosage: "250mg", form: "Capsule", manufacturer: "Pfizer", batchNumber: "AZI-2025-009", expiryDate: "2025-12-01", unitPrice: 0.95, quantity: 0, status: "Expired", countries: ["Kenya", "South Africa", "Ghana"], category: "Antibiotics" },
  { key: "7", name: "Omeprazole", genericName: "Omeprazole", dosage: "20mg", form: "Capsule", manufacturer: "AstraZeneca", batchNumber: "OME-2025-011", expiryDate: "2027-09-18", unitPrice: 0.55, quantity: 4300, status: "In Stock", countries: ["Kenya", "Nigeria"], category: "Gastrointestinal" },
  { key: "8", name: "Ciprofloxacin", genericName: "Ciprofloxacin Hydrochloride", dosage: "500mg", form: "Tablet", manufacturer: "Bayer", batchNumber: "CIP-2025-005", expiryDate: "2027-04-22", unitPrice: 0.72, quantity: 180, status: "Low Stock", countries: ["South Africa", "Mozambique"], category: "Antibiotics" },
  { key: "9", name: "Insulin Glargine", genericName: "Insulin Glargine", dosage: "100IU/ml", form: "Injection", manufacturer: "Novo Nordisk", batchNumber: "INS-2025-002", expiryDate: "2026-07-14", unitPrice: 28.5, quantity: 520, status: "In Stock", countries: ["Kenya", "South Africa", "Nigeria", "Ghana"], category: "Antidiabetics" },
  { key: "10", name: "Salbutamol", genericName: "Salbutamol Sulphate", dosage: "100mcg", form: "Inhaler", manufacturer: "GSK", batchNumber: "SAL-2025-018", expiryDate: "2025-10-30", unitPrice: 3.2, quantity: 0, status: "Out of Stock", countries: ["Kenya", "Tanzania"], category: "Respiratory" },
]

interface Order {
  key: string
  orderNumber: string
  product: string
  supplier: string
  date: string
  status: "Delivered" | "In Transit" | "Processing" | "Pending"
  amount: number
  eta: string | null
}

const orderData: Order[] = [
  { key: "1", orderNumber: "ORD-2026-001", product: "Amoxicillin 500mg", supplier: "Cipla Ltd", date: "2026-02-10", status: "Delivered", amount: 5400, eta: null },
  { key: "2", orderNumber: "ORD-2026-002", product: "Metformin 850mg", supplier: "Novartis", date: "2026-02-12", status: "In Transit", amount: 2720, eta: "2026-03-01" },
  { key: "3", orderNumber: "ORD-2026-003", product: "Insulin Glargine 100IU/ml", supplier: "Novo Nordisk", date: "2026-02-15", status: "Processing", amount: 14820, eta: "2026-03-10" },
  { key: "4", orderNumber: "ORD-2026-004", product: "Artemether/Lumefantrine 20/120mg", supplier: "Sanofi", date: "2026-02-18", status: "Pending", amount: 11470, eta: "2026-03-15" },
  { key: "5", orderNumber: "ORD-2026-005", product: "Paracetamol 500mg", supplier: "Emzor Pharma", date: "2026-02-20", status: "Delivered", amount: 2000, eta: null },
]

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const statusToneMap: Record<Medication["status"], AxTagTone> = {
  "In Stock": "success",
  "Low Stock": "warning",
  "Out of Stock": "error",
  Expired: "neutral",
}

const categoryColorMap: Record<string, string> = {
  Antibiotics: "var(--cyan-700)",
  Antidiabetics: "var(--primary-500)",
  Analgesics: "var(--orange-600)",
  Antimalarials: "var(--cyan-500)",
  Gastrointestinal: "var(--green-600)",
  Respiratory: "var(--magenta-500)",
}

const orderStatusConfig: Record<Order["status"], { tone: AxTagTone; icon: React.ReactNode }> = {
  Delivered: { tone: "success", icon: <CheckCircleOutlined /> },
  "In Transit": { tone: "info", icon: <CarOutlined /> },
  Processing: { tone: "info", icon: <SyncOutlined spin /> },
  Pending: { tone: "neutral", icon: <ClockCircleOutlined /> },
}

// Compute rowStates from an array of selected keys and an array of disabled keys
function buildRowStates(
  selectedKeys: React.Key[] = [],
  disabledKeys: React.Key[] = []
): Record<string | number, AxTableRowState> {
  const result: Record<string | number, AxTableRowState> = {}
  for (const k of disabledKeys) result[k as string | number] = "disabled"
  for (const k of selectedKeys) result[k as string | number] = "selected"
  return result
}

// ---------------------------------------------------------------------------
// Column definitions
// ---------------------------------------------------------------------------

const baseColumns: ColumnsType<any> = [
  {
    title: "Medication",
    dataIndex: "name",
    key: "name",
    render: (name: string, record) => (
      <div>
        <AxText as="div" variant="body-sm" weight="medium">{name}</AxText>
        <AxText as="div" variant="body-xs" color="secondary">
          {record.dosage} · {record.form}
        </AxText>
      </div>
    ),
  },
  { title: "Manufacturer", dataIndex: "manufacturer", key: "manufacturer" },
  { title: "Batch No.", dataIndex: "batchNumber", key: "batchNumber" },
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
    key: "unitPrice",
    align: "right" as const,
    render: (price: number) => `$${price.toFixed(2)}`,
  },
  {
    title: "Qty",
    dataIndex: "quantity",
    key: "quantity",
    align: "right" as const,
    render: (qty: number) => qty.toLocaleString(),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: Medication["status"]) => (
      <AxTag tone={statusToneMap[status]}>{status}</AxTag>
    ),
  },
]

const sortableColumns: ColumnsType<any> = baseColumns.map((col) => {
  if (col.key === "name") return { ...col, sorter: (a: any, b: any) => a.name.localeCompare(b.name) }
  if (col.key === "unitPrice") return { ...col, sorter: (a: any, b: any) => a.unitPrice - b.unitPrice }
  if (col.key === "quantity") return { ...col, sorter: (a: any, b: any) => a.quantity - b.quantity }
  return col
})

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof AxTable> = {
  title: "Data Display/AxTable",
  component: AxTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    rowStates: {
      control: "object",
      description: "Visual state per row key. `{ [key]: 'selected' | 'disabled' }`",
    },
    headerBg: {
      control: "color",
      description: "Header background color. Defaults to #FAFAFA.",
    },
    loading: { control: "boolean", description: "Show loading spinner overlay" },
    bordered: { control: "boolean", description: "Show all table borders" },
    size: { control: "select", options: ["large", "middle", "small"], description: "Table density" },
  },
}

export default meta
type Story = StoryObj<typeof AxTable>

// ===========================================================================
// PLAYGROUND
// ===========================================================================

export const Playground: Story = {
  name: "Playground",
  args: {
    columns: baseColumns,
    dataSource: sampleData,
    pagination: { pageSize: 5, showSizeChanger: true },
    loading: false,
    bordered: false,
    size: "middle",
  },
}

// ===========================================================================
// CORE FEATURES
// ===========================================================================

export const Basic: Story = {
  name: "Feature — Basic",
  args: {
    columns: baseColumns,
    dataSource: sampleData,
    pagination: false,
  },
}

export const Pagination: Story = {
  name: "Feature — Pagination",
  args: {
    columns: baseColumns,
    dataSource: sampleData,
    pagination: {
      pageSize: 5,
      showSizeChanger: true,
      showTotal: (total: number) => `${total} medications`,
    },
  },
}

export const Sorting: Story = {
  name: "Feature — Sorting",
  args: {
    columns: sortableColumns,
    dataSource: sampleData,
    pagination: false,
  },
}

export const ColumnFilters: Story = {
  name: "Feature — Column Filters",
  render: () => (
    <AxTable<Medication>
      dataSource={sampleData}
      pagination={false}
      columns={baseColumns.map((col) =>
        col.key === "status"
          ? {
              ...col,
              filters: [
                { text: "In Stock", value: "In Stock" },
                { text: "Low Stock", value: "Low Stock" },
                { text: "Out of Stock", value: "Out of Stock" },
                { text: "Expired", value: "Expired" },
              ],
              onFilter: (value: React.Key | boolean, record: any) => record.status === value,
            }
          : col
      )}
    />
  ),
}

export const ExpandableRows: Story = {
  name: "Feature — Expandable Rows",
  args: {
    columns: baseColumns,
    dataSource: sampleData,
    pagination: false,
    expandable: {
      expandedRowRender: (record: any) => (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, padding: "16px 24px" }}>
          <div>
            <AxText as="div" variant="body-xs" color="secondary" style={{ marginBottom: 4 }}>Generic Name</AxText>
            <AxText as="div" variant="body-sm" weight="medium">{record.genericName}</AxText>
          </div>
          <div>
            <AxText as="div" variant="body-xs" color="secondary" style={{ marginBottom: 4 }}>Category</AxText>
            <AxTag fill={categoryColorMap[record.category]} style={{ margin: 0 }}>
              {record.category}
            </AxTag>
          </div>
          <div>
            <AxText as="div" variant="body-xs" color="secondary" style={{ marginBottom: 4 }}>Expiry Date</AxText>
            <AxText as="div" variant="body-sm" weight="medium">
              {new Date(record.expiryDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </AxText>
          </div>
          <div>
            <AxText as="div" variant="body-xs" color="secondary" style={{ marginBottom: 4 }}>Countries</AxText>
            <AxCountryTags countries={record.countries} max={3} />
          </div>
          <div>
            <AxText as="div" variant="body-xs" color="secondary" style={{ marginBottom: 4 }}>Total Value</AxText>
            <AxText as="div" variant="body-sm" weight="medium">
              ${(record.unitPrice * record.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </AxText>
          </div>
          <div>
            <AxText as="div" variant="body-xs" color="secondary" style={{ marginBottom: 4 }}>Batch Number</AxText>
            <AxText as="div" variant="body-sm" weight="medium">{record.batchNumber}</AxText>
          </div>
        </div>
      ),
    },
  },
}

export const HorizontalScroll: Story = {
  name: "Feature — Horizontal Scroll",
  args: {
    dataSource: sampleData,
    pagination: false,
    scroll: { x: 1500 },
    columns: [
      { title: "Medication", dataIndex: "name", key: "name", width: 200, fixed: "left" as const },
      { title: "Generic Name", dataIndex: "genericName", key: "genericName", width: 220 },
      { title: "Dosage", dataIndex: "dosage", key: "dosage", width: 120 },
      { title: "Form", dataIndex: "form", key: "form", width: 120 },
      { title: "Manufacturer", dataIndex: "manufacturer", key: "manufacturer", width: 180 },
      { title: "Batch No.", dataIndex: "batchNumber", key: "batchNumber", width: 160 },
      { title: "Expiry Date", dataIndex: "expiryDate", key: "expiryDate", width: 140, render: (d: string) => new Date(d).toLocaleDateString() },
      { title: "Unit Price", dataIndex: "unitPrice", key: "unitPrice", width: 120, align: "right" as const, render: (p: number) => `$${p.toFixed(2)}` },
      { title: "Quantity", dataIndex: "quantity", key: "quantity", width: 120, align: "right" as const, render: (q: number) => q.toLocaleString() },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 130,
        fixed: "right" as const,
        render: (s: Medication["status"]) => <AxTag tone={statusToneMap[s]}>{s}</AxTag>,
      },
    ],
  },
}

// ===========================================================================
// ROW STATES
// ===========================================================================

export const SelectedRows: Story = {
  name: "State — Selected Rows",
  args: {
    columns: baseColumns,
    dataSource: sampleData,
    pagination: false,
    rowStates: { "2": "selected", "4": "selected", "7": "selected" },
  },
}

export const DisabledRows: Story = {
  name: "State — Disabled Rows",
  args: {
    columns: baseColumns,
    dataSource: sampleData,
    pagination: false,
    rowStates: { "6": "disabled", "10": "disabled" },
  },
}

export const RowSelectionWithState: Story = {
  name: "State — Interactive Selection",
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])

    return (
      <AxTable<Medication>
        columns={baseColumns}
        dataSource={sampleData}
        pagination={false}
        rowSelection={{
          selectedRowKeys: selectedKeys,
          onChange: (keys) => setSelectedKeys(keys),
        }}
        rowStates={buildRowStates(selectedKeys)}
      />
    )
  },
}

// ===========================================================================
// CELL PATTERNS
// ===========================================================================

export const StatusWithIcons: Story = {
  name: "Pattern — Status + Icon",
  args: {
    dataSource: orderData,
    pagination: false,
    columns: [
      {
        title: "Order",
        key: "order",
        render: (_: unknown, record: any) => (
          <div>
            <AxText as="div" variant="body-sm" weight="medium">{record.product}</AxText>
            <AxText as="div" variant="body-xs" color="secondary">{record.supplier} · {record.orderNumber}</AxText>
          </div>
        ),
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        render: (date: string) => new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: Order["status"]) => {
          const config = orderStatusConfig[status]
          return <AxTag tone={config.tone} icon={config.icon}>{status}</AxTag>
        },
      },
      {
        title: "ETA",
        dataIndex: "eta",
        key: "eta",
        render: (eta: string | null) =>
          eta ? new Date(eta).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        align: "right" as const,
        render: (amount: number) => (
          <AxText as="span" variant="body-sm" weight="medium">
            ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </AxText>
        ),
      },
      {
        title: "",
        key: "action",
        width: 80,
        render: () => <AxButton variant="link" size="small" icon={<EyeOutlined />}>View</AxButton>,
      },
    ] as ColumnsType<any>,
  },
}

export const TagsInCells: Story = {
  name: "Pattern — Category + Country Tags",
  args: {
    dataSource: sampleData,
    pagination: false,
    columns: [
      {
        title: "Medication",
        dataIndex: "name",
        key: "name",
        render: (name: string, record: any) => (
          <div>
            <AxText as="div" variant="body-sm" weight="medium">{name}</AxText>
            <AxText as="div" variant="body-xs" color="secondary">{record.dosage} · {record.form}</AxText>
          </div>
        ),
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        filters: [
          { text: "Antibiotics", value: "Antibiotics" },
          { text: "Antidiabetics", value: "Antidiabetics" },
          { text: "Analgesics", value: "Analgesics" },
          { text: "Antimalarials", value: "Antimalarials" },
          { text: "Gastrointestinal", value: "Gastrointestinal" },
          { text: "Respiratory", value: "Respiratory" },
        ],
        onFilter: (value: React.Key | boolean, record: any) => record.category === value,
        render: (category: string) => (
          <AxTag fill={categoryColorMap[category]} style={{ margin: 0 }}>{category}</AxTag>
        ),
      },
      {
        title: "Countries",
        dataIndex: "countries",
        key: "countries",
        render: (countries: string[]) => <AxCountryTags countries={countries} />,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: Medication["status"]) => (
          <AxTag tone={statusToneMap[status]}>{status}</AxTag>
        ),
      },
      {
        title: "Actions",
        key: "actions",
        align: "center" as const,
        render: () => (
          <Flex gap={12} justify="center">
            <AxButton variant="text" size="small" icon={<EditOutlined />} />
            <AxButton variant="text" size="small" icon={<EyeOutlined />} />
          </Flex>
        ),
      },
    ],
  },
}

export const TooltipHeaders: Story = {
  name: "Pattern — Tooltip Column Headers",
  args: {
    dataSource: sampleData,
    pagination: false,
    columns: [
      {
        title: "Medication",
        dataIndex: "name",
        key: "name",
        render: (name: string, record: any) => (
          <div>
            <AxText as="div" variant="body-sm" weight="medium">{name}</AxText>
            <AxText as="div" variant="body-xs" color="secondary">{record.dosage} · {record.form}</AxText>
          </div>
        ),
      },
      {
        title: (
          <Flex gap={4} align="center">
            Total Volume
            <Tooltip title="Total units available across all registered countries">
              <InfoCircleOutlined style={{ color: "var(--neutral-600)" }} />
            </Tooltip>
          </Flex>
        ),
        dataIndex: "quantity",
        key: "quantity",
        align: "right" as const,
        render: (qty: number) => qty.toLocaleString(),
      },
      {
        title: (
          <Flex gap={4} align="center">
            Unit Price
            <Tooltip title="Price per unit in USD, excluding shipping and duties">
              <InfoCircleOutlined style={{ color: "var(--neutral-600)" }} />
            </Tooltip>
          </Flex>
        ),
        dataIndex: "unitPrice",
        key: "unitPrice",
        align: "right" as const,
        render: (price: number) => `$${price.toFixed(2)}`,
      },
      {
        title: "Countries",
        dataIndex: "countries",
        key: "countries",
        render: (countries: string[]) => <AxCountryTags countries={countries} max={2} />,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: Medication["status"]) => (
          <AxTag tone={statusToneMap[status]}>{status}</AxTag>
        ),
      },
    ],
  },
}

export const CustomCellRenderers: Story = {
  name: "Pattern — Custom Renderers",
  args: {
    dataSource: sampleData,
    pagination: false,
    columns: [
      {
        title: "Medication",
        dataIndex: "name",
        key: "name",
        render: (name: string, record: any) => (
          <Flex gap={12} align="center">
            <Badge color={categoryColorMap[record.category]} />
            <div>
              <AxText as="div" variant="body-sm" weight="medium">{name}</AxText>
              <AxText as="div" variant="body-xs" color="secondary">{record.genericName}</AxText>
            </div>
          </Flex>
        ),
      },
      {
        title: "Dosage & Form",
        key: "dosageForm",
        render: (_: unknown, record: any) => (
          <AxTag>{`${record.dosage} ${record.form}`}</AxTag>
        ),
      },
      {
        title: "Unit Price",
        dataIndex: "unitPrice",
        key: "unitPrice",
        align: "right" as const,
        render: (price: number) => (
          <AxText
            as="span"
            variant="body-sm"
            weight="medium"
            style={{ color: price > 5 ? "var(--red-700)" : "var(--text-primary)" }}
          >
            ${price.toFixed(2)}
          </AxText>
        ),
      },
      {
        title: "Stock Value",
        key: "stockValue",
        align: "right" as const,
        render: (_: unknown, record: any) => {
          const value = record.unitPrice * record.quantity
          return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        },
      },
      {
        title: "Expiry",
        dataIndex: "expiryDate",
        key: "expiryDate",
        render: (date: string) => {
          const expiry = new Date(date)
          const isExpired = expiry < new Date()
          return (
            <AxText
              as="span"
              variant="body-sm"
              style={{ color: isExpired ? "var(--red-700)" : "var(--text-primary)" }}
            >
              {expiry.toLocaleDateString("en-US", { year: "numeric", month: "short" })}
            </AxText>
          )
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: Medication["status"]) => (
          <AxTag tone={statusToneMap[status]}>{status}</AxTag>
        ),
      },
    ],
  },
}

// ===========================================================================
// LAYOUT VARIANTS
// ===========================================================================

export const HeaderlessWidget: Story = {
  name: "Feature — Headerless Widget",
  args: {
    dataSource: orderData.slice(0, 4),
    pagination: false,
    showHeader: false,
    size: "small",
    columns: [
      {
        key: "order",
        render: (_: unknown, record: any) => (
          <div>
            <AxText as="div" variant="body-sm" weight="medium">{record.product}</AxText>
            <AxText as="div" variant="body-xs" color="secondary">{record.supplier}</AxText>
          </div>
        ),
      },
      {
        key: "status",
        width: 130,
        render: (_: unknown, record: any) => {
          const config = orderStatusConfig[record.status as Order["status"]]
          return <AxTag tone={config.tone} icon={config.icon}>{record.status}</AxTag>
        },
      },
      {
        key: "amount",
        width: 100,
        align: "right" as const,
        render: (_: unknown, record: any) => (
          <AxText as="span" variant="body-sm" weight="medium">
            ${record.amount.toLocaleString()}
          </AxText>
        ),
      },
    ] as ColumnsType<any>,
  },
}

// ===========================================================================
// TABLE STATES
// ===========================================================================

export const Loading: Story = {
  name: "State — Loading",
  args: {
    columns: baseColumns,
    dataSource: sampleData,
    pagination: false,
    loading: true,
  },
}

export const EmptyState: Story = {
  name: "State — Empty",
  render: () => (
    <AxTable
      columns={baseColumns}
      dataSource={[]}
      pagination={false}
      locale={{
        emptyText: (
          <AxEmptyState
            size="sm"
            illustration={
              <span style={{ fontSize: 32, color: "var(--neutral-300)" }}>
                <InboxOutlined />
              </span>
            }
            title="No medications found"
            description="Try adjusting your filters or search term."
            action={
              <AxButton size="small" variant="secondary">
                Clear Filters
              </AxButton>
            }
          />
        ),
      }}
    />
  ),
}

// ===========================================================================
// REAL-WORLD EXAMPLE
// ===========================================================================

// ===========================================================================
// RESPONSIVE VARIANTS — compare side-by-side, resize viewport to see effects
// ===========================================================================

export const ResponsiveColumnPriority: Story = {
  name: "Responsive — Column Priority",
  render: () => {
    const priorityColumns: ColumnsType<any> = [
      {
        title: "Medication",
        dataIndex: "name",
        key: "name",
        render: (name: string, record: any) => (
          <div>
            <AxText as="div" variant="body-sm" weight="medium">{name}</AxText>
            <AxText as="div" variant="body-xs" color="secondary">{record.dosage} · {record.form}</AxText>
          </div>
        ),
      },
      {
        title: "Manufacturer",
        dataIndex: "manufacturer",
        key: "manufacturer",
        responsive: ["lg"] as any,
      },
      {
        title: "Batch No.",
        dataIndex: "batchNumber",
        key: "batchNumber",
        responsive: ["lg"] as any,
      },
      {
        title: "Unit Price",
        dataIndex: "unitPrice",
        key: "unitPrice",
        align: "right" as const,
        render: (price: number) => `$${price.toFixed(2)}`,
      },
      {
        title: "Qty",
        dataIndex: "quantity",
        key: "quantity",
        align: "right" as const,
        responsive: ["md"] as any,
        render: (qty: number) => qty.toLocaleString(),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: Medication["status"]) => (
          <AxTag tone={statusToneMap[status]}>{status}</AxTag>
        ),
      },
    ]

    return (
      <div>
        <AxText as="p" variant="body-sm" color="secondary" style={{ marginBottom: 16 }}>
          Resize viewport: below 992px hides Manufacturer & Batch. Below 768px also hides Qty. Expand a row to see hidden data.
        </AxText>
        <AxTable
          columns={priorityColumns}
          dataSource={sampleData}
          pagination={false}
          expandable={{
            expandedRowRender: (record: any) => (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 24px", padding: "16px 20px", background: "var(--neutral-0)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <AxText as="span" variant="body-xs" color="secondary" style={{ textTransform: "uppercase", letterSpacing: "0.03em" }}>Manufacturer</AxText>
                  <AxText as="span" variant="body-sm" weight="medium">{record.manufacturer}</AxText>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <AxText as="span" variant="body-xs" color="secondary" style={{ textTransform: "uppercase", letterSpacing: "0.03em" }}>Batch No.</AxText>
                  <AxText as="span" variant="body-sm" weight="medium">{record.batchNumber}</AxText>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 8 }}>
                  <AxText as="span" variant="body-xs" color="secondary" style={{ textTransform: "uppercase", letterSpacing: "0.03em" }}>Quantity</AxText>
                  <AxText as="span" variant="body-sm" weight="medium">{record.quantity.toLocaleString()}</AxText>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 8 }}>
                  <AxText as="span" variant="body-xs" color="secondary" style={{ textTransform: "uppercase", letterSpacing: "0.03em" }}>Category</AxText>
                  <AxTag fill={categoryColorMap[record.category]} style={{ margin: 0, width: "fit-content" }}>{record.category}</AxTag>
                </div>
              </div>
            ),
          }}
        />
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

export const ResponsiveProgressive: Story = {
  name: "Responsive — Progressive Reduction",
  render: () => {
    // No explicit `responsive` needed — autoResponsive (default: true)
    // auto-assigns xl → lg → md to middle columns right-to-left.
    const progressiveColumns: ColumnsType<any> = [
      {
        title: "Medication",
        dataIndex: "name",
        key: "name",
        render: (name: string, record: any) => (
          <div>
            <AxText as="div" variant="body-sm" weight="semibold">{name}</AxText>
            <AxText as="div" variant="body-xs" color="secondary">{record.dosage} · {record.form}</AxText>
          </div>
        ),
      },
      { title: "Manufacturer", dataIndex: "manufacturer", key: "manufacturer" },
      { title: "Batch No.", dataIndex: "batchNumber", key: "batchNumber" },
      {
        title: "Unit Price",
        dataIndex: "unitPrice",
        key: "unitPrice",
        align: "right" as const,
        render: (price: number) => `$${price.toFixed(2)}`,
      },
      {
        title: "Qty",
        dataIndex: "quantity",
        key: "quantity",
        align: "right" as const,
        render: (qty: number) => qty.toLocaleString(),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: Medication["status"]) => (
          <AxTag tone={statusToneMap[status]}>{status}</AxTag>
        ),
      },
    ]

    return (
      <div>
        <AxText as="p" variant="body-sm" color="secondary" style={{ marginBottom: 16 }}>
          autoResponsive is on by default — middle columns hide right-to-left as the viewport shrinks. Below 576px switches to cards with all data.
        </AxText>
        <AxTable
          columns={progressiveColumns}
          dataSource={sampleData}
          pagination={{ pageSize: 5 }}
        />
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

// ===========================================================================
// REAL-WORLD EXAMPLE
// ===========================================================================

export const CombinedFeatures: Story = {
  name: "Example — Inventory Table",
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])

    const expiredKeys = sampleData
      .filter((m) => m.status === "Expired" || m.status === "Out of Stock")
      .map((m) => m.key)

    const columns: ColumnsType<any> = [
      ...sortableColumns.map((col) => {
        if (col.key === "status") {
          return {
            ...col,
            filters: [
              { text: "In Stock", value: "In Stock" },
              { text: "Low Stock", value: "Low Stock" },
              { text: "Out of Stock", value: "Out of Stock" },
              { text: "Expired", value: "Expired" },
            ],
            onFilter: (value: React.Key | boolean, record: any) => record.status === value,
          }
        }
        return col
      }),
    ]

    return (
      <AxTable<Medication>
        columns={columns}
        dataSource={sampleData}
        rowStates={buildRowStates(selectedKeys, expiredKeys)}
        rowSelection={{
          selectedRowKeys: selectedKeys,
          onChange: (keys) => setSelectedKeys(keys),
          getCheckboxProps: (record) => ({ disabled: expiredKeys.includes(record.key) }),
        }}
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, padding: "16px 24px" }}>
              <div>
                <AxText as="div" variant="body-xs" color="secondary" style={{ marginBottom: 4 }}>Generic Name</AxText>
                <AxText as="div" variant="body-sm" weight="medium">{record.genericName}</AxText>
              </div>
              <div>
                <AxText as="div" variant="body-xs" color="secondary" style={{ marginBottom: 4 }}>Category</AxText>
                <AxTag fill={categoryColorMap[record.category]} style={{ margin: 0 }}>{record.category}</AxTag>
              </div>
              <div>
                <AxText as="div" variant="body-xs" color="secondary" style={{ marginBottom: 4 }}>Countries</AxText>
                <AxCountryTags countries={record.countries} max={3} />
              </div>
            </div>
          ),
        }}
        pagination={{ pageSize: 5, showSizeChanger: true, showTotal: (total) => `${total} medications` }}
      />
    )
  },
}
