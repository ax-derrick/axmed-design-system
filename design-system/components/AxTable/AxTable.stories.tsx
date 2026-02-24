import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Tag, Flex, Tooltip, Badge, Button } from "antd"
import {
  CheckCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined,
  CarOutlined,
  InfoCircleOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"

import AxTable from "./index"

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
  {
    key: "1",
    name: "Amoxicillin",
    genericName: "Amoxicillin Trihydrate",
    dosage: "500mg",
    form: "Capsule",
    manufacturer: "Cipla Ltd",
    batchNumber: "AMX-2025-001",
    expiryDate: "2027-03-15",
    unitPrice: 0.45,
    quantity: 12000,
    status: "In Stock",
    countries: ["Kenya", "Nigeria", "Ghana", "Tanzania", "Uganda"],
    category: "Antibiotics",
  },
  {
    key: "2",
    name: "Metformin",
    genericName: "Metformin Hydrochloride",
    dosage: "850mg",
    form: "Tablet",
    manufacturer: "Novartis",
    batchNumber: "MET-2025-014",
    expiryDate: "2027-06-20",
    unitPrice: 0.32,
    quantity: 8500,
    status: "In Stock",
    countries: ["Kenya", "South Africa"],
    category: "Antidiabetics",
  },
  {
    key: "3",
    name: "Ibuprofen",
    genericName: "Ibuprofen",
    dosage: "400mg",
    form: "Tablet",
    manufacturer: "GSK",
    batchNumber: "IBU-2025-007",
    expiryDate: "2026-11-30",
    unitPrice: 0.18,
    quantity: 350,
    status: "Low Stock",
    countries: ["Nigeria", "Ghana", "Senegal"],
    category: "Analgesics",
  },
  {
    key: "4",
    name: "Artemether/Lumefantrine",
    genericName: "Artemether + Lumefantrine",
    dosage: "20/120mg",
    form: "Tablet",
    manufacturer: "Sanofi",
    batchNumber: "ART-2025-003",
    expiryDate: "2027-01-10",
    unitPrice: 1.85,
    quantity: 6200,
    status: "In Stock",
    countries: ["Kenya", "Nigeria", "Tanzania", "Mozambique", "DRC", "Uganda"],
    category: "Antimalarials",
  },
  {
    key: "5",
    name: "Paracetamol",
    genericName: "Acetaminophen",
    dosage: "500mg",
    form: "Tablet",
    manufacturer: "Emzor Pharma",
    batchNumber: "PAR-2025-022",
    expiryDate: "2026-08-05",
    unitPrice: 0.08,
    quantity: 25000,
    status: "In Stock",
    countries: ["Nigeria"],
    category: "Analgesics",
  },
  {
    key: "6",
    name: "Azithromycin",
    genericName: "Azithromycin Dihydrate",
    dosage: "250mg",
    form: "Capsule",
    manufacturer: "Pfizer",
    batchNumber: "AZI-2025-009",
    expiryDate: "2025-12-01",
    unitPrice: 0.95,
    quantity: 0,
    status: "Expired",
    countries: ["Kenya", "South Africa", "Ghana"],
    category: "Antibiotics",
  },
  {
    key: "7",
    name: "Omeprazole",
    genericName: "Omeprazole",
    dosage: "20mg",
    form: "Capsule",
    manufacturer: "AstraZeneca",
    batchNumber: "OME-2025-011",
    expiryDate: "2027-09-18",
    unitPrice: 0.55,
    quantity: 4300,
    status: "In Stock",
    countries: ["Kenya", "Nigeria"],
    category: "Gastrointestinal",
  },
  {
    key: "8",
    name: "Ciprofloxacin",
    genericName: "Ciprofloxacin Hydrochloride",
    dosage: "500mg",
    form: "Tablet",
    manufacturer: "Bayer",
    batchNumber: "CIP-2025-005",
    expiryDate: "2027-04-22",
    unitPrice: 0.72,
    quantity: 180,
    status: "Low Stock",
    countries: ["South Africa", "Mozambique"],
    category: "Antibiotics",
  },
  {
    key: "9",
    name: "Insulin Glargine",
    genericName: "Insulin Glargine",
    dosage: "100IU/ml",
    form: "Injection",
    manufacturer: "Novo Nordisk",
    batchNumber: "INS-2025-002",
    expiryDate: "2026-07-14",
    unitPrice: 28.5,
    quantity: 520,
    status: "In Stock",
    countries: ["Kenya", "South Africa", "Nigeria", "Ghana"],
    category: "Antidiabetics",
  },
  {
    key: "10",
    name: "Salbutamol",
    genericName: "Salbutamol Sulphate",
    dosage: "100mcg",
    form: "Inhaler",
    manufacturer: "GSK",
    batchNumber: "SAL-2025-018",
    expiryDate: "2025-10-30",
    unitPrice: 3.2,
    quantity: 0,
    status: "Out of Stock",
    countries: ["Kenya", "Tanzania"],
    category: "Respiratory",
  },
]

