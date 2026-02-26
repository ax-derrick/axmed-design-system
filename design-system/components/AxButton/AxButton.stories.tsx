import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { SearchOutlined, DownloadOutlined, PlusOutlined } from "@ant-design/icons"

import AxButton from "./index"

const meta: Meta<typeof AxButton> = {
  title: "Actions/AxButton",
  component: AxButton,
  tags: ["autodocs"],
  args: {
    onClick: fn(),
    children: "Button",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger", "link", "text"],
      description: "Visual variant of the button",
    },
    size: {
      control: "select",
      options: ["small", "middle", "large"],
      description: "Button size",
    },
    loading: {
      control: "boolean",
      description: "Shows a loading spinner",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
    },
    block: {
      control: "boolean",
      description: "Makes the button full width",
    },
  },
}

export default meta
type Story = StoryObj<typeof AxButton>

// -- Playground --

export const Playground: Story = {
  name: "Playground",
  args: {
    variant: "primary",
    size: "middle",
    loading: false,
    disabled: false,
    block: false,
    children: "Button",
  },
}

// -- Variants --

export const Primary: Story = {
  name: "Feature — Primary",
  args: {
    variant: "primary",
    children: "Primary Button",
  },
}

export const Secondary: Story = {
  name: "Feature — Secondary",
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
}

export const Ghost: Story = {
  name: "Feature — Ghost",
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
}

export const Danger: Story = {
  name: "Feature — Danger",
  args: {
    variant: "danger",
    children: "Danger Button",
  },
}

export const Link: Story = {
  name: "Feature — Link",
  args: {
    variant: "link",
    children: "Link Button",
  },
}

export const Text: Story = {
  name: "Feature — Text",
  args: {
    variant: "text",
    children: "Text Button",
  },
}

// -- Sizes --

export const Small: Story = {
  name: "Feature — Small",
  args: {
    size: "small",
    children: "Small",
  },
}

export const Large: Story = {
  name: "Feature — Large",
  args: {
    size: "large",
    children: "Large",
  },
}

// -- States --

export const Loading: Story = {
  name: "State — Loading",
  args: {
    loading: true,
    children: "Submitting...",
  },
}

export const Disabled: Story = {
  name: "State — Disabled",
  args: {
    disabled: true,
    children: "Disabled",
  },
}

// -- With Icons --

export const WithIcon: Story = {
  name: "Feature — With Icon",
  args: {
    icon: <SearchOutlined />,
    children: "Search",
  },
}

export const IconOnly: Story = {
  name: "Feature — Icon Only",
  args: {
    icon: <PlusOutlined />,
    children: undefined,
    shape: "circle",
  },
}

export const WithIconRight: Story = {
  name: "Feature — Icon Right",
  args: {
    iconPlacement: "end",
    icon: <DownloadOutlined />,
    children: "Download",
  },
}

// -- Full Width --

export const FullWidth: Story = {
  name: "Feature — Full Width",
  args: {
    block: true,
    children: "Full Width Button",
  },
  parameters: {
    layout: "padded",
  },
}

// -- Templates --

export const AllVariants: Story = {
  name: "Template — All Variants",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
      <AxButton variant="primary">Primary</AxButton>
      <AxButton variant="secondary">Secondary</AxButton>
      <AxButton variant="ghost">Ghost</AxButton>
      <AxButton variant="danger">Danger</AxButton>
      <AxButton variant="link">Link</AxButton>
      <AxButton variant="text">Text</AxButton>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

export const AllSizes: Story = {
  name: "Template — All Sizes",
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <AxButton size="small">Small</AxButton>
      <AxButton size="middle">Middle</AxButton>
      <AxButton size="large">Large</AxButton>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

export const AllStates: Story = {
  name: "Template — All States",
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <AxButton variant="primary">Default</AxButton>
      <AxButton variant="primary" loading>Loading</AxButton>
      <AxButton variant="primary" disabled>Disabled</AxButton>
    </div>
  ),
  parameters: { controls: { disable: true } },
}
