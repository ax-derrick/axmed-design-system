import React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import AxText from "./index"

const meta: Meta<typeof AxText> = {
  title: "Foundations/Typography",
  component: AxText,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "heading-4xl",
        "heading-3xl",
        "heading-2xl",
        "heading-xl",
        "heading-lg",
        "heading-md",
        "heading-sm",
        "body-xl",
        "body-lg",
        "body-md",
        "body-sm",
        "body-xs",
      ],
    },
    weight: {
      control: "select",
      options: ["regular", "medium", "semibold"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "link", "disabled", "inherit"],
      description: "See Foundations/Colors for the full color palette.",
    },
    italic: { control: "boolean" },
    underline: { control: "boolean" },
    mono: { control: "boolean" },
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "label", "div"],
    },
  },
}

export default meta
type Story = StoryObj<typeof AxText>

// =============================================================================
// Playground — all controls work here
// =============================================================================

export const Playground: Story = {
  name: "Playground",
  args: {
    variant: "body-md",
    children: "Toggle the controls on the right to see changes. Try switching variant, weight, color, italic, underline, and mono.",
    weight: "regular",
    color: "primary",
    italic: false,
    underline: false,
    mono: false,
  },
}

// =============================================================================
// Sample content
// =============================================================================

const sampleHeading = "The Quick Brown Fox Jumps Over the Lazy"

const sampleParagraph =
  "Axmed brings just, verifiable, and wide pharmaceutical access to every region. Our platform expedites the full procurement cycle — from publishing tenders and analyzing bids to organizing shipments, warehousing stock, and executing payments. By joining expertise with technology, we keep delivering quality healthcare for communities worldwide. abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789"

const sampleParagraphShort =
  "The five boxing wizards jump quickly over the lazy dog."

// =============================================================================
// Headings
// =============================================================================

export const Heading4xl: Story = {
  name: "heading-4xl",
  args: { variant: "heading-4xl", children: sampleHeading },
}

export const Heading3xl: Story = {
  name: "heading-3xl",
  args: { variant: "heading-3xl", children: sampleHeading },
}

export const Heading2xl: Story = {
  name: "heading-2xl",
  args: { variant: "heading-2xl", children: sampleHeading },
}

export const HeadingXl: Story = {
  name: "heading-xl",
  args: { variant: "heading-xl", children: sampleHeading },
}

export const HeadingLg: Story = {
  name: "heading-lg",
  args: { variant: "heading-lg", children: sampleHeading },
}

export const HeadingMd: Story = {
  name: "heading-md",
  args: { variant: "heading-md", children: sampleHeading },
}

export const HeadingSm: Story = {
  name: "heading-sm",
  args: { variant: "heading-sm", children: sampleHeading },
}

// =============================================================================
// All Headings (overview)
// =============================================================================

export const AllHeadings: Story = {
  name: "All Headings",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <AxText variant="heading-4xl">{sampleHeading}</AxText>
      <AxText variant="heading-3xl">{sampleHeading}</AxText>
      <AxText variant="heading-2xl">{sampleHeading}</AxText>
      <AxText variant="heading-xl">{sampleHeading}</AxText>
      <AxText variant="heading-lg">{sampleHeading}</AxText>
      <AxText variant="heading-md">{sampleHeading}</AxText>
      <AxText variant="heading-sm">{sampleHeading}</AxText>
    </div>
  ),
}

// =============================================================================
// Body — xl
// =============================================================================

export const BodyXlRegular: Story = {
  name: "body-xl / regular",
  args: { variant: "body-xl", weight: "regular", children: sampleParagraph },
}

export const BodyXlMedium: Story = {
  name: "body-xl / medium",
  args: { variant: "body-xl", weight: "medium", children: sampleParagraph },
}

export const BodyXlSemibold: Story = {
  name: "body-xl / semibold",
  args: { variant: "body-xl", weight: "semibold", children: sampleParagraph },
}

export const BodyXlUnderline: Story = {
  name: "body-xl / underline",
  args: {
    variant: "body-xl",
    weight: "regular",
    underline: true,
    children: sampleParagraphShort,
  },
}

// =============================================================================
// Body — lg
// =============================================================================

export const BodyLgRegular: Story = {
  name: "body-lg / regular",
  args: { variant: "body-lg", weight: "regular", children: sampleParagraph },
}

export const BodyLgMedium: Story = {
  name: "body-lg / medium",
  args: { variant: "body-lg", weight: "medium", children: sampleParagraph },
}