// ---------------------------------------------------------------------------
// Orders data — for order-style stories
// ---------------------------------------------------------------------------

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
// Helpers
// ---------------------------------------------------------------------------

const statusColorMap: Record<Medication["status"], string> = {
  "In Stock": "green",
  "Low Stock": "orange",
  "Out of Stock": "red",
  Expired: "default",
}

const categoryColorMap: Record<string, string> = {
  Antibiotics: "#2F54EB",
  Antidiabetics: "#722ED1",
  Analgesics: "#FA8C16",
  Antimalarials: "#13C2C2",
  Gastrointestinal: "#52C41A",
  Respiratory: "#EB2F96",
}

const orderStatusConfig: Record<Order["status"], { color: string; icon: React.ReactNode }> = {
  Delivered: { color: "green", icon: <CheckCircleOutlined /> },
  "In Transit": { color: "blue", icon: <CarOutlined /> },
  Processing: { color: "cyan", icon: <SyncOutlined spin /> },
  Pending: { color: "default", icon: <ClockCircleOutlined /> },
}

const CountryTags: React.FC<{ countries: string[]; max?: number }> = ({
  countries,
  max = 2,
}) => {
  const visible = countries.slice(0, max)
  const remaining = countries.length - max

  return (
    <Flex gap={4} wrap="wrap">
      {visible.map((c) => (
        <Tag key={c} style={{ margin: 0 }}>{c}</Tag>
      ))}
      {remaining > 0 && (
        <Tooltip title={countries.slice(max).join(", ")}>
          <Tag style={{ margin: 0, cursor: "pointer" }}>+{remaining} more</Tag>
        </Tooltip>
      )}
    </Flex>
  )
}

// ---------------------------------------------------------------------------
// Column definitions
// ---------------------------------------------------------------------------

const baseColumns: ColumnsType<Medication> = [
  {
    title: "Medication",
    dataIndex: "name",
    key: "name",
    render: (name: string, record) => (
      <div>
        <div style={{ fontWeight: 550 }}>{name}</div>
        <div style={{ fontSize: 12, color: "#475467" }}>
          {record.dosage} · {record.form}
        </div>
      </div>
    ),
  },
  {
    title: "Manufacturer",
    dataIndex: "manufacturer",
    key: "manufacturer",
  },
  {
    title: "Batch No.",
    dataIndex: "batchNumber",
    key: "batchNumber",
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
    render: (qty: number) => qty.toLocaleString(),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: Medication["status"]) => (
      <Tag color={statusColorMap[status]}>{status}</Tag>
    ),
  },
]

const sortableColumns: ColumnsType<Medication> = baseColumns.map((col) => {
  if (col.key === "name") {
    return { ...col, sorter: (a: Medication, b: Medication) => a.name.localeCompare(b.name) }
  }
  if (col.key === "unitPrice") {
    return { ...col, sorter: (a: Medication, b: Medication) => a.unitPrice - b.unitPrice }
  }
  if (col.key === "quantity") {
    return { ...col, sorter: (a: Medication, b: Medication) => a.quantity - b.quantity }
  }
  return col
})

