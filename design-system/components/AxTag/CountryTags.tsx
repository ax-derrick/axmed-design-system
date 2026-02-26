"use client"

import React from "react"
import { Tooltip } from "antd"

import styles from "./CountryTags.module.css"

// ---------------------------------------------------------------------------
// Flag emoji helper
// ---------------------------------------------------------------------------

/** Convert an ISO 3166-1 alpha-2 code to its flag emoji */
const getFlagEmoji = (code: string): string => {
  const upper = code.toUpperCase()
  if (upper.length !== 2) return ""
  const points = [...upper].map((c) => 127397 + c.charCodeAt(0))
  return String.fromCodePoint(...points)
}

/** Map of common country names → ISO alpha-2 codes */
const NAME_TO_CODE: Record<string, string> = {
  kenya: "KE",
  nigeria: "NG",
  ghana: "GH",
  tanzania: "TZ",
  uganda: "UG",
  ethiopia: "ET",
  rwanda: "RW",
  zambia: "ZM",
  zimbabwe: "ZW",
  "south africa": "ZA",
  egypt: "EG",
  morocco: "MA",
  senegal: "SN",
  "ivory coast": "CI",
  "côte d'ivoire": "CI",
  cameroon: "CM",
  mozambique: "MZ",
  angola: "AO",
  "democratic republic of congo": "CD",
  drc: "CD",
  mali: "ML",
  malawi: "MW",
  botswana: "BW",
  namibia: "NA",
  // Global
  india: "IN",
  china: "CN",
  "united states": "US",
  usa: "US",
  "united kingdom": "GB",
  uk: "GB",
  germany: "DE",
  france: "FR",
  brazil: "BR",
  pakistan: "PK",
  bangladesh: "BD",
  indonesia: "ID",
}

/** Resolve a string (name or 2-letter code) to a flag emoji. Returns "" if unknown. */
const resolveFlag = (value: string): string => {
  const trimmed = value.trim()
  if (trimmed.length === 2) return getFlagEmoji(trimmed)
  const code = NAME_TO_CODE[trimmed.toLowerCase()]
  return code ? getFlagEmoji(code) : ""
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type AxCountryTagsProps = {
  /** Country names or ISO alpha-2 codes (e.g. "Kenya", "KE", "Nigeria") */
  countries: string[]

  /**
   * Maximum number of tags shown inline before collapsing to "+N more".
   * @default 3
   */
  max?: number

  /** Size variant */
  size?: "sm" | "md"

  /** Additional class name */
  className?: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AxCountryTags: React.FC<AxCountryTagsProps> = ({
  countries,
  max = 3,
  size = "sm",
  className,
}) => {
  const visible = countries.slice(0, max)
  const overflow = countries.slice(max)
  const rootCls = [styles.root, styles[`size-${size}`], className].filter(Boolean).join(" ")

  return (
    <div className={rootCls}>
      {visible.map((country) => {
        const flag = resolveFlag(country)
        return (
          <span key={country} className={styles.tag}>
            {flag && <span className={styles.flag}>{flag}</span>}
            {country}
          </span>
        )
      })}

      {overflow.length > 0 && (
        <Tooltip title={overflow.join(", ")} placement="top">
          <span className={styles.overflow}>+{overflow.length} more</span>
        </Tooltip>
      )}
    </div>
  )
}

AxCountryTags.displayName = "AxCountryTags"

export default AxCountryTags
