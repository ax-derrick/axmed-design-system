# Getting Started with the Axmed Design System

## What is Storybook?

Storybook is a tool for building and testing UI components in isolation. Think of it as a **living catalogue** of every component in our design system — buttons, modals, tables, inputs, and more — where you can:

- **Browse** all available components and their variants
- **Interact** with them in real time (change props, sizes, states)
- **Read auto-generated docs** for each component's API
- **Copy patterns** directly into your feature code

Our live Storybook: **https://ax-derrick.github.io/axmed-design-system/**

---

## Why a Design System?

Without a design system, every engineer builds their own version of common UI — different button styles, inconsistent spacing, duplicated code. The Axmed Design System gives us:

| Problem | Solution |
|---|---|
| Inconsistent UI across pages | Shared components with built-in styles |
| Reimplementing the same patterns | Pre-built components (tables, modals, filters) |
| Design-to-code mismatches | Components match Figma 1:1 |
| Slow feature development | Import a component, pass props, done |

---

## What's in the Box?

The package ships **20+ components** built on top of antd, with Axmed branding, consistent sizing, and accessibility baked in:

| Category | Components |
|---|---|
| **Actions** | `AxButton`, `AxActionMenu` |
| **Controls** | `AxFilterBar`, `AxInput`, `AxSearchInput`, `AxInputOTP`, `AxUploader`, `AxFileItem` |
| **Data Display** | `AxTable`, `AxTableSkeleton`, `AxTag`, `AxCountryTags`, `AxCompanyLogo`, `AxBadge`, `AxStatCard` |
| **Layout** | `AxCard`, `AxSideNav`, `AxHeader` |
| **Navigation** | `AxSteps` |
| **Overlays** | `AxModal`, `AxDrawer` |
| **Feedback** | `AxEmptyState` |
| **Typography** | `AxText`, `AxBrand` |
| **Table Cells** | `AxDeadlineCell`, `AxPriceCell` |

Every component also exports its TypeScript types (e.g. `AxButtonProps`, `AxTableProps`).

---

## Integration Guide — Next.js

### Step 1: Install the Package

```bash
npm install axmed-design-system
```

The package has **peer dependencies** that our Next.js app already includes:

```
react >= 18
react-dom >= 18
antd >= 5
@ant-design/icons >= 5
```

If any of these are missing, install them too:

```bash
npm install antd @ant-design/icons
```

### Step 2: Import the Stylesheet

The design system ships a single CSS file that includes all component styles, design tokens, and the Figtree font. Import it **once** in your root layout.

```tsx
// app/layout.tsx
import "axmed-design-system/style.css";
```

This gives you:
- All component styles
- CSS custom properties (color tokens, spacing, shadows, radii)
- The Figtree font (auto-injected via Google Fonts)

### Step 3: Set Up the antd Theme

The design system components are built on antd and expect the Axmed theme to be applied. Wrap your app with antd's `ConfigProvider`:

```tsx
// app/layout.tsx
import "axmed-design-system/style.css";
import { ConfigProvider } from "antd";

const axmedTheme = {
  token: {
    colorPrimary: "#4738CC",
    colorLink: "#007094",
    fontFamily: "'Figtree', sans-serif",
  },
  components: {
    Button: { borderRadius: 8 },
    Input: { borderRadius: 8 },
    Modal: { borderRadiusLG: 8 },
    Checkbox: { colorPrimary: "#0099C8" },
    Typography: {
      fontFamily: "'Figtree', sans-serif",
      colorText: "#262626",
      colorTextSecondary: "#667085",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider theme={axmedTheme}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
```

> **Tip:** You can copy the full theme object from the Storybook source at `.storybook/theme.ts`.

### Step 4: Use Components

Now you can import and use any component:

```tsx
"use client";

import { AxButton, AxCard, AxText, AxTable, AxTag, AxModal } from "axmed-design-system";

export default function OrdersPage() {
  return (
    <AxCard title="Recent Orders">
      <AxText type="secondary">Showing the last 30 days</AxText>

      <AxTable
        columns={[
          { title: "Order ID", dataIndex: "id" },
          { title: "Status", dataIndex: "status", render: (s) => <AxTag tone={s}>{s}</AxTag> },
          { title: "Total", dataIndex: "total" },
        ]}
        dataSource={orders}
        size="md"
      />

      <AxButton type="primary" size="md">
        Export CSV
      </AxButton>
    </AxCard>
  );
}
```

### Step 5: Explore the Storybook

Before building, always check what's available:

1. Open **https://ax-derrick.github.io/axmed-design-system/**
2. Browse the sidebar — components are organized by category
3. Use the **Playground** story to experiment with props in real time
4. Check the **Docs** tab for the full props API
5. Look at **Pattern** and **Template** stories for real-world usage examples

---

## Quick Reference

### Import Pattern

```tsx
// Components
import { AxButton, AxCard, AxModal } from "axmed-design-system";

// Types (for props interfaces)
import type { AxButtonProps, AxCardProps } from "axmed-design-system";
```

### Size API

All components use a consistent size scale — never antd's `"small"` / `"default"` / `"large"`:

```tsx
<AxButton size="sm" />   // small
<AxButton size="md" />   // medium (default)
<AxButton size="lg" />   // large
```

### Common Components Cheat Sheet

```tsx
// Button
<AxButton type="primary" size="md">Save</AxButton>
<AxButton type="default" size="md">Cancel</AxButton>
<AxButton danger>Delete</AxButton>

// Input
<AxInput label="Email" placeholder="you@axmed.com" size="md" />

// Search
<AxSearchInput placeholder="Search orders..." onSearch={handleSearch} />

// Tag
<AxTag tone="success">Active</AxTag>
<AxTag tone="error">Expired</AxTag>

// Modal
<AxModal title="Confirm" open={isOpen} onCancel={close} onOk={confirm}>
  Are you sure?
</AxModal>

// Empty State
<AxEmptyState
  title="No orders yet"
  description="Orders will appear here once created."
  size="md"
/>

// Stat Card
<AxStatCard title="Revenue" value="$12,400" trend={12} />

// Table with loading skeleton
{loading ? <AxTableSkeleton columns={5} rows={8} /> : <AxTable ... />}
```

---

## Updating the Package

When new components are added or bugs are fixed:

```bash
npm update axmed-design-system
```

Check the Storybook for what's new — new components appear in the sidebar automatically.

---

## Summary

| Step | What to do |
|---|---|
| 1 | `npm install axmed-design-system` |
| 2 | Import `"axmed-design-system/style.css"` in `app/layout.tsx` |
| 3 | Wrap app with `<ConfigProvider theme={axmedTheme}>` |
| 4 | Import components: `import { AxButton } from "axmed-design-system"` |
| 5 | Browse Storybook for available components and patterns |