const columnsWithFilters: ColumnsType<Medication> = baseColumns.map((col) => {
  if (col.key === "status") {
    return {
      ...col,
      filters: [
        { text: "In Stock", value: "In Stock" },
        { text: "Low Stock", value: "Low Stock" },
        { text: "Out of Stock", value: "Out of Stock" },
        { text: "Expired", value: "Expired" },
      ],
      onFilter: (value: React.Key | boolean, record: Medication) => record.status === value,
    }
  }
  return col
})

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof AxTable> = {
  title: "Design System/AxTable",
  component: AxTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    selectedRowKeys: {
      control: "object",
      description: "Keys of visually selected rows (blue highlight + left border)",
    },
    disabledRowKeys: {
      control: "object",
      description: "Keys of visually disabled rows (reduced opacity)",
    },
    headerBg: {
      control: "color",
      description: "Header background color",
    },
    loading: {
      control: "boolean",
      description: "Show loading spinner overlay",
    },
    bordered: {
      control: "boolean",
      description: "Show all table borders",
    },
    size: {
      control: "select",
      options: ["large", "middle", "small"],
      description: "Table density",
    },
  },
}

export default meta
type Story = StoryObj<typeof AxTable>

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

// -- Basic --

export const Basic: Story = {
  args: {
    columns: baseColumns,
    dataSource: sampleData,
    pagination: false,
  },
}

// -- Pagination --

export const Pagination: Story = {
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

// -- Sorting --

export const Sorting: Story = {
  args: {
    columns: sortableColumns,
    dataSource: sampleData,
    pagination: false,
  },
}

// -- Column Filters --

export const ColumnFilters: Story = {
  args: {
    columns: columnsWithFilters,
    dataSource: sampleData,
    pagination: false,
  },
}

// -- Row Selection --

export const RowSelection: Story = {
  render: () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    return (
      <AxTable<Medication>
        columns={baseColumns}
        dataSource={sampleData}
        pagination={false}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
        selectedRowKeys={selectedRowKeys}
      />
    )
  },
}

// -- Selected Row Styling --

export const SelectedRowStyling: Story = {
  args: {
    columns: baseColumns,
    dataSource: sampleData,
    pagination: false,
    selectedRowKeys: ["2", "4", "7"],
  },
}

// -- Disabled Rows --

export const DisabledRows: Story = {
  args: {
    columns: baseColumns,
    dataSource: sampleData,
    pagination: false,
    disabledRowKeys: ["6", "10"],
  },
}

// -- Expandable Rows with Grid Layout --

