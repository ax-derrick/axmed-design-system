import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { SearchOutlined, DownloadOutlined, PlusOutlined } from "@ant-design/icons"

import AxButton from "./index"

const meta: Meta<typeof AxButton> = {
  title: "Design System/AxButton",
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

// -- Variants --

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
}

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Danger Button",
  },
}

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link Button",
  },
}

export const Text: Story = {
  args: {
    variant: "text",
    children: "Text Button",
  },
}

// -- Sizes --

export const Small: Story = {
  args: {
    size: "small",
    children: "Small",
  },
}

export const Large: Story = {
  args: {
    size: "large",
    children: "Large",
  },
}

// -- States --

export const Loading: Story = {
  args: {
    loading: true,
    children: "Submitting...",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
}

// -- With Icons --

export const WithIcon: Story = {
  args: {
    icon: <SearchOutlined />,
    children: "Search",
  },
}

export const IconOnly: Story = {
  args: {
    icon: <PlusOutlined />,
    children: undefined,
    shape: "circle",
  },
}

export const WithIconRight: Story = {
  args: {
    iconPosition: "end",
    icon: <DownloadOutlined />,
    children: "Download",
  },
}

// -- Full Width --

export const FullWidth: Story = {
  args: {
    block: true,
    children: "Full Width Button",
  },
  parameters: {
    layout: "padded",
  },
}
