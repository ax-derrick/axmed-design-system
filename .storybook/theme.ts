import type { ThemeConfig } from "antd"

// Storybook-specific theme that mirrors the app theme (theme/theme.ts)
// but avoids importing from helpers.ts which pulls in Next.js server modules.
// CSS variable values are hardcoded from styles/_colors.scss to keep this lightweight.
const theme: ThemeConfig = {
  token: {
    colorPrimary: "#4738CC",
    colorLink: "#007094",
    fontFamily: "'Figtree', sans-serif",
    fontWeightStrong: 700,
  },
  components: {
    Layout: {
      siderBg: "white",
      headerHeight: 66,
      headerPadding: "0 24px",
    },
    Form: {
      labelColor: "#262626",
      labelFontSize: 14,
      itemMarginBottom: 16,
      verticalLabelPadding: 4,
    },
    Button: {
      borderRadius: 8,
    },
    Input: {
      borderRadius: 8,
    },
    Checkbox: {
      colorPrimary: "#0099C8",
    },
    Modal: {
      borderRadiusLG: 8,
      titleFontSize: 16,
      fontWeightStrong: 700,
      boxShadow: "0 9px 28px 8px rgba(0, 0, 0, 0.05)",
    },
    Table: {
      headerBg: "#FAFAFA",
      headerSplitColor: "transparent",
      fontWeightStrong: 700,
      lineHeightHeading1: 18,
      rowExpandedBg: "white",
    },
    Typography: {
      fontFamily: "'Figtree', sans-serif",
      colorTextSecondary: "#667085",
      colorText: "#262626",
      titleMarginBottom: 0,
      titleMarginTop: 0,
      fontSizeHeading1: 48,
      fontSizeHeading2: 36,
      fontSizeHeading3: 24,
      fontSizeHeading4: 18,
      fontSizeHeading5: 16,
      fontWeightStrong: 700,
    },
    Collapse: {
      headerBg: "transparent",
      paddingContentVertical: 16,
      colorBorder: "#F0F0F0",
    },
    Divider: {
      marginLG: 20,
    },
    Alert: {
      colorInfo: "black",
      colorInfoBorder: "transparent",
      colorWarningBorder: "transparent",
      paddingContentHorizontalSM: 16,
      paddingContentVerticalSM: 16,
    },
    Radio: {
      colorPrimary: "transparent",
      colorWhite: "#2F54EB",
      dotSize: 8,
      fontFamily: "'Figtree', sans-serif",
    },
  },
}

export default theme