export const BodyLgSemibold: Story = {
  name: "body-lg / semibold",
  args: { variant: "body-lg", weight: "semibold", children: sampleParagraph },
}

export const BodyLgUnderline: Story = {
  name: "body-lg / underline",
  args: {
    variant: "body-lg",
    weight: "regular",
    underline: true,
    children: sampleParagraphShort,
  },
}

// =============================================================================
// Body — md
// =============================================================================

export const BodyMdRegular: Story = {
  name: "body-md / regular",
  args: { variant: "body-md", weight: "regular", children: sampleParagraph },
}

export const BodyMdMedium: Story = {
  name: "body-md / medium",
  args: { variant: "body-md", weight: "medium", children: sampleParagraph },
}

export const BodyMdSemibold: Story = {
  name: "body-md / semibold",
  args: { variant: "body-md", weight: "semibold", children: sampleParagraph },
}

export const BodyMdUnderline: Story = {
  name: "body-md / underline",
  args: {
    variant: "body-md",
    weight: "regular",
    underline: true,
    children: sampleParagraphShort,
  },
}

export const BodyMdMono: Story = {
  name: "body-md / mono",
  args: {
    variant: "body-md",
    weight: "regular",
    mono: true,
    children: "const orderTotal = 1_250.00",
  },
}

// =============================================================================
// Body — sm
// =============================================================================

export const BodySmRegular: Story = {
  name: "body-sm / regular",
  args: { variant: "body-sm", weight: "regular", children: sampleParagraph },
}

export const BodySmMedium: Story = {
  name: "body-sm / medium",
  args: { variant: "body-sm", weight: "medium", children: sampleParagraph },
}

export const BodySmSemibold: Story = {
  name: "body-sm / semibold",
  args: { variant: "body-sm", weight: "semibold", children: sampleParagraph },
}

export const BodySmUnderline: Story = {
  name: "body-sm / underline",
  args: {
    variant: "body-sm",
    weight: "regular",
    underline: true,
    children: sampleParagraphShort,
  },
}

// =============================================================================
// Body — xs
// =============================================================================

export const BodyXsRegular: Story = {
  name: "body-xs / regular",
  args: { variant: "body-xs", weight: "regular", children: sampleParagraph },
}

export const BodyXsSemibold: Story = {
  name: "body-xs / semibold",
  args: { variant: "body-xs", weight: "semibold", children: sampleParagraph },
}

// =============================================================================
// All Body Sizes (overview)
// =============================================================================

export const AllBodySizes: Story = {
  name: "All Body Sizes",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 600 }}>
      {(["body-xl", "body-lg", "body-md", "body-sm", "body-xs"] as const).map((variant) => (
        <div key={variant}>
          <AxText variant="heading-sm" color="secondary" as="div" style={{ marginBottom: 4 }}>
            {variant}
          </AxText>
          <AxText variant={variant} weight="regular">
            {sampleParagraph}
          </AxText>
        </div>
      ))}
    </div>
  ),
}

// =============================================================================
// Colors
// =============================================================================

export const Colors: Story = {
  name: "Colors",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <AxText variant="body-lg" color="primary">primary — #262626</AxText>
      <AxText variant="body-lg" color="secondary">secondary — #667085</AxText>
      <AxText variant="body-lg" color="link">link — #0099C8</AxText>
      <AxText variant="body-lg" color="disabled">disabled — #98A2B3</AxText>
    </div>
  ),
}

// =============================================================================
// text-wrap: balance — headings reflow evenly across lines
// =============================================================================

export const TextWrapBalance: Story = {
  name: "Feature — text-wrap balance (headings)",
  render: () => (
    <div style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
      <div style={{ maxWidth: 280 }}>
        <AxText variant="heading-sm" color="secondary" as="div" style={{ marginBottom: 12 }}>
          With balance (default)
        </AxText>
        <AxText variant="heading-xl">
          Build the future of pharmaceutical access
        </AxText>
      </div>
      <div style={{ maxWidth: 280 }}>
        <AxText variant="heading-sm" color="secondary" as="div" style={{ marginBottom: 12 }}>
          Without balance
        </AxText>
        <AxText variant="heading-xl" style={{ textWrap: "unset" }}>
          Build the future of pharmaceutical access
        </AxText>
      </div>
    </div>
  ),
}

// =============================================================================
// overflow-wrap — long words don't break narrow containers
// =============================================================================

