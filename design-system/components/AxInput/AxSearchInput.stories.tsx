import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Flex } from "antd"

import AxSearchInput from "./SearchInput"
import AxText from "../AxText"

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof AxSearchInput> = {
  title: "Controls/AxInput/Search",
  component: AxSearchInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Preset size",
    },
    label: {
      control: "text",
      description: "Label displayed above the input",
    },
    hint: {
      control: "text",
      description: "Helper text below the input (neutral)",
    },
    error: {
      control: "text",
      description: "Error message below the input — also sets the error border",
    },
    required: {
      control: "boolean",
      description: "Adds a red asterisk to the label",
    },
    debounce: {
      control: "number",
      description: "Delay in ms before onSearch fires (default: 300)",
    },
    placeholder: {
      control: "text",
    },
    allowClear: {
      control: "boolean",
      description: "Show clear icon when input has a value (default: true)",
    },
    disabled: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof AxSearchInput>

// ---------------------------------------------------------------------------
// Playground — all controls work here
// ---------------------------------------------------------------------------

export const Playground: Story = {
  name: "Playground",
  args: {
    label: "Search",
    hint: "Results update as you type.",
    placeholder: "Search...",
    size: "md",
    debounce: 300,
    allowClear: true,
    disabled: false,
  },
  render: (args) => (
    <AxSearchInput
      {...args}
      style={{ width: 320 }}
      onSearch={(v) => console.log("onSearch:", v)}
    />
  ),
}

// ===========================================================================
// TEMPLATES — production-ready usage patterns
// ===========================================================================

// ---------------------------------------------------------------------------
// With results — filter a list in real time
// ---------------------------------------------------------------------------

export const WithResults: Story = {
  name: "Template — With Results",
  render: () => {
    const ALL_ITEMS = [
      "Amoxicillin 500mg",
      "Metformin 850mg",
      "Ibuprofen 400mg",
      "Artemether 20mg",
      "Paracetamol 500mg",
      "Ciprofloxacin 250mg",
    ]
    const [results, setResults] = useState(ALL_ITEMS)

    return (
      <Flex vertical gap={12} style={{ width: 360 }}>
        <AxSearchInput
          label="Search medications"
          hint="Filter the list in real time."
          placeholder="e.g. Amoxicillin..."
          debounce={200}
          onSearch={(v) => {
            const q = v.toLowerCase()
            setResults(
              q ? ALL_ITEMS.filter((item) => item.toLowerCase().includes(q)) : ALL_ITEMS,
            )
          }}
        />
        <Flex vertical gap={4}>
          {results.length > 0 ? (
            results.map((item) => (
              <div
                key={item}
                style={{
                  padding: "10px 12px",
                  background: "var(--neutral-50)",
                  borderRadius: 6,
                }}
              >
                <AxText variant="body-sm">{item}</AxText>
              </div>
            ))
          ) : (
            <AxText variant="body-sm" color="secondary" style={{ padding: "10px 0" }}>
              No results
            </AxText>
          )}
        </Flex>
      </Flex>
    )
  },
}

// ===========================================================================
// FEATURE DEMOS
// ===========================================================================

// ---------------------------------------------------------------------------
// Debounce — visually shows when onChange fires vs when onSearch fires
// ---------------------------------------------------------------------------

export const Debounce: Story = {
  name: "Feature — Debounce",
  render: () => {
    const [immediate, setImmediate] = useState("")
    const [log, setLog] = useState<string[]>([])

    return (
      <Flex vertical gap={16} style={{ width: 380 }}>
        <AxSearchInput
          label="Search"
          hint="onSearch fires 500ms after you stop typing."
          placeholder="Type to see the difference..."
          debounce={500}
          onChange={(e) => setImmediate(e.target.value)}
          onSearch={(value) =>
            setLog((prev) => [`"${value || "(empty)"}"`, ...prev].slice(0, 5))
          }
        />

        <Flex vertical gap={4}>
          <AxText variant="body-xs" color="secondary">
            onChange (fires on every keystroke):{" "}
            <strong style={{ color: "var(--text-primary)" }}>{immediate || "—"}</strong>
          </AxText>
        </Flex>

        <Flex vertical gap={6}>
          <AxText variant="body-xs" color="secondary">
            onSearch (fires 500ms after typing stops):
          </AxText>
          {log.length === 0 ? (
            <AxText variant="body-xs" color="disabled">
              No searches fired yet
            </AxText>
          ) : (
            log.map((entry, i) => (
              <AxText key={i} variant="body-xs" color={i === 0 ? "primary" : "secondary"}>
                {entry}
              </AxText>
            ))
          )}
        </Flex>
      </Flex>
    )
  },
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// Sizes — sm, md, lg
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  name: "Feature — Sizes",
  render: () => (
    <Flex vertical gap={16} style={{ width: 320 }}>
      <AxSearchInput size="sm" label="Small" placeholder="sm" hint="size=sm" />
      <AxSearchInput size="md" label="Medium (default)" placeholder="md" hint="size=md" />
      <AxSearchInput size="lg" label="Large" placeholder="lg" hint="size=lg" />
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}
