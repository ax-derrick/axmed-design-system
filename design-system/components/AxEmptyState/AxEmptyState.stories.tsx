import type { Meta, StoryObj } from "@storybook/react"
import {
  InboxOutlined,
  SearchOutlined,
  FilterOutlined,
  FileTextOutlined,
  EnvironmentOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons"
import { Flex } from "antd"

import AxEmptyState from "."
import AxButton from "../AxButton"
import AxCard from "../AxCard"
import AxTable from "../AxTable"
import type { ColumnsType } from "antd/es/table"

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof AxEmptyState> = {
  title: "Feedback/AxEmptyState",
  component: AxEmptyState,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Controls padding and typography scale",
    },
    title: { control: "text" },
    description: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof AxEmptyState>

// ---------------------------------------------------------------------------
// Illustration helpers (antd icons used as stand-ins for real SVGs)
// ---------------------------------------------------------------------------

const IllustrationSm = ({ icon }: { icon: React.ReactNode }) => (
  <span style={{ fontSize: 32, color: "var(--neutral-300)" }}>{icon}</span>
)

const IllustrationMd = ({ icon }: { icon: React.ReactNode }) => (
  <span style={{ fontSize: 48, color: "var(--neutral-300)" }}>{icon}</span>
)

const IllustrationLg = ({ icon }: { icon: React.ReactNode }) => (
  <span style={{ fontSize: 80, color: "var(--neutral-200)" }}>{icon}</span>
)

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  name: "Playground",
  args: {
    title: "Nothing here yet",
    description: "When items are added they will appear here.",
    size: "md",
  },
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <AxEmptyState
        {...args}
        illustration={<IllustrationMd icon={<InboxOutlined />} />}
        action={<AxButton>Get Started</AxButton>}
      />
    </div>
  ),
}

// ===========================================================================
// PATTERNS — real-world empty state scenarios
// ===========================================================================

// ---------------------------------------------------------------------------
// No search results
// ---------------------------------------------------------------------------

export const NoSearchResults: Story = {
  name: "Pattern — No Search Results",
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <AxEmptyState
        illustration={<IllustrationMd icon={<SearchOutlined />} />}
        title="No results found"
        description='No medications matched "amoxici". Try a different search term or clear the search.'
        action={<AxButton variant="secondary">Clear Search</AxButton>}
      />
    </div>
  ),
}

// ---------------------------------------------------------------------------
// No filter results
// ---------------------------------------------------------------------------

export const NoFilterResults: Story = {
  name: "Pattern — No Filter Results",
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <AxEmptyState
        illustration={<IllustrationMd icon={<FilterOutlined />} />}
        title="No matches"
        description="No results match your current filters. Try adjusting or clearing some filters to see more."
        action={<AxButton variant="secondary">Clear Filters</AxButton>}
      />
    </div>
  ),
}

// ---------------------------------------------------------------------------
// No orders
// ---------------------------------------------------------------------------

export const NoOrders: Story = {
  name: "Pattern — No Orders",
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <AxEmptyState
        illustration={<IllustrationMd icon={<FileTextOutlined />} />}
        title="No orders yet"
        description="Once you publish your first tender, it will appear here for suppliers to bid on."
        action={<AxButton>Create Order</AxButton>}
      />
    </div>
  ),
}

// ---------------------------------------------------------------------------
// No addresses
// ---------------------------------------------------------------------------

export const NoAddresses: Story = {
  name: "Pattern — No Addresses",
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <AxEmptyState
        illustration={<IllustrationMd icon={<EnvironmentOutlined />} />}
        title="No delivery addresses"
        description="Add a delivery address to speed up future orders."
        action={<AxButton>Add Address</AxButton>}
      />
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Cart empty
// ---------------------------------------------------------------------------

export const CartEmpty: Story = {
  name: "Pattern — Empty Cart",
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <AxEmptyState
        illustration={<IllustrationMd icon={<ShoppingCartOutlined />} />}
        title="Your cart is empty"
        description="Browse the catalog and add medications to your cart to get started."
        action={<AxButton>Browse Catalog</AxButton>}
      />
    </div>
  ),
}

// ===========================================================================
// SIZE DEMOS
// ===========================================================================

// ---------------------------------------------------------------------------
// sm — inside a table
// ---------------------------------------------------------------------------

const emptyColumns: ColumnsType<object> = [
  { title: "Medication", dataIndex: "name", key: "name" },
  { title: "Status", dataIndex: "status", key: "status" },
  { title: "Quantity", dataIndex: "qty", key: "qty" },
  { title: "Price", dataIndex: "price", key: "price" },
]

export const InsideTable: Story = {
  name: "Size — sm (inside Table)",
  render: () => (
    <AxTable
      columns={emptyColumns}
      dataSource={[]}
      pagination={false}
      locale={{
        emptyText: (
          <AxEmptyState
            size="sm"
            illustration={<IllustrationSm icon={<InboxOutlined />} />}
            title="No medications found"
            description="Try adjusting your filters or search term."
            action={<AxButton size="small" variant="secondary">Clear Filters</AxButton>}
          />
        ),
      }}
    />
  ),
}

// ---------------------------------------------------------------------------
// md — inside a card panel
// ---------------------------------------------------------------------------

export const InsideCard: Story = {
  name: "Size — md (inside Card)",
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <AxCard title="Recent Orders" extra={<AxButton size="small">New Order</AxButton>}>
        <AxEmptyState
          size="md"
          illustration={<IllustrationMd icon={<FileTextOutlined />} />}
          title="No recent orders"
          description="Orders you create will appear here."
          action={<AxButton>Create Order</AxButton>}
        />
      </AxCard>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// lg — full page
// ---------------------------------------------------------------------------

export const FullPage: Story = {
  name: "Size — lg (Full Page)",
  render: () => (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--neutral-50)",
        borderRadius: 12,
      }}
    >
      <AxEmptyState
        size="lg"
        illustration={<IllustrationLg icon={<InboxOutlined />} />}
        title="No tenders available"
        description="There are no open tenders matching your profile right now. Check back soon or update your product categories."
        action={
          <Flex gap={8}>
            <AxButton variant="secondary">Update Categories</AxButton>
            <AxButton>Browse All Tenders</AxButton>
          </Flex>
        }
      />
    </div>
  ),
}

// ---------------------------------------------------------------------------
// No illustration — text only
// ---------------------------------------------------------------------------

export const TextOnly: Story = {
  name: "Feature — Text Only",
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <AxEmptyState
        title="No results"
        description="Try broadening your search."
        size="sm"
        action={<AxButton size="small" variant="secondary">Clear</AxButton>}
      />
    </div>
  ),
}
