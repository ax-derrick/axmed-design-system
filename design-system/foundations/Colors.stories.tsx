import React from "react"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta = {
  title: "Foundations/Colors",
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj

// ---------------------------------------------------------------------------
// Swatch component
// ---------------------------------------------------------------------------

const Swatch = ({
  variable,
  hex,
  border,
  brandLabel,
}: {
  variable: string
  hex: string
  border?: boolean
  brandLabel?: string
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 0" }}>
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 6,
        backgroundColor: hex,
        border: border ? "1px solid var(--neutral-200)" : "none",
        flexShrink: 0,
      }}
    />
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{variable}</span>
        {brandLabel && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "var(--text-link)",
              background: "var(--cyan-50)",
              padding: "1px 6px",
              borderRadius: 4,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {brandLabel}
          </span>
        )}
      </div>
      <span style={{ fontSize: 12, color: "var(--text-secondary)", fontFamily: "'Fira Code', monospace" }}>
        {hex}
      </span>
    </div>
  </div>
)

// ---------------------------------------------------------------------------
// Section component
// ---------------------------------------------------------------------------

const Section = ({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) => (
  <div style={{ marginBottom: 40 }}>
    <div
      style={{
        fontSize: 13,
        fontWeight: 650,
        color: "var(--text-secondary)",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: description ? 4 : 12,
        paddingBottom: description ? 0 : 8,
        borderBottom: description ? "none" : "1px solid var(--neutral-200)",
      }}
    >
      {title}
    </div>
    {description && (
      <p
        style={{
          fontSize: 12,
          color: "var(--neutral-500)",
          marginBottom: 12,
          marginTop: 4,
          paddingBottom: 8,
          borderBottom: "1px solid var(--neutral-200)",
        }}
      >
        {description}
      </p>
    )}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "4px 32px",
      }}
    >
      {children}
    </div>
  </div>
)

// =============================================================================
// Story
// =============================================================================

