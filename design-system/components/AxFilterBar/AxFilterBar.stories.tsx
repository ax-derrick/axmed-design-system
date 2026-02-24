import React, { useState, useMemo } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Button, Tag } from "antd"
import { PlusOutlined, DownloadOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"

import AxFilterBar from "./index"
import AxTable from "../AxTable"
import AxTag from "../AxTag"

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

interface Medication {
  key: string
  name: string
  dosage: string
  form: string
  manufacturer: string
  category: string
  country: string[]
  unitPrice: number
  quantity: number
  status: "In Stock" | "Low Stock" | "Out of Stock" | "Expired"
}

const medications: Medication[] = [
  { key: "1", name: "Amoxicillin", dosage: "500mg", form: "Capsule", manufacturer: "Cipla Ltd", category: "Antibiotics", country: ["Kenya", "Nigeria", "Ghana"], unitPrice: 0.45, quantity: 12000, status: "In Stock" },
  { key: "2", name: "Metformin", dosage: "850mg", form: "Tablet", manufacturer: "Novartis", category: "Antidiabetics", country: ["Kenya", "South Africa"], unitPrice: 0.32, quantity: 8500, status: "In Stock" },
  { key: "3", name: "Ibuprofen", dosage: "400mg", form: "Tablet", manufacturer: "GSK", category: "Analgesics", country: ["Nigeria", "Ghana"], unitPrice: 0.18, quantity: 350, status: "Low Stock" },
  { key: "4", name: "Artemether/Lumefantrine", dosage: "20/120mg", form: "Tablet", manufacturer: "Sanofi", category: "Antimalarials", country: ["Kenya", "Tanzania", "Mozambique"], unitPrice: 1.85, quantity: 6200, status: "In Stock" },
  { key: "5", name: "Paracetamol", dosage: "500mg", form: "Tablet", manufacturer: "Emzor Pharma", category: "Analgesics", country: ["Nigeria"], unitPrice: 0.08, quantity: 25000, status: "In Stock" },
  { key: "6", name: "Azithromycin", dosage: "250mg", form: "Capsule", manufacturer: "Pfizer", category: "Antibiotics", country: ["Kenya", "South Africa", "Ghana"], unitPrice: 0.95, quantity: 0, status: "Expired" },
  { key: "7", name: "Omeprazole", dosage: "20mg", form: "Capsule", manufacturer: "AstraZeneca", category: "Gastrointestinal", country: ["Kenya", "Nigeria"], unitPrice: 0.55, quantity: 4300, status: "In Stock" },
  { key: "8", name: "Ciprofloxacin", dosage: "500mg", form: "Tablet", manufacturer: "Bayer", category: "Antibiotics", country: ["South Africa"], unitPrice: 0.72, quantity: 180, status: "Low Stock" },
  { key: "9", name: "Insulin Glargine", dosage: "100IU/ml", form: "Injection", manufacturer: "Novo Nordisk", category: "Antidiabetics", country: ["Kenya", "South Africa", "Nigeria"], unitPrice: 28.5, quantity: 520, status: "In Stock" },
  { key: "10", name: "Salbutamol", dosage: "100mcg", form: "Inhaler", manufacturer: "GSK", category: "Respiratory", country: ["Kenya", "Tanzania"], unitPrice: 3.2, quantity: 0, status: "Out of Stock" },
]

const statusColorMap: Record<Medication["status"], string> = {
  "In Stock": "green",
  "Low Stock": "orange",
  "Out of Stock": "red",
  Expired: "default",
}

const columns: ColumnsType<Medication> = [
  {
    title: "Medication",
    dataIndex: "name",
    key: "name",
    render: (name: string, record) => (
      <div>
        <div style={{ fontWeight: 550 }}>{name}</div>
        <div style={{ fontSize: 12, color: "#475467" }}>{record.dosage} · {record.form}</div>
      </div>
    ),
  },
  { title: "Manufacturer", dataIndex: "manufacturer", key: "manufacturer" },
  { title: "Category", dataIndex: "category", key: "category", render: (cat: string) => <Tag>{cat}</Tag> },
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
    key: "unitPrice",
    align: "right",
    render: (p: number) => `$${p.toFixed(2)}`,
  },
  {
    title: "Qty",
    dataIndex: "quantity",
    key: "quantity",
    align: "right",
    render: (q: number) => q.toLocaleString(),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: Medication["status"]) => <Tag color={statusColorMap[status]}>{status}</Tag>,
  },
]

// ---------------------------------------------------------------------------
// Filter options
// ---------------------------------------------------------------------------

const categoryOptions = [
  { label: "Antibiotics", value: "Antibiotics" },
  { label: "Antidiabetics", value: "Antidiabetics" },
  { label: "Analgesics", value: "Analgesics" },
  { label: "Antimalarials", value: "Antimalarials" },
  { label: "Gastrointestinal", value: "Gastrointestinal" },
  { label: "Respiratory", value: "Respiratory" },
]

