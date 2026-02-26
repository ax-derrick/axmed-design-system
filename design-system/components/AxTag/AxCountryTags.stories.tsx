import type { Meta, StoryObj } from "@storybook/react"
import { Flex } from "antd"

import AxCountryTags from "./CountryTags"
import AxText from "../AxText"
import AxTable from "../AxTable"

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof AxCountryTags> = {
  title: "Data Display/AxTag/Country Tags",
  component: AxCountryTags,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    max: {
      control: { type: "number", min: 1, max: 10 },
      description: "Max visible tags before collapsing (default: 3)",
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
  },
}

export default meta
type Story = StoryObj<typeof AxCountryTags>

// ---------------------------------------------------------------------------
// Playground — all controls work here
// ---------------------------------------------------------------------------

export const Playground: Story = {
  name: "Playground",
  args: {
    countries: ["Kenya", "Nigeria", "Ghana", "Tanzania", "Uganda", "South Africa"],
    max: 3,
    size: "sm",
  },
}

// ===========================================================================
// TEMPLATES
// ===========================================================================

// ---------------------------------------------------------------------------
// In a table — typical supplier eligibility column
// ---------------------------------------------------------------------------

export const InTable: Story = {
  name: "Template — Supplier Table",
  render: () => {
    const data = [
      {
        key: "1",
        supplier: "PharmaCorp Ltd",
        countries: ["Kenya", "Nigeria", "Ghana", "Tanzania", "Uganda"],
        status: "Approved",
      },
      {
        key: "2",
        supplier: "MediGlobal SA",
        countries: ["South Africa", "Zambia", "Zimbabwe"],
        status: "Approved",
      },
      {
        key: "3",
        supplier: "AfriPharma Co",
        countries: ["Ethiopia", "Rwanda"],
        status: "Pending",
      },
      {
        key: "4",
        supplier: "Global Remedies",
        countries: [
          "Kenya", "Nigeria", "Ghana", "Egypt",
          "Morocco", "Senegal", "Cameroon", "India",
        ],
        status: "Approved",
      },
    ]

    return (
      <AxTable
        columns={[
          { key: "supplier", title: "Supplier", dataIndex: "supplier" },
          {
            key: "countries",
            title: "Ships to",
            dataIndex: "countries",
            render: (countries: string[]) => <AxCountryTags countries={countries} max={3} />,
          },
          { key: "status", title: "Status", dataIndex: "status" },
        ]}
        dataSource={data}
        pagination={false}
      />
    )
  },
}

// ===========================================================================
// FEATURE DEMOS
// ===========================================================================

// ---------------------------------------------------------------------------
// Overflow — how +N more collapses
// ---------------------------------------------------------------------------

export const Overflow: Story = {
  name: "Feature — Overflow",
  render: () => (
    <Flex vertical gap={16} style={{ width: 420 }}>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 6 }}>
          2 countries — no overflow
        </AxText>
        <AxCountryTags countries={["Kenya", "Nigeria"]} max={3} />
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 6 }}>
          3 countries — exactly at limit
        </AxText>
        <AxCountryTags countries={["Kenya", "Nigeria", "Ghana"]} max={3} />
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 6 }}>
          6 countries — 3 visible, hover "+3 more" for the rest
        </AxText>
        <AxCountryTags
          countries={["Kenya", "Nigeria", "Ghana", "Tanzania", "Uganda", "Rwanda"]}
          max={3}
        />
      </div>
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// ISO codes — 2-letter codes auto-resolve flag
// ---------------------------------------------------------------------------

export const IsoCodes: Story = {
  name: "Feature — ISO Codes",
  render: () => (
    <Flex vertical gap={16}>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 6 }}>
          Country names
        </AxText>
        <AxCountryTags countries={["Kenya", "Nigeria", "India", "Germany"]} />
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 6 }}>
          ISO alpha-2 codes
        </AxText>
        <AxCountryTags countries={["KE", "NG", "IN", "DE"]} />
      </div>
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  name: "Feature — Sizes",
  render: () => (
    <Flex vertical gap={12}>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 6 }}>sm (default)</AxText>
        <AxCountryTags countries={["Kenya", "Nigeria", "Ghana", "Tanzania"]} size="sm" />
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 6 }}>md</AxText>
        <AxCountryTags countries={["Kenya", "Nigeria", "Ghana", "Tanzania"]} size="md" />
      </div>
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}
