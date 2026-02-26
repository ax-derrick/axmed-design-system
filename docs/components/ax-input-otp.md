# AxInputOTP

> OTP/PIN code input wrapping antd Input.OTP with the same label, hint, and error layout used by AxInput.

## Import

```tsx
import { AxInputOTP } from "axmed-design-system"
import type { AxInputOTPProps } from "axmed-design-system"
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `length` | `number` | `6` | Number of individual digit/character input slots. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Input size. Maps internally to antd `small`, `middle`, `large`. |
| `masked` | `boolean \| string` | -- | Masks entered values. `true` uses the default bullet character. Pass a custom string to use a different mask character. |
| `label` | `string` | -- | Label displayed above the OTP input. |
| `hint` | `string` | -- | Helper text displayed below the input (neutral color). |
| `error` | `string` | -- | Error message displayed below the input in red. Also sets `aria-invalid`. |
| `required` | `boolean` | `false` | Adds a red asterisk to the label. |
| `onChange` | `(value: string) => void` | -- | Called with the concatenated value as the user types. |

All other [antd Input.OTP props](https://ant.design/components/input#inputotp) are forwarded, **except** `size`, `mask`, and `length` (remapped by AxInputOTP).

## Basic Usage

```tsx
import { AxInputOTP } from "axmed-design-system"

function VerificationStep() {
  return (
    <AxInputOTP
      label="Verification Code"
      hint="Enter the 6-digit code sent to your email"
      onChange={(code) => console.log("Code:", code)}
    />
  )
}
```

## Examples

### 6-digit verification code

```tsx
import { useState } from "react"
import { AxInputOTP, AxButton } from "axmed-design-system"

function EmailVerification() {
  const [code, setCode] = useState("")

  return (
    <div style={{ maxWidth: 360 }}>
      <AxInputOTP
        label="Verification Code"
        hint="We sent a 6-digit code to procurement@hospital.org"
        onChange={setCode}
      />
      <AxButton
        variant="primary"
        block
        disabled={code.length < 6}
        style={{ marginTop: 16 }}
        onClick={() => console.log("Verify:", code)}
      >
        Verify
      </AxButton>
    </div>
  )
}
```

### 4-digit PIN with masking

```tsx
import { AxInputOTP } from "axmed-design-system"

function PinEntry() {
  return (
    <AxInputOTP
      length={4}
      masked
      label="Enter PIN"
      hint="Your 4-digit security PIN"
      onChange={(pin) => console.log("PIN:", pin)}
    />
  )
}
```

### With error state

```tsx
import { useState } from "react"
import { AxInputOTP } from "axmed-design-system"

function OTPWithValidation() {
  const [error, setError] = useState<string | undefined>()

  const handleChange = (value: string) => {
    if (value.length === 6) {
      // Simulate server-side validation
      const isValid = value === "123456"
      setError(isValid ? undefined : "Invalid code. Please try again.")
    } else {
      setError(undefined)
    }
  }

  return (
    <AxInputOTP
      label="Verification Code"
      error={error}
      onChange={handleChange}
    />
  )
}
```

### Email verification flow

A complete verification flow with a submit button and resend link.

```tsx
import { useState, useCallback } from "react"
import { AxInputOTP, AxButton } from "axmed-design-system"

function VerificationFlow() {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [resendCooldown, setResendCooldown] = useState(0)

  const handleVerify = useCallback(async () => {
    setLoading(true)
    setError(undefined)
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        body: JSON.stringify({ code }),
      })
      if (!res.ok) throw new Error("Invalid code")
      // success — redirect or update state
    } catch {
      setError("The code you entered is incorrect. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [code])

  const handleResend = useCallback(() => {
    setResendCooldown(60)
    fetch("/api/resend-code", { method: "POST" })
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [])

  return (
    <div style={{ maxWidth: 360, textAlign: "center" }}>
      <h2>Check your email</h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>
        We sent a verification code to <strong>admin@pharma-supplies.com</strong>
      </p>

      <AxInputOTP
        label="Verification Code"
        required
        error={error}
        onChange={setCode}
      />

      <AxButton
        variant="primary"
        block
        loading={loading}
        disabled={code.length < 6}
        onClick={handleVerify}
        style={{ marginTop: 16 }}
      >
        Verify Email
      </AxButton>

      <AxButton
        variant="link"
        disabled={resendCooldown > 0}
        onClick={handleResend}
        style={{ marginTop: 8 }}
      >
        {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend code"}
      </AxButton>
    </div>
  )
}
```

## Related Components

- [AxInput](./ax-input.md) -- standard text input with the same label/hint/error layout
- [AxButton](./ax-button.md) -- typically paired for form submission

## Storybook

[View in Storybook](https://ax-derrick.github.io/axmed-design-system/?path=/docs/controls-axinputotp--docs)
