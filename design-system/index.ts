import "./global.scss"

// ---------------------------------------------------------------------------
// Font injection — injects Google Fonts <link> into <head> at runtime.
// Inlined here (not a separate module) so tree-shaking can't strip it.
// ---------------------------------------------------------------------------
if (typeof document !== "undefined") {
  const FONT_ID = "axmed-figtree-font"
  if (!document.getElementById(FONT_ID)) {
    const preconnect1 = document.createElement("link")
    preconnect1.rel = "preconnect"
    preconnect1.href = "https://fonts.googleapis.com"
    document.head.appendChild(preconnect1)

    const preconnect2 = document.createElement("link")
    preconnect2.rel = "preconnect"
    preconnect2.href = "https://fonts.gstatic.com"
    preconnect2.crossOrigin = "anonymous"
    document.head.appendChild(preconnect2)

    const link = document.createElement("link")
    link.id = FONT_ID
    link.rel = "stylesheet"
    link.href =
      "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap"
    document.head.appendChild(link)
  }
}

export { default as AxButton } from "./components/AxButton"
export type { AxButtonProps } from "./components/AxButton"

export { default as AxText } from "./components/AxText"
export type { AxTextProps } from "./components/AxText"

export { default as AxTable } from "./components/AxTable"
export type { AxTableProps, AxTableRowState } from "./components/AxTable"

export { default as AxTag } from "./components/AxTag"
export type { AxTagProps, AxTagTone } from "./components/AxTag"

export { default as AxFilterBar } from "./components/AxFilterBar"
export type { AxFilterBarProps, FilterConfig, SortConfig } from "./components/AxFilterBar"

export { default as AxModal } from "./components/AxModal"
export type { AxModalProps } from "./components/AxModal"

export { default as AxCard } from "./components/AxCard"
export type { AxCardProps } from "./components/AxCard"

export { default as AxDrawer } from "./components/AxDrawer"
export type { AxDrawerProps } from "./components/AxDrawer"

export { default as AxEmptyState } from "./components/AxEmptyState"
export type { AxEmptyStateProps, AxEmptyStateSize } from "./components/AxEmptyState"