export const AllColors: Story = {
  name: "Color Palette",
  render: () => (
    <div style={{ maxWidth: 1040, fontFamily: "var(--font-family-sans)" }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
        Color Palette
      </h2>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8 }}>
        All CSS custom properties defined in{" "}
        <code style={{ fontSize: 12, background: "var(--neutral-100)", padding: "2px 6px", borderRadius: 4 }}>
          styles/_colors.scss
        </code>
      </p>
      <p style={{ fontSize: 13, color: "var(--neutral-500)", marginBottom: 32 }}>
        Scales generated from official brand anchors using tints.dev (OKLCH perceptual color space).
        Tokens tagged <strong style={{ color: "var(--text-link)" }}>BRAND</strong> are the exact Axmed brand hex values.
      </p>

      <Section
        title="Primary / Navy"
        description="Axmed Navy #261C7A sits at primary-600. Use 50–200 for tinted backgrounds, 400–500 for interactive states, 700–950 for deep/dark contexts."
      >
        <Swatch variable="--primary-50"  hex="#F3F1FF" border />
        <Swatch variable="--primary-100" hex="#E7E6FA" border />
        <Swatch variable="--primary-200" hex="#D0CEF5" border />
        <Swatch variable="--primary-300" hex="#9F9AEB" />
        <Swatch variable="--primary-400" hex="#726AE0" />
        <Swatch variable="--primary-500" hex="#4738CC" />
        <Swatch variable="--primary-600" hex="#261C7A" brandLabel="Axmed Navy" />
        <Swatch variable="--primary-700" hex="#1F1769" />
        <Swatch variable="--primary-800" hex="#181156" />
        <Swatch variable="--primary-900" hex="#110B44" />
        <Swatch variable="--primary-950" hex="#0B0633" />
      </Section>

      <Section
        title="Cyan"
        description="Axmed Cyan #0CC4FF sits at cyan-500. cyan-600 (#0099C8) is used for links/interactive — it meets WCAG AA on white. Use 50–200 for tinted backgrounds."
      >
        <Swatch variable="--cyan-50"  hex="#EEF8FF" border />
        <Swatch variable="--cyan-100" hex="#E3F3FF" border />
        <Swatch variable="--cyan-200" hex="#C5E7FF" border />
        <Swatch variable="--cyan-300" hex="#9BDAFF" />
        <Swatch variable="--cyan-400" hex="#6ECFFF" />
        <Swatch variable="--cyan-500" hex="#0CC4FF" brandLabel="Axmed Cyan" />
        <Swatch variable="--cyan-600" hex="#0099C8" brandLabel="--text-link" />
        <Swatch variable="--cyan-700" hex="#007094" />
        <Swatch variable="--cyan-800" hex="#004D66" />
        <Swatch variable="--cyan-900" hex="#002939" />
        <Swatch variable="--cyan-950" hex="#001823" />
      </Section>

      <Section
        title="Green"
        description="Axmed Green #4FE788 sits at green-500 (neon brand accent). Use green-600+ for accessible text. green-50–200 for success backgrounds."
      >
        <Swatch variable="--green-50"  hex="#EBFEF0" border />
        <Swatch variable="--green-100" hex="#D5FDDF" border />
        <Swatch variable="--green-200" hex="#AFFCC5" border />
        <Swatch variable="--green-300" hex="#64FB9A" />
        <Swatch variable="--green-400" hex="#54F38F" />
        <Swatch variable="--green-500" hex="#4FE788" brandLabel="Axmed Green" />
        <Swatch variable="--green-600" hex="#3CB66A" />
        <Swatch variable="--green-700" hex="#2A844C" />
        <Swatch variable="--green-800" hex="#195931" />
        <Swatch variable="--green-900" hex="#092E17" />
        <Swatch variable="--green-950" hex="#041C0C" />
      </Section>

      <Section
        title="Magenta"
        description="Axmed Magenta #E73BC1 sits at magenta-500. Brand accent — use sparingly for highlights and badges."
      >
        <Swatch variable="--magenta-50"  hex="#FDF0F9" border />
        <Swatch variable="--magenta-100" hex="#FBDDF1" border />
        <Swatch variable="--magenta-200" hex="#F8B9E4" border />
        <Swatch variable="--magenta-300" hex="#F597DA" />
        <Swatch variable="--magenta-400" hex="#F26CCF" />
        <Swatch variable="--magenta-500" hex="#E73BC1" brandLabel="Axmed Magenta" />
        <Swatch variable="--magenta-600" hex="#B92D9A" />
        <Swatch variable="--magenta-700" hex="#8D2075" />
        <Swatch variable="--magenta-800" hex="#60134F" />
        <Swatch variable="--magenta-900" hex="#3A082F" />
        <Swatch variable="--magenta-950" hex="#290420" />
      </Section>

      <Section
        title="Lime"
        description="Axmed Lime #CCFF6C sits at lime-500 (neon brand accent). Use lime-600+ for text. lime-50–200 for tinted backgrounds."
      >
        <Swatch variable="--lime-50"  hex="#FBFFE8" border />
        <Swatch variable="--lime-100" hex="#F7FFED" border />
        <Swatch variable="--lime-200" hex="#EFFFDA" border />
        <Swatch variable="--lime-300" hex="#DEFFAD" border />
        <Swatch variable="--lime-400" hex="#D5FF90" border />
        <Swatch variable="--lime-500" hex="#CCFF6C" brandLabel="Axmed Lime" />
        <Swatch variable="--lime-600" hex="#97C900" />
        <Swatch variable="--lime-700" hex="#6D9200" />
        <Swatch variable="--lime-800" hex="#486200" />
        <Swatch variable="--lime-900" hex="#243300" />
        <Swatch variable="--lime-950" hex="#131D00" />
      </Section>

      <Section
        title="Neutral"
        description="UI grays from white (0) to near-black (900). Axmed Black #262626 = neutral-800. neutral-900 (#101828) = --text-primary. neutral-600 (#475467) = --text-secondary."
      >
        <Swatch variable="--neutral-0"   hex="#FFFFFF" border />
        <Swatch variable="--neutral-50"  hex="#F9FAFB" border />
        <Swatch variable="--neutral-100" hex="#F2F4F7" border />
        <Swatch variable="--neutral-200" hex="#EAECF0" border />
        <Swatch variable="--neutral-300" hex="#D0D5DD" />
        <Swatch variable="--neutral-400" hex="#98A2B3" />
        <Swatch variable="--neutral-500" hex="#667085" brandLabel="--text-secondary" />
        <Swatch variable="--neutral-600" hex="#475467" />
        <Swatch variable="--neutral-700" hex="#344054" />
        <Swatch variable="--neutral-800" hex="#262626" brandLabel="Axmed Black · --text-primary" />
        <Swatch variable="--neutral-900" hex="#101828" />
      </Section>

      <Section
        title="Semantic"
        description="Single-value aliases for common use cases — reach for these before the raw scales."
      >
        <Swatch variable="--text-primary"   hex="#262626" brandLabel="Axmed Black" />
        <Swatch variable="--text-secondary" hex="#667085" />
        <Swatch variable="--text-link"      hex="#0099C8" />
        <Swatch variable="--text-disabled"  hex="#98A2B3" />
        <Swatch variable="--success"        hex="#3CB66A" />
        <Swatch variable="--warning"        hex="#FAAD14" />
        <Swatch variable="--error"          hex="#F5222D" />
      </Section>

      <Section
        title="Red / Error"
        description="Semantic error and destructive action colors."
      >
        <Swatch variable="--red-50"  hex="#FEF3F2" border />
        <Swatch variable="--red-500" hex="#FF4538" />
        <Swatch variable="--red-600" hex="#F5222D" />
        <Swatch variable="--red-700" hex="#E72315" />
        <Swatch variable="--red-800" hex="#D61406" />
      </Section>

      <Section
        title="Orange / Warning"
        description="Semantic warning and caution colors."
      >
        <Swatch variable="--orange-25"  hex="#FFFEF6" border />
        <Swatch variable="--orange-50"  hex="#FFFAEB" border />
        <Swatch variable="--orange-400" hex="#FDB022" />
        <Swatch variable="--orange-500" hex="#FAAD14" />
        <Swatch variable="--orange-600" hex="#F79009" />
      </Section>
    </div>
  ),
}