export const OverflowProtection: Story = {
  name: "Feature — overflow-wrap (long words)",
  render: () => (
    <div style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
      <div style={{ maxWidth: 200, border: "1px solid var(--neutral-200)", padding: 12, borderRadius: 8 }}>
        <AxText variant="heading-sm" color="secondary" as="div" style={{ marginBottom: 8 }}>
          With break-word (default)
        </AxText>
        <AxText variant="body-md">
          Contact: procurement@axmed-pharmaceuticals-international.com
        </AxText>
      </div>
      <div style={{ maxWidth: 200, border: "1px solid var(--neutral-200)", padding: 12, borderRadius: 8 }}>
        <AxText variant="heading-sm" color="secondary" as="div" style={{ marginBottom: 8 }}>
          Without break-word
        </AxText>
        <AxText variant="body-md" style={{ overflowWrap: "normal" }}>
          Contact: procurement@axmed-pharmaceuticals-international.com
        </AxText>
      </div>
    </div>
  ),
}

// =============================================================================
// Mono variant
// =============================================================================

export const MonoText: Story = {
  name: "Mono (Fira Code)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <AxText variant="body-md" mono>
        const orderTotal = 1_250.00
      </AxText>
      <AxText variant="body-sm" mono>
        SKU-2024-MED-00142
      </AxText>
    </div>
  ),
}

// =============================================================================
// Complete Reference Sheet (matches Figma)
// =============================================================================

// =============================================================================
// Ellipsis
// =============================================================================

export const EllipsisSingleLine: Story = {
  name: "Ellipsis / Single Line",
  render: () => (
    <div style={{ maxWidth: 200 }}>
      <AxText variant="body-lg" ellipsis>
        This text is way too long to fit inside a 200px container and will be truncated with an
        ellipsis.
      </AxText>
    </div>
  ),
}

export const EllipsisMultiLine: Story = {
  name: "Ellipsis / Multi Line (2 rows)",
  render: () => (
    <div style={{ maxWidth: 300 }}>
      <AxText variant="body-lg" ellipsis={{ rows: 2 }}>
        This text is clamped to two lines. Axmed brings just, verifiable, and wide pharmaceutical
        access to every region. Our platform expedites the full procurement cycle — from publishing
        tenders and analyzing bids to organizing shipments.
      </AxText>
    </div>
  ),
}

export const EllipsisWithTooltip: Story = {
  name: "Ellipsis / With Tooltip",
  render: () => (
    <div style={{ maxWidth: 200 }}>
      <AxText
        variant="body-lg"
        ellipsis={{ tooltip: "Amoxicillin 500mg Capsules, 100 units per blister pack" }}
      >
        Amoxicillin 500mg Capsules, 100 units per blister pack
      </AxText>
    </div>
  ),
}

// =============================================================================
// Complete Reference Sheet (matches Figma)
// =============================================================================

export const FigmaReferenceSheet: Story = {
  name: "Figma Reference Sheet",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 800 }}>
      {/* Headings */}
      <div>
        <AxText variant="heading-md" color="secondary" as="div" style={{ marginBottom: 16 }}>
          HEADINGS
        </AxText>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <AxText variant="heading-4xl">{sampleHeading}</AxText>
          <AxText variant="heading-3xl">{sampleHeading}</AxText>
          <AxText variant="heading-2xl">{sampleHeading}</AxText>
          <AxText variant="heading-xl">{sampleHeading}</AxText>
          <AxText variant="heading-lg">{sampleHeading}</AxText>
          <AxText variant="heading-md">{sampleHeading}</AxText>
          <AxText variant="heading-sm">{sampleHeading}</AxText>
        </div>
      </div>

      {/* Body */}
      <div>
        <AxText variant="heading-md" color="secondary" as="div" style={{ marginBottom: 16 }}>
          BODY
        </AxText>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {(
            [
              { variant: "body-xl", weights: ["regular", "medium", "semibold"] },
              { variant: "body-lg", weights: ["regular", "medium", "semibold"] },
              { variant: "body-md", weights: ["regular", "medium", "semibold"] },
              { variant: "body-sm", weights: ["regular", "medium", "semibold"] },
              { variant: "body-xs", weights: ["regular", "semibold"] },
            ] as const
          ).map(({ variant, weights }) => (
            <div key={variant}>
              <AxText variant="heading-sm" color="secondary" as="div" style={{ marginBottom: 8 }}>
                {variant}
              </AxText>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {weights.map((w) => (
                  <AxText key={w} variant={variant} weight={w}>
                    {sampleParagraph}
                  </AxText>
                ))}
                <AxText variant={variant} underline>
                  {sampleParagraphShort}
                </AxText>
                {variant === "body-md" && (
                  <AxText variant={variant} mono>
                    const orderTotal = 1_250.00
                  </AxText>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}