const countryOptions = [
  { label: "Kenya", value: "Kenya" },
  { label: "Nigeria", value: "Nigeria" },
  { label: "Ghana", value: "Ghana" },
  { label: "South Africa", value: "South Africa" },
  { label: "Tanzania", value: "Tanzania" },
  { label: "Mozambique", value: "Mozambique" },
]

const statusOptions = [
  { label: "In Stock", value: "In Stock" },
  { label: "Low Stock", value: "Low Stock" },
  { label: "Out of Stock", value: "Out of Stock" },
  { label: "Expired", value: "Expired" },
]

const sortOptions = [
  { label: "Recent", value: "recent" },
  { label: "Name (A–Z)", value: "name_asc" },
  { label: "Price (Low)", value: "price_asc" },
  { label: "Price (High)", value: "price_desc" },
]

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof AxFilterBar> = {
  title: "Design System/AxFilterBar",
  component: AxFilterBar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    resultCount: {
      control: "text",
      description: "Result count shown below the bar",
    },
  },
}

export default meta
type Story = StoryObj<typeof AxFilterBar>

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

// -- Search Only --

export const SearchOnly: Story = {
  args: {
    search: { placeholder: "Search for medicine..." },
    resultCount: "10 medications",
  },
}

// -- Search + Single Filter --

export const WithStatusFilter: Story = {
  args: {
    search: { placeholder: "Search for order..." },
    filters: [
      {
        key: "status",
        placeholder: "Status",
        options: statusOptions,
        width: 150,
      },
    ],
    sort: {
      options: [
        { label: "Recent", value: "recent" },
        { label: "Oldest", value: "oldest" },
      ],
      value: "recent",
    },
    resultCount: "24 orders",
  },
}

// -- Multiple Filters --

export const MultipleFilters: Story = {
  args: {
    search: { placeholder: "Search for medicine..." },
    filters: [
      {
        key: "category",
        placeholder: "Category",
        options: categoryOptions,
        multiple: true,
        width: 180,
      },
      {
        key: "country",
        placeholder: "Country",
        options: countryOptions,
        multiple: true,
        width: 180,
      },
    ],
    sort: {
      options: sortOptions,
      value: "recent",
    },
    resultCount: "10 products",
  },
}

// -- With Action Button --

export const WithActionButton: Story = {
  args: {
    search: { placeholder: "Search for medicine..." },
    filters: [
      {
        key: "category",
        placeholder: "Category",
        options: categoryOptions,
        multiple: true,
      },
    ],
    sort: {
      options: sortOptions,
      value: "recent",
    },
    extra: (
      <Button type="primary" icon={<PlusOutlined />}>
        Add new
      </Button>
    ),
    resultCount: "10 products",
  },
}

// -- Multiple Action Buttons --

export const WithMultipleActions: Story = {
  args: {
    search: { placeholder: "Search..." },
    filters: [
      {
        key: "status",
        placeholder: "Status",
        options: statusOptions,
      },
    ],
    extra: (
      <div style={{ display: "flex", gap: 8 }}>
        <Button icon={<DownloadOutlined />}>Export</Button>
        <Button type="primary" icon={<PlusOutlined />}>
          Add new
        </Button>
      </div>
    ),
    resultCount: "48 records",
  },
}

// -- No Search (Filters Only) --

export const FiltersOnly: Story = {
  args: {
    search: false,
    filters: [
      {
        key: "country",
        placeholder: "Country",
        options: countryOptions,
        multiple: true,
        width: 180,
      },
      {
        key: "status",
        placeholder: "Bid status",
        options: [
          { label: "Submitted", value: "submitted" },
          { label: "In Review", value: "in_review" },
          { label: "Awarded", value: "awarded" },
          { label: "Not Awarded", value: "not_awarded" },
        ],
        width: 150,
      },
      {
        key: "therapy",
        placeholder: "Therapy area",
        options: [
          { label: "Infectious Disease", value: "infectious" },
          { label: "Chronic Care", value: "chronic" },
          { label: "Maternal Health", value: "maternal" },
        ],
        width: 170,
      },
    ],
    resultCount: "36 opportunities",
  },
}

// -- Sort Without Label --

export const SortWithoutLabel: Story = {
  args: {
    search: { placeholder: "Search..." },
    sort: {
      options: sortOptions,
      value: "recent",
      showLabel: false,
    },
    resultCount: 15,
  },
}

// -- No Result Count --

export const WithoutResultCount: Story = {
  args: {
    search: { placeholder: "Search for order..." },
    filters: [
      {
        key: "status",
        placeholder: "Status",
        options: statusOptions,
      },
    ],
    sort: {
      options: [
        { label: "Recent", value: "recent" },
        { label: "Oldest", value: "oldest" },
      ],
      value: "recent",
    },
  },
}

// -- Interactive: Filter Bar + Table --

