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
}: {
  variable: string
  hex: string
  border?: boolean
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 0" }}>
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 6,
        backgroundColor: hex,
        border: border ? "1px solid #EAECF0" : "none",
        flexShrink: 0,
      }}
    />
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#101828" }}>{variable}</span>
      <span style={{ fontSize: 12, color: "#475467", fontFamily: "'Fira Code', monospace" }}>
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
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div style={{ marginBottom: 32 }}>
    <div
      style={{
        fontSize: 13,
        fontWeight: 650,
        color: "#475467",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: 12,
        paddingBottom: 8,
        borderBottom: "1px solid #EAECF0",
      }}
    >
      {title}
    </div>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
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
    <div style={{ maxWidth: 960, fontFamily: "'Figtree', sans-serif" }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: "#101828", marginBottom: 4 }}>
        Color Palette
      </h2>
      <p style={{ fontSize: 14, color: "#475467", marginBottom: 32 }}>
        All CSS custom properties defined in{" "}
        <code style={{ fontSize: 12, background: "#F2F4F7", padding: "2px 6px", borderRadius: 4 }}>
          styles/_colors.scss
        </code>
      </p>

      <Section title="Brand / Primary">
        <Swatch variable="--primary-50" hex="#F9F9FF" border />
        <Swatch variable="--primary-200" hex="#D6E4FF" border />
        <Swatch variable="--primary-300" hex="#DBD6FF" border />
        <Swatch variable="--primary-400" hex="#9796F0" />
        <Swatch variable="--primary-600" hex="#392AB0" />
        <Swatch variable="--primary-700" hex="#5A47EB" />
        <Swatch variable="--primary-900" hex="#261C7A" />
        <Swatch variable="--magenta" hex="#E73BC1" />
      </Section>

      <Section title="Text">
        <Swatch variable="--text-primary" hex="#101828" />
        <Swatch variable="--text-secondary" hex="#475467" />
        <Swatch variable="--text-link" hex="#008EF0" />
      </Section>

      <Section title="Neutrals">
        <Swatch variable="--neutral-0" hex="#FFFFFF" border />
        <Swatch variable="--neutral-50" hex="#F9FAFB" border />
        <Swatch variable="--neutral-100" hex="#F2F4F7" border />
        <Swatch variable="--neutral-150" hex="#F0F0F0" border />
        <Swatch variable="--neutral-200" hex="#EAECF0" border />
        <Swatch variable="--neutral-300" hex="#D0D5DD" />
        <Swatch variable="--neutral-500" hex="#BFBFBF" />
        <Swatch variable="--neutral-600" hex="#8C8C8C" />
        <Swatch variable="--neutral-650" hex="#858890" />
        <Swatch variable="--neutral-700" hex="#595959" />
        <Swatch variable="--neutral-800" hex="#434343" />
      </Section>

      <Section title="Blue">
        <Swatch variable="--blue-10" hex="#FAFDFF" border />
        <Swatch variable="--blue-25" hex="#F7FAFE" border />
        <Swatch variable="--blue-50" hex="#F0F5FF" border />
        <Swatch variable="--blue-75" hex="#E6F7FF" border />
        <Swatch variable="--blue-100" hex="#EBFAFF" border />
        <Swatch variable="--blue-125" hex="#E8F0F6" border />
        <Swatch variable="--blue-150" hex="#D5EBF9" border />
        <Swatch variable="--blue-200" hex="#CBF2FF" border />
        <Swatch variable="--blue-250" hex="#D6E4FF" border />
        <Swatch variable="--blue-400" hex="#85A5FF" />
        <Swatch variable="--blue-600" hex="#1890FF" />
        <Swatch variable="--blue-700" hex="#2F54EB" />
        <Swatch variable="--blue-800" hex="#0EABDD" />
        <Swatch variable="--blue-900" hex="#00779D" />
      </Section>

      <Section title="Green / Success">
        <Swatch variable="--green-50" hex="#F6FFED" border />
        <Swatch variable="--green-100" hex="#E0FFEC" border />
        <Swatch variable="--green-150" hex="#CEF5F1" border />
        <Swatch variable="--green-200" hex="#B1FBCD" border />
        <Swatch variable="--green-400" hex="#31EABD" />
        <Swatch variable="--green-600" hex="#52C41A" />
        <Swatch variable="--green-700" hex="#389E0D" />
        <Swatch variable="--green-800" hex="#00A93F" />
      </Section>

      <Section title="Red / Error">
        <Swatch variable="--red-50" hex="#FEF3F2" border />
        <Swatch variable="--red-500" hex="#FF4538" />
        <Swatch variable="--red-600" hex="#F5222D" />
        <Swatch variable="--red-700" hex="#E72315" />
        <Swatch variable="--red-800" hex="#D61406" />
      </Section>

      <Section title="Orange / Warning">
        <Swatch variable="--orange-25" hex="#FFFEF6" border />
        <Swatch variable="--orange-50" hex="#FFFAEB" border />
        <Swatch variable="--orange-400" hex="#FDB022" />
        <Swatch variable="--orange-500" hex="#FAAD14" />
        <Swatch variable="--orange-600" hex="#F79009" />
      </Section>
    </div>
  ),
}