export const ExpandableRows: Story = {
  args: {
    columns: baseColumns,
    dataSource: sampleData,
    pagination: false,
    expandable: {
      expandedRowRender: (record: Medication) => (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 16,
            padding: "16px 24px",
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: "#475467", marginBottom: 4 }}>Generic Name</div>
            <div style={{ fontWeight: 550 }}>{record.genericName}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#475467", marginBottom: 4 }}>Category</div>
            <Tag
              color={categoryColorMap[record.category]}
              style={{ margin: 0 }}
            >
              {record.category}
            </Tag>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#475467", marginBottom: 4 }}>Expiry Date</div>
            <div style={{ fontWeight: 550 }}>
              {new Date(record.expiryDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#475467", marginBottom: 4 }}>Countries</div>
            <CountryTags countries={record.countries} max={3} />
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#475467", marginBottom: 4 }}>Total Value</div>
            <div style={{ fontWeight: 550 }}>
              ${(record.unitPrice * record.quantity).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#475467", marginBottom: 4 }}>Batch Number</div>
            <div style={{ fontWeight: 550 }}>{record.batchNumber}</div>
          </div>
        </div>
      ),
    },
  },
}

// -- Country Tags & Category Colors --

export const WithCountryTags: Story = {
  args: {
    dataSource: sampleData,
    pagination: false,
    columns: [
      {
        title: "Medication",
        dataIndex: "name",
        key: "name",
        render: (name: string, record: Medication) => (
          <div>
            <div style={{ fontWeight: 550 }}>{name}</div>
            <div style={{ fontSize: 12, color: "#475467" }}>
              {record.dosage} · {record.form}
            </div>
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
        onFilter: (value: React.Key | boolean, record: Medication) => record.category === value,
        render: (category: string) => (
          <Tag color={categoryColorMap[category]} style={{ margin: 0 }}>
            {category}
          </Tag>
        ),
      },
      {
        title: "Countries Registered",
        dataIndex: "countries",
        key: "countries",
        render: (countries: string[]) => <CountryTags countries={countries} />,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: Medication["status"]) => (
          <Tag color={statusColorMap[status]}>{status}</Tag>
        ),
      },
      {
        title: "Actions",
        key: "actions",
        align: "center" as const,
        render: () => (
          <Flex gap={12} justify="center">
            <Button type="text" size="small" icon={<EditOutlined />} />
            <Button type="text" size="small" icon={<EyeOutlined />} />
          </Flex>
        ),
      },
    ],
  },
}

// -- Status Icons (Order-style table) --

export const StatusWithIcons: Story = {
  args: {
    dataSource: orderData,
    pagination: false,
    columns: [
      {
        title: "Order",
        key: "order",
        render: (_: unknown, record: Order) => (
          <div>
            <div style={{ fontWeight: 550 }}>{record.product}</div>
            <div style={{ fontSize: 12, color: "#475467" }}>
              {record.supplier} · {record.orderNumber}
            </div>
          </div>
        ),
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        render: (date: string) =>
          new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: Order["status"]) => {
          const config = orderStatusConfig[status]
          return (
            <Tag icon={config.icon} color={config.color}>
              {status}
            </Tag>
          )
        },
      },
      {
        title: "ETA",
        dataIndex: "eta",
        key: "eta",
        render: (eta: string | null) =>
          eta
            ? new Date(eta).toLocaleDateString("en-US", { month: "short", day: "numeric" })
            : "—",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        align: "right" as const,
        render: (amount: number) => (
          <span style={{ fontWeight: 550 }}>
            ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        ),
      },
      {
        title: "",
        key: "action",
        width: 80,
        render: () => (
          <Button type="link" size="small" icon={<EyeOutlined />}>
            View
          </Button>
        ),
      },
    ] as ColumnsType<Order>,
  },
}

// -- Headerless Widget Table --

export const HeaderlessWidget: Story = {
  args: {
    dataSource: orderData.slice(0, 4),
    pagination: false,
    showHeader: false,
    size: "small",
    columns: [
      {
        key: "order",
        render: (_: unknown, record: Order) => (
          <div>
            <div style={{ fontWeight: 550 }}>{record.product}</div>
            <div style={{ fontSize: 12, color: "#475467" }}>{record.supplier}</div>
          </div>
        ),
      },
      {
        key: "status",
        width: 130,
        render: (_: unknown, record: Order) => {
          const config = orderStatusConfig[record.status]
          return (
            <Tag icon={config.icon} color={config.color}>
              {record.status}
            </Tag>
          )
        },
      },
      {
        key: "amount",
        width: 100,
        align: "right" as const,
        render: (_: unknown, record: Order) => (
          <span style={{ fontWeight: 550 }}>
            ${record.amount.toLocaleString()}
          </span>
        ),
      },
    ] as ColumnsType<Order>,
  },
}

// -- Tooltip Column Headers --

export const TooltipHeaders: Story = {
  args: {
    dataSource: sampleData,
    pagination: false,
    columns: [
      {
        title: "Medication",
        dataIndex: "name",
        key: "name",
        render: (name: string, record: Medication) => (
          <div>
            <div style={{ fontWeight: 550 }}>{name}</div>
            <div style={{ fontSize: 12, color: "#475467" }}>
              {record.dosage} · {record.form}
            </div>
          </div>
        ),
      },
      {
        title: (
          <Flex gap={4} align="center">
            Total Volume
            <Tooltip title="Total units available across all registered countries">
              <InfoCircleOutlined style={{ color: "#8C8C8C" }} />
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
              <InfoCircleOutlined style={{ color: "#8C8C8C" }} />
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
        render: (countries: string[]) => <CountryTags countries={countries} max={2} />,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: Medication["status"]) => (
          <Tag color={statusColorMap[status]}>{status}</Tag>
        ),
      },
    ],
  },
}

