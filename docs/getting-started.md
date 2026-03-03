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

import { AxButton, AxCard, AxText, AxTable, AxTag } from "axmed-design-system";

// Sample data — in a real app this would come from an API
const orders = [
  { key: "1", id: "ORD-001", product: "Amoxicillin 500mg", supplier: "PharmaCorp Ltd", quantity: 10000, status: "success", deadline: "2025-04-15", total: "$1,200" },
  { key: "2", id: "ORD-002", product: "Metformin 850mg", supplier: "MediSource Inc", quantity: 5000, status: "warning", deadline: "2025-03-28", total: "$850" },
  { key: "3", id: "ORD-003", product: "Ibuprofen 400mg", supplier: "GlobalPharma", quantity: 25000, status: "error", deadline: "2025-03-10", total: "$3,400" },
  { key: "4", id: "ORD-004", product: "Artemether 20mg", supplier: "AfriMeds Co", quantity: 8000, status: "info", deadline: "2025-05-01", total: "$2,100" },
  { key: "5", id: "ORD-005", product: "Paracetamol 500mg", supplier: "PharmaCorp Ltd", quantity: 50000, status: "success", deadline: "2025-04-22", total: "$4,750" },
];

export default function OrdersPage() {
  return (
    <AxCard title="Recent Orders">
      <AxText variant="body-sm" color="secondary">Showing the last 30 days</AxText>

      <AxTable
        columns={[
          { title: "Order ID", dataIndex: "id" },
          { title: "Product", dataIndex: "product" },
          { title: "Supplier", dataIndex: "supplier" },
          { title: "Qty", dataIndex: "quantity", render: (q) => q.toLocaleString() },
          { title: "Status", dataIndex: "status", render: (s) => <AxTag tone={s}>{s}</AxTag> },
          { title: "Total", dataIndex: "total" },
        ]}
        dataSource={orders}
        size="md"
      />

      <AxButton variant="primary">
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
<AxButton variant="primary">Save</AxButton>
<AxButton variant="secondary">Cancel</AxButton>
<AxButton variant="danger">Delete</AxButton>

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
<AxStatCard title="Revenue" value="$12,400" trend={{ value: 12 }} />

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