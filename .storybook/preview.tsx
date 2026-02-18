import React from "react"
import type { Preview } from "@storybook/react"
import { ConfigProvider } from "antd"

import theme from "./theme"
import "@/styles/globals.scss"

const preview: Preview = {
  decorators: [
    (Story) => (
      <ConfigProvider theme={theme}>
        <Story />
      </ConfigProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
}

export default preview
