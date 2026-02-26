"use client"

import React from "react"
import { Select } from "antd"
import type { SelectProps } from "antd"

import AxSearchInput from "../AxInput/SearchInput"
import styles from "./index.module.css"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type FilterConfig = {
  /** Unique key for the filter */
  key: string
  /** Placeholder text for the select */
  placeholder?: string
  /** Select options */
  options: SelectProps["options"]
  /** Allow multiple selections */
  multiple?: boolean
  /** Max tags to show before "+N more" (default: 1 for multiple) */
  maxTagCount?: number
  /** Width of the select (default: 160px) */
  width?: number | string
  /** Allow clearing the selection */
  allowClear?: boolean
  /** Current value (controlled) */
  value?: SelectProps["value"]
  /** Change handler */
  onChange?: SelectProps["onChange"]
}

export type SortConfig = {
  /** Sort options */
  options: SelectProps["options"]
  /** Current value (controlled) */
  value?: SelectProps["value"]
  /** Change handler */
  onChange?: SelectProps["onChange"]
  /** Width (default: 130px) */
  width?: number | string
  /** Show "Sort by" label (default: true) */
  showLabel?: boolean
}

export type AxFilterBarProps = {
  /** Search input config. Pass `false` to hide search. */
  search?: {
    placeholder?: string
    value?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    width?: number | string
  } | false

  /** Filter dropdowns */
  filters?: FilterConfig[]

  /** Sort dropdown */
  sort?: SortConfig

  /** Result count — renders below the bar. Pass a number or a string like "24 medications" */
  resultCount?: number | string

  /** Extra content rendered on the right side (e.g., action buttons) */
  extra?: React.ReactNode

  /** Additional class name for the container */
  className?: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AxFilterBar: React.FC<AxFilterBarProps> = ({
  search,
  filters,
  sort,
  resultCount,
  extra,
  className,
}) => {
  const sortLabelId = sort ? "axFilterBar-sort-label" : undefined

  return (
    <search className={className} aria-label="Filter results">
      <div className={styles.filterBar}>
        {/* Search */}
        {search !== false && (
          <AxSearchInput
            placeholder={search?.placeholder ?? "Search..."}
            value={search?.value}
            onChange={search?.onChange}
            className={styles.searchInput}
            style={search?.width ? { width: search.width } : undefined}
          />
        )}

        {/* Filters + Sort */}
        <div className={styles.filters}>
          {filters?.map((filter) => (
            <Select
              key={filter.key}
              placeholder={filter.placeholder}
              options={filter.options}
              mode={filter.multiple ? "multiple" : undefined}
              maxTagCount={filter.multiple ? (filter.maxTagCount ?? 1) : undefined}
              allowClear={filter.allowClear ?? true}
              value={filter.value}
              onChange={filter.onChange}
              popupMatchSelectWidth={false}
              style={{ minWidth: filter.width ?? 160 }}
              aria-label={filter.placeholder ?? filter.key}
            />
          ))}

          {sort && (
            <div className={styles.sortContainer}>
              {(sort.showLabel ?? true) && (
                <span id={sortLabelId} className={styles.sortLabel}>Sort by</span>
              )}
              <Select
                options={sort.options}
                value={sort.value}
                onChange={sort.onChange}
                popupMatchSelectWidth={false}
                style={{ width: sort.width ?? 130 }}
                aria-label={!(sort.showLabel ?? true) ? "Sort by" : undefined}
                aria-labelledby={(sort.showLabel ?? true) ? sortLabelId : undefined}
              />
            </div>
          )}
        </div>

        {/* CTA / Extra — always far right */}
        {extra && <div className={styles.extra}>{extra}</div>}
      </div>

      {/* Result Count */}
      {resultCount !== undefined && (
        <div className={styles.resultCount} role="status" aria-live="polite">
          {typeof resultCount === "number"
            ? `${resultCount} results`
            : resultCount}
        </div>
      )}
    </search>
  )
}

AxFilterBar.displayName = "AxFilterBar"

export default AxFilterBar