// -- Custom Cell Renderers --

export const CustomCellRenderers: Story = {
  args: {
    dataSource: sampleData,
    pagination: false,
    columns: [
      {
        title: "Medication",
        dataIndex: "name",
        key: "name",
        render: (name: string, record: Medication) => (
          <Flex gap={12} align="center">
            <Badge color={categoryColorMap[record.category]} />
            <div>
              <div style={{ fontWeight: 550 }}>{name}</div>
              <div style={{ fontSize: 12, color: "#475467" }}>
                {record.genericName}
              </div>
            </div>
          </Flex>
        ),
      },
      {
        title: "Dosage & Form",
        key: "dosageForm",
        render: (_: unknown, record: Medication) => (
          <Tag>{`${record.dosage} ${record.form}`}</Tag>
        ),
      },
      {
        title: "Unit Price",
        dataIndex: "unitPrice",
        key: "unitPrice",
        align: "right" as const,
        render: (price: number) => (
          <span style={{ fontWeight: 550, color: price > 5 ? "#E72315" : "#101828" }}>
            ${price.toFixed(2)}
          </span>
        ),
      },
      {
        title: "Stock Value",
        key: "stockValue",
        align: "right" as const,
        render: (_: unknown, record: Medication) => {
          const value = record.unitPrice * record.quantity
          return `$${value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
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
            <span style={{ color: isExpired ? "#E72315" : "#101828" }}>
              {expiry.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })}
            </span>
          )
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: Medication["status"]) => (
          <Tag color={statusColorMap[status]}>{status}</Tag>
        ),
      },
    ],
  },
}

// -- Loading --

export const Loading: Story = {
  args: {
    columns: baseColumns,
    dataSource: sampleData,
    pagination: false,
    loading: true,
  },
}

// -- Empty State --

export const EmptyState: Story = {
  args: {
    columns: baseColumns,
    dataSource: [],
    pagination: false,
  },
}

// -- Horizontal Scroll --

export const HorizontalScroll: Story = {
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
      {
        title: "Expiry Date",
        dataIndex: "expiryDate",
        key: "expiryDate",
        width: 140,
        render: (d: string) => new Date(d).toLocaleDateString(),
      },
      {
        title: "Unit Price",
        dataIndex: "unitPrice",
        key: "unitPrice",
        width: 120,
        align: "right" as const,
        render: (p: number) => `$${p.toFixed(2)}`,
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        width: 120,
        align: "right" as const,
        render: (q: number) => q.toLocaleString(),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 130,
        fixed: "right" as const,
        render: (s: Medication["status"]) => <Tag color={statusColorMap[s]}>{s}</Tag>,
      },
    ],
  },
}

// -- Combined Features --

export const CombinedFeatures: Story = {
  render: () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    const expiredKeys = sampleData
      .filter((m) => m.status === "Expired" || m.status === "Out of Stock")
      .map((m) => m.key)

    const columns: ColumnsType<Medication> = [
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
            onFilter: (value: React.Key | boolean, record: Medication) =>
              record.status === value,
          }
        }
        return col
      }),
    ]

    return (
      <AxTable<Medication>
        columns={columns}
        dataSource={sampleData}
        selectedRowKeys={selectedRowKeys}
        disabledRowKeys={expiredKeys}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
          getCheckboxProps: (record) => ({
            disabled: expiredKeys.includes(record.key),
          }),
        }}
        expandable={{
          expandedRowRender: (record) => (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 16,
                padding: "16px 24px",
              }}
            >
              <div>
                <div style={{ fontSize: 12, color: "#475467", marginBottom: 4 }}>Generic Name</div>
                <div style={{ fontWeight: 550 }}>{record.genericName}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#475467", marginBottom: 4 }}>Category</div>
                <Tag color={categoryColorMap[record.category]} style={{ margin: 0 }}>
                  {record.category}
                </Tag>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#475467", marginBottom: 4 }}>Countries</div>
                <CountryTags countries={record.countries} max={3} />
              </div>
            </div>
          ),
        }}
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          showTotal: (total) => `${total} medications`,
        }}
      />
    )
  },
}