export const WithTable: Story = {
  name: "Interactive — With Table",
  render: () => {
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState<string[]>([])
    const [status, setStatus] = useState<string | undefined>(undefined)
    const [sortBy, setSortBy] = useState("recent")

    const filtered = useMemo(() => {
      let data = [...medications]

      if (search) {
        const q = search.toLowerCase()
        data = data.filter(
          (m) =>
            m.name.toLowerCase().includes(q) ||
            m.manufacturer.toLowerCase().includes(q)
        )
      }

      if (category.length > 0) {
        data = data.filter((m) => category.includes(m.category))
      }

      if (status) {
        data = data.filter((m) => m.status === status)
      }

      if (sortBy === "name_asc") {
        data.sort((a, b) => a.name.localeCompare(b.name))
      } else if (sortBy === "price_asc") {
        data.sort((a, b) => a.unitPrice - b.unitPrice)
      } else if (sortBy === "price_desc") {
        data.sort((a, b) => b.unitPrice - a.unitPrice)
      }

      return data
    }, [search, category, status, sortBy])

    return (
      <div style={{ border: "1px solid #F0F0F0", borderRadius: 8, overflow: "hidden" }}>
        <AxFilterBar
          search={{
            placeholder: "Search for medicine...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
          }}
          filters={[
            {
              key: "category",
              placeholder: "Category",
              options: categoryOptions,
              multiple: true,
              width: 180,
              value: category,
              onChange: setCategory,
            },
            {
              key: "status",
              placeholder: "Status",
              options: statusOptions,
              width: 150,
              value: status,
              onChange: setStatus,
            },
          ]}
          sort={{
            options: sortOptions,
            value: sortBy,
            onChange: setSortBy,
          }}
          resultCount={`${filtered.length} medications`}
        />
        <AxTable<Medication>
          columns={columns}
          dataSource={filtered}
          pagination={{ pageSize: 5, showSizeChanger: false }}
        />
      </div>
    )
  },
}

// -- Portfolio Style --

export const PortfolioStyle: Story = {
  name: "Example — Portfolio Page",
  render: () => {
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState<string[]>([])
    const [country, setCountry] = useState<string[]>([])
    const [sortBy, setSortBy] = useState("recent")

    const filtered = useMemo(() => {
      let data = [...medications]

      if (search) {
        const q = search.toLowerCase()
        data = data.filter((m) => m.name.toLowerCase().includes(q))
      }
      if (category.length > 0) {
        data = data.filter((m) => category.includes(m.category))
      }
      if (country.length > 0) {
        data = data.filter((m) => m.country.some((c) => country.includes(c)))
      }
      if (sortBy === "name_asc") {
        data.sort((a, b) => a.name.localeCompare(b.name))
      }

      return data
    }, [search, category, country, sortBy])

    return (
      <div style={{ border: "1px solid #F0F0F0", borderRadius: 8, overflow: "hidden" }}>
        <AxFilterBar
          search={{
            placeholder: "Search for medicine...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
          }}
          filters={[
            {
              key: "category",
              placeholder: "Category",
              options: categoryOptions,
              multiple: true,
              width: 180,
              value: category,
              onChange: setCategory,
            },
            {
              key: "country",
              placeholder: "Country",
              options: countryOptions,
              multiple: true,
              width: 180,
              value: country,
              onChange: setCountry,
            },
          ]}
          sort={{
            options: sortOptions,
            value: sortBy,
            onChange: setSortBy,
          }}
          extra={
            <Button type="primary" icon={<PlusOutlined />}>
              Add new
            </Button>
          }
          resultCount={`${filtered.length} products`}
        />
        <AxTable<Medication>
          columns={columns}
          dataSource={filtered}
          pagination={false}
        />
      </div>
    )
  },
}

// -- Orders Style --

export const OrdersStyle: Story = {
  name: "Example — Orders Page",
  render: () => {
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState<string | undefined>(undefined)
    const [sortBy, setSortBy] = useState("recent")

    const filtered = useMemo(() => {
      let data = [...medications]

      if (search) {
        const q = search.toLowerCase()
        data = data.filter((m) => m.name.toLowerCase().includes(q))
      }
      if (status) {
        data = data.filter((m) => m.status === status)
      }
      if (sortBy === "price_desc") {
        data.sort((a, b) => b.unitPrice - a.unitPrice)
      }

      return data
    }, [search, status, sortBy])

    return (
      <div style={{ border: "1px solid #F0F0F0", borderRadius: 8, overflow: "hidden" }}>
        <AxFilterBar
          search={{
            placeholder: "Search for order...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
          }}
          filters={[
            {
              key: "status",
              placeholder: "Status",
              options: statusOptions,
              width: 150,
              value: status,
              onChange: setStatus,
            },
          ]}
          sort={{
            options: [
              { label: "Recent", value: "recent" },
              { label: "Oldest", value: "oldest" },
              { label: "Highest Price", value: "price_desc" },
            ],
            value: sortBy,
            onChange: setSortBy,
            showLabel: false,
          }}
          resultCount={`${filtered.length} orders`}
        />
        <AxTable<Medication>
          columns={columns}
          dataSource={filtered}
          pagination={{ pageSize: 5, showTotal: (total) => `${total} orders` }}
        />
      </div>
    )
  },
}
