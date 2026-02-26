import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Flex, Form } from "antd"
import { MailOutlined } from "@ant-design/icons"

import AxInputOTP from "."
import AxButton from "../AxButton"
import AxText from "../AxText"

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof AxInputOTP> = {
  title: "Controls/AxInputOTP",
  component: AxInputOTP,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    length: {
      control: { type: "number", min: 4, max: 8 },
      description: "Number of input slots (default: 6)",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Preset size",
    },
    masked: {
      control: "boolean",
      description: "Hide characters — useful for PINs",
    },
    disabled: {
      control: "boolean",
    },
    status: {
      control: "select",
      options: ["", "error", "warning"],
      description: "Validation state",
    },
  },
}

export default meta
type Story = StoryObj<typeof AxInputOTP>

// ---------------------------------------------------------------------------
// Playground — all controls work here
// ---------------------------------------------------------------------------

export const Playground: Story = {
  name: "Playground",
  args: {
    length: 6,
    size: "md",
    masked: false,
    disabled: false,
    status: "",
  },
}

// ===========================================================================
// TEMPLATES — production-ready usage patterns
// ===========================================================================

// ---------------------------------------------------------------------------
// Email verification — 6-digit code with resend action
// ---------------------------------------------------------------------------

export const EmailVerification: Story = {
  name: "Template — Email Verification",
  render: () => {
    const [value, setValue] = useState("")
    const [submitted, setSubmitted] = useState(false)

    if (submitted) {
      return (
        <Flex vertical align="center" gap={8} style={{ width: 360 }}>
          <AxText variant="heading-md">Verified</AxText>
          <AxText variant="body-sm" color="secondary">
            Your email has been confirmed.
          </AxText>
          <AxButton
            variant="ghost"
            size="sm"
            onClick={() => { setValue(""); setSubmitted(false) }}
          >
            Start again
          </AxButton>
        </Flex>
      )
    }

    return (
      <Flex vertical align="center" gap={24} style={{ width: 360 }}>
        <Flex vertical align="center" gap={8}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "var(--primary-50)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MailOutlined style={{ fontSize: 22, color: "var(--primary)" }} />
          </div>
          <AxText variant="heading-lg">Check your email</AxText>
          <AxText variant="body-sm" color="secondary" style={{ textAlign: "center" }}>
            We sent a 6-digit code to <strong>buyer@pharmaco.ke</strong>
          </AxText>
        </Flex>

        <Form layout="vertical" style={{ width: "100%" }}>
          <Form.Item label="Verification code" style={{ marginBottom: 12 }}>
            <AxInputOTP
              length={6}
              value={value}
              onChange={setValue}
              status={value.length === 6 && value !== "123456" ? "error" : ""}
            />
          </Form.Item>
          {value.length === 6 && value !== "123456" && (
            <AxText variant="body-xs" color="secondary" style={{ color: "var(--error)", marginBottom: 12 }}>
              Invalid code. Try 123456 for this demo.
            </AxText>
          )}
        </Form>

        <Flex vertical gap={8} style={{ width: "100%" }}>
          <AxButton
            style={{ width: "100%" }}
            disabled={value.length < 6}
            onClick={() => value === "123456" && setSubmitted(true)}
          >
            Verify email
          </AxButton>
          <AxButton variant="ghost" style={{ width: "100%" }}>
            Resend code
          </AxButton>
        </Flex>
      </Flex>
    )
  },
}

// ---------------------------------------------------------------------------
// PIN — 4 digits, masked
// ---------------------------------------------------------------------------

export const PIN: Story = {
  name: "Template — PIN",
  render: () => {
    const [value, setValue] = useState("")

    return (
      <Flex vertical align="center" gap={20} style={{ width: 280 }}>
        <Flex vertical align="center" gap={4}>
          <AxText variant="heading-lg">Enter your PIN</AxText>
          <AxText variant="body-sm" color="secondary">
            4-digit account PIN
          </AxText>
        </Flex>

        <AxInputOTP
          length={4}
          masked
          value={value}
          onChange={setValue}
          size="lg"
        />

        <AxButton
          style={{ width: "100%" }}
          disabled={value.length < 4}
        >
          Confirm
        </AxButton>
      </Flex>
    )
  },
}

// ===========================================================================
// FEATURE DEMOS
// ===========================================================================

// ---------------------------------------------------------------------------
// Lengths — 4, 6, 8
// ---------------------------------------------------------------------------

export const Lengths: Story = {
  name: "Feature — Lengths",
  render: () => (
    <Flex vertical gap={20}>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8 }}>
          4 slots — PIN / short code
        </AxText>
        <AxInputOTP length={4} />
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8 }}>
          6 slots — standard OTP (default)
        </AxText>
        <AxInputOTP length={6} />
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8 }}>
          8 slots — extended verification code
        </AxText>
        <AxInputOTP length={8} />
      </div>
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// Sizes — sm, md, lg
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  name: "Feature — Sizes",
  render: () => (
    <Flex vertical gap={20}>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8 }}>sm</AxText>
        <AxInputOTP length={6} size="sm" />
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8 }}>md (default)</AxText>
        <AxInputOTP length={6} size="md" />
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8 }}>lg</AxText>
        <AxInputOTP length={6} size="lg" />
      </div>
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// States — default, error, disabled
// ---------------------------------------------------------------------------

export const States: Story = {
  name: "Feature — States",
  render: () => (
    <Flex vertical gap={20}>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8 }}>Default</AxText>
        <AxInputOTP length={6} />
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8 }}>Error</AxText>
        <AxInputOTP length={6} status="error" defaultValue="12345" />
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8 }}>Disabled</AxText>
        <AxInputOTP length={6} disabled defaultValue="123456" />
      </div>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8 }}>Masked (PIN)</AxText>
        <AxInputOTP length={4} masked defaultValue="1234" />
      </div>
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}

// ---------------------------------------------------------------------------
// With separator — 3+3 group pattern (like auth app codes)
// ---------------------------------------------------------------------------

export const WithSeparator: Story = {
  name: "Feature — With Separator",
  render: () => (
    <Flex vertical gap={20}>
      <div>
        <AxText variant="body-xs" color="secondary" style={{ marginBottom: 8 }}>
          3 + 3 — standard auth code layout
        </AxText>
        <AxInputOTP
          length={6}
          separator={(index) => (index === 2 ? <span style={{ color: "var(--neutral-300)" }}>—</span> : null)}
        />
      </div>
    </Flex>
  ),
  parameters: { controls: { disable: true } },
}